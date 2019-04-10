var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var base = new Image();
base.src = "images/base.png";

var x = canvas.width/2;
var y = canvas.height/2;
var dx = -1;
var dy = 1;
var ballRadius = 10;
var colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "grey", "turquoise"];
var color = "blue";

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawBase() {
    ctx.beginPath();
    ctx.drawImage(base, 10, 10);
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        color = colors[Math.floor(Math.random()*colors.length)];
    }

    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
        color = colors[Math.floor(Math.random()*colors.length)];
    }
}

// function changeColor() {
//     color = colors[Math.floor(Math.random()*colors.length)];
// }
setInterval(draw, 1);
// setInterval(changeColor, 100)

