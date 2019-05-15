import UFO from './ufo';
import Saucer from './saucer';
import Wing from './wing';
import BonusSaucer from './bonus_saucer';
import { gameOver, finalWaveCount, finalExplosion } from './game_over';



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const base = document.createElement('img');
base.src = "images/base.png";
let baseAlive = false;

const mainTheme = new Audio();
mainTheme.src = "./audio/main-theme.mp3";
const gameOverMusic = new Audio();
gameOverMusic.src = "./audio/game_over.mp3";

const powerDown = new Audio();
powerDown.src = "./audio/power-down.mp3";
const powerUp = new Audio();
powerUp.src = "./audio/power-up.mp3";
const bonusLaserSound = new Audio();
bonusLaserSound.src = './audio/big-laser.mp3';


const shieldHeight = 460;
const shieldCenter = 580;
const shieldRadius = 220;

let ufos = [new UFO(ctx), new UFO(ctx), new UFO(ctx)];
const ufoForce = ["x", "x", "x"];
let saucers = [new Saucer(ctx)];
const saucerForce = ["x"];
let wings = [];
const wingForce = [];
const bonuses = [];

var stroke = ["rgba(0, 128, 255)", "rgba(255, 128, 0", "red", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"];
var fill = ["rgba(0, 0, 51)", "rgba(51, 25, 0)", "rgba(51, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"];
let shieldIndex = 3;


const typer = document.getElementById("typing-box");
const startScreen = document.getElementById("start");
startScreen.addEventListener("click", (e) => {
    startScreen.classList.add("hidden");
    mainTheme.play();
    mainTheme.loop = true; 
    typer.focus();
    baseAlive = true; 
    const startInt = setInterval(function() {clear(), drawShieldIntro(),  drawBase(), displayWave(), 
    displayPoints()}, 40);
    
    setTimeout(() => {
        shieldIndex -= 1;
    }, 1960)

    setTimeout(() => {
        shieldIndex -= 1;
    }, 2740)

    setTimeout(() => {
        shieldIndex -= 1;
    }, 3520)

    setTimeout(() => {
    clearInterval(startInt);
    renderGame();
    }, 4000)
})

let paused = false; 
canvas.addEventListener("click", (e) => {
    
})

const speaker = document.getElementById("speaker");
var isPlaying = true; 
speaker.addEventListener('click', () => {
    if (isPlaying) {
        mainTheme.muted = true;
        isPlaying = false;
    } else {
        mainTheme.muted = false; 
        isPlaying = true; 
    }
})



function drawBase() {
    if (baseAlive) {
        ctx.beginPath();
        ctx.drawImage(base, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
        ctx.closePath();
    }
}

function drawShieldIntro() {
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


function drawShield() {
    if (baseAlive) {
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
    if (shieldIndex >= 4) {
        gameOver(ctx);
        mainTheme.pause();
        gameOverMusic.play();
        finalWaveCount(ctx, wave);
        finalExplosion(ctx, canvas);
        baseAlive = false;
        paused = true; 
        renderGame();
    }
}

function rechargeShield() {
    if (shieldIndex > 0 && baseAlive) {
        shieldIndex -= 1;
        powerUp.play();
    }
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
    }, 3000)
}

function drawUFOs() {
    let dy = 0.75;
    const ufoImg = new Image();
    ufoImg.src = "./images/mod-ufo.png";
    ufos.forEach((ufo, i) => {
        let dx = (ufo.x - 575) / (ufo.y - 1000);
        ctx.drawImage(ufoImg, 0, lights, 32, 32, ufo.x, ufo.y, 42, 42),
        ufo.x += dx,
        ufo.y += dy,
        ufo.drawText();
    
        if ((ufo.y > shieldHeight ) && 
            ((ufo.x > shieldCenter - (shieldRadius + 40)) && 
            (ufo.x < shieldCenter + (shieldRadius - 40))) ||
            (ufo.y > shieldHeight + 30) && 
            ((ufo.x > shieldCenter - (shieldRadius + 20)) && 
            (ufo.x < shieldCenter + (shieldRadius - 20))) || 
            (ufo.y > shieldHeight + 50) && 
            ((ufo.x > shieldCenter - (shieldRadius + 10)) && 
            (ufo.x < shieldCenter + (shieldRadius - 10))))
            {
                setTimeout( () => {
                    rechargeShield();
                }, 10000)
                powerDown.play();
                ufo.drawExplosion(ufo.x, ufo.y);
                delete ufos[i];
                shieldIndex++;
            }
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
    }, 3000)
}

function drawSaucers() {
    let dy = 1.25;
    const saucerImg = new Image();
    saucerImg.src = "./images/mod-saucer.png";
    saucers.forEach((saucer, i) => {
        let dx = (saucer.x - 575) / (saucer.y - 600);
        ctx.drawImage(saucerImg, 0, lights, 32, 32, saucer.x, saucer.y, 42, 42),
        saucer.x += dx,
        saucer.y += dy,
        saucer.drawText();

        if ((saucer.y > shieldHeight ) && 
            ((saucer.x > shieldCenter - (shieldRadius + 40)) && 
            (saucer.x < shieldCenter + (shieldRadius - 40))) ||
            (saucer.y > shieldHeight + 30) && 
            ((saucer.x > shieldCenter - (shieldRadius + 20)) && 
            (saucer.x < shieldCenter + (shieldRadius - 20))) || 
            (saucer.y > shieldHeight + 50) && 
            ((saucer.x > shieldCenter - (shieldRadius + 10)) && 
            (saucer.x < shieldCenter + (shieldRadius - 10))))
            {
                setTimeout( () => {
                    rechargeShield();
                }, 10000)
                powerDown.play();
                saucer.drawExplosion(saucer.x, saucer.y);
                delete saucers[i];
                shieldIndex++;
            }
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
    }, 6000)
}

function drawWings() {
    let dy = 1.75;
    const wingImg = new Image();
    wingImg.src = "./images/mod-wing.png";
    wings.forEach((wing, i) => {
        let dx = (wing.x - 575) / (wing.y - 500);
        ctx.drawImage(wingImg, 0, lights, 32, 32, wing.x, wing.y, 42, 42),
        wing.x += dx,
        wing.y += dy,
        wing.drawText();

        if ((wing.y > shieldHeight ) && 
            ((wing.x > shieldCenter - (shieldRadius + 40)) && 
            (wing.x < shieldCenter + (shieldRadius - 40))) 
            ||
            (wing.y > shieldHeight + 30) && 
            ((wing.x > shieldCenter - (shieldRadius + 20)) && 
            (wing.x < shieldCenter + (shieldRadius - 20))) 
            || 
            (wing.y > shieldHeight + 50) && 
            ((wing.x > shieldCenter - (shieldRadius + 10)) && 
            (wing.x < shieldCenter + (shieldRadius - 10))))
            {
                setTimeout( () => {
                    rechargeShield();
                }, 10000)
                powerDown.play();
                wing.drawExplosion(wing.x, wing.y);
                delete wings[i];
                shieldIndex++;
            }
    });
}

function addWings() {
    wingForce.push("x");
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearEnemies() {
    bonuses.push(new BonusSaucer(ctx));
}

function drawBonus() {
    bonuses.forEach((bonus) => {
        
        bonus.bonusSound.play();
        let dx = 5;
        ctx.drawImage(bonus.bonusImg, 0, 0, 32, 32, bonus.x, bonus.y, 55, 55),
        bonus.x += dx,
        bonus.drawText();
    })
}



function typeWord() {
    
    typer.addEventListener('keypress', (e) => {
        
        var key = e.which || e.keyCode;
        if (key === 13) {
            ufos.forEach((ufo, i) => {
                if (ufo.word === e.target.value) {
                    delete ufos[i];
                    laser(ufo.x + 21, ufo.y + 21);
                    ufo.drawExplosion(ufo.x, ufo.y);
                    updatePoints(1);
                }
            });
            saucers.forEach((saucer, i) => {
                if (saucer.word === e.target.value) {
                    delete saucers[i];
                    laser(saucer.x + 21, saucer.y + 21);
                    saucer.drawExplosion(saucer.x, saucer.y);
                    updatePoints(3);
                }
            });
            wings.forEach((wing, i) => {
                if (wing.word === e.target.value) {
                    delete wings[i];
                    laser(wing.x + 21, wing.y + 21);
                    wing.drawExplosion(wing.x, wing.y);
                    updatePoints(5);
                }
            });
            bonuses.forEach((bonus, i) => {
                if (bonus.x > canvas.width) {
                    delete bonuses[i];
                    bonus.bonusSound.pause();
                } else if (bonus.word === e.target.value) {
                    bonusLaserSound.play();
                    delete bonuses[i];
                    bonus.bonusSound.pause();
                    laser(bonus.x + 21, bonus.y + 21);
                    bonus.drawExplosion(bonus.x, bonus.y);
                    ufos.forEach((ufo, i) => {
                        delete ufos[i];
                        bonusLaser(bonus.x + 21, bonus.y + 21, ufo.x + 21, ufo.y + 21);
                        ufo.drawExplosion(ufo.x, ufo.y);
                        updatePoints(1);
                    })
                }
            })
            e.target.value = "";
        }
    })
}

let totalPoints = 0;
function updatePoints(num) {
    if (baseAlive) {
        totalPoints += num;
    }
}

function displayPoints() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`${totalPoints} points`, 800, 670);
    ctx.fill();
    ctx.closePath();
}

function bonusLaser(x1, y1, x2, y2) {
    let i = 0;
    const laser = setInterval(() => {
        if (i < 100) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "red";
            ctx.stroke();
            ctx.closePath();
        } else {
            clearInterval(laser);
        }
        i++;
    })
}

