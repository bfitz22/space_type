import Base from './base';
import Game from './game_objects';
import Typing from './typing';
import Sound from './sound';
import Action from './action';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// const base = document.createElement('img');
// base.src = "images/base.png";
// let baseAlive = false;

// const mainTheme = new Audio();
// mainTheme.src = "./audio/main-theme.mp3";
// const powerDown = new Audio();
// powerDown.src = "./audio/power-down.mp3"

// const shieldHeight = 460;
// const shieldCenter = 580;
// const shieldRadius = 220;

// let ufos = [new UFO(ctx), new UFO(ctx)];
// let ufoForce = ["x", "x"];
// let saucers = [new Saucer(ctx), new Saucer(ctx), new Saucer(ctx), new Saucer(ctx)];
// let saucerForce = [];
// let wings = [];
// let wingForce = [];
// let bonuses = [];


// var stroke = ["rgba(0, 128, 255)", "rgba(255, 128, 0", "red", "white", "rgba(0, 0, 0, 0)"];
// var fill = ["rgba(0, 0, 51)", "rgba(51, 25, 0)", "rgba(51, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"];
// let shieldIndex = 3;

// let paused = true
// let gameOver = false; 
// let wave = 1; 

let sound = new Sound;
sound.toggleMusic();
let base = new Base(ctx, sound);
let game = new Game(ctx, canvas, sound, base);
let typing = new Typing(ctx, game, sound);
let action = new Action(ctx, canvas, sound, base, game, typing);

// const typer = document.getElementById("typing-box");

const startScreen = document.getElementById("start");


const startup = () => { 
    startScreen.removeEventListener("click", startup);
    startScreen.classList.add("hidden");
    base.shieldIndex = 3;
    sound.mainTheme.play();
    sound.mainTheme.loop = true; 
    typing.typer.focus();
    // baseAlive = true; 
    base.baseAlive = true; 
    const startInt = setInterval(function() {game.clear(), base.drawShield(),  base.drawBase(), action.displayWave()}, 40);
    
    setTimeout(() => {
        base.shieldIndex -= 1;
    }, 2060)

    setTimeout(() => {
        base.shieldIndex -= 1;
    }, 2740)

    setTimeout(() => {
        base.shieldIndex -= 1;
    }, 3420)

    setTimeout(() => {
        clearInterval(startInt);
        action.paused = false; 
        action.renderGame();
    }, 4000)
}


    startScreen.addEventListener("click", startup); 

// const restartGame = () => {
//     base.shieldIndex = 3;
//     action.waveInterval = 6000;
    
    
//     typing.resetPoints();

//     sound.mainTheme.currentTime = 0;
//     sound.mainTheme.play();
//     sound.mainTheme.loop = true; 
//     typing.typer.focus();
//     base.baseAlive = true; 
//     const startInt = setInterval(function() {clear(), base.drawShield(), action.displayWave(), base.drawBase(), 
//     typing.displayPoints()}, 40);
    
//     setTimeout(() => {
//         base.shieldIndex -= 1;
//     }, 2060)

//     setTimeout(() => {
//         base.shieldIndex -= 1;
//     }, 2740)

//     setTimeout(() => {
//         base.shieldIndex -= 1;
//     }, 3420)

//     setTimeout(() => {
//         action.paused = false;
//         game = new Game(ctx, canvas, sound, base); 
//         typing.game = game; 
//         action.renderGame();
//         clearInterval(startInt);
//     }, 4000)
// }

// const endScreen = () => {
//     if (base.shieldIndex >= 4) {
//         clear();
//         ending.gameOverEvents();
//         sound.mainTheme.pause();
//         ending.finalWaveDisplay();
//         ending.finalExplosion();
//         baseAlive = false;
//         paused = true; 
//         renderGame();
//         gameOver = true; 
//         game.ufos.length = 0;
//         game.ufoForce.lenght = 0;
//         game.saucers.lenght = 0;
//         game.saucerForce.length = 0;
//         game.wings.length = 0;
//         game.wingForce.length = 0;
//         game.bonuses.length = 0;

