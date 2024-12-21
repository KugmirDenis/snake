const gameBoard = document.querySelector('.board-game');
const scoreElement = document.querySelector('.score');
const recordScoreElement = document.querySelector('.record-score');
const controls = document.querySelectorAll('.controls')

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let snakeXX = 5, snakeYY = 6;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem('record-score') || 0;
recordScoreElement.innerText = `Рекорд:`;

const updateFoodPosition = () => {
    do {
        foodX = Math.floor(Math.random() * 10) + 1;
        foodY = Math.floor(Math.random() * 10) + 1;
    } while (snakeBody.some(segment => segment[0] === foodX && segment[1] === foodY));
};

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert('Game Over! Press OK to play.')
    location.reload();
}

const changeDirection = e => {
    if(e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
    }else if(e.key === 'ArrowDown' && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
    }else if(e.key === 'ArrowLeft' && velocityX != 1){
    velocityX = -1;
    velocityY = 0;        
    }else if(e.key === 'ArrowRight' && velocityX != -1){
    velocityX = 1;
    velocityY = 0;    
    }
}

controls.forEach(button => button.addEventListener('click', 
    () => changeDirection({key:button.CDATA_SECTION_NODE.key})));

    const initGame = () => {
        if(gameOver) return handleGameOver;
        let html = `<div class = 'food' style = 'grid-area:${foodY}/${foodX}'></div>`;
        if(snakeX === foodX && snakeY === foodY){
            updateFoodPosition();
            snakeBody.push([foodY, foodX]);
            score++;
            highScore = score >= highScore ? score: highScore;
            localStorage.setItem('record-score', highScore);
            scoreElement.innerText = `Очки: ${score}`;
            recordScoreElement.innerText = `Рекорд: ${highScore}`
        }
        snakeX += velocityX;
        snakeY += velocityY;
        if (snakeX < 1) snakeX = 10;
        else if (snakeX > 10) snakeX = 1;
    
        if (snakeY < 1) snakeY = 10;
        else if (snakeY > 10) snakeY = 1;


    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }
    snakeBody[0] = [snakeX, snakeY];

    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1] && i !== 0) {
            handleGameOver();
        }
    }

    
    snakeBody.forEach(segment => {
        html += `<div class="head" style="grid-area: ${segment[1]} / ${segment[0]};"></div>`;
    });

    gameBoard.innerHTML = html;
    }
    updateFoodPosition();
    setIntervalId = setInterval(initGame, 100);
    document.addEventListener('keyup', changeDirection)