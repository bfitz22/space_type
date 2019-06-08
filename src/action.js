import GameOver from './game_over';
import Game from './game_objects';

class Action {
    constructor(ctx, canvas, sound, base, game, typing) {
        this.gameEvents; 
        this.gameEnemies; 
        this.gameEnemiesTwo; 
        this.drawEverything; 
        this.theRecharge; 
        this.theBonus; 
        this.theFlash;

        this.gameOver = false;
        this.paused = true; 
        this.wave = 1;
        this.waveInterval = 3000;
        this.ctx = ctx;
        this.canvas = canvas;
        this.sound = sound;
        this.base = base; 
        this.game = game; 
        this.typing = typing;
        this.typer = document.getElementById("typing-box");
        this.clickToRestart = this.clickToRestart.bind(this);    
    }

    displayWave() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillText(`Wave ${this.wave}`, 1000, 670);
        this.ctx.fill();
        this.ctx.closePath();
    }

    updateWave() {
        this.wave ++;
        this.waveInterval += 3000;
    }

    baseDestroyed() {
        if (this.base.shieldIndex >= 4) {
            this.sound.powerUp.pause();
            this.sound.powerDown.pause();
            this.sound.bonusSound.pause();
            let ending = new GameOver(this.ctx, this.game, this.canvas, this.sound, this.base, this.wave, this.typing.totalPoints);
            ending.endScreen();
            this.paused = true;
            this.stopGame();
            this.gameOver = true; 
        }; 
    }

    restartGame() {
        this.base.shieldIndex = 3;
        this.wave = 1;
        this.waveInterval = 6000;
        this.typing.resetPoints();
    
        this.sound.mainTheme.currentTime = 0;
        this.sound.mainTheme.play();
        this.sound.mainTheme.loop = true; 
        this.typing.typer.focus();
        this.base.baseAlive = true; 
        const startInt = setInterval(() => {this.game.clear(), this.base.drawShield(), this.base.drawBase() 
        }, 40);

        setTimeout(() => {
            this.base.shieldIndex -= 1;
        }, 2060)
    
        setTimeout(() => {
            this.base.shieldIndex -= 1;
        }, 2740)
    
        setTimeout(() => {
           this.base.shieldIndex -= 1;
        }, 3420)
    
        setTimeout(() => {
            this.paused = false;
            this.game = new Game(this.ctx, this.canvas, this.sound, this.base); 
            this.typing.game = this.game; 
            this.renderGame();
            clearInterval(startInt);
        }, 4000)
    }

    canvasClick() {
        this.canvas.addEventListener('click', this.clickToRestart);
    }

    clickToRestart() {
        if (this.gameOver) {
            this.restartGame();
            this.sound.gameOverMusic.pause();
            this.canvas.removeEventListener('click', this.clickToRestart)
        } else {
            this.typer.focus();
        }
    }

    renderGame() {
        if (!this.paused) { 
            this.waveEvents1();
            this.waveEvents2();
            this.waveEvents3();

            this.drawEverything = setInterval(() => {this.game.clear(), this.game.drawBonus(); this.base.drawShield(), this.base.drawBase(),
                this.displayWave(), this.typing.displayPoints(), this.game.drawUFOs(), this.game.drawSaucers(), this.game.drawWings(), this.baseDestroyed()}, 25);
            this.theRecharge = setInterval(this.base.rechargeShield, 10000)
            this.theBonus = setInterval(this.game.createBonus, 30000);
            this.theFlash = setInterval(this.game.flash, 200);
            this.typing.typeWord();
            this.canvasClick();
        }
    }

    waveEvents1() {
        this.gameEvents = setInterval(() => {this.game.spawnUFOs(), this.updateWave(), clearInterval(this.gameEvents), this.waveEvents1()}, this.waveInterval);
    }

    waveEvents2() {
        this.gameEnemies = setInterval(() => {this.game.spawnSaucers(), this.game.spawnWings(), clearInterval(this.gameEnemies), this.waveEvents2()}, this.waveInterval);
    }

    waveEvents3() {
        this.gameEnemiesTwo = setInterval(() => {this.game.addUFOs(), this.game.addSaucers(), this.game.addWings(), clearInterval(this.gameEnemiesTwo), this.waveEvents3()}, this.waveInterval * 2);
    }

    stopGame() {
        clearInterval(this.gameEvents);
        clearInterval(this.gameEnemies);
        clearInterval(this.gameEnemiesTwo);
        clearInterval(this.drawEverything);
        clearInterval(this.theRecharge);
        clearInterval(this.theBonus);
        clearInterval(this.theFlash); 
    }
}

export default Action; 