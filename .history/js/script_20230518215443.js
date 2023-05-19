const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval (()=>{

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './CSS/imagens/game-over.png';
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        clearInterval(loop);
    }
}, 10);

function gameOver(){
    // exibir a mensagem de reinicio
    var restartMessage = document.getElementById('restart-message');
    restartMessage.style.display = 'block';

    // aguardar a tecla X ser pressionada para dar reset no game
    document.addEventListener('keydown', restartGame);
}

// Reiniciar o jogo quando a tecla X for assionada
function restartGame(event){
    if (event.keyCode === 88) { // codigo da tecla X no teclado
        // ocultar a mensagem de reiniciar
        var restartmessage = document.getElementByID()
    }
}

document.addEventListener('keydown', jump);