export function typeWord(ctx, ufos, saucers, wings, bonuses, isPlaying) {
    let typer = document.getElementById("typing-box");
    typer.addEventListener('keypress', (e) => {
        var key = e.which || e.keyCode;
        if (key === 13) {
            ufos.forEach((ufo, i) => {
                if (ufo.word === e.target.value) {
                    delete ufos[i];
                    laser(ctx, ufo.x + 21, ufo.y + 21, isPlaying);
                    ufo.drawExplosion(ufo.x, ufo.y);
                    // updatePoints(1);
                }
            });
            saucers.forEach((saucer, i) => {
                if (saucer.word === e.target.value) {
                    delete saucers[i];
                    laser(ctx, saucer.x + 21, saucer.y + 21, isPlaying);
                    saucer.drawExplosion(saucer.x, saucer.y);
                    // updatePoints(3);
                }
            });
            wings.forEach((wing, i) => {
                if (wing.word === e.target.value) {
                    delete wings[i];
                    laser(ctx, wing.x + 21, wing.y + 21, isPlaying);
                    wing.drawExplosion(wing.x, wing.y);
                    // updatePoints(5);
                }
            });
            bonuses.forEach((bonus, i) => {
                if (bonus.word === e.target.value) {
                    if (isPlaying) {
                        const bonusLaserSound = new Audio();
                        bonusLaserSound.src = './audio/big-laser.mp3';
                        bonusLaserSound.play();
                    }
                    delete bonuses[i];
                    bonus.bonusSound.pause();
                    laser(ctx, bonus.x + 21, bonus.y + 21, isPlaying);
                    bonus.drawExplosion(bonus.x, bonus.y);
                    ufos.forEach((ufo, i) => {
                        delete ufos[i];
                        bonusLaser(bonus.x + 21, bonus.y + 21, ufo.x + 21, ufo.y + 21, ctx);
                        ufo.drawExplosion(ufo.x, ufo.y);
                        // updatePoints(1);
                    })
                }
            })
            e.target.value = "";
        }
    })
}

const laser = (ctx, x, y, isPlaying) => {
    if (isPlaying) {
        const laserSound = new Audio();
        laserSound.src = "./audio/laser.mp3";
        laserSound.volume = 0.5;
        laserSound.play();
    }
    let i = 0;
    const laser = setInterval(() => {
        if (i < 25) {
            ctx.beginPath();
            ctx.moveTo(1200 * 0.5, 530);
            ctx.lineTo(x, y); 
            ctx.stroke();
            ctx.closePath();
        } else {
            clearInterval(laser);
        }
        i++;
    })
}

function bonusLaser(x1, y1, x2, y2, ctx) {
    let i = 0;
    const laser = setInterval(() => {
        if (i < 100) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "red";
            ctx.stroke();
            ctx.closePath();
        } else {
            clearInterval(laser);
        }
        i++;
    })
}