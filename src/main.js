import UFO from './ufo';
import Saucer from './saucer';
import Wing from './wing';
import BonusSaucer from './bonus_saucer';
import { typeWord, displayPoints, resetPoints } from './typing';
import { drawShield } from './shield';
import { gameOverEvents, finalWaveCount, finalExplosion, pauseEndMusic } from './game_over';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const base = document.createElement('img');
base.src = "images/base.png";
let baseAlive = false;

const mainTheme = new Audio();
mainTheme.src = "./audio/main-theme.mp3";
const powerDown = new Audio();
powerDown.src = "./audio/power-down.mp3"

const shieldHeight = 460
const shieldCenter = 580;
const shieldRadius = 220;

let ufos = [new UFO(ctx), new UFO(ctx)];
let ufoForce = ["x", "x"];
let saucers = [new Saucer(ctx), new Saucer(ctx), new Saucer(ctx), new Saucer(ctx)];
let saucerForce = [];
let wings = [];
let wingForce = [];
let bonuses = [];


var stroke = ["rgba(0, 128, 255)", "rgba(255, 128, 0", "red", "white", "rgba(0, 0, 0, 0)"];
var fill = ["rgba(0, 0, 51)", "rgba(51, 25, 0)", "rgba(51, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"];
let shieldIndex = 3;

let paused = true
let gameOver = false; 

const typer = document.getElementById("typing-box");

const startScreen = document.getElementById("start");
startScreen.addEventListener("click", () => { 
    startScreen.classList.add("hidden");
    mainTheme.play();
    mainTheme.loop = true; 
    typer.focus();
    baseAlive = true; 
    const startInt = setInterval(function() {clear(), drawShieldIntro(),  drawBase(), displayWave()}, 40);
    
    setTimeout(() => {
        shieldIndex -= 1;
    }, 2060)

    setTimeout(() => {
        shieldIndex -= 1;
    }, 2740)

    setTimeout(() => {
        shieldIndex -= 1;
    }, 3420)

    setTimeout(() => {
        clearInterval(startInt);
        paused = false; 
        renderGame();
    }, 4000)
})

const endScreen = () => {
    if (shieldIndex >= 4) {
        clear();
        gameOverEvents(ctx, isPlaying);
        mainTheme.pause();
        finalWaveCount(ctx, wave);
        finalExplosion(ctx, canvas);
        baseAlive = false;
        paused = true; 
        renderGame();
        gameOver = true; 
        ufos.length = 0;
        ufoForce.lenght = 0;
        saucers.lenght = 0;
        saucerForce.length = 0;
        wings.length = 0;
        wingForce.length = 0;
        bonuses.length = 0;

        canvas.addEventListener('click', () => {
            if (gameOver) {
                restartGame();
                pauseEndMusic();
            } else {
             null;
            }
        }
    )}
}; 

const restartGame = () => {
    gameOver = false;  
    ufos = [];
    ufoForce = ["x", "x"];
    saucers = [];
    saucerForce = [];
    wings = [];
    wingForce = [];
    bonuses = [];
    shieldIndex = 3;
    waveInterval = 6000;
    wave = 1;
    debugger
    resetPoints();

    mainTheme.currentTime = 0;
    mainTheme.play();
    mainTheme.loop = true; 
    typer.focus();
    baseAlive = true; 
    const startInt = setInterval(function() {clear(), drawShieldIntro(),  drawBase(), displayWave(), 
    displayPoints()}, 40);
    
    setTimeout(() => {
        shieldIndex -= 1;
    }, 2060)

    setTimeout(() => {
        shieldIndex -= 1;
    }, 2740)

    setTimeout(() => {
        shieldIndex -= 1;
    }, 3420)

    setTimeout(() => {
        debugger
        paused = false; 
        renderGame();
        clearInterval(startInt);
    }, 4000)
}



const speaker = document.getElementById("speaker");
var isPlaying = true; 
speaker.addEventListener('click', () => {
    if (isPlaying) {
        speaker.classList.remove("fa-volume-up");
        speaker.classList.add("fa-volume-mute");
        mainTheme.muted = true;
        isPlaying = false;
    } else {
        speaker.classList.remove("fa-volume-mute");
        speaker.classList.add("fa-volume-up");
        mainTheme.muted = false; 
        isPlaying = true; 
    }
    typer.focus();
})



