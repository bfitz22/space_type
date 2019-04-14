import randomWords from 'random-words';

class UFO {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * canvas.width - 42) + 42;
        this.y = 1;
        this.width = 42;
        this.height = 42;
        this.word = randomWords();
        // this.vel = vel;
    }

    drawText() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 18px "Roboto Slab"';
        this.ctx.fillText(this.word, this.x, this.y - 7);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawExplosion(x, y) {
        const boomImg = new Image();
        boomImg.src = "./images/explosion.png";
        this.ctx.drawImage(boomImg, 0, 0, 32, 32, x, y, 42, 42);
    }
}

export default UFO; 


