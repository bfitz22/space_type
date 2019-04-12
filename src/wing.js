class Wing {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.scaledSize = 64;
        this.width = 32;
        this.height = 32;

        // this.word = word;
        // this.vel = vel;
    }
    
    drawWing(index) {
        const wingImg = new Image();
        wingImg.src = "./images/mod-wing.png";
        this.ctx.drawImage(wingImg, 0, index, 32, 32, this.x, this.y, 42, 42);
    }

    drawWingBlink() {
        const wingImg = new Image();
        wingImg.src = "./images/mod-wing.png";
        this.ctx.drawImage(wingImg, 0, 32, 32, 32, this.x + 42, this.y, 42, 42);
    }
}

export default Wing; 