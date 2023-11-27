var questionEl = $('#question-display');
var answerEl = $('#options-display');
var timerCardEl = $('#timer-display');
var resultEl = $('#resultEl')
var score = 0;
let timerCount = 20;
let questionNumber = 0;

let questionArray = [
  {
    question: "How did Spider-Man get his powers?",
    answer: "Bitten with a radioactive spider",
    options: ["Bitten with a radioactive spider", "Born with them", "Military experiment gone awry", "Woke up with them after a strange dream"]
  },
  {
    question: "How many rings are on an Olympic flag?",
    answer: "5",
    options: ["3", "5"]
  },
  {
    question: "How many holes are on a standard bowling ball?",
    answer: "10",
    options: ["2", "3", "5", "10"]
  },
  {
    question: "How many points is the letter X worth in English-language Scrabble?",
    answer: "8",
    options: ["8", "11", "13"]
  }
];

//Start game
function init(){
  renderNextQuestion()
  startTimer(timerCount);
}

function startTimer(timerCount){
  // Sets timer
  timerInterval = setInterval(function() { //important
    timerCount--;
    $('#timer-countdown').text(timerCount); // Tests if time has run out

    if (timerCount === 0) {
      clearInterval(timerInterval); //important
      loseGame();
    }
  }, 1000);
};

function renderQuestion(questionObj) {
  resultEl.text(score);
  answerEl.empty(); 
  questionEl.text(questionObj.question);

  for (var i = 0; i < questionObj.options.length; i++) {
    var button = $('<button></button>')
      .addClass('btn btn-block btn-info')
      .text(questionObj.options[i]);
    answerEl.append(button);
  }

  answerEl.on('click', '.btn', function (event) {
    var answerSelected = $(event.target).text();
    if (answerSelected === questionObj.answer) {
      score++;
    } else {
      // timerCount -= 5; // Adjust timer logic here if needed
    }

    console.log('Score: ' + score);

    if (questionNumber < questionArray.length) {
      renderNextQuestion();
    } else {
      clearInterval(timerInterval);
      alert('Thank you for playing!\nYour final score: ' + score);
      enterHighScore(score);
    }
  });
};

function renderNextQuestion() {
  if (questionNumber < questionArray.length) {
    renderQuestion(questionArray[questionNumber]);
    questionNumber++;
  } else {
    clearInterval(timerInterval);
    alert('Thank you for playing!');
    enterHighScore(score); 
  }
};

//---------------------------------------------------------------------------------

function enterHighScore(score) {
  var name = prompt("Enter your name to secure your place at the big table");

  let highScoresArray = [];

  if (localStorage.getItem('highScores')) {
    highScoresArray = JSON.parse(localStorage.getItem('highScores'));
  }

  highScoresArray.push({ UserName: name, UserScore: score });

  localStorage.setItem('highScores', JSON.stringify(highScoresArray));

  createHighScoreTable();
};

function createHighScoreTable() {
  questionEl.empty();
  answerEl.empty();
  timerCardEl.hide();

  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.sort((a, b) => b.UserScore - a.UserScore);

  var table = $('<table>');

  highScores.forEach(score => {
    let row = $('<tr>');
    let nameEl = $('<td>').text(score.UserName);
    let scoreEl = $('<td>').text(score.UserScore);
    row.append(nameEl, scoreEl);
    table.append(row);
  });

  questionEl.append(table);
};

function loseGame() {
  alert("Thank you for playing!");
  createHighScoreTable();
};


init();
