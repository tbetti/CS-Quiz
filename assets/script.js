var timeEl = document.querySelector("#timer");
var secondsLeft = 60;

var cardHeaderEl = document.getElementById("card-header");
var cardDescriptEl=document.getElementById("card-description");
var startBtn = document.getElementById("startButton");
var answerBtn = document.querySelectorAll("#answer-choice")

beginningCard();
startBtn.addEventListener("click", startQuiz);

// Create first card
function beginningCard(){
    cardHeaderEl.innerHTML = "Coding Quiz Challenge";
    cardDescriptEl.innerHTML = "Try to answer the following questions before the time runs out.  Each time you answer incorrectly, the timer will deduct 15 seconds."
    startBtn.innerHTML = "Start Quiz";
}

function startQuiz(){
    startBtn.setAttribute("style", "display:none");
    // set the timer
    setTimer();
    
    var i=0;
    while (secondsLeft > 0){
        //Display question
        var userAnswer = showQuestion(i);
        // Check if answer is correct
        if (userAnswer !== answer){
            secondsLeft = secondsLeft - 15;
            i++
        }
        i++
    }
    
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

var answerBank = [
    "a) choice 1",
    "b) choice 2",
    "c) choice 3",
    "d) choice 4"
];

function showQuestion(i){
    // Display question and answer choices
    cardHeaderEl.innerHTML = questionBank[i];
    cardDescriptEl.innerHTML= ''
    cardDescriptEl.setAttribute("style", "flex-direction: column");
    for(j=0; j < answerBtn.length; j++){
       answerBtn[j].classList.remove("hide");
       answerBtn[j].innerHTML = answerBank[j]; 
    }
    

    // Get answer from user
    // Return user answer as array at [i]
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
