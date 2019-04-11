class Alien {
    constructor(ctx, word, pos) {
        this.ctx = ctx;
        this.word = word;
        this.pos = pos;
        // this.vel = vel;
        this.UFOSize = 30;
        this.saucerSize = 50;
    }

    drawUFO() {
        const UFOImg = new Image();
        UFOImg.src = "../images/ufo.png";
        this.ctx.drawImage(UFOImg, this.pos[0], this.pos[1], this.UFOSize, this.UFOSize);
    }
}

export default Alien; 

// export const drawUFO = (ctx, pos) => {
//     const UFOSize = 30;
//     const UFOImg = new Image();
//     UFOImg.src = "../images/ufo.png";
//     ctx.drawImage(UFOImg, pos[0], pos[1], UFOSize, UFOSize);
// }