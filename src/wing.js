import randomWords from 'random-words';

class Wing {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = Math.floor(Math.random() * canvas.width - 42) + 42;
        this.y = 1;
        this.scaledSize = 64;
        this.width = 42;
        this.height = 42;
        this.word = randomWords();

        // this.word = word;
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
}

export default Wing; 