import UFO from './ufo';
import Saucer from './saucer';
import Wing from './wing';
import randomWords from 'random-words';

const canvas = document.getElementById("canvas");
const base = document.createElement('img');
base.src = "images/base.png";
const ctx = canvas.getContext("2d");

const alienRadius = 32;
const shieldHeight = 460;
const shieldLeft = 105;
const shieldRight = 115;

var stroke = "rgba(0, 128, 255)";
var fill = "rgba(0, 0, 51)";

function drawBase() {
    ctx.beginPath();
    ctx.drawImage(base, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
    ctx.closePath();
}


function drawShield() {
    ctx.beginPath();
    ctx.moveTo(450, 700);
    ctx.bezierCurveTo(465, 425, 730, 425, 750, 700);
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    // orange
    // ctx.strokeStyle = "rgba(255, 128, 0";
    // ctx.fillStyle = "rgba(51, 25, 0)";
    // red 
    // ctx.strokeStyle = "red";
    // ctx.fillStyle = "rgba(51, 0, 0)";
    ctx.stroke();
    ctx.fill();
    ctx.shadowColor = 100;
    ctx.lineWidth = 8;
    ctx.closePath();
}

function randomStart() {
    return Math.floor(Math.random() * canvas.width - 42) + 42;
}

let x = randomStart();
let a = randomStart();
let c = randomStart();
let y = 10;
let b = 1;
let d = 1;
let l = randomWords(1);
let m = randomWords(1);
let n = randomWords(1);
let index = 0;
let dy = 2;
// let blink = [0, 32];



function spawnUFOs() {
    // if ((y + dy > shieldHeight && (x === 600 )) || 
    // ((y + dy > canvas.height) && (x > 590 && x < 610))) {
    if (x === canvas.width / 2 && y === shieldHeight ||
    (x > canvas.width + 10 && x < canvas.width - 10 ) && y === shieldHeight + 10 ||
    (x > canvas.width + 20 && x < canvas.width - 20) && y === shieldHeight + 20) {
    dy = 0;
        stroke = "rgba(255, 128, 0";
        fill = "rgba(51, 25, 0)";
        ufo.drawExplosion();
    }
    index = index >= 2 ? 0 : 32;
    index++;
    let dx = (x - 550) / (y - 600);
    
    ctx.beginPath();
    const ufo = new UFO(ctx, x, y, l);
    ufo.drawUFO(index);
    ufo.drawText();
    x += dx;
    y += dy;
}

function spawnSaucers() {
    index = index >= 2 ? 0 : 32;
    index++;
    let dx = (a - 550) / (y - 700);
    ctx.beginPath();
    const saucer = new Saucer(ctx, a, b, m);
    saucer.drawSaucer(index);
    saucer.drawText();
    a += dx;
    b += dy;
}

function spawnWings() {
    index = index >= 2 ? 0 : 32;
    let dx = (c - 550) / (d - 700);
    ctx.beginPath();
    const wing = new Wing(ctx, c, d, n);
    wing.drawWing(index);
    wing.drawText();
    c += dx;
    d += dy;
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// window.requestAnimationFrame(spawnUFOs());
setInterval(function() {clear(), drawShield(), drawBase(), spawnUFOs()}, 10);






function drawFrame(frameX, frameY, canvasX, canvasY) {
        
    this.ctx.drawImage(this.UFOImg,
    frameX * this.width, frameY * this.height, this.width, this.height,
    canvasX, canvasY, this.scaledSize, this.scaledSize);
    
}
    
function init(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    requestAnimationFrame(this.step);
}

function step() {
    let cycleLoop = [0, 1];
    let currentIndex = 0;

    this.frameCount++;
    if (this.frameCount < 15) {
        this.init();
        return;
    }
    this.frameCount = 0;
    
    // while( currentIndex < 2 ) {
        this.drawFrame(0, cycleLoop[currentIndex], 0, 0);
        console.log(currentIndex);
        currentIndex ++;
    if (currentIndex >= cycleLoop.length) {
        currentIndex = 0;
    }
    // }
}