function laser(x, y) {
    if (isPlaying) {
        const laserSound = new Audio();
        laserSound.src = "./audio/laser.mp3";
        laserSound.volume = 0.5;
        laserSound.play();
    }
    let i = 0;
    const laser = setInterval(() => {
        if (i < 25) {
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.5, 530);
            ctx.lineTo(x, y);
            ctx.strokeStyle = "rgba(0, 128, 255)";
            ctx.stroke();
            ctx.closePath();
        } else {
            clearInterval(laser);
        }
        i++;
    })
}

let wave = 1; 
let waveInterval = 9000;
function updateWave() {
    if (baseAlive) {
        wave++;
        waveInterval += 6000;
    }
}

function displayWave() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`Wave ${wave}`, 1000, 670);
    ctx.fill();
    ctx.closePath();
}



function renderGame() { 
if (!paused) {
setInterval(function() {clear(), drawBonus(); drawShield(),  drawBase(), displayWave(), 
    displayPoints(), typeWord(), drawUFOs(), drawSaucers(), drawWings()}, 25);
setInterval(function() {spawnUFOs(), updateWave()}, waveInterval);
setInterval(function() {spawnSaucers(), spawnWings()}, (waveInterval) * 2);
setInterval(function() {addUFOs(), addSaucers(), addWings()}, (waveInterval) * 5);
setInterval(clearEnemies, 30000)
setInterval(flash, 200);
} else {
    null
}
// if (paused) {
//     clearInterval(gameEvents);
//     clearInterval(gameEnemies);
// }
}
// 
// , rechargeShield()