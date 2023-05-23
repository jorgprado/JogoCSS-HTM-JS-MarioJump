const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay');
const scoreElement = document.getElementById('score');
const restartMessage = document.getElementById('restart-message');
let pipeScore = 0;
let gameScore = 0;
let isPipePassed = false;
let isCollision = false;
let isSpaceHeld = false;

const updateScore = () => {
  scoreElement.textContent = `score ${pipeScore}`;
};

const incrementGameScore = () => {
  if (!isCollision) {
    gameScore += 1;
  }
  updateScore();
};

const incrementPipeScore = () => {
  pipeScore += 5;
  isPipePassed = true;
  updateScore();
};

const jump = (event) => {
  if (event.keyCode === 32 ) {
    mario.classList.add('jump');

    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition >= 80) {
  }
};

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

    clearInterval(loop);

    gameOver();
    isCollision = true;
  } else if (pipePosition <= 0 && marioPosition >= 80 && !isPipePassed) {
    incrementPipeScore();
  } else {
    isPipePassed = false;
    isCollision = false;
  }
};

document.addEventListener('keydown', jump);

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 32) {
    isSpaceHeld = false;
  }
});

const gameOver = () => {
  overlay.style.display = 'block';
  restartMessage.style.display = 'block';
  document.addEventListener('keydown', restartGame);
};

const restartGame = (event) => {
  if (event.keyCode === 88) {
    restartMessage.style.display = 'none';
    overlay.style.display = 'none';
    pipe.style.animation = '';
    pipe.style.left = '';
    mario.style.animation = '';
    mario.style.bottom = '';
    mario.src = './CSS/imagens/mario.gif';
    mario.style.width = '';
    mario.style.marginLeft = '';
    pipeScore = 0;
    gameScore = 0;
    isPipePassed = false;
    updateScore();
    document.removeEventListener('keydown', restartGame);
    startGame();
  }
};

const startGame = () => {
  setInterval(incrementGameScore, 1000);
  gameScore = 0;
  pipeScore = 0;
  updateScore();
  loop = setInterval(checkCollision, 10);
};

startGame();