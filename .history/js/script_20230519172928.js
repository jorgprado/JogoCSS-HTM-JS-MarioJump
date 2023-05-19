const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

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
        var restartMessage = document.getElementById('restart-message');
        restartMessage.style.display = 'none'
        overlay.style.display = 'none';
        pipe.style.animation = '';
        pipe.style.left = '';
        mario.style.animation = '';
        mario.style.bottom = '';
        mario.src = './CSS/imagens/mario.gif';
        mario.style.width = '';
        mario.style.marginLeft = '';

        document.removeEventListener('keydown', restartGame);
        startGame();

        
    }
}


const checkCollision = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './CSS/imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        
        clearInterval(loop);
        
        gameOver();
        
    }
    
    
}

function gameOver(){
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    var restartMessage = document.getElementById('restart-message');
    restartMessage.style.display = 'block';

    document.addEventListener('keydown', restartGame);
}
    
const startGame = () => {
    loop = setInterval(checkCollision, 10);
}


document.addEventListener('keydown', jump);

startGame();