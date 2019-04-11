
var canvas = document.getElementById("canvas");
var base = document.createElement('img');
var ufo = document.createElement('img');
var saucer = document.createElement('img');
var ctx = canvas.getContext("2d");
base.src = "images/base.png";
ufo.src = "images/ufo.png";
saucer.src = "images/ufo-y.png";


var x = canvas.width/2;
var y = canvas.height/2;
var dx = -1;
var dy = 1;
var ballRadius = 10;
var colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "grey", "turquoise"];
var color = "blue";


function drawBase() {
    ctx.beginPath();
    ctx.drawImage(base, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
    ctx.drawImage(ufo, 20, 1, 30, 30);
    ctx.drawImage(saucer, 1150, 1, 50, 50);
    ctx.closePath();
}

function drawShield() {
    ctx.beginPath();
    ctx.moveTo(450, 700);
    ctx.bezierCurveTo(465, 425, 730, 425, 750, 700);
    ctx.strokeStyle = "rgba(0, 128, 255)";
    ctx.fillStyle = "rgba(0, 0, 51)";
    // ctx.strokeStyle = "rgba(255, 128, 0";
    // ctx.fillStyle = "rgba(51, 25, 0)";
    // ctx.strokeStyle = "red";
    // ctx.fillStyle = "rgba(51, 0, 0)";
    ctx.stroke();
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.closePath();
}

// function drawMarkers() {
//     ctx.beginPath();
//     ctx.moveTo(600, 0);
//     ctx.lineTo(600, 700);
//     ctx.moveTo(0, 350);
//     ctx.lineTo(1200, 350);
//     ctx.strokeStyle = "rgb(255, 255, 255)";
//     ctx.stroke();
//     ctx.closePath();
// }

// function draw() {
    
//     drawBall();
//     x += dx;
//     y += dy;
//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//         changeColor();
//         clear();
//     }

//     if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//         dy = -dy;
//         changeColor();
//         clear();
//     }
// }

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColor() {
    color = colors[Math.floor(Math.random()*colors.length)];
}

setInterval(function() {drawShield(), drawBase(), drawMarkers()}, 10);
// setInterval(changeColor, 100)

