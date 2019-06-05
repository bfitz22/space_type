class GameOver {

    constructor(ctx, canvas, sound) {
        this.ctx = ctx;
        this.canvas = canvas; 
        this.wave = 1;
        this.waveInterval = 6000;
        this.sound = sound; 
        this.finalWaveDisplay = this.finalWaveDisplay.bind(this);
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

     gameOverEvents() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 100px Arial';
        this.ctx.fillText("Game Over", 330, 100);
        this.ctx.fill();
        this.ctx.closePath();
        this.sound.gameOverMusic.currentTime = 0;
        this.sound.gameOverMusic.play();
    }
    
     finalWaveDisplay() {
        let finalWaveCount = this.wave - 1;
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 50px Arial';
        this.ctx.fillText(`you survived ${finalWaveCount} waves`, 335, 300);
        this.ctx.fillText("click anywhere to restart", 325, 400);
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