const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "In which country is the national animal the Kouprey?",
    choice1: "Botswana",
    choice2: "Argentina",
    choice3: "United Arab Emirates",
    choice4: "Cambodia",
    answer: 4
  },
  {
    question: "Where is Liechenstein located?",
    choice1: "Between France and Switzerland",
    choice2: "Between Germany and Austria",
    choice3: "Between Switzerland and Austria",
    choice4: "In the Balkans",
    answer: 3
  },
  {
    question: "Where is the Okavango Delta located?",
    choice1: "Botswana",
    choice2: "It's not called the Okavango Delta, it's called the Okanagan Delta",
    choice3: "Algeria",
    choice4: "United Arab Emirates",
    answer: 1
  },
  {
    question: "What country is known for its barbeque?",
    choice1: "Argentina",
    choice2: "Algeria",
    choice3: "Japan",
    choice4: "Cambodia",
    answer: 1
  },
  {
    question: "What is the lucky number in Cambodia?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3
  },
  {
    question: "What is the tallest building the world called?",
    choice1: "Warisan Merdeka",
    choice2: "Burj Khalifa",
    choice3: "Makkah Royal",
    choice4: "Lakhta",
    answer: 2
  },
  {
    question: "What is a national animal of Japan?",
    choice1: "Red Fox",
    choice2: "Sika Deer",
    choice3: "Sakhalin Fox",
    choice4: "Green Pheasant",
    answer: 4
  },
  {
    question: "What is the largest country in Africa?",
    choice1: "Morroco",
    choice2: "Egypt",
    choice3: "Chad",
    choice4: "Algeria",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();