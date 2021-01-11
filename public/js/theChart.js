var result_chart = document.querySelector("#result-chart").getContext('2d');

var past_week_button = document.querySelector("#past-week-button");
var past_month_button = document.querySelector("#past-month-button");
var all_time_button = document.querySelector("#all-time-button");

var enoughItems = false;
var filteredArrayOfScores = [];
var filteredArrayOfTimes = [];

var unitforTime;
var rangeOfTime;

var scatterChart;

//these variables will be passed on to create the chart
var theLabels;
var theData;

//this function creates the chart
function createChart(labelsArray, dataArray, unitOfTime){

        Chart.defaults.global.defaultFontColor = 'black';

        scatterChart = new Chart(result_chart, {
        type: 'line',
        data: {
            //labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
            //labels: ["9-Sep-2020 11:16:41","9-Sep-2020 11:16:52","9-Sep-2020 11:16:59"],
            // labels: [1599632201111, 1599632269111, 1599636564111],
            labels: labelsArray,
            datasets: [{
                label: 'Speed (WPM)',
                backgroundColor: '#ff0000',
                fill: false,
                lineTension: 0,
                borderColor: '#ff0000',
                data: dataArray
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: unitOfTime,
                        tooltipFormat: 'lll',
                    }
                }]                    
            }
        }
    });
}

//initial graph on page load. Showing data for last week.
filterArray(7); //only getting the data of last 7 days
past_week_button.classList.add("chart-btn-pressed");
createChart(theLabels, theData, 'day');

past_week_button.click();


//this func filters the scores and time arrays leaving only the values of the last 'n' days. 'n' refers to numOfDays
function filterArray(numOfDays){
    filteredArrayOfScores = [];
    filteredArrayOfTimes = [];
    enoughItems = false;
    var x = theScoresArray.length;
    while (enoughItems == false) {
        if (theUnixTimeArray[x-1] && ( Date.now() - theUnixTimeArray[x-1]) <= numOfDays*86400000 ) { //86400000 is the num of milliseconds in a day
            filteredArrayOfScores.unshift(theScoresArray[x-1]);
            filteredArrayOfTimes.unshift(theUnixTimeArray[x-1]);
            x--;
        }else{
            enoughItems = true;
        }
        
    }
    //console.log(filteredArrayOfScores);
    //console.log(filteredArrayOfTimes);

    theLabels = filteredArrayOfTimes;
    theData = filteredArrayOfScores;
}


past_week_button.addEventListener('click', ()=>{
    //console.log('week');

    past_month_button.classList.remove("chart-btn-pressed");
    all_time_button.classList.remove("chart-btn-pressed");
    past_week_button.classList.add("chart-btn-pressed");

    filterArray(7); //only getting the data of last 7 days
    scatterChart.destroy(); //destroy previous chart
    createChart(theLabels, theData, 'day');
});

past_month_button.addEventListener('click', ()=>{
    //console.log('month');

    past_week_button.classList.remove("chart-btn-pressed");
    all_time_button.classList.remove("chart-btn-pressed");
    past_month_button.classList.add("chart-btn-pressed");

    filterArray(31); //only getting the data of last 31 days
    scatterChart.destroy(); //destroy previous chart
    createChart(theLabels, theData, 'day');
});

all_time_button.addEventListener('click', ()=>{
    //console.log('all time');

    past_week_button.classList.remove("chart-btn-pressed");
    past_month_button.classList.remove("chart-btn-pressed");
    all_time_button.classList.add("chart-btn-pressed");

    theLabels = theUnixTimeArray;
    theData = theScoresArray;
    rangeOfTime = (theUnixTimeArray[theUnixTimeArray.length - 1] - theUnixTimeArray[0]);
    if ( rangeOfTime <= 10368000000) {  //num of milliseconds in 4 months
        //console.log("its extends over 4 months");
        unitforTime = 'day';
    }else{
        //console.log("its more than 4 months");
        unitforTime = 'month';
    }
    scatterChart.destroy(); //destroy previous chart
    createChart(theLabels, theData, unitforTime);
});