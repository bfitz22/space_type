class Saucer {
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
    
    drawSaucer() {
        const saucerImg = new Image();
        saucerImg.src = "./images/mod-saucer.png";
        this.ctx.drawImage(saucerImg, 0, 0, 32, 32, this.x, this.y, 42, 42);
    }

    drawSaucerBlink() {
        const saucerImg = new Image();
        saucerImg.src = "./images/mod-saucer.png";
        this.ctx.drawImage(saucerImg, 0, 32, 32, 32, this.x + 42, this.y, 42, 42);
    }
}

export default Saucer; 