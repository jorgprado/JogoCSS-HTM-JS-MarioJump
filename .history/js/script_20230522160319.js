const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay');
const scoreElement = document.getElementById('score');
const restartMessage = document.getElementById('restart-message');

let currentScore = 0;
let gameScore = 0;
let isPipePassed = false;
let collisionCheckInterval;

// Atualiza o elemento de pontuação
const updateScore = () => {
  const totalScore = currentScore + gameScore;
  scoreElement.textContent = `score ${totalScore}`;
};

// Executa o pulo do Mario
const jump = (event) => {
  const spaceBarKey = " ";
  if (event.key === spaceBarKey) {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
};

// Verifica a colisão do Mario com o tubo
const checkCollision = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 0 && !isPipePassed) {
    currentScore += 5;
    isPipePassed = true;
    updateScore();
  } else if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    gameOver();
  } else {
    isPipePassed = false;
  }
};

// Função de fim de jogo
const gameOver = () => {
  pipe.style.animation = 'none';
  pipe.style.left = `${pipePosition}px`;
  mario.style.animation = 'none';
  mario.style.bottom = `${marioPosition}px`;
  mario.src = './CSS/imagens/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';
  clearInterval(collisionCheckInterval);
  overlay.style.display = 'block';
  restartMessage.style.display = 'block';
  document.removeEventListener('keydown', jump);
  document.removeEventListener('keydown', restartGame);
};

// Reinicia o jogo
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
    document.removeEventListener('keydown', restartGame);
    startGame();
  }
};

const incrementTimeScore = () => {
  gameScore += 1;
  updateScore();
};

// Inicia o jogo
const startGame = () => {
  collisionCheckInterval = setInterval(checkCollision, 10);
  document.addEventListener('keydown', jump);
  document.addEventListener('keydown', restartGame);
  setInterval(incrementTimeScore, 1000);
};

startGame();
