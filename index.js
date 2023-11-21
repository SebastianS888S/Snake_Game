const gameBoard = document.querySelector('#gameBoard');
const context = gameBoard.getContext('2d');
const scoretext = document.querySelector('#score');

const gameWhidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'fff';
const snakeColor = 'green';
const snakeBorder = 'fff';
const foodColor = 'red';
const unitSize = 25;
const border = 'border-radius: 50%'

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake =[
    {x:unitSize * 4, y:0}, 
    {x:unitSize * 3, y:0}, 
    {x:unitSize * 2, y:0}, 
    {x:unitSize, y:0}, 
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection)
resetBTN.addEventListener("click", resetGame)

gameStart();
createFood();
drawFood();

function gameStart(){
    running = true;
    scoretext.textContent = score;
    createFood();
    drawFood();
    nextClick();
};

function nextClick(){
    if(running){
        setTimeout(()=> {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextClick();
        }, 75)
    }
    else{
        displayGameOver();
    }
};

function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWhidth, gameHeight)
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;

    }
    foodX = randomFood( 0, gameWhidth - unitSize);
    foodY = randomFood( 0, gameWhidth - unitSize);
};

function drawFood(){
    context.fillStyle = foodColor;
    context.strokeStyle = 'black'; 
    context.lineWidth = 1; 
    context.beginPath();
    context.arc(foodX + unitSize / 2, foodY + unitSize / 2, unitSize / 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke(); 
    
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity};

    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoretext.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};

function drawSnake(){
     for (let i = 0; i < snake.length; i++) {
    const snakePart = snake[i];
    const gradient = context.createLinearGradient(snakePart.x, snakePart.y, snakePart.x + unitSize, snakePart.y + unitSize);
    const color1 = `hsl(${(i * 10) % 360}, 100%, 50%)`;
    const color2 = `hsl(${((i * 10) + 180) % 360}, 100%, 50%)`;
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    context.fillStyle = gradient;
    context.strokeStyle = snakeBorder;
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  }
};

function changeDirection(event){
    const keyPress = event.keyCode; 
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPress == left && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
        case(keyPress == up && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;
        case(keyPress == right && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
        case(keyPress == down && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
    }
    console.log(keyPress)
};

function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
        running = false;
        break;
        case(snake[0].x >= gameWhidth):
        running = false;
        break;
        case(snake[0].y < 0):
        running = false;
        break;
        case(snake[0].y >= gameHeight):
        running = false;
        break
    }

    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false
        }
    }
};

function displayGameOver(){
    context.font = '50px MV Boli';
    context.fillStyle = "white";
    context.strokeStyle = "black"; 
    context.lineWidth = 1; 
    context.textAlign = "center";
    context.fillText('Game Over!', gameWhidth / 2, gameHeight / 2);
    context.strokeText('Game Over!', gameWhidth / 2, gameHeight / 2); 
    running = false;
};

function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake =[
        {x:unitSize * 4, y:0}, 
        {x:unitSize * 3, y:0}, 
        {x:unitSize * 2, y:0}, 
        {x:unitSize, y:0}, 
        {x:0, y:0}
    ];

    gameStart();
};

