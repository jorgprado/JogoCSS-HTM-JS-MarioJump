const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay');
const scoreElement = document.getElementById('score');
var restartMessage = document.getElementById('restart-message');



const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

// restart no game, sempre que o usuario perder o jogo
const restartGame = (event) =>{

    if (event.keyCode === 88){ // codigo da tecla X no teclado numero
        // reseta toda animacao e oculta o overlay com modal
        restartMessage.style.display = 'none'
        overlay.style.display = 'none';
        pipe.style.animation = '';
        pipe.style.left = '';
        mario.style.animation = '';
        mario.style.bottom = '';
        mario.src = './CSS/imagens/mario.gif';
        mario.style.width = '';
        mario.style.marginLeft = '';
        // retirando o escutador de evento (no caso da tecla X)
        document.removeEventListener('keydown', restartGame);
        startGame();

        
    }
}


// verificacao se o Mario colide com o tubo
const checkCollision = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    if(!isPipePassed && pipePosition <= 0){
        isPipePassed = true;
        score
    }
    //verificacao caso o jogador nao consiga pular o tubo
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './CSS/imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        score = 0;
        
        clearInterval(loop);
        
        gameOver();
      
    //verificacao caso o jogador consiga pular o tubo  
    } else if (marioPosition >= 80){
        score += 1;
        updateScore();
    }
    
    
}
// a funcao e ativada quando o boneco colide com o tubo
function gameOver(){
    //chamada de modal com msg e overlay
    overlay.style.display = 'block';
    restartMessage.style.display = 'block';
    document.addEventListener('keydown', restartGame);
}
    
const startGame = () => {
    loop = setInterval(checkCollision, 10);
}

// ouvidor de click quando uma tecla é pressionada o Mario Pula
document.addEventListener('keydown', jump);

startGame();

//pontuacao
let score = 0;
const updateScore = () => {
    scoreElement.textContent = `Pontuacao: ${score}`;
};