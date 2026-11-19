
// Generate a random number between 1 and 100
let secretNumber;

let attempts = 0;
let score = 0;
let maxAttempts = 10;
let gameOver = false;

let guessHistory = [];

// Get HTML elements
const guessInput = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.getElementById("bestScore");
const remainingDisplay = document.getElementById("remaining");
const historyDisplay = document.getElementById("history");
const guessButton = document.getElementById("guessBtn");

// Load best score from localStorage
let bestScore = Number(localStorage.getItem("bestScore")) || 0;

bestScoreDisplay.textContent = bestScore;

// Start a new game
function startGame() {

    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;
    score = 0;
    gameOver = false;
    guessHistory = [];

    attemptsDisplay.textContent = attempts;
    scoreDisplay.textContent = score;

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;

    feedback.textContent = "🤔 Enter your first guess!";
    feedback.className = "feedback";

    remainingDisplay.textContent = "You have 10 attempts.";

    historyDisplay.textContent = "No guesses yet.";

    console.log("New game started!");
}

// Check the user's guess
function checkGuess() {

    if (gameOver) {
        return;
    }

    const userGuess = Number(guessInput.value);

    // Validate input
    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(userGuess) ||
        userGuess < 1 ||
        userGuess > 100
    ) {

        feedback.textContent =
            "⚠️ Please enter a valid whole number between 1 and 100.";

        feedback.className = "feedback wrong";
        return;
    }

    // Prevent duplicate guesses
    if (guessHistory.includes(userGuess)) {

        feedback.textContent =
            "🔁 You already guessed that number. Try another!";

        feedback.className = "feedback wrong";
        return;
    }

    attempts++;

    guessHistory.push(userGuess);

    attemptsDisplay.textContent = attempts;

    // Display guess history
    updateHistory();

    // Check if the guess is correct
    if (userGuess === secretNumber) {

        gameOver = true;

        score = (maxAttempts - attempts + 1) * 10;

        scoreDisplay.textContent = score;

        feedback.textContent =
            "🎉 Congratulations! You guessed the correct number!";

        feedback.className = "feedback correct";

        // Update high score
        if (score > bestScore) {

            bestScore = score;

            localStorage.setItem("bestScore", bestScore);

            bestScoreDisplay.textContent = bestScore;

            feedback.textContent += " 🏆 New High Score!";
        }

        remainingDisplay.textContent =
            "You won in " + attempts + " attempts!";

        endGame();

    }

    // Guess is too low
    else if (userGuess < secretNumber) {

        feedback.textContent =
            "⬆️ Too Low! Try a HIGHER number.";

        feedback.className = "feedback wrong";

        updateRemaining();
    }

    // Guess is too high
    else {

        feedback.textContent =
            "⬇️ Too High! Try a LOWER number.";

        feedback.className = "feedback wrong";

        updateRemaining();
    }

    guessInput.value = "";
}

// Update remaining attempts
function updateRemaining() {

    let remaining = maxAttempts - attempts;

    if (remaining > 0) {

        remainingDisplay.textContent =
            "You have " + remaining + " attempts remaining.";

    } else {

        gameOver = true;

        feedback.textContent =
            "😢 Game Over! The correct number was " + secretNumber;

        feedback.className = "feedback wrong";

        remainingDisplay.textContent =
            "No attempts remaining. Try again!";

        endGame();
    }
}

// Update guess history
function updateHistory() {

    historyDisplay.innerHTML = "";

    guessHistory.forEach(function(guess) {

        const item = document.createElement("span");

        item.className = "history-item";

        item.textContent = guess;

        historyDisplay.appendChild(item);

    });
}

// End the game
function endGame() {

    guessInput.disabled = true;

    guessButton.disabled = true;

}

// Restart the game
function restartGame() {

    startGame();

}

// Allow Enter key to submit guess
guessInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        checkGuess();

    }

});

// Initialize game when page loads
startGame();
