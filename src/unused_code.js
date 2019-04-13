function spawnUFOs() {
    // if ((y + dy > shieldHeight && (x === 600 )) || 
    // ((y + dy > canvas.height) && (x > 590 && x < 610))) {
    // {
    // dy = 0;
    //     stroke = "rgba(255, 128, 0";
    //     fill = "rgba(51, 25, 0)";
    //     ufo.drawExplosion();
    // }
    let dx = (x - 550) / (y - 600);
    
    ctx.beginPath();
    const ufo = new UFO(ctx, x, y, l);
    ufo.drawUFO(index);
    ufo.drawText();
    x += dx;
    y += dy;
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
        
    this.ctx.drawImage(this.UFOImg,
    frameX * this.width, frameY * this.height, this.width, this.height,
    canvasX, canvasY, this.scaledSize, this.scaledSize);
    
}
    
function init(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    requestAnimationFrame(this.step);
}

function step() {
    let cycleLoop = [0, 1];
    let currentIndex = 0;

    this.frameCount++;
    if (this.frameCount < 15) {
        this.init();
        return;
    }
    this.frameCount = 0;
    
    // while( currentIndex < 2 ) {
        this.drawFrame(0, cycleLoop[currentIndex], 0, 0);
        console.log(currentIndex);
        currentIndex ++;
    if (currentIndex >= cycleLoop.length) {
        currentIndex = 0;
    }
    // }
}