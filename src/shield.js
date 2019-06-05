class Shield {

    constructor(ctx, baseAlive, stroke, fill, sound) {
        this.ctx = ctx;
        this.baseAlive = baseAlive;
        this.stroke = stroke;
        this.fill = fill;
        this.shieldIndex = 0;
        this.shieldHeight = 460;
        this.shieldCenter = 580;
        this.shieldRadius = 220;
        this.sound = sound;
        // this.rechargeInterval = null; 
        this.rechargeShield = this.rechargeShield.bind(this);
    }

    drawShield() { 
        if (this.baseAlive) {
            this.ctx.beginPath();
            this.ctx.moveTo(450, 700);
            this.ctx.bezierCurveTo(465, 425, 730, 425, 750, 700);
            this.ctx.strokeStyle = this.stroke[this.shieldIndex];
            this.ctx.fillStyle = this.fill[this.shieldIndex];
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.shadowColor = 100;
            this.ctx.lineWidth = 8;
            this.ctx.closePath();
        }
        // if (shieldIndex >= 4) {
        //     gameOver(ctx);
        //     mainTheme.pause();
        //     gameOverMusic.play();
        //     finalWaveCount(ctx, wave);
        //     finalExplosion(ctx, canvas);
        //     baseAlive = false;
        //     paused = true; 
        // }
    }

    rechargeShield() {
        if (this.shieldIndex > 0 && this.baseAlive) {
            // if (this.rechargeInterval || this.shieldIndex <= 0) {
            //      clearInterval(this.rechargeInterval); 
            // } else {
            //     null;
            // }
            // this.rechargeInterval = setInterval(() => {
            //     this.shieldIndex -= 1;
            //     this.sound.powerUp.play(); 
            // }, 10000)
            this.shieldIndex -= 1;
            this.sound.powerUp.play(); 
        }
    }
}

export default Shield;