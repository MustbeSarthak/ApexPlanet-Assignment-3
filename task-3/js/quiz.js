const questions = [
  {
    question: "Which HTML element is used for the largest heading?",
    answers: ["<heading>", "<h6>", "<h1>", "<head>"],
    correctAnswer: 2
  },
  {
    question: "Which CSS property changes text color?",
    answers: ["font-style", "color", "text-decoration", "background"],
    correctAnswer: 1
  },
  {
    question: "Which JavaScript keyword declares a block-scoped constant?",
    answers: ["var", "let", "const", "static"],
    correctAnswer: 2
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Styling Syntax",
      "Colorful Style System"
    ],
    correctAnswer: 1
  },
  {
    question: "Which HTML attribute provides alternative text for an image?",
    answers: ["title", "src", "alt", "description"],
    correctAnswer: 2
  },
  {
    question: "Which method converts a JSON string into a JavaScript value?",
    answers: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.read()"],
    correctAnswer: 0
  },
  {
    question: "Which CSS layout system is designed for one-dimensional layouts?",
    answers: ["Grid", "Flexbox", "Float", "Position"],
    correctAnswer: 1
  },
  {
    question: "Which event fires when a form is submitted?",
    answers: ["click", "change", "submit", "input"],
    correctAnswer: 2
  }
];

const progress = document.querySelector("#progress");
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");
const scoreElement = document.querySelector("#score");
const scoreMessage = document.querySelector("#score-message");

let currentQuestion = 0;
let score = 0;

function renderQuestion() {
  const item = questions[currentQuestion];
  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionElement.textContent = item.question;
  answersElement.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.classList.add("hidden");

  item.answers.forEach((answer, answerIndex) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(answerIndex));
    listItem.append(button);
    answersElement.append(listItem);
  });
}

function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestion].correctAnswer;
  const answerButtons = answersElement.querySelectorAll("button");
  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === correctIndex) {
    score += 1;
    feedback.textContent = "Correct!";
    feedback.classList.add("success");
  } else {
    answerButtons[selectedIndex].classList.add("incorrect");
    feedback.textContent = `Not quite. The correct answer is ${questions[currentQuestion].answers[correctIndex]}.`;
    feedback.classList.add("error");
  }

  nextButton.classList.remove("hidden");
  nextButton.focus();
}

function showResults() {
  quizView.classList.add("hidden");
  resultView.classList.remove("hidden");
  scoreElement.textContent = `You scored ${score} out of ${questions.length}.`;
  scoreMessage.textContent = score === questions.length
    ? "Excellent work!"
    : score >= questions.length / 2
      ? "Good job — keep practicing!"
      : "Keep learning and try again!";
  restartButton.focus();
}

function showNextQuestion() {
  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    showResults();
    return;
  }
  renderQuestion();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizView.classList.remove("hidden");
  resultView.classList.add("hidden");
  renderQuestion();
}

nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);
renderQuestion();
