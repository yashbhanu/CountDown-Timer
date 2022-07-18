//clock countdown

const timerDisplay = document.querySelector('.display__time-left');     //select the 'h1' tag where we would populate time remaining
const endTime = document.querySelector('.display__end-time');           //select 'p' tag 
const buttons  = document.querySelectorAll('[data-time]');          //fetch everythinf from document which contains [data-time] i.e fetch buttons

let countdown;

function timer(seconds) {
    clearInterval(countdown);       //clear any existing timers // incase if we click different buttons at same time //existing timers should be cancelled

    const now = Date.now();     //Date.now() gets us current time in miliseconds
    const then = now + seconds * 1000;      //its the time which is scheduled // i.e current time + seconds = scheduled time //(i.e 1:10 + 1min = 1:11 time) //( * 1000 to get everything in milisecs)
    displayTimeLeft(seconds);               //call 'how much time is left' func //pass the seconds to it
    displayEndTime(then);                   //call 'end' func //pass the scheduled time to it //to display end time
    
    //set a interval for every 1 sec (so time get updated every 1 sec)
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) /1000);      //get no. of secs left //(divide by 1000 to get seconds in milisecs)
        //check if we should stop it (if secs < 0 i.e time is over , stop interval)
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);       //display time left after every 1 sec
    },1000);
}

//function to show how much secs are remaining
function displayTimeLeft (seconds) {
    const minutes = Math.floor(seconds/60);     //get mins (i.e if 350 secs => then 5 mins and)
    const remainderSeconds = seconds % 60;      //get remaining Seconds
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;        //if remainderSecs less 10 then append a zero else '' (nothing) //i.e 3:07, 4:01...
    timerDisplay.textContent = display;     //populate in DOM and doc's title
    document.title = display;
}

//func to show scheduled time
function displayEndTime(timestamp) {
    const end = new Date(timestamp);            //pass time i.e timestamp in milisecs (in timer func)  //convert those milisecs into a proper date
    const hour = end.getHours();                //extract hours from the date
    const adjustedHour = hour > 12 ? hour - 12 : hour;      //to set time in Indian Format //if hour greater than 12 then minus by 12 else only hour
    const minutes = end.getMinutes();            //extract mins from the date
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;        //populate in DOM 
}

//call func on button click
function startTimer() {
    const seconds = parseInt(this.dataset.time);        //get the buttons data time i.e 20 secs, 5 min ,15 min.....etc
    timer(seconds);        //call the func on button Click and pass the button's data as seconds in the func
}

buttons.forEach(button => button.addEventListener('click', startTimer));          //for every button click, call startTimer

//new syntax //get the whole form by form's name (i.e document.customForm) 
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;        //on submit of form , extract the the input's value from input's name i.e(minutes)
    timer(mins * 60);               //convert those mins into milisecs and pass it to timer func
    this.reset();           //reset form
})




