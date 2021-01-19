var codebox = document.querySelector("#code-box");
var resultbox = document.querySelector(".div-result");
var net_speed_box = document.querySelector("#net-speed-box");
var timeleft = document.querySelector("#timeleft");
var timeDiv = document.querySelector(".time-div");
var loadingDiv = document.querySelector(".loading-div");
var codeDiv = document.querySelector("#code-div");
var record_broken_div = document.querySelector("#record-broken-div");


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

arrayOfWords = shuffle(randomWords);  //shuffles the 1000 english words and makes a new array
blockOfCode = arrayOfWords.join(" ");  //converts the newly created array of words in to a long sentence
arrayOfLetters = Array.from(blockOfCode);  //converts a string into array with each letter as its element


var letters;
var spacesCounted = 0;
var index = -1;
var block = 1;
var startPoint = 0;
var endPoint;
var numOfWordsperFrame = 20;

var overAllCharactersTyped = 0;
var overAllUncorrectedErrors = 0;

var letterNum = 0; //the number of characters that have been typed. (Not the total. After taking backspace into account)
var cursorValue = 0;
var uncorrectedErrors = 0;
var testFinish = false;
var testTimeLimit = 5; //time for which test is to be run
var time = testTimeLimit;  //time left till end  
var timerStarted = false;
var nwpm = null;  //net words per minute



function calcNextBlockOfString(){
    collectAndResetValues()

    do {
        if(spacesCounted==(numOfWordsperFrame*block)){
            //console.log("increasing block")
            block++;
        }
        index++;
        if(arrayOfLetters[index]==" "){ 
            spacesCounted++;
            if (spacesCounted==(numOfWordsperFrame*block)) {
                endPoint = index;
                parseBlockofCode(startPoint, endPoint)
                //console.log(startPoint, endPoint);
                startPoint = endPoint + 1;
            }
        }
    }
    while (spacesCounted < (numOfWordsperFrame*block));
}


function parseBlockofCode(start, end){
    codeDiv.textContent = '';
    //printing, the stuff to be typed, into the div
    for(x=start; x <= end; x++){
        var para = document.createElement("span");
        var node = document.createTextNode(blockOfCode[x]);
        if(blockOfCode[x]==" "){
            para.setAttribute('class', 'letters empty-space')
        }else{
            para.setAttribute('class', 'letters');
        }
        
        para.appendChild(node);
        codeDiv.appendChild(para);
    }
    letters = document.querySelectorAll(".letters"); //contains all the span elements created above each of which contains a letter
    
}

function timer(){
    time--;
    timeleft.innerText = time;
    if(time<=0){
        stopTest()
    }
}

function collectAndResetValues(){
    //console.log("Just before Resetting")
    overAllCharactersTyped += letterNum;
    overAllUncorrectedErrors += uncorrectedErrors;
    letterNum = 0;
    cursorValue = 0;
    uncorrectedErrors = 0;
}

function stopTest(){
    collectAndResetValues()

    codebox.onkeydown = null;
    clearInterval(myTimer);
    codeDiv.style.opacity = "0.5";
    //console.log("everything should have stopped");

    timeDiv.style.display = "none";
    loadingDiv.style.display = "initial";

    overAllUncorrectedErrors = overAllUncorrectedErrors -(block - 1); //because it always counts the last space as an error so have to reduce over all Errors by the num of times frame changed
    //calculating results
    nwpm = (((overAllCharactersTyped/5)-overAllUncorrectedErrors)/(testTimeLimit-time))*60;
    nwpm = Math.round(nwpm);
    if(nwpm<0){ nwpm = 0; }


    results = {
        net_words_pm: nwpm,
        recordBroken: false,
    }
    //console.log("Your nwpm is " + nwpm);

    if(loggedIn){
        savedata(results);
    }else{
        printResults(results)
    }
    
}

//this function converts unix time to normal time and date
function convert(unixTime){
    var unixtimestamp = unixTime;
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(unixtimestamp*1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var period = 'AM';
    if (hours >=12) {  period = 'PM';  }
    if (hours > 12) {  hours = hours - 12;  }
    
    var convdataTime = day+'-'+month+'-'+year+' '+hours + ':' + minutes.substr(-2) + ' ' + period;  //concatenate seconds.substr(-2) to get the seconds as well 
  
    return convdataTime;
}

//to send test data to the server
function savedata(results){
    var endpoint = '/savedata';
    //console.log('inside fetch')

    fetch(endpoint, { 
        // Adding method type 
        method: "POST", 
        
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        },

        // Adding body or contents to send 
        body: JSON.stringify({ 
            result: {
                net_words_per_min: results.net_words_pm,
                unixTime: Date.now()/1000,
                realTime: convert(Date.now()/1000),
            } 
        }), 
        
    }) 

    // Converting to JSON 
    .then(response => response.json()) 

    // Displaying results to console 
    .then(data => {
        //console.log("recieved data from server");
        //console.log(data);
        printResults(data);
    })
    
    .catch(err => console.log(err));
}


function printResults(results){
    net_speed_box.innerText = results.net_words_pm + " WPM";
    loadingDiv.style.display = "none";
    resultbox.style.display = "initial";
    if (results.recordBroken) {
        record_broken_div.style.display = "inherit";
    }
}

//when keys are pressed
codebox.onkeydown = ()=>{

    if(!timerStarted){
        myTimer = setInterval(timer, 1000);  //will the timer() fuction, created above, after every 1000 milliseconds
        timerStarted = true;
    }

    //if stuff to be typed has not finished and time is still available then

    keyPressed = event.key;
    //toBePressed = blockOfCode.charAt(letterNum);
    toBePressed = letters[letterNum].innerText;

    if(event.key == 'Backspace'){

        if(letterNum>0){
            letterNum--;
        }
        //if previous word was typed wrong i.e had the 'typed-wrong' then remove that class and reduce the number of uncorrectedErrors by one
        if(letters[letterNum] && letters[letterNum].classList.contains("typed-wrong")){
            letters[letterNum].classList.remove("typed-wrong");
            uncorrectedErrors--;
            //console.log("removed a wrong typed key!")
        }
        
    }else if(keyPressed == toBePressed  ){
        //Correct Key Pressed
        letterNum++;
        cursorValue++;
    }else if(event.key != 'Shift' && event.key != 'Backspace' && event.key != 'ctrl'){ //Meaning if Wrong Key Pressed
        
        uncorrectedErrors++;
        letterNum++;
        //console.log("wrong key pressed. '" + toBePressed + "' was to be pressed");
        letters[cursorValue].classList.add("typed-wrong"); //give it a typed-wrong class so that its color changes
        cursorValue++;
    }

    if(event.key == 'Backspace' && cursorValue>=1){
        letters[cursorValue].classList.remove("current-word-color");

        letters[cursorValue-1].classList.add("current-word-color");
        cursorValue--;

        //Backspace Pressed
    }else{
        if(letters[cursorValue-1]){
            letters[cursorValue-1].classList.remove("current-word-color");
        }

        if(letterNum!=letters.length){
            letters[cursorValue].classList.add("current-word-color");
        }else{
            calcNextBlockOfString();
            letters[cursorValue].classList.add("current-word-color"); //adds class so user knows which key to press now

        }
    }
};

calcNextBlockOfString();

letters[cursorValue].classList.add("current-word-color"); //adds class so user knows which key to press now

timeleft.innerText = time;  //setting the initial time

codebox.focus();  //to bring the element into focus once loaded so user can start the test when first key is pressed.




