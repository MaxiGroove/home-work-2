let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let scoreBlock = document.querySelector('.score-count');
let modal = document.querySelector('#modal');
let restartBtn = document.querySelector('#modal-btn');

let box = 16;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 24 + 1) * box,
};

let snake = [];

snake[0] = {
    x: 10 * box,
    y: 12 * box,
};

document.addEventListener('keydown', keyPush);

let key;

function keyPush(e) {
    if(e.keyCode == 37 && key != 'right')  {
        key = 'left';
    } else if (e.keyCode == 38 && key != 'down') {
        key = 'up';
    } else if (e.keyCode == 39 && key != 'left') {
        key = 'right';
    } else if (e.keyCode == 40 && key != 'up') {
        key = 'down';
    }
}

function tail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if( head.x == arr[i].x && head.y == arr[i].y) {
            looseGame();
            clearInterval(game);
        }
    }
}

function drawGame() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i ==0 ? "lime" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) { 
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 24 + 1) * box,
        };
        inScore();
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 20 || snakeY < box || snakeY > box * 25) {
        looseGame();
        clearInterval(game);
    }

    if(key == 'left') snakeX -= box;
    if(key == 'right') snakeX += box;
    if(key == 'up') snakeY -= box;
    if(key == 'down') snakeY += box;

    let newSnake = {
        x: snakeX,
        y: snakeY
    };

    tail(newSnake, snake);

    snake.unshift(newSnake);   
}

function looseGame() {
    modal.style.display = 'flex';
}

restartBtn.addEventListener('click', refreshGame);

function refreshGame() {
    modal.style.display = 'none';
    score = 0;
    drawScore();

    snake[0] = {
        x: 10 * box,
        y: 12 * box,
    };

    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 24 + 1) * box,
    };
}

function inScore() {
    score++;
    drawScore();
}

function drawScore() {
    scoreBlock.innerHTML = score;
}
drawScore();

let game = setInterval(drawGame, 100);