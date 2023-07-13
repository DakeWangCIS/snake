// get the container of the snake
const snake = document.getElementById("snake");

// get parts of the snake
const snakeBody = snake.getElementsByTagName("div");

// get food
const food = document.getElementById("food");

// get the span of score and level to show the score
const scoreSpan = document.getElementById("score");
const levelSpan = document.getElementById("level");

// get the restart button
const restartBtn = document.getElementById("restart");

restartBtn.addEventListener('click', () => {
    location.reload();
});

// create a variable to store the score and level
let score = 0;
let level = 0;

/*
    The ordinate of the food should be between 0 and 430, and it should be a multiple of 10.
    Besides, it should be random.
 */
function changefood() {
    food.style.top = Math.floor(Math.random() * 60.5) * 10 + "px";
    food.style.left = Math.floor(Math.random() * 74) * 10 + "px";
}

changefood();

// create a variable to store the direction of the snake
let dir;

// create a variable to store the status of the key.
// If the player press the key too fast, it will not be allowed to move in the opposite direction
let keyActive = true;

const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

// create an object to store the opposite direction
const reverseObj = {
    "ArrowUp": "ArrowDown",
    "ArrowDown": "ArrowUp",
    "ArrowLeft": "ArrowRight",
    "ArrowRight": "ArrowLeft"
};

/*
bind press-to-move event
if the length is more than 2, it is not allowed to move in the opposite direction
 */
document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (keyActive && keyArr.includes(event.key)) {
        // check if the length is more than 2 and if it is in the opposite direction
        if (snakeBody.length < 2 || event.key !== reverseObj[dir]) {
            // set direction
            dir = event.key;
            // set keyActive to false
            keyActive = false;
        }
    }
});

setTimeout(function move() {
    // set keyActive to true
    keyActive = true;

    // get the head of the snake
    const head = snakeBody[0];

    // get the coordinate of the head
    let x = head.offsetLeft;
    let y = head.offsetTop;

    switch (dir) {
        case "ArrowUp":
            y -= 10;
            break;
        case "ArrowDown":
            y += 10;
            break;
        case "ArrowLeft":
            x -= 10;
            break;
        case "ArrowRight":
            x += 10;
            break;
    }

    // check if snake get the food
    if (head.offsetTop === food.offsetTop && head.offsetLeft === food.offsetLeft) {
        // change the position of the food
        changefood();
        // create a new part of the snake
        snake.insertAdjacentHTML("beforeend", "<div/>");
        // add score
        score++;
        // change the score
        scoreSpan.textContent = score;

        // level up every 10 scores
        if (score % 10 === 0 && level < 12) {
            level++;
            levelSpan.textContent = level;
        }
    }

    // check if the game is over. Cannot touch the wall or itself
    if (x < 0 || x > 740 || y < 0 || y > 605) {
        alert("You hit the wall, Game Over!");
        return;
    }

    // check if the snake touches itself
    for (let i = 0; i < snakeBody.length - 1; i++) {
        if (x === snakeBody[i].offsetLeft && y === snakeBody[i].offsetTop) {
            alert("You hit yourself, Game Over!");
            return;
        }
    }

    // get the tail of the snake
    const tail = snakeBody[snakeBody.length - 1];

    // move the tail to the front
    tail.style.left = x + "px";
    tail.style.top = y + "px";

    // tail becomes the head
    snake.insertAdjacentElement("afterbegin", tail);

    setTimeout(move, 260 - level * 20);
}, 260 - level * 20);

