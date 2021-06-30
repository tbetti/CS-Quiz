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
var answerBtn = document.querySelectorAll("#answer-choice")
var timerInterval;
var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // fill array with local storage or empty array
console.log(highScores);

// Call functions
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
    // set the timer
    setTimer();
    showQuestion();
    // while (secondsLeft > 0 || i > questionBank.length){
    //     //Display question
    //     userAnswer = showQuestion(i); // does this actually run the function?
    //     // Check if answer is correct
    //     if (userAnswer !== answer[i]){
    //         secondsLeft = secondsLeft - 15;
    //         // add a footer saying "Wrong!"
    //         var footer = document.createElement("footer");
    //         footer.createTextNode("Wrong!");
    //     } else{
    //         // add a footer saying "Correct!"
    //         var footer = document.createElement('footer');
    //         footer.createTextNode("Correct!");
    //         i++
    //     }
        
    //     // Reset
    //     footer.remove();
    // }
    // Add score and high score cards
    // link high score cards to header option    
}

// Create Question Cards
function showQuestion(){
    // Display question
    cardHeaderEl.innerHTML = questions[i].question;
    cardDescriptEl.innerHTML= ''
    // var answerBankLocal = answerBankObject[i]; // read in array of answers that correspond with question

    // // Display answer choices
    // for(j=0; j < answerBtn.length; j++){
    //    answerBtn[j].classList.remove("hide");
    //    answerBtn[j].innerHTML = answerBankLocal[j]; 
    //    console.log(answerBankLocal[j]);
    //    answerBtn[j].setAttribute("value",answerBankLocal[j]);
    //    answerBtn[j].onclick = 
    // }   
    var buttonBox = document.getElementById("button-box");
    buttonBox.innerHTML = "";
    questions[i].choices.forEach(function(choice){ // call everything here choice instead of choices[i]
        var choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.setAttribute("value", choice);
        choiceButton.onclick=evaluateAnswer; // calls evaluationAnswer each time clicked (this means one we clicked on)
        buttonBox.appendChild(choiceButton); // "this" means the one we're on
    })

    // Get answer from user
    // var answerChoice;
    // document.querySelector(".card").addEventListener("click", function(event){
    //     var element = event.target;
    //     if (element.matches("#answer-choice")){
    //         answerChoice = element.dataset.id; // select data-id???
    //     }
    // });

    // // Return user answer as array at [i]
    // return answerChoice; // maybe this can just be a value that changes each time instead of an array??
}
function evaluateAnswer(){
    if(this.value !== questions[i].answer){
        console.log("wrong");
        // possible function called wrong
    } else {
        console.log("correct");
        score++;
        // possible function called correct
    }
    i++;
    if(i===questions.length){
        endGame();
    } else {
        showQuestion(); // only runs if we still have questions
    }
}

function endGame(){
    // grab secondsLeft
    clearInterval(timerInterval);
    var initials = "TB"; 
    var scoreObj = {
        initials: initials,
        finalScore: score * secondsLeft
    }
    highScores.push(scoreObj);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScores.sort(function(a,b){
        return b.finalScore - a.finalScore; // this will sort high to low (descending)
    })
    console.log(secondsLeft);
    console.log(scoreObj);
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
