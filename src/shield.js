export const drawShield = (ctx, baseAlive, shieldIndex, stroke, fill, mainTheme, wave) => {
    const gameOverMusic = new Audio();
    gameOverMusic.src = "./audio/game_over.mp3";
    gameOverMusic.loop = false; 

    if (baseAlive) {
        ctx.beginPath();
        ctx.moveTo(450, 700);
        ctx.bezierCurveTo(465, 425, 730, 425, 750, 700);
        ctx.strokeStyle = stroke[shieldIndex];
        ctx.fillStyle = fill[shieldIndex];
        ctx.stroke();
        ctx.fill();
        ctx.shadowColor = 100;
        ctx.lineWidth = 8;
        ctx.closePath();
    }
    // if (shieldIndex >= 4) {
    //     gameOver(ctx);
    //     mainTheme.pause();
    //     gameOverMusic.play();
    //     finalWaveCount(ctx, wave);
    //     finalExplosion(ctx, canvas);
    //     baseAlive = false;
    //     paused = true; 
    // }
}

// export function rechargeShield(baseAlive, shieldIndex, isPlaying) {
//     const powerUp = new Audio();
//     powerUp.src = "./audio/power-up.mp3";

//     if (shieldIndex > 0 && baseAlive) {
//         shieldIndex -= 1;
//         isPlaying ? powerUp.play() : null; 
//     }
// }