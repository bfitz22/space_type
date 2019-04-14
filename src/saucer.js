import randomWords from 'random-words';

class Saucer {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * canvas.width - 42) + 42;
        this.y = 1;
        this.width = 42;
        this.height = 42;
        this.word = randomWords();

        // this.word = word;
        // this.vel = vel;
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
            if (j % 15 === 0) {
            i += 32 
            }
            if (i > 64) {
                clearInterval(explosion);
            }
        }, 25)
    }
}

export default Saucer; 