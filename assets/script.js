// Create question and answer banks
var questions = [
    {
        question: "What is computational thinking?",
        choices: ["a) Writing code from scratch",
                "b) Practicing computer science skills daily",
                "c) Being able to break down a problem into smaller steps", // correct
                "d) The ability to think like a computer"],
        answer: "c) Being able to break down a problem into smaller steps"
    },
    {
        question: "Which of the following is an example of an HTML tag?",
        choices: ["a) class = \"class-name\"",
                "b) id = \"id-name\"",
                "c) <style>", // correct
                "d) var variableName"],
        answer: "c) <style>"
    },
    {
        question: "True or False: Classes and IDs are examples of HTML attributes",
        choices: ["TRUE", //correct
                "FALSE"],
        answer: "TRUE"
    },
    {
        question: "What does CSS stand for?",
        choices: ["a) Cascading Stylesheet", //correct
                    "b) Computer Science Stylesheet",
                    "c) Computer Stylesheet",
                    "d) Computer Science System"],
        answer: "a) Cascading Stylesheet"
    },
    {
        question: "What is the proper way to identify a class using CSS?",
        choices: ["a) #class-name",
                "b) .class-name", // correct
                "c) class-name",
                "d) \"class name\""],
        answer: "b) .class-name",
    },
    {
        question: "How do you call a variable in CSS?",
        choices: ["a) var varName",
                "b) let varName",
                "c) var --varName",
                "d) var(--varName)"], //correct
        answer: "d) var(--varName)"
    },
    {
        question: "What is the primary purpose of using JavaScript?",
        choices: ["a) To add style to a webpage",
                "b) To add content like text and pictures to a webpage",
                "c) To make the webpage look more professional",
                "d) To make a webpage dynamic and user-friendly"], // correct
        answer:  "d) To make a webpage dynamic and user-friendly"
    },
    {
        question: "What is the difference between jQuery and vanilla JavaScript?",
        choices: ["a) jQuery generally uses fewer lines of code than vanilla JavaScript", // correct
                "b) jQuery can easily select certain elements on a webpage's DOM",
                "c) jQuery allows the user to interact with a dynamic webpage",
                "d) jQuery and vanilla JavaScript are the same"],
        answer: "a) jQuery generally uses fewer lines of code than vanilla JavaScript"
    }
]

// Create global variables
var secondsLeft = 60;
var score = 0; 
var i=0;

var timeEl = document.querySelector("#timer");
var cardHeaderEl = document.getElementById("card-header");
var cardDescriptEl=document.getElementById("card-description");
var startBtn = document.getElementById("startButton");
var footer = document.getElementById("footer");
var timerInterval;
var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // fill array with local storage or empty array
console.log(highScores);

// Call beginning functions
beginningCard();
startBtn.addEventListener("click", startQuiz);

// Create first card
function beginningCard(){
    cardHeaderEl.innerHTML = "Coding Quiz Challenge";
    cardDescriptEl.innerHTML = "Try to answer the following questions before the time runs out.  Each time you answer incorrectly, the timer will deduct 15 seconds."
    startBtn.innerHTML = "Start Quiz";
}

// Run the quiz when start button pushed
function startQuiz(){
    startBtn.setAttribute("style", "display:none");
    // set the timer and show the question
    setTimer();
    showQuestion();  
}

// Create Question Cards
function showQuestion(){
    // Display question
    cardHeaderEl.innerHTML = questions[i].question;
    cardDescriptEl.innerHTML= ''

    // create a container to hold all the buttons
    var buttonBox = document.getElementById("button-box"); // will link upcoming commands to parent container
    buttonBox.innerHTML = "";
    questions[i].choices.forEach(function(choice){ // call everything here choice instead of choices[i]
        // create a button for each answer choice and assign class and value
        var choiceButton = document.createElement("button");
        choiceButton.className="button-choice";
        choiceButton.setAttribute("value", choice);
        // fill each button with answer choice and append to parent container
        choiceButton.textContent = choice;
        buttonBox.appendChild(choiceButton); 
        // calls evaluationAnswer function each time clicked ("this" means one we clicked on)
        choiceButton.onclick=evaluateAnswer; 
    })
}
function evaluateAnswer(){
    // Evaluate whether answer choice is correct or incorrect
    if(this.value !== questions[i].answer){ // "this" means the one we're on
        incorrect();
    } else {
        correct();
    }
    i++;
    if(i===questions.length || secondsLeft === 0){
        endGame();
    } else {
        showQuestion(); // only runs if we still have questions
    }
}

// If answer choice is incorrect, display a footer and subtract 15 seconds from the time
function incorrect(){
    footer.innerHTML = "Incorrect!"
    document.querySelector("footer").setAttribute("style", "display:flex")
    if (secondsLeft >= 15){
        secondsLeft = secondsLeft-15;
    }else{
        secondsLeft = 0;
        timeEl.textContent = secondsLeft;
        clearInterval(timerInterval);
        endGame();
    }
}

// If answer choice is correct, display a footer and add 1 point to the score
function correct(){
    footer.innerHTML = "Correct!"
    document.querySelector("footer").setAttribute("style", "display:flex")
    score++
}

// If time reaches 0 or we run out of time, end the game
function endGame(){
    // stop timer and find final score
    clearInterval(timerInterval);
    var finalScore = score * secondsLeft;

    // Display final score and hide choice buttons and footer
    cardHeaderEl.innerHTML = "All done!";
    cardDescriptEl.innerHTML= "Your final score is " + finalScore;
    document.getElementById("button-box").setAttribute("style", "display:none");
    document.querySelector("footer").setAttribute("style", "display:none")

    // collect initials
    var initials = collectInitials();

    // create object storing initials and score
    var scoreObj = {
        initials: initials,
        finalScore: finalScore
    }
    // Store initials and high scores into the high scores object and sort high to low
    highScores.push(scoreObj);
    highScores.sort(function(a,b){
        return b.finalScore - a.finalScore; // this will sort high to low (descending)
    })
    // Store data into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function collectInitials(){
    // select and create elements
    var formEl = document.getElementById("form");
    var formInitials = document.createElement("input");
    var submit = document.createElement("button");
    
    // prompt user to enter initials
    formEl.innerHTML = "Enter your initials";
    
    // append elements to form and set attributes
    formEl.appendChild(formInitials);
    formEl.appendChild(submit);
    formInitials.setAttribute("type", "text");
    formInitials.setAttribute("value", "");
    submit.innerHTML = "Submit"

    // show form
    formEl.setAttribute("style", "display:flex");
    
    // return user input
    var initials = formInitials.value; 
    console.log(initials);
    return initials;
}

// Create timer
function setTimer(){
    timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft === 0){
            clearInterval(timerInterval);
        }
    }, 1000);
}
