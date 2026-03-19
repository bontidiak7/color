const colors = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;
let isPlaying = false;
let isShowingSequence = false;

const startBtn = document.getElementById('start-btn');
const levelDisplay = document.getElementById('level-display');
const message = document.getElementById('message');
const colorElements = colors.map(color => document.getElementById(color));

startBtn.addEventListener('click', startGame);

colorElements.forEach(element => {
    element.addEventListener('click', () => playerClick(element.id));
});

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    isPlaying = true;
    message.textContent = '';
    startBtn.disabled = true;
    nextLevel();
}

function nextLevel() {
    level++;
    levelDisplay.textContent = `Szint: ${level}`;
    playerSequence = [];
    generateSequence();
    showSequence();
}

function generateSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

function showSequence() {
    isShowingSequence = true;
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            isShowingSequence = false;
            return;
        }
        flashColor(sequence[i]);
        i++;
    }, 1000);
}

function flashColor(color) {
    const element = document.getElementById(color);
    element.classList.add('active');
    setTimeout(() => {
        element.classList.remove('active');
    }, 500);
}

function playerClick(color) {
    if (!isPlaying || isShowingSequence) return;
    playerSequence.push(color);
    flashColor(color);
    if (playerSequence.length === sequence.length) {
        checkSequence();
    }
}

function checkSequence() {
    for (let i = 0; i < sequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            endGame();
            return;
        }
    }
    setTimeout(nextLevel, 1000);
}

function endGame() {
    isPlaying = false;
    message.textContent = `Hiba! Elért szint: ${level}`;
    startBtn.disabled = false;
}