//         canvas.addEventListener('click', () => {
//             if (gameOver) {
//                 restartGame();
//                 sound.gameOverMusic.pause();
//             } else {
//              null;
//             }
//         }
//     )}
// }; 



// const speaker = document.getElementById("speaker");
// var sound.isPlaying = true; 
// speaker.addEventListener('click', () => {
//     if (sound.isPlaying) {
//         speaker.classList.remove("fa-volume-up");
//         speaker.classList.add("fa-volume-mute");
//         mainTheme.muted = true;
//         sound.isPlaying = false;
//     } else {
//         speaker.classList.remove("fa-volume-mute");
//         speaker.classList.add("fa-volume-up");
//         mainTheme.muted = false; 
//         sound.isPlaying = true; 
//     }
//     typer.focus();
// })



// const drawBase = () => {
//     if (base.baseAlive) {
//         ctx.beginPath();
//         ctx.drawImage(base, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
//         ctx.closePath();
//     }
// }

// const rechargeShield = () => {
//     if (base.shieldIndex > 0 && baseAlive) {
//         base.shieldIndex -= 1;
//         sound.powerUp.play(); 
//     }
// }



// let lights = 0;
// const flash = () => {
//     if (lights === 0) {
//         lights = 32;
//     } else if (lights === 32) {
//         lights = 0;
//     }
// }

// const spawnUFOs = () => {
//     let i = 0;
//     let squadSize = ufoForce.length;
//     const spawnInterval = setInterval(() => {
//         ufos.push(new UFO(ctx));
//         i++;
//         if (i > squadSize) {
//             clearInterval(spawnInterval);
//         }
//     }, 3000)
// }

// const drawUFOs = () => {
//     let dy = 0.75;
//     const ufoImg = new Image();
//     ufoImg.src = "./images/mod-ufo.png";
//     ufos.forEach((ufo, i) => {
//         let dx = (ufo.x - 575) / (ufo.y - shieldHeight - 140);
//         ctx.drawImage(ufoImg, 0, lights, 32, 32, ufo.x, ufo.y, 42, 42),
//         ufo.x += dx,
//         ufo.y += dy,
//         ufo.drawText();
    
//         if ((ufo.y > shieldHeight ) && 
//             ((ufo.x > shieldCenter - (shieldRadius + 10)) && 
//             (ufo.x < shieldCenter + (shieldRadius - 10))) ||
//             (ufo.y > shieldHeight + 30) && 
//             ((ufo.x > shieldCenter - (shieldRadius + 20)) && 
//             (ufo.x < shieldCenter + (shieldRadius - 20))) || 
//             (ufo.y > shieldHeight + 50) && 
//             ((ufo.x > shieldCenter - (shieldRadius + 40)) && 
//             (ufo.x < shieldCenter + (shieldRadius - 40))))
//             {

//                 if (isPlaying) {
//                     powerDown.play();
//                 }
//                 ufo.drawExplosion(ufo.x, ufo.y);
//                 delete ufos[i];
//                 shieldIndex++;
//             }
//     });
// }

// const addUFOs = () => {
//     ufoForce.push("x");
// }

// const spawnSaucers = () => {
//     let i = 0;
//     let squadSize = saucerForce.length;
//     const spawnInterval = setInterval(() => {
//         saucers.push(new Saucer(ctx));
//         i++;
//         if (i > squadSize) {
//             clearInterval(spawnInterval);
//         }
//     }, 3000)
// }

// const drawSaucers = () => {
//     let dy = 1.25;
//     const saucerImg = new Image();
//     saucerImg.src = "./images/mod-saucer.png";
//     saucers.forEach((saucer, i) => {
//         let dx = (saucer.x - 575) / (saucer.y - shieldHeight);
//         ctx.drawImage(saucerImg, 0, lights, 32, 32, saucer.x, saucer.y, 42, 42),
//         saucer.x += dx,
//         saucer.y += dy,
//         saucer.drawText();

//         if (saucer.y > shieldHeight ) {
//             if (isPlaying) {
//                 powerDown.play();
//             }
//             saucer.drawExplosion(saucer.x, saucer.y);
//             delete saucers[i];
//             shieldIndex++;
//         }
//     });
// }

