import GameOver from './game_over';
import Game from './game_objects';

class Action {
    constructor(ctx, canvas, sound, base, game, typing) {
        this.gameOver = false;
        this.paused = true; 
        this.wave = 1;
        this.waveInterval = 7000;
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
        this.ctx.fillText(`Wave ${this.wave}`, 800, 670);
        this.ctx.fill();
        this.ctx.closePath();
    }

    displayCombo() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillText(`${this.game.combo}x combo`, 1000, 600);
        this.ctx.fill();
        this.ctx.closePath();
    }

    updateWave() {
        if (this.game.ufos.length === 0 && this.game.saucers.length === 0 && this.game.wings.length === 0) {
            this.wave ++;
            this.waveInterval += 1000;
        }
    }

    baseDestroyed() {
        if (this.base.shieldIndex >= 4) {
            this.typing.stopTyping();
            this.sound.powerUp.pause();
            this.sound.powerDown.pause();
            this.sound.bonusSound.pause();
            let ending = new GameOver(this.ctx, this.game, this.canvas, this.sound,
                this.base, this.wave, this.typing.totalPoints);
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
        this.typer.value = "";
    
        this.sound.mainTheme.currentTime = 0;
        this.sound.mainTheme.play();
        this.sound.mainTheme.loop = true; 
        this.typing.typer.focus();
        this.base.baseAlive = true; 
        const startInt = setInterval(() => {this.game.clear(), this.base.drawShield(),
            this.base.drawBase() }, 40);

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
            this.waveEvents4();
            this.waveEvents5();

            this.drawEverything = setInterval(() => {this.game.clear(), this.game.drawBonus(),
                this.base.drawShield(), this.base.drawBase(), this.displayCombo(),
                this.displayWave(), this.typing.displayPoints(), this.game.drawUFOs(),
                this.game.drawSaucers(), this.game.drawWings(), this.baseDestroyed()}, 25);
            this.theFlash = setInterval(this.game.flash, 200);
            this.typing.startTyping();
            this.canvasClick();
        }
    }

    waveEvents1() {
        this.gameEvents = setInterval(() => {this.updateWave(), this.game.spawnUFOs(),
            this.game.spawnSaucers(), this.game.spawnWings(), clearInterval(this.gameEvents),
            this.waveEvents1()}, this.waveInterval);
    }

    waveEvents2() {
        this.gameEnemies = setInterval(() => {this.game.addUFOs(), clearInterval(this.gameEnemies),
            this.waveEvents2()}, this.waveInterval * 2);
    }

    waveEvents3() {
        this.gameEnemiesTwo = setInterval(() => {this.game.addSaucers(), clearInterval(this.gameEnemiesTwo),
            this.waveEvents3()}, this.waveInterval * 4);
    }

    waveEvents4() {
        this.gameEnemiesThree = setInterval(() => {this.game.addWings(),
            clearInterval(this.gameEnemiesThree), this.waveEvents4()}, this.waveInterval * 5);
    }

    waveEvents5() {
        this.theBonus = setInterval(() => {this.game.createBonus(this.base.shieldIndex),
            clearInterval(this.theBonus), this.waveEvents5()}, this.waveInterval * 3);
    }

    stopGame() {
        clearInterval(this.gameEvents);
        clearInterval(this.gameEnemies);
        clearInterval(this.gameEnemiesTwo);
        clearInterval(this.gameEnemiesThree);
        clearInterval(this.drawEverything);
        clearInterval(this.theBonus);
        clearInterval(this.theFlash); 
    }
}

export default Action; 