const drawBase = () => {
    if (baseAlive) {
        ctx.beginPath();
        ctx.drawImage(base, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
        ctx.closePath();
    }
}

const drawShieldIntro = () => {
    ctx.beginPath();
    ctx.moveTo(450, 700);
    ctx.bezierCurveTo(465, 425, 730, 425, 750, 700);
    ctx.strokeStyle = stroke[shieldIndex];
    ctx.fillStyle = fill[shieldIndex];
    ctx.stroke();
    ctx.fill();
    ctx.shadowColor = 100;
    ctx.lineWidth = 8;
    ctx.closePath();
}

const rechargeShield = () => {
    const powerUp = new Audio();
    powerUp.src = "./audio/power-up.mp3";
    if (shieldIndex > 0 && baseAlive) {
        shieldIndex -= 1;
        isPlaying ? powerUp.play() : null; 
    }
}



let lights = 0;
const flash = () => {
    if (lights === 0) {
        lights = 32;
    } else if (lights === 32) {
        lights = 0;
    }
}

const spawnUFOs = () => {
    let i = 0;
    let squadSize = ufoForce.length;
    const spawnInterval = setInterval(() => {
        ufos.push(new UFO(ctx));
        i++;
        if (i > squadSize) {
            clearInterval(spawnInterval);
        }
    }, 3000)
}

const drawUFOs = () => {
    let dy = 0.75;
    const ufoImg = new Image();
    ufoImg.src = "./images/mod-ufo.png";
    ufos.forEach((ufo, i) => {
        let dx = (ufo.x - 575) / (ufo.y - shieldHeight - 140);
        ctx.drawImage(ufoImg, 0, lights, 32, 32, ufo.x, ufo.y, 42, 42),
        ufo.x += dx,
        ufo.y += dy,
        ufo.drawText();
    
        if ((ufo.y > shieldHeight ) && 
            ((ufo.x > shieldCenter - (shieldRadius + 10)) && 
            (ufo.x < shieldCenter + (shieldRadius - 10))) ||
            (ufo.y > shieldHeight + 30) && 
            ((ufo.x > shieldCenter - (shieldRadius + 20)) && 
            (ufo.x < shieldCenter + (shieldRadius - 20))) || 
            (ufo.y > shieldHeight + 50) && 
            ((ufo.x > shieldCenter - (shieldRadius + 40)) && 
            (ufo.x < shieldCenter + (shieldRadius - 40))))
            {

                if (isPlaying) {
                    powerDown.play();
                }
                ufo.drawExplosion(ufo.x, ufo.y);
                delete ufos[i];
                shieldIndex++;
            }
    });
}

const addUFOs = () => {
    ufoForce.push("x");
}

const spawnSaucers = () => {
    let i = 0;
    let squadSize = saucerForce.length;
    const spawnInterval = setInterval(() => {
        saucers.push(new Saucer(ctx));
        i++;
        if (i > squadSize) {
            clearInterval(spawnInterval);
        }
    }, 3000)
}

const drawSaucers = () => {
    let dy = 1.25;
    const saucerImg = new Image();
    saucerImg.src = "./images/mod-saucer.png";
    saucers.forEach((saucer, i) => {
        let dx = (saucer.x - 575) / (saucer.y - shieldHeight);
        ctx.drawImage(saucerImg, 0, lights, 32, 32, saucer.x, saucer.y, 42, 42),
        saucer.x += dx,
        saucer.y += dy,
        saucer.drawText();

        if (saucer.y > shieldHeight ) {
            if (isPlaying) {
                powerDown.play();
            }
            saucer.drawExplosion(saucer.x, saucer.y);
            delete saucers[i];
            shieldIndex++;
        }
    });
}

const addSaucers = () => {
    saucerForce.push("x");
}

const spawnWings = () => {
    let i = 0;
    let squadSize = wingForce.length;
    const spawnInterval = setInterval(() => {
        wings.push(new Wing(ctx));
        i++;
        if (i > squadSize) {
            clearInterval(spawnInterval);
        }
    }, 6000)
}

const drawWings = () => {
    let dy = 1.75;
    const wingImg = new Image();
    wingImg.src = "./images/mod-wing.png";
    wings.forEach((wing, i) => {
        let dx = (wing.x - 575) / (wing.y - shieldHeight - 25);
        ctx.drawImage(wingImg, 0, lights, 32, 32, wing.x, wing.y, 42, 42),
        wing.x += dx,
        wing.y += dy,
        wing.drawText();

        if (wing.y > shieldHeight ) {
            if (isPlaying) {
                powerDown.play();
            }
            wing.drawExplosion(wing.x, wing.y);
            delete wings[i];
            shieldIndex++;
        }
    });
}

const addWings = () => {
    wingForce.push("x");
}

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const clearEnemies = () => {
    bonuses.push(new BonusSaucer(ctx));
}

const drawBonus = () => {
    bonuses.forEach((bonus, i) => {
        isPlaying ? bonus.bonusSound.play() : bonus.bonusSound.pause();

        if (bonus.x > canvas.width) {
            delete bonuses[i];
            bonus.bonusSound.pause();
        } 

        let dx = 4;
        ctx.drawImage(bonus.bonusImg, 0, 0, 32, 32, bonus.x, bonus.y, 55, 55),
        bonus.x += dx,
        bonus.drawText();
    })
}


let wave = 1; 
let waveInterval = 6000;
const updateWave = () => {
    if (baseAlive && (ufos.every(el => el === "") <= 1 && saucers.every(el => el === "") <= 1 && wings.every(el => el === "") <= 1)) {
        wave++;
        waveInterval += 6000;
    }
}

const displayWave = () => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`Wave ${wave}`, 1000, 670);
    ctx.fill();
    ctx.closePath();
}

let gameEvents; let gameEnemies; let gameEnemiesTwo; let drawEverything; let theRecharge; let theBonus; let theFlash;
const renderGame = () => {
    debugger
    if (!paused) { 
        gameEvents = setInterval(function() {spawnUFOs(), updateWave()}, waveInterval);
        gameEnemies = setInterval(function() {spawnSaucers(), spawnWings()}, waveInterval * 2);
        gameEnemiesTwo = setInterval(function() {addUFOs(), addSaucers(), addWings()}, waveInterval * 5);
        drawEverything = setInterval(function() {clear(), drawBonus(); drawShield(ctx, baseAlive, shieldIndex, stroke, fill, mainTheme, wave),  
            drawBase(), displayWave(), displayPoints(ctx), drawUFOs(), drawSaucers(), drawWings(), endScreen()}, 25);
        theRecharge = setInterval(rechargeShield, 10000)
        theBonus = setInterval(clearEnemies, 30000);
        theFlash = setInterval(flash, 200);
        typeWord(ctx, ufos, saucers, wings, bonuses, isPlaying);

    } else {
        clearInterval(gameEvents);
        clearInterval(gameEnemies);
        clearInterval(gameEnemiesTwo);
        clearInterval(drawEverything);
        clearInterval(theRecharge);
        clearInterval(theBonus);
        clearInterval(theFlash); 
    }
}
