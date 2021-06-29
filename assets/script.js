var timeEl = document.querySelector("#timer");
var secondsLeft = 60;

var cardHeaderEl = document.getElementById("card-header");
var cardDescriptEl=document.getElementById("card-description");
var startBtn = document.getElementById("startButton");

beginningCard();
startBtn.addEventListener("click", setTimer);

// Create first card
function beginningCard(){
    cardHeaderEl.innerHTML = "Coding Quiz Challenge";
    cardDescriptEl.innerHTML = "Try to answer the following questions before the time runs out.  Each time you answer incorrectly, the timer will deduct 15 seconds."
    startBtn.innerHTML = "Start Quiz";
}

// Create Question Cards
var questionBank = [
    "What is computational thinking?",
    "Which of the following is an example of an HTML tag?",
    "True or False: Classes and IDs are examples of HTML attributes",
    "What does CSS stand for?",
    "What is the proper way to identify a class using CSS?",
    "How do you call a variable in CSS?",
    "What is the primary purpose of using JavaScript?",
    "What is the difference between jQuery and vanilla JavaScript?"
];

function questionCards(){
    var i = 0;
    cardHeaderEl.innerHTML = questionBank[i];
    cardDescriptEl.innerHTML="";
    startBtn.setAttribute("display", "none");
}



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
