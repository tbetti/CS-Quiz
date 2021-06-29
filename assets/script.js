// Create question and answer banks
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

var answerBank1 = [
    "a) Writing code from scratch",
    "b) Practicing computer science skills daily",
    "c) Being able to break down a problem into smaller steps", // correct
    "d) The ability to think like a computer"
];

var answerBank2 = [
    "a) class = \"class-name\"",
    "b) id = \"id-name\"",
    "c) <style>", // correct
    "d) var variableName"
];

var answerBank3 = [
    "TRUE", //correct
    "FALSE"
];

var answerBank4 = [
    "a) Cascading Stylesheet", //correct
    "b) Computer Science Stylesheet",
    "c) Computer Stylesheet",
    "d) Computer Science System"
];

var answerBank5 = [
    "a) #class-name",
    "b) .class-name", // correct
    "c) class-name",
    "d) \"class name\""
];

var answerBank6 = [
    "a) var varName",
    "b) let varName",
    "c) var --varName",
    "d) var(--varName)" //correct
];

var answerBank7 = [
    "a) To add style to a webpage",
    "b) To add content like text and pictures to a webpage",
    "c) To make the webpage look more professional",
    "d) To make a webpage dynamic and user-friendly" // correct
];

var answerBank8 = [
    "a) jQuery generally uses fewer lines of code than vanilla JavaScript", // correct
    "b) jQuery can easily select certain elements on a webpage's DOM",
    "c) jQuery allows the user to interact with a dynamic webpage",
    "d) jQuery and vanilla JavaScript are the same"
];


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
var answerBank = [
    answerBank1,
    answerBank2,
    answerBank3,
    answerBank4,
    answerBank5,
    answerBank6,
    answerBank7,
    answerBank8,
];

function showQuestion(i){
    // Display question
    cardHeaderEl.innerHTML = questionBank[i];
    cardDescriptEl.innerHTML= ''
    cardDescriptEl.setAttribute("style", "flex-direction: column");
    var answerBankLocal = answerBank[i];

    // Display answer choices
    for(j=0; j < answerBtn.length; j++){
       answerBtn[j].classList.remove("hide");
       answerBtn[j].innerHTML = answerBankLocal[j]; 
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
