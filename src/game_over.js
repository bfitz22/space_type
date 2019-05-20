export const gameOverEvents = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = 'bold 100px Arial';
    ctx.fillText("Game Over", 330, 100);
    ctx.fill();
    ctx.closePath();
    const gameOverMusic = new Audio();
    gameOverMusic.src = "./audio/game_over.mp3";
    gameOverMusic.loop = false; 
    gameOverMusic.play();
}

export const finalWaveCount = (ctx, wave) => {
    let finalWaveCount = wave - 1;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = 'bold 50px Arial';
    ctx.fillText(`you survived ${finalWaveCount} waves`, 335, 300);
    ctx.fillText("click anywhere to restart", 325, 400);
    ctx.fill();
    ctx.closePath();
}

export const finalExplosion = (ctx, canvas) => {
    let i = 0;
    let j = 0;
    const boomImg = new Image();
    boomImg.src = "./images/explosion.png";
    const explosion = setInterval(() => {
        ctx.drawImage(boomImg, 0, i, 32, 32, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
        j++;
        if (j % 15 === 0) {
        i += 32 
        }
        if (i > 64) {
            clearInterval(explosion);
        }
    }, 25)
}