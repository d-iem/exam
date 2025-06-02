let question_file = "json/question.json"

let quizData = [];

fetch(question_file)
  .then(response => response.json())
  .then(data => {
    quizData = data;
    document.getElementById("start-btn").disabled = false;
    console.log("Questions loaded successfully.");
  })
  .catch(error => {
    console.error("Error loading questions:", error);
    alert("Failed to load questions. Please check your JSON file or server path.");
  });


  function startQuiz() {
  if (quizData.length === 0) {
    alert("Quiz data not loaded yet!");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
  startTimer();
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById("question").textContent = q.question;

    // Show Question number (1-based index)
    document.getElementById("question-number").textContent =
        `Question ${currentQuestion + 1} of ${quizData.length}`;

    const optionsList = document.getElementById("options");
    optionsList.innerHTML = "";

    q.options.forEach(option => {
        const li = document.createElement("li");
        li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${option}"/> ${option}
      </label>
    `;
        optionsList.appendChild(li);
    });

    document.getElementById("result").textContent = "";
}

function startTimer() {
    timerInterval = setInterval(() => {
        totalSeconds++;
        document.getElementById("timer").textContent = `Time: ${formatTime(totalSeconds)}`;
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function submitAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        alert("Please select an option!");
        return;
    }

    const answer = selected.value;
    if (answer === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById("quiz").innerHTML = `
      <h2>You scored ${score} out of ${quizData.length}</h2>
      <button onclick="logoutUser()">Logout</button>
      `;
      clearInterval(timerInterval);
    }
}


let currentQuestion = 0;
let score = 0;
let totalSeconds = 0;
let timerInterval;  
document.getElementById("start-btn").addEventListener("click", startQuiz);

document.body.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, { passive: false });

