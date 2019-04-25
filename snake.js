var w = 60;
var h = 60;
var s = 10;
var cwidth = w * s;
var cheight = h * s;
var snake = [
    {x: w / 2, y: h / 2},
    {x: w / 2 - 1, y: h / 2},
    {x: w / 2 - 2, y: h / 2},
    {x: w / 2 - 3, y: h / 2},
    {x: w / 2 - 4, y: h / 2}
];
var direction = 2;
var start = false;
var food;
var frame = 5;
var score = 0;
var scoreDiv;
var level = 0;
var levelDiv;

function setup() {
    createCanvas(cwidth, cheight);
    frameRate(frame);
    noLoop();
    scoreDiv = createDiv('Score: ' + score);
    levelDiv = createDiv('Speed Level: ' + level);
}

function draw() {
    scoreDiv.html('Score: ' + score);
    levelDiv.html('Speed Level: ' + level);
    if (!start) {
        textSize(20);
        textAlign(CENTER);
        text('Press "Space" To Start', cwidth / 2, 30);
    }
    else {
        fill(255);
        stroke(255);
        rect(0, 0, cwidth, cheight);
        fill(0);
        stroke(0);
        scale(s);
        point(food[0], food[1]);
        update();
    }
}

function keyPressed() {
    if (keyCode == 32 && start == false) { // Space
        start = true; // Change the status of start
        food = randomPosition(); // Create food
        level++; // Level becomes one
        loop();
        redraw();
    }
    if ((keyCode == 38 || keyCode == 87) && direction != 3) { // Up and W
        direction = 1;
    }
    if ((keyCode == 39 || keyCode == 68) && direction != 4) { // Right and D
        direction = 2;
    }
    if ((keyCode == 40 || keyCode == 83) && direction != 1) { // Down and S
        direction = 3;
    }
    if ((keyCode == 37 || keyCode == 65) && direction != 2) { // Left and A
        direction = 4;
    }
}

function randomPosition() {
    return [Math.floor(Math.random() * w), Math.floor(Math.random() * h)];
}

// draw snake and update position
function update() {
    for (var i = snake.length - 1; i >= 0; i--) {
        point(snake[i].x, snake[i].y);
        if (i != 0) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
    }
    switch(direction) {
        case 1:
            snake[0].y--;
            break;
        case 2:
            snake[0].x++;
            break;
        case 3:
            snake[0].y++;
            break;
        case 4:
            snake[0].x--;
            break;
    }
}

// touch food? touch wall? touch itself?
function check() {
    // touch food
    if (snake[0].x == food[0] && snake[0].y == food[1]) {
        food = randomPosition();
        score++;
    }
    // touch wall
    if (snake[0].x < 0 || snake[0].x > w || snake[0].y < 0 || snake[0].y > h) {
        noLoop();
        text('Game Over, Score: ' + score, cwidth / 2, 30);
    }
    // touch itself
    if () {
        
    }
}