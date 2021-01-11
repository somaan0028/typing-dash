var codebox = document.querySelector("#code-box");
var resultbox = document.querySelector(".div-result");
var net_speed_box = document.querySelector("#net-speed-box");
var timeleft = document.querySelector("#timeleft");
var timeDiv = document.querySelector(".time-div");
var loadingDiv = document.querySelector(".loading-div");
var codeDiv = document.querySelector("#code-div");
var record_broken_div = document.querySelector("#record-broken-div");
//blockOfCode = "for (let w = 0; w < this._workspaces.length; w++)"; //stuff to be typed


//top 1000 english words. DON'T OPEN. Too BIG!!
randomWords = [
    "as",
    "I",
    "his",
    "that",
    "he",
    "was",
    "for",
    "on",
    "are",
    "with",
    "they",
    "be",
    "at",
    "one",
    "have",
    "this",
    "from",
    "by",
    "hot",
    "word",
    "but",
    "what",
    "some",
    "is",
    "it",
    "you",
    "or",
    "had",
    "the",
    "of",
    "to",
    "and",
    "a",
    "in",
    "we",
    "can",
    "out",
    "other",
    "were",
    "which",
    "do",
    "their",
    "time",
    "if",
    "will",
    "how",
    "said",
    "an",
    "each",
    "tell",
    "does",
    "set",
    "three",
    "want",
    "air",
    "well",
    "also",
    "play",
    "small",
    "end",
    "put",
    "home",
    "read",
    "hand",
    "port",
    "large",
    "spell",
    "add",
    "even",
    "land",
    "here",
    "must",
    "big",
    "high",
    "such",
    "follow",
    "act",
    "why",
    "ask",
    "men",
    "change",
    "went",
    "light",
    "kind",
    "off",
    "need",
    "house",
    "picture",
    "try",
    "us",
    "again",
    "animal",
    "point",
    "mother",
    "world",
    "near",
    "build",
    "self",
    "earth",
    "father",
    "any",
    "new",
    "work",
    "part",
    "take",
    "get",
    "place",
    "made",
    "live",
    "where",
    "after",
    "back",
    "little",
    "only",
    "round",
    "man",
    "year",
    "came",
    "show",
    "every",
    "good",
    "me",
    "give",
    "our",
    "under",
    "name",
    "very",
    "through",
    "just",
    "form",
    "sentence",
    "great",
    "think",
    "say",
    "help",
    "low",
    "line",
    "differ",
    "turn",
    "cause",
    "much",
    "mean",
    "before",
    "move",
    "right",
    "boy",
    "old",
    "too",
    "same",
    "she",
    "all",
    "there",
    "when",
    "up",
    "use",
    "your",
    "way",
    "about",
    "many",
    "then",
    "them",
    "write",
    "would",
    "like",
    "so",
    "these",
    "her",
    "long",
    "make",
    "thing",
    "see",
    "him",
    "two",
    "has",
    "look",
    "more",
    "day",
    "could",
    "go",
    "come",
    "did",
    "number",
    "sound",
    "no",
    "most",
    "people",
    "my",
    "over",
    "know",
    "water",
    "than",
    "call",
    "first",
    "who",
    "may",
    "down",
    "side",
    "been",
    "now",
    "find",
    "head",
    "stand",
    "own",
    "page",
    "should",
    "country",
    "found",
    "answer",
    "school",
    "grow",
    "study",
    "still",
    "learn",
    "plant",
    "cover",
    "food",
    "sun",
    "four",
    "between",
    "state",
    "keep",
    "eye",
    "never",
    "last",
    "let",
    "thought",
    "city",
    "tree",
    "cross",
    "farm",
    "hard",
    "start",
    "might",
    "story",
    "saw",
    "far",
    "sea",
    "draw",
    "left",
    "late",
    "run",
    "don’t",
    "while",
    "press",
    "close",
    "night",
    "real",
    "life",
    "few",
    "north",
    "book",
    "carry",
    "took",
    "science",
    "eat",
    "room",
    "friend",
    "began",
    "idea",
    "fish",
    "mountain",
    "stop",
    "once",
    "base",
    "hear",
    "horse",
    "cut",
    "sure",
    "watch",
    "color",
    "face",
    "wood",
    "main",
    "open",
    "seem",
    "together",
    "next",
    "white",
    "children",
    "begin",
    "got",
    "walk",
    "example",
    "ease",
    "paper",
    "group",
    "always",
    "music",
    "those",
    "both",
    "mark",
    "often",
    "letter",
    "until",
    "mile",
    "river",
    "car",
    "feet",
    "care",
    "second",
    "enough",
    "plain",
    "girl",
    "usual",
    "young",
    "ready",
    "above",
    "ever",
    "red",
    "list",
    "though",
    "feel",
    "talk",
    "bird",
    "soon",
    "body",
    "dog",
    "family",
    "direct",
    "pose",
    "leave",
    "song",
    "measure",
    "door",
    "product",
    "black",
    "short",
    "numeral",
    "class",
    "wind",
    "question",
    "happen",
    "complete",
    "ship",
    "area",
    "half",
    "rock",
    "order",
    "fire",
    "south",
    "problem",
    "piece",
    "told",
    "knew",
    "pass",
    "since",
    "top",
    "whole",
    "king",
    "street",
    "inch",
    "multiply",
    "nothing",
    "course",
    "stay",
    "wheel",
    "full",
    "force",
    "blue",
    "object",
    "decide",
    "surface",
    "deep",
    "moon",
    "island",
    "foot",
    "system",
    "busy",
    "test",
    "record",
    "boat",
    "common",
    "gold",
    "possible",
    "plane",
    "stead",
    "dry",
    "wonder",
    "laugh",
    "thousand",
    "ago",
    "ran",
    "check",
    "game",
    "shape",
    "equate",
    "hot",
    "miss",
    "brought",
    "heat",
    "snow",
    "tire",
    "bring",
    "yes",
    "distant",
    "fill",
    "east",
    "paint",
    "language",
    "among",
    "unit",
    "power",
    "town",
    "fine",
    "certain",
    "fly",
    "fall",
    "lead",
    "cry",
    "dark",
    "machine",
    "note",
    "wait",
    "plan",
    "figure",
    "star",
    "box",
    "noun",
    "field",
    "rest",
    "correct",
    "able",
    "pound",
    "done",
    "beauty",
    "drive",
    "stood",
    "contain",
    "front",
    "teach",
    "week",
    "final",
    "gave",
    "green",
    "oh",
    "quick",
    "develop",
    "ocean",
    "warm",
    "free",
    "minute",
    "strong",
    "special",
    "mind",
    "behind",
    "clear",
    "tail",
    "produce",
    "fact",
    "space",
    "heard",
    "best",
    "hour",
    "better",
    "true",
    "during",
    "hundred",
    "five",
    "remember",
    "step",
    "early",
    "hold",
    "west",
    "ground",
    "interest",
    "reach",
    "fast",
    "verb",
    "sing",
    "listen",
    "six",
    "table",
    "travel",
    "less",
    "morning",
    "ten",
    "simple",
    "several",
    "vowel",
    "toward",
    "war",
    "lay",
    "against",
    "pattern",
    "slow",
    "center",
    "love",
    "person",
    "money",
    "serve",
    "appear",
    "road",
    "map",
    "rain",
    "rule",
    "govern",
    "pull",
    "cold",
    "notice",
    "voice",
    "energy",
    "hunt",
    "probable",
    "bed",
    "brother",
    "egg",
    "ride",
    "cell",
    "believe",
    "perhaps",
    "pick",
    "sudden",
    "count",
    "square",
    "reason",
    "length",
    "represent",
    "art",
    "subject",
    "region",
    "size",
    "vary",
    "settle",
    "speak",
    "weight",
    "general",
    "ice",
    "matter",
    "circle",
    "pair",
    "include",
    "divide",
    "syllable",
    "felt",
    "grand",
    "ball",
    "yet",
    "wave",
    "drop",
    "heart",
    "am",
    "present",
    "heavy",
    "dance",
    "engine",
    "position",
    "arm",
    "wide",
    "sail",
    "material",
    "fraction",
    "forest",
    "sit",
    "race",
    "window",
    "store",
    "summer",
    "train",
    "sleep",
    "prove",
    "lone",
    "leg",
    "exercise",
    "wall",
    "catch",
    "mount",
    "wish",
    "sky",
    "board",
    "joy",
    "winter",
    "sat",
    "written",
    "wild",
    "instrument",
    "kept",
    "glass",
    "grass",
    "cow",
    "job",
    "edge",
    "sign",
    "visit",
    "past",
    "soft",
    "fun",
    "bright",
    "gas",
    "weather",
    "month",
    "million",
    "bear",
    "finish",
    "happy",
    "hope",
    "flower",
    "clothe",
    "strange",
    "gone",
    "trade",
    "melody",
    "trip",
    "office",
    "receive",
    "row",
    "mouth",
    "exact",
    "symbol",
    "die",
    "least",
    "trouble",
    "shout",
    "except",
    "wrote",
    "seed",
    "tone",
    "join",
    "suggest",
    "clean",
    "break",
    "lady",
    "yard",
    "rise",
    "bad",
    "blow",
    "oil",
    "blood",
    "touch",
    "grew",
    "cent",
    "mix",
    "team",
    "wire",
    "cost",
    "lost",
    "brown",
    "wear",
    "garden",
    "equal",
    "sent",
    "choose",
    "fell",
    "fit",
    "flow",
    "fair",
    "bank",
    "collect",
    "save",
    "control",
    "decimal",
    "ear",
    "else",
    "quite",
    "broke",
    "case",
    "middle",
    "kill",
    "son",
    "lake",
    "moment",
    "scale",
    "loud",
    "spring",
    "observe",
    "child",
    "straight",
    "consonant",
    "nation",
    "dictionary",
    "milk",
    "speed",
    "method",
    "organ",
    "pay",
    "age",
    "section",
    "dress",
    "cloud",
    "surprise",
    "quiet",
    "stone",
    "tiny",
    "climb",
    "cool",
    "design",
    "poor",
    "lot",
    "experiment",
    "bottom",
    "key",
    "iron",
    "single",
    "stick",
    "flat",
    "twenty",
    "skin",
    "smile",
    "crease",
    "hole",
    "jump",
    "baby",
    "eight",
    "village",
    "meet",
    "root",
    "buy",
    "raise",
    "solve",
    "metal",
    "whether",
    "push",
    "seven",
    "paragraph",
    "third",
    "shall",
    "held",
    "hair",
    "describe",
    "cook",
    "floor",
    "either",
    "result",
    "burn",
    "hill",
    "safe",
    "cat",
    "century",
    "consider",
    "type",
    "law",
    "bit",
    "coast",
    "copy",
    "phrase",
    "silent",
    "tall",
    "sand",
    "soil",
    "roll",
    "temperature",
    "finger",
    "industry",
    "value",
    "fight",
    "lie",
    "beat",
    "excite",
    "natural",
    "view",
    "sense",
    "capital",
    "won’t",
    "chair",
    "danger",
    "fruit",
    "rich",
    "thick",
    "soldier",
    "process",
    "operate",
    "practice",
    "separate",
    "difficult",
    "doctor",
    "please",
    "protect",
    "noon",
    "crop",
    "modern",
    "element",
    "hit",
    "student",
    "corner",
    "party",
    "supply",
    "whose",
    "locate",
    "ring",
    "character",
    "insect",
    "caught",
    "period",
    "indicate",
    "radio",
    "spoke",
    "atom",
    "human",
    "history",
    "effect",
    "electric",
    "expect",
    "bone",
    "rail",
    "imagine",
    "provide",
    "agree",
    "thus",
    "gentle",
    "woman",
    "captain",
    "guess",
    "necessary",
    "sharp",
    "wing",
    "create",
    "neighbor",
    "wash",
    "bat",
    "rather",
    "crowd",
    "corn",
    "compare",
    "poem",
    "string",
    "bell",
    "depend",
    "meat",
    "rub",
    "tube",
    "famous",
    "dollar",
    "stream",
    "fear",
    "sight",
    "thin",
    "triangle",
    "planet",
    "hurry",
    "chief",
    "colony",
    "clock",
    "mine",
    "tie",
    "enter",
    "major",
    "fresh",
    "search",
    "send",
    "yellow",
    "gun",
    "allow",
    "print",
    "dead",
    "spot",
    "desert",
    "suit",
    "current",
    "lift",
    "rose",
    "arrive",
    "master",
    "track",
    "parent",
    "shore",
    "division",
    "sheet",
    "substance",
    "favor",
    "connect",
    "post",
    "spend",
    "chord",
    "fat",
    "glad",
    "original",
    "share",
    "station",
    "dad",
    "bread",
    "charge",
    "proper",
    "bar",
    "offer",
    "segment",
    "slave",
    "duck",
    "instant",
    "market",
    "degree",
    "populate",
    "chick",
    "dear",
    "enemy",
    "reply",
    "drink",
    "occur",
    "support",
    "speech",
    "nature",
    "range",
    "steam",
    "motion",
    "path",
    "liquid",
    "log",
    "meant",
    "quotient",
    "teeth",
    "shell",
    "neck",
    "oxygen",
    "sugar",
    "death",
    "pretty",
    "skill",
    "women",
    "season",
    "solution",
    "magnet",
    "silver",
    "thank",
    "branch",
    "match",
    "suffix",
    "especially",
    "fig",
    "afraid",
    "huge",
    "sister",
    "steel",
    "discuss",
    "forward",
    "similar",
    "guide",
    "experience",
    "score",
    "apple",
    "bought",
    "led",
    "pitch",
    "coat",
    "mass",
    "card",
    "band",
    "rope",
    "slip",
    "win",
    "dream",
    "evening",
    "condition",
    "feed",
    "tool",
    "total",
    "basic",
    "smell",
    "valley",
    "nor",
    "double",
    "seat",
    "continue",
    "block",
    "chart",
    "hat",
    "sell",
    "success",
    "company",
    "subtract",
    "event",
    "particular",
    "deal",
    "swim",
    "term",
    "opposite",
    "wife",
    "shoe",
    "shoulder",
    "spread",
    "arrange",
    "camp",
    "invent",
    "cotton",
    "born",
    "determine",
    "quart",
    "nine",
    "truck",
    "noise",
    "level",
    "chance",
    "gather",
    "shop",
    "stretch",
    "throw",
    "shine",
    "property",
    "column",
    "molecule",
    "select",
    "wrong",
    "gray",
    "repeat",
    "require",
    "broad",
    "prepare",
    "salt",
    "nose",
    "plural",
    "anger",
    "claim",
    "continent"
];

