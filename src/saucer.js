class Saucer {
    constructor(ctx, x, y, word) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.scaledSize = 64;
        this.width = 32;
        this.height = 32;
        this.word = word;

        // this.word = word;
        // this.vel = vel;
    }
    
    drawSaucer(index) {
        const saucerImg = new Image();
        saucerImg.src = "./images/mod-saucer.png";
        this.ctx.drawImage(saucerImg, 0, index, 32, 32, this.x, this.y, 42, 42);
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

export default Saucer; 