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
        this.waveInterval = 6000;
        this.ctx = ctx;
        this.canvas = canvas;
        this.sound = sound;
        this.base = base; 
        this.game = game; 
        this.typing = typing;
        // this.ending = new GameOver(this.ctx, this.game, this.canvas, this.sound, this.base);    
        this.typer = document.getElementById("typing-box");    
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
        this.waveInterval += 6000;
    }

    baseDestroyed() {
        if (this.base.shieldIndex >= 4) {
            let ending = new GameOver(this.ctx, this.game, this.canvas, this.sound, this.base, this.wave);
            ending.endScreen();
            this.paused = true;
            this.stopGame();
            this.gameOver = true; 
            
        //     this.game.clear();
        //     ending.gameOverEvents();
        //     this.sound.mainTheme.pause();
        //     ending.finalExplosion();
        //     ending.finalWaveDisplay();
        //     this.base.baseAlive = false;
        //     this.action.paused = true; 
        //     this.action.renderGame();
        //     this.gameOver = true; 
           
    
        //     canvas.addEventListener('click', () => {
        //         if (this.gameOver) {
        //             restartGame();
        //             sound.gameOverMusic.pause();
        //         } else {
        //          null;
        //         }
        //     }
        // )}
        }; 
    }

    restartGame() {
        this.base.shieldIndex = 3;
        this.waveInterval = 6000;
        
        
        this.typing.resetPoints();
    
        this.sound.mainTheme.currentTime = 0;
        this.sound.mainTheme.play();
        this.sound.mainTheme.loop = true; 
        this.typing.typer.focus();
        this.base.baseAlive = true; 
        const startInt = setInterval(() => {this.game.clear(), this.base.drawShield(), this.displayWave(), this.base.drawBase(), 
        this.typing.displayPoints()}, 40);
        
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
        this.canvas.addEventListener('click', () => {
            if (this.gameOver) {
                this.restartGame();
                this.sound.gameOverMusic.pause();
            } else {
                this.typer.focus();
            }
        })
    }

    renderGame() {
        if (!this.paused) { 
            this.gameEvents = setInterval(() => {this.game.spawnUFOs(), this.updateWave()}, this.waveInterval);
            this.gameEnemies = setInterval(() => {this.game.spawnSaucers(), this.game.spawnWings()}, this.waveInterval * 2);
            this.gameEnemiesTwo = setInterval(() => {this.game.addUFOs(), this.game.addSaucers(), this.game.addWings()}, this.waveInterval * 5);
            this.drawEverything = setInterval(() => {this.game.clear(), this.game.drawBonus(); this.base.drawShield(), this.base.drawBase(),
                this.displayWave(), this.typing.displayPoints(), this.game.drawUFOs(), this.game.drawSaucers(), this.game.drawWings(), this.baseDestroyed()}, 25);
            this.theRecharge = setInterval(this.base.rechargeShield, 10000)
            this.theBonus = setInterval(this.game.createBonus, 30000);
            this.theFlash = setInterval(this.game.flash, 200);
            this.typing.typeWord();
            this.canvasClick();
    
        // } else {
        //     clearInterval(this.gameEvents);
        //     clearInterval(this.gameEnemies);
        //     clearInterval(this.gameEnemiesTwo);
        //     clearInterval(this.drawEverything);
        //     clearInterval(this.theRecharge);
        //     clearInterval(this.theBonus);
        //     clearInterval(this.theFlash); 
        }
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