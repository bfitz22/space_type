class GameOver {

    constructor(ctx, game, canvas, sound, base, wave, points) {
        this.ctx = ctx;
        this.game = game; 
        this.canvas = canvas; 
        this.sound = sound; 
        this.base = base;
        this.wave = wave;
        this.points = points;
        this.endScreen = this.endScreen.bind(this);
        this.finalWaveDisplay = this.finalWaveDisplay.bind(this);
    }

    endScreen() {
        this.game.clear();
        this.gameOverEvents();
        this.sound.mainTheme.pause();
        this.finalExplosion();
        this.finalWaveDisplay();
        this.base.baseAlive = false; 
    }; 

     gameOverEvents() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 100px Arial';
        this.ctx.fillText("Game Over", 330, 125);
        this.ctx.fill();
        this.ctx.closePath();
        this.sound.gameOverMusic.currentTime = 0;
        this.sound.gameOverMusic.play();
    }
    
     finalWaveDisplay() {
        let finalWaveCount = this.wave - 1;
        let finalScore = this.points;
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 50px Arial';
        this.ctx.fillText(`you survived ${finalWaveCount} waves`, 325, 250);
        this.ctx.fillText(`you achieved ${finalScore} points`, 315, 350);
        this.ctx.fillText("click anywhere to restart", 315, 450);
        this.ctx.fill();
        this.ctx.closePath();
    }
    
     finalExplosion() {
        let i = 0;
        let j = 0;
        const boomImg = new Image();
        boomImg.src = "./images/explosion.png";
        const explosion = setInterval(() => {
            this.ctx.drawImage(boomImg, 0, i, 32, 32, this.canvas.width * 0.425, 525, this.canvas.width * 0.15, this.canvas.height * 0.25);
            j++;
            if (j % 15 === 0) {
            i += 32 
            }
            if (i > 64) {
                clearInterval(explosion);
            }
        }, 25)
    }

}


export default GameOver;

            // this.game.ufos.length = 0;
            // this.game.ufoForce.lenght = 0;
            // this.game.saucers.lenght = 0;
            // this.game.saucerForce.length = 0;
            // this.game.wings.length = 0;
            // this.game.wingForce.length = 0;
            // this.game.bonuses.length = 0;