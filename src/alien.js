class Alien {
    constructor(ctx, word, pos) {
        this.ctx = ctx;
        this.word = word;
        this.pos = pos;
        // this.vel = vel;
        this.UFOSize = 50;
        this.saucerSize = 30;
        this.drawUFO = this.drawUFO.bind(this);
    }

    drawUFO() {
        const UFOImg = new Image();
        UFOImg.src = "./images/ufo.png";
        this.ctx.drawImage(UFOImg, this.pos[0], this.pos[1], this.UFOSize, this.UFOSize);
    }

    drawSaucer() {
        const SaucerImg = new Image();
        SaucerImg.src = "./images/ufo-y.png";
        this.ctx.drawImage(SaucerImg, this.pos[0], this.pos[1], this.saucerSize, this.saucerSize);
    }
}

export default Alien; 