//shuffles an array
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

//blockOfCode = "Maecenas congue ullamcorper feugiat. Phasellus posuere odio risus, non imperdiet tellus iaculis nec. Aliquam erat volutpat. Vivamus sagittis dapibus congue. Phasellus condimentum faucibus dapibus. Nam porta ullamcorper ullamcorper. Integer pretium condimentum diam, non convallis ipsum tristique a. In eu congue libero. Pellentesque tincidunt dictum ipsum, quis accumsan tellus interdum in. Nunc diam nulla, volutpat quis blandit aliquet, aliquet quis leo. Phasellus pharetra rutrum tellus quis sollicitudin. Sed vel auctor libero. Ut in lacus ultricies, hendrerit nunc suscipit, ultrices massa. Suspendisse congue dolor eu ultricies pulvinar. Etiam id felis sed velit porta finibus. Proin ultricies sollicitudin sem. Proin sit amet sagittis erat. Ut fermentum tincidunt bibendum. Etiam eget turpis vulputate, euismod dui nec, imperdiet massa. Fusce blandit hendrerit gravida. In hac habitasse platea dictumst. Sed sit amet quam magna. Aliquam tempus sagittis convallis. Pellentesque sagittis dapibus bibendum. Integer volutpat sapien non tortor dignissim, ac consequat massa pellentesque. Integer a vehicula tortor, non varius nunc. Nunc lacus elit, pulvinar in tempus at, placerat a ligula. In commodo aliquet dolor at pellentesque. Nulla ullamcorper quam eu bibendum sagittis."; //stuff to be typed
//blockOfCode = "All rights reserved. No part of this publication may be reproduced in any language, stored in a retrieval system or transmitted in any form or by any means, electronic, mechanical, photocopying, recording or otherwise without the express permission of the copyright owner.";
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



//console.log(loggedIn);

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
//setInterval(calcNextBlockOfString, 5000);


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
    //console.log(time)
    timeleft.innerText = time;
    if(time<=0){
        stopTest()
    }
}

function collectAndResetValues(){
    //console.log("Just before Resetting")
    //console.log(letterNum, uncorrectedErrors, overAllCharactersTyped, overAllUncorrectedErrors);
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
    //console.log("Uncorrected Errors: "+overAllUncorrectedErrors+". Letter Typed: "+overAllCharactersTyped);
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

//this function converts unix time to real time and date
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
    //console.log("Unix time is "+ Date.now()/1000);
    // timeDiv.style.display = "none";
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

    //}else{                //if(!testFinish){   //if time finished then do following commands
        //testFinish = true;
        //stopTest()
    //console.log(letterNum, uncorrectedErrors, overAllCharactersTyped, overAllUncorrectedErrors);

};

calcNextBlockOfString();

letters[cursorValue].classList.add("current-word-color"); //adds class so user knows which key to press now

timeleft.innerText = time;  //setting the initial time

codebox.focus();  //to bring the element into focus once loaded so user can start the test when first key is pressed.




