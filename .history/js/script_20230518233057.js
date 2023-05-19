const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const restartGame = () =>{
    document.addEventListener('keydown', (event) => {
        if (event.code){
            restartGame();
        }

    restartMessage.style.display = 'none';
    pipe.style.animation = '';
    pipe.style.left = '';

    mario.style.animation = '';
    mario.style.bottom = '';
    mario.src = './CSS/imagens/mario.gif';
    mario.style.width = '';
    mario.style.marginLeft = '';
    startGame();

    
}


});

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

        //exibe a mensagem de reinicio e aguarda a tecla ser pressionada
        const restartMessage = document.getElementById('restart-message');
        restartMessage.style.display = 'block';

        document.addEventListener('keydown', restartGame);
        
    }
    
    
}
    
const startGame = () => {
    loop = setInterval(checkCollision, 10);
}


document.addEventListener('keydown', jump);

startGame();