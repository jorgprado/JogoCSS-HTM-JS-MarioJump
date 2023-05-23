const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay');
const scoreElement = document.getElementById('score');
const restartMessage = document.getElementById('restart-message');

let currentScore = 0;
let gameScore = 0;
let isPipePassed = false;
let isJumping = false;
let loop;
let startTime;

const updateScore = () => {
  const totalScore = currentScore + gameScore;
  scoreElement.textContent = `score ${totalScore}`;
};

const jump = (event) => {
  const spaceBarKey = " ";
  if (event.key === spaceBarKey && ) {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);

    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const pipePosition = pipe.offsetLeft;

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
      gameOver();
    } else if(pipePosition <= 0 && !isPipePassed){
      currentScore += 5;
      isPipePassed = true;
      updateScore();
    }
  }
};

const checkCollision = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 0 && !isPipePassed) {
    isPipePassed = true;
    updateScore();
  } else if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    gameOver();
  } else {
    isPipePassed = false;
  }
};

const gameOver = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  pipe.style.animation = 'none';
  pipe.style.left = `${pipePosition}px`;
  mario.style.animation = 'none';
  mario.style.bottom = `${marioPosition}px`;
  mario.src = './CSS/imagens/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';
  clearInterval(loop);
  overlay.style.display = 'block';
  restartMessage.style.display = 'block';
  document.removeEventListener('keydown', jump);
};

const restartGame = (event) => {
  const xKey = "x";
  if (event.key === xKey.toLowerCase() || event.key === xKey.toUpperCase()) {
    restartMessage.style.display = 'none';
    overlay.style.display = 'none';
    pipe.style.animation = '';
    pipe.style.left = '';
    mario.style.animation = '';
    mario.style.bottom = '';
    mario.src = './CSS/imagens/mario.gif';
    mario.style.width = '';
    mario.style.marginLeft = '';
    currentScore = 0;
    gameScore = 0;
    isPipePassed = false;
    updateScore();
    document.addEventListener('keydown', jump);
    startGame();
  }
};

const incrementTimeScore = () => {
  const currentTime = Date.now();
  const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  gameScore = elapsedTimeInSeconds;
  updateScore();
};

const startGame = () => {
  loop = setInterval(checkCollision, 10);
  document.addEventListener('keydown', jump);
  document.addEventListener('keydown', restartGame);
  startTime = Date.now();
  setInterval(incrementTimeScore, 1000);
};

startGame();