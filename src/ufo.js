

class UFO {
    constructor(ctx, x, y, word) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.scaledSize = 64;
        this.width = 32;
        this.height = 32;
        this.word = word;
        // this.vel = vel;
    }
    
    drawUFO(index) {
        const UFOImg = new Image();
        UFOImg.src = "./images/mod-ufo.png";
        this.ctx.drawImage(UFOImg, 0, index, 32, 32, this.x, this.y, 42, 42);
    }

    // drawUFOBlink() {
    //     const UFOImg = new Image();
    //     UFOImg.src = "./images/mod-ufo.png";
    //     this.ctx.drawImage(UFOImg, 0, 32, 32, 32, this.x + 42, this.y, 42, 42);
    // }

    drawText() {
        this.ctx.beginPath();
        this.ctx.shadowColor = "rgba(0, 0, 0)";
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 18px "Roboto Slab"';
        this.ctx.fillText(this.word, this.x, this.y - 7);
        this.ctx.fill();
        this.ctx.shadowBlur = 3;
        this.ctx.closePath();
    }

    drawExplosion() {
        const boomImg = new Image();
        boomImg.src = "./images/explosion.png";
        this.ctx.drawImage(boomImg, 0, 0, 32, 32, this.x, this.y, 42, 42);
    }
}

export default UFO; 

// var x = canvas.width/2;
// var y = canvas.height/2;
// var dx = -1;
// var dy = 1;

// function draw() {
//     x += dx;
//     y += dy;
//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//         changeColor();
//         clear();
//     }

//     if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//         dy = -dy;
//         changeColor();
//         clear();
//     }
// }