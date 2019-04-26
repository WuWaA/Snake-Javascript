var w = 50;
var h = 50;
var s = 10;
var cwidth = w * s;
var cheight = h * s;
var snake;
var direction;
var start;
var food;
var frame;
var score;
var scoreDiv;
var level;
var levelDiv;

function setup() {
    createCanvas(cwidth, cheight);
    reset();
    noLoop();
    frameRate(frame);
    scoreDiv = createDiv('Score: ' + score);
    levelDiv = createDiv('Speed Level: ' + level);
}

function draw() {
    scoreDiv.html('Score: ' + score);
    levelDiv.html('Speed Level: ' + level);
    // not start yet
    if (start === 0) {
        textSize(20);
        textAlign(CENTER);
        text('Press "Space" To Start', cwidth / 2, 30);
    }
    // after game over
    if (start === 1) {
        noStroke();
        scale(1);
        fill('rgba(0, 0, 0, 0.25)');
        rect(0, 0, cwidth, 80);
        fill(0);
        text('Game Over, Score: ' + score, cwidth / 2, 30);
        text('Press "Space" To Restart', cwidth / 2, 60);
        reset();
        noLoop();
    }
    // after start
    if (start === 2) {
        refresh();
        paint();
        check();
        update();
    }
}

function keyPressed() {
    if (keyCode == 32 && start === 0) { // Space
        start = 2; // change the status of start
        food = randomPosition(); // create food
        level++; // level becomes one
        loop();
    }
    if ((keyCode == 38 || keyCode == 87) && direction != 3) { // up and w
        direction = 1;
    }
    if ((keyCode == 39 || keyCode == 68) && direction != 4) { // right and d
        direction = 2;
    }
    if ((keyCode == 40 || keyCode == 83) && direction != 1) { // down and s
        direction = 3;
    }
    if ((keyCode == 37 || keyCode == 65) && direction != 2) { // left and a
        direction = 4;
    }
}

function randomPosition() {
    var p = [Math.floor(Math.random() * w), Math.floor(Math.random() * h)];
    for (var i = 0; i < snake.length; i++) {
        // if food is on the body of snake, regenerate one
        if (p[0] == snake[i].x && p[1] == snake[i].y) {
            p = [Math.floor(Math.random() * w), Math.floor(Math.random() * h)];
            i = 0;
        }
    }
    return p;
}

// update position
function update() {
    for (var i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
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
        snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
        food = randomPosition();
        score++;
        if (score % 3 == 0) {
            level++;
            frame += 3;
            frameRate(frame);
        }
    }
    // touch wall
    if (snake[0].x < 0 || snake[0].x >= w || snake[0].y < 0 || snake[0].y >= h) {
        start = 1;
    }
    // touch itself
    for (var i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            start = 1
            break;
        }
    }
}

// assign all values to default
function reset() {
    start = 0;
    score = 0;
    level = 0;
    frame = 5;
    direction = 2;
    snake = [
        {x: w / 2, y: h / 2},
        {x: w / 2 - 1, y: h / 2},
        {x: w / 2 - 2, y: h / 2},
        {x: w / 2 - 3, y: h / 2},
        {x: w / 2 - 4, y: h / 2}
    ];
}

function refresh() {
    fill(255);
    stroke(255);
    rect(0, 0, cwidth, cheight);
}

function paint() {
    fill(0);
    stroke(0);
    scale(s);
    stroke('red');
    point(food[0], food[1]);
    stroke('black');
    for (var i = snake.length - 1; i >= 0; i--) {
        point(snake[i].x, snake[i].y);
    }
}