// const addSaucers = () => {
//     saucerForce.push("x");
// }

// const spawnWings = () => {
//     let i = 0;
//     let squadSize = wingForce.length;
//     const spawnInterval = setInterval(() => {
//         wings.push(new Wing(ctx));
//         i++;
//         if (i > squadSize) {
//             clearInterval(spawnInterval);
//         }
//     }, 6000)
// }

// const drawWings = () => {
//     let dy = 1.75;
//     const wingImg = new Image();
//     wingImg.src = "./images/mod-wing.png";
//     wings.forEach((wing, i) => {
//         let dx = (wing.x - 575) / (wing.y - shieldHeight - 25);
//         ctx.drawImage(wingImg, 0, lights, 32, 32, wing.x, wing.y, 42, 42),
//         wing.x += dx,
//         wing.y += dy,
//         wing.drawText();

//         if (wing.y > shieldHeight ) {
//             if (isPlaying) {
//                 powerDown.play();
//             }
//             wing.drawExplosion(wing.x, wing.y);
//             delete wings[i];
//             shieldIndex++;
//         }
//     });
// }

// const addWings = () => {
//     wingForce.push("x");
// }

// const clear = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// const clearEnemies = () => {
//     game.bonuses.push(new BonusSaucer(ctx));
// }

// const drawBonus = () => {
//     bonuses.forEach((bonus, i) => {
//         isPlaying ? bonus.bonusSound.play() : bonus.bonusSound.pause();

//         if (bonus.x > canvas.width) {
//             delete bonuses[i];
//             bonus.bonusSound.pause();
//         } 

//         let dx = 4;
//         ctx.drawImage(bonus.bonusImg, 0, 0, 32, 32, bonus.x, bonus.y, 55, 55),
//         bonus.x += dx,
//         bonus.drawText();
//     })
// }



// let waveInterval = 6000;
// const updateWave = () => {
//     if (baseAlive && (game.ufos.every(el => el === "") && game.saucers.every(el => el === "") && game.wings.every(el => el === ""))) {
//         wave++;
//         waveInterval += 6000;
//     }
// }

// const displayWave = () => {
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.font = 'bold 30px Arial';
//     ctx.fillText(`Wave ${ending.wave}`, 1000, 670);
//     ctx.fill();
//     ctx.closePath();
// }

// class Action {
//     constructor(base, game, typing, ending) {
//         this.gameEvents; 
//         this.gameEnemies; 
//         this.gameEnemiesTwo; 
//         this.drawEverything; 
//         this.theRecharge; 
//         this.theBonus; 
//         this.theFlash;

//         this.base = base; 
//         this.game = game; 
//         this.typing = typing;
//         this.ending = ending;  
//     }

//     renderGame() {
//         if (!ending.paused) { 
//             this.gameEvents = setInterval(function() {this.game.spawnUFOs(), ending.updateWave()}, ending.waveInterval);
//             this.gameEnemies = setInterval(function() {this.game.spawnSaucers(), this.game.spawnWings()}, ending.waveInterval * 2);
//             this.gameEnemiesTwo = setInterval(function() {this.game.addUFOs(), this.game.addSaucers(), this.game.addWings()}, ending.waveInterval * 5);
//             this.drawEverything = setInterval(function() {this.game.clear(), this.game.drawBonus(); this.base.drawShield(), this.base.drawBase(),
//                 this.ending.displayWave(), this.typing.displayPoints(), this.game.drawUFOs(), this.game.drawSaucers(), this.game.drawWings(), this.ending.endScreen()}, 25);
//             this.theRecharge = setInterval(this.base.rechargeShield, 10000)
//             this.theBonus = setInterval(this.game.createBonus, 30000);
//             this.theFlash = setInterval(this.game.flash, 200);
//             this.typing.typeWord();
    
//         } else {
//             clearInterval(this.gameEvents);
//             clearInterval(this.gameEnemies);
//             clearInterval(this.gameEnemiesTwo);
//             clearInterval(this.drawEverything);
//             clearInterval(this.theRecharge);
//             clearInterval(this.theBonus);
//             clearInterval(this.theFlash); 
//         }
//     }
// }

// export default Action; 
