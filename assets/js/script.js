
//buttons
var btnStartEl = document.querySelector("#start-game");

//questions/answers 
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formName = document.getElementById("name-form")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")


 //assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0



// questions 
var questions = [
  { q: 'How many types of windors does Python use?', 
    a: '3. Two', 
    choices: [{choice: '1. One'}, {choice: '2. Five'}, {choice: '3. Two'}, {choice: '4. Four'}]
  },
  { q: 'What is computer coding?', 
    a: '3. Telling a computer what to do', 
    choices: [{choice: '1. Radio Show'}, {choice: '2. Tv show'}, {choice: '3. Telling a computer what to do'}, {choice: '4. List of functions'}]
  },
  { q: 'Which of these is NOT a programming language?', 
    a: '2. Banana', 
    choices: [{choice: '1. Coding'}, {choice: '2. Banana'}, {choice: '3. Python'}, {choice: '4. java'}]
  },
  { q: 'Which of these is a programming language?', 
    a: '1. Scratch', 
    choices: [{choice: '1. Scratch'}, {choice: '2. Gnaw'}, {choice: '3. Bite'}, {choice: '4. Itch'}]
  },
  { q: 'What are people who write computer code called?', 
    a: '1. Programmers', 
    choices: [{choice: '1. Programmers'}, {choice: '2. Professors'}, {choice: '3. Manufacturers'}, {choice: '4. Crazy people'}]
  },
];


//every second, check if game-over is true, or if there is time left. Start time at 30. 
var setTime = function () {
  timeleft = 75;

var timercheck = setInterval(function() {
  timerEl.innerText = timeleft;
  timeleft--

  if (gameover) {
      clearInterval(timercheck)
  }
 
  if (timeleft < 0) {
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
  }

  }, 1000)
}

var startGame = function() {
  //add classes to show/hide start and quiz screen
  containerStartEl.classList.add('hide');
  containerStartEl.classList.remove('show');
  containerQuestionEl.classList.remove('hide');
  containerQuestionEl.classList.add('show');
  //Shuffle the questions so they show in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

//question for quiz
var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
  while (answerbuttonsEl.firstChild) {
      answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  };
};

//display question 
var displayQuestion = function(index) {
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button')
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add('btn')
      answerbutton.classList.add('answerbtn')
      answerbutton.addEventListener("click", answerCheck)
      answerbuttonsEl.appendChild(answerbutton)
      }
  };
//display correct! on screen
var answerCorrect = function() {
  if (correctEl.className = "hide") {
      correctEl.classList.remove("hide")
      correctEl.classList.add("banner")
      wrongEl.classList.remove("banner")
      wrongEl.classList.add("hide")
      }
  }  
//display wrong! on screen
var answerWrong = function() {
  if (wrongEl.className = "hide") {
      wrongEl.classList.remove("hide")
      wrongEl.classList.add("banner")
      correctEl.classList.remove("banner")
      correctEl.classList.add("hide")
  }
}

//check if answer is correct    
var answerCheck = function(event) {
  var selectedanswer = event.target
      if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
          answerCorrect()
          score = score + 10
      }

      else {
        answerWrong()
        score = score - 1;
        timeleft = timeleft - 5;
    };

  //go to next question, check if there is more questions
    QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          setQuestion()
      }   
      else {
         gameover = "true";
         showScore();
          }
}

  //Display total score screen at end of game
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Final score is " + score + "!");
  containerScoreEl.appendChild(scoreDisplay);
}       

//start game
btnStartEl.addEventListener("click", startGame)
