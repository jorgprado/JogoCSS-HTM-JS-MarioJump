const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay');
const scoreElement = document.getElementById('score');
var restartMessage = document.getElementById('restart-message');
let currentScore = 0;
let isPipePassed = false;
let isGameOver = false;
let gameInterval;
let speed = 1;
let incrementSpeed = 0.1;
let speedIncreaseThreshold = 500;

// Atualiza o score
function updateScore() {
  if (!isGameOver) {
    currentScore++;
    scoreElement.textContent = `score ${currentScore}`;

    if(currentScore % speedIncreaseThreshold === 0){
      speed += incrementSpeed;
    }
  }
}

const jump = (event) => {
  if (event.keyCode === 32) {
    mario.classList.add('jump');

    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
}

// Verifica a colisão do mario com o tubo
const checkCollision = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './CSS/imagens/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(gameInterval);
    clearInterval(loop);

    isGameOver = true;
    gameOver();
  } else if (pipePosition <= 0) {
    if (!isPipePassed && !isGameOver) {
      isPipePassed = true;
    }
  } else {
    isPipePassed = false;
  }
}

function gameOver() {
  overlay.style.display = 'block';
  restartMessage.style.display = 'block';
  document.addEventListener('keydown', restartGame);
}

const restartGame = (event) => {
  if (event.keyCode === 88) {
    restartMessage.style.display = 'none'
    overlay.style.display = 'none';
    pipe.style.animation = '';
    pipe.style.left = '';
    mario.style.animation = '';
    mario.style.bottom = '';
    mario.src = './CSS/imagens/mario.gif';
    mario.style.width = '';
    mario.style.marginLeft = '';
    score = currentScore;
    currentScore = 0;
    isPipePassed = false;
    updateScore();
    document.removeEventListener('keydown', restartGame);
    startGame();
  }
}

function startGame() {
  currentScore = 0;
  isGameOver = false;
  speed

  gameInterval = setInterval(() => {
    updateScore();
  }, 100);

  loop = setInterval(checkCollision, 10);
}

document.addEventListener('keydown', jump);

startGame();
