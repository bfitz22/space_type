class Wing {
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
    
    drawWing(index) {
        const wingImg = new Image();
        wingImg.src = "./images/mod-wing.png";
        this.ctx.drawImage(wingImg, 0, index, 32, 32, this.x, this.y, 42, 42);
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