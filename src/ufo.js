import { ufoWords } from './ufo_words';

class UFO {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * canvas.width - 42) + 42;
        this.y = 1;
        this.width = 42;
        this.height = 42;
        this.word = ufoWords[Math.floor(Math.random() * 63)];
    }

    drawText() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 18px "Arial"';
        this.ctx.fillText(this.word, this.x, this.y - 7);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPoints(x, y) {
        let i = 0;
        const pointFlash = setInterval(() => {
            this.ctx.beginPath();
            this.ctx.fillStyle = "green";
            this.ctx.font = 'bold 10px Arial';
            this.ctx.fillText('1', x, y);
            this.ctx.fill();
            this.ctx.closePath();
            i++;
            if (i % 9 === 0) {
                clearInterval(pointFlash);
            }
        }, 25)
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

export default UFO; 


