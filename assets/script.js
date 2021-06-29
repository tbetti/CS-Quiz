var timeEl = document.querySelector("#timer");
var secondsLeft = 60;

// Create first card
var cardHeaderEl = document.getElementById("card-header");
var cardDescriptEl=document.getElementById("card-description");
var startBtn = document.querySelector("button");

cardHeaderEl.innerHTML = "Coding Quiz Challenge";
cardDescriptEl.innerHTML = "Try to answer the following questions before the time runs out.  Each time you answer incorrectly, the timer will deduct 15 seconds."
startBtn.innerHTML = "Start Quiz";


// Create timer
function setTimer(){
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft === 0){
            clearInterval(timerInterval);
        }
    }, 1000);
}
