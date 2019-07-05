class BonusSaucer {
    constructor(ctx, shieldIndex) {
        this.bonusWords = 
        [
            "superintendent",
            "disappointment",
            "comprehensive",
            "short circuit",
            "correspondence",
            "demonstration",
            "entertainment",
            "identification",
            "supplementary",
            "embarrassment",
            "infrastructure",
            "communication",
            "preoccupation",
            "rehabilitation",
            "extraterrestrial"
        ];
        this.ctx = ctx;
        this.shieldIndex = shieldIndex;
        this.x = 10;
        this.y = 20;
        this.word = this.shieldIndex > 0 ? 
            "recharge" : 
            this.bonusWords[Math.floor(Math.random() * 15)];
        this.bonusImg = new Image();
        this.bonusImg.src = "./images/big_saucer.png";
    }

    drawText() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 18px "Arial"';
        this.ctx.fillText(this.word, this.x, this.y - 7);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPoints(combo, extras, x, y) {
        let i = 1;
        const pointFlash = setInterval(() => {
            this.ctx.beginPath();
            this.ctx.fillStyle = "green";
            this.ctx.font = 'bold 20px Arial';
            this.ctx.fillText(`${10 * combo + extras}`, x, y);
            this.ctx.fill();
            this.ctx.closePath();
            i++;
            if (i % 75 === 0) {
                clearInterval(pointFlash);
            }
        }, 5)
    }

    drawExplosion(x, y) {
        let i = 0;
        let j = 0;
        const boomImg = new Image();
        boomImg.src = "./images/explosion.png";
        const explosion = setInterval(() => {
            this.ctx.drawImage(boomImg, 0, i, 32, 32, x, y, 42, 42);
            j++;
            if (j % 4 === 0) {
            i += 32 
            }
            if (i > 64) {
                clearInterval(explosion);
            }
        }, 20)
    }
}

export default BonusSaucer; 