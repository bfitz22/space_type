function drawMarkers() {
    ctx.beginPath();
    ctx.moveTo(600, 0);
    ctx.lineTo(600, 700);
    // ctx.moveTo(0, 350);
    // ctx.lineTo(1200, 350);
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.stroke();
    ctx.closePath();
}
import UFO from './ufo';
import Saucer from './saucer';
import Wing from './wing';

const canvas = document.getElementById("canvas");
const base = document.createElement('img');
const ctx = canvas.getContext("2d");
base.src = "images/base.png";

function distance(pos1, pos2) {
    return sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)
}

function drawBase() {
    ctx.beginPath();
    ctx.drawImage(base, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
    ctx.closePath();
}

function drawShield() {
    ctx.beginPath();
    ctx.moveTo(450, 700);
    ctx.bezierCurveTo(465, 425, 730, 425, 750, 700);
    ctx.strokeStyle = "rgba(0, 128, 255)";
    ctx.fillStyle = "rgba(0, 0, 51)";
    // orange
    // ctx.strokeStyle = "rgba(255, 128, 0";
    // ctx.fillStyle = "rgba(51, 25, 0)";
    // red 
    // ctx.strokeStyle = "red";
    // ctx.fillStyle = "rgba(51, 0, 0)";
    ctx.stroke();
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.closePath();
}

function randomStart() {
    return Math.floor(Math.random() * canvas.width - 42) + 42;
}

let x = randomStart();
let a = randomStart();
let c = randomStart();
let y = 1;
let b = 1;
let d = 1;

function spawnUFOs() {
    let dx = (x - 550) / (y - 700);
    let dy = 1;
    ctx.beginPath();
    const ufo = new UFO(ctx, x, y);
    ufo.drawUFO();
    ufo.drawUFOBlink();
    x += dx;
    y += dy;
}

function spawnSaucers() {
    let dx = (a - 550) / (y - 700);
    let dy = 1;
    ctx.beginPath();
    const saucer = new Saucer(ctx, a, b);
    saucer.drawSaucer();
    saucer.drawSaucerBlink();
    a += dx;
    b += dy;
}

function spawnWings() {
    let dx = (c - 550) / (d - 700);
    let dy = 1;
    ctx.beginPath();
    const wing = new Wing(ctx, c, d);
    wing.drawWing();
    wing.drawWingBlink();
    c += dx;
    d += dy;
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// window.requestAnimationFrame(spawnUFOs());
setInterval(function() {clear(), drawMarkers(), drawShield(), drawBase(), spawnUFOs(), spawnSaucers(), spawnWings()}, 10);






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