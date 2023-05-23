const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay');
const scoreElement = document.getElementById('score');
var restartMessage = document.getElementById('restart-message');
let currentScore = 0;
let isPipePassed = false;
let gameTime = 0;
let gameInterval;
let isGameOver = false;

//pontuacao
function updateScore() {
  if (!isGameOver) {
    scoreElement.textContent = `score ${currentScore}`;
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

// verificacao da posicao do mario
const checkCollision = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  //verificacao caso o jogador nao consiga pular o tubo
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
  } else if (pipePosition <= 0) { //caso o mario pule o tudo adicao de pontuacao +1 por segundo
    if (!isPipePassed && !isGameOver) {
      currentScore++;
      updateScore();
      isPipePassed = true;
    }
  } else {
    isPipePassed = false;
  }
}

function gameOver() {
  //chamada de modal com msg e overlay
  overlay.style.display = 'block';
  restartMessage.style.display = 'block';
  document.addEventListener('keydown', restartGame);
}

// restart no game, sempre que o usuario perder o jogo
const restartGame = (event) => {
  if (event.keyCode === 88) { // codigo da tecla X no teclado numero
    // reseta toda animacao, score e oculta o overlay com modal
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
    // retirando o escutador de evento (no caso da tecla X)
    document.removeEventListener('keydown', restartGame);
    startGame();
  }
}

function startGame() {
  currentScore = 0;
  gameTime = 0;
  isGameOver = false;

  gameInterval = setInterval(() => {
    gameTime++;
    updateScore();
  }, 1000);

  loop = setInterval(checkCollision, 10);
}

// ouvidor de click quando uma tecla é pressionada o Mario Pula
document.addEventListener('keydown', jump);

startGame();