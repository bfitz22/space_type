

class BonusSaucer {
    constructor(ctx) {
        this.bonusWords = 
        ["superintendent",
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
        "extraterrestrial"];
        this.ctx = ctx;
        this.x = 10;
        this.y = 20;
        this.word = this.bonusWords[Math.floor(Math.random() * 15)];
        this.bonusImg = new Image();
        this.bonusImg.src = "./images/big_saucer.png";
        this.bonusSound = new Audio();
        this.bonusSound.src = "./audio/big_saucer.mp3";
    }

    drawText() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 18px "Arial"';
        this.ctx.fillText(this.word, this.x, this.y - 7);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawExplosion(x, y) {
        let i = 0;
        let j = 0;
        const boomImg = new Image();
        boomImg.src = "./images/explosion.png";
        const explosion = setInterval(() => {
            this.ctx.drawImage(boomImg, 0, i, 32, 32, x, y, 42, 42);
            j++;
            if (j % 3 === 0) {
            i += 32 
            }
            if (i > 64) {
                clearInterval(explosion);
            }
        }, 25)
    }
}

export default BonusSaucer; 