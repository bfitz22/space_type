import UFO from './ufo';
import Saucer from './saucer';
import Wing from './wing';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const base = document.createElement('img');
base.src = "images/base.png";

const alienRadius = 32;
const shieldHeight = 460;
const shieldLeft = 105;
const shieldRight = 115;

let ufos = [new UFO(ctx), new UFO(ctx), new UFO(ctx)];
const ufoForce = ["x", "x", "x"];
let saucers = [new Saucer(ctx)];
const saucerForce = ["x"];
let wings = [];
const wingForce = [];

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

let lights = 0;
function flash() {
    if (lights === 0) {
        lights = 32;
    } else if (lights === 32) {
        lights = 0;
    }
}

function spawnUFOs() {
    let i = 0;
    let squadSize = ufoForce.length;
    const spawnInterval = setInterval(() => {
        ufos.push(new UFO(ctx));
        i++;
        if (i > squadSize) {
            clearInterval(spawnInterval);
        }
    }, 1750)
}

function drawUFOs() {
    let dy = 0.5;
    const ufoImg = new Image();
    ufoImg.src = "./images/mod-ufo.png";
    ufos.forEach((ufo) => {
        let dx = (ufo.x - 575) / (ufo.y - 1000);
        ctx.drawImage(ufoImg, 0, lights, 32, 32, ufo.x, ufo.y, 42, 42),
        ufo.x += dx,
        ufo.y += dy,
        ufo.drawText();
    });
}

function addUFOs() {
    ufoForce.push("x");
}

function spawnSaucers() {
    let i = 0;
    let squadSize = saucerForce.length;
    const spawnInterval = setInterval(() => {
        saucers.push(new Saucer(ctx));
        i++;
        if (i > squadSize) {
            clearInterval(spawnInterval);
        }
    }, 1750)
}

function drawSaucers() {
    let dy = 1;
    const saucerImg = new Image();
    saucerImg.src = "./images/mod-saucer.png";
    saucers.map((saucer) => {
        let dx = (saucer.x - 575) / (saucer.y - 1000);
        ctx.drawImage(saucerImg, 0, lights, 32, 32, saucer.x, saucer.y, 42, 42),
        saucer.x += dx,
        saucer.y += dy,
        saucer.drawText();
    });
}

function addSaucers() {
    saucerForce.push("x");
}

function spawnWings() {
    let i = 0;
    let squadSize = wingForce.length;
    const spawnInterval = setInterval(() => {
        wings.push(new Wing(ctx));
        i++;
        if (i > squadSize) {
            clearInterval(spawnInterval);
        }
    }, 1750)
}

function drawWings() {
    let dy = 1.5;
    const wingImg = new Image();
    wingImg.src = "./images/mod-wing.png";
    wings.map((wing) => {
        let dx = (wing.x - 575) / (wing.y - 600);
        ctx.drawImage(wingImg, 0, lights, 32, 32, wing.x, wing.y, 42, 42),
        wing.x += dx,
        wing.y += dy,
        wing.drawText();
    });
}

function addWings() {
    wingForce.push("x");
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function typeWord() {
    let typer = document.getElementById("typing-box");
    typer.addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
            ufos = ufos.filter(ufo => ufo.word !== e.target.value),
            saucers = saucers.filter(saucer => saucer.word !== e.target.value),
            wings = wings.filter(wing => wing.word !== e.target.value)
            e.target.value = "";
        }
    })
}

// window.requestAnimationFrame(spawnUFOs());
setInterval(function() {clear(), typeWord(), drawShield(), drawBase(), drawUFOs(), drawSaucers(), drawWings()}, 15);
setInterval(spawnUFOs, 15000);
setInterval(function() {spawnSaucers(), addUFOs()}, 23000);
setInterval(function() {spawnWings(), addSaucers(), addWings()}, 30000);
setInterval(flash, 200);