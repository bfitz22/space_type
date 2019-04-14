export const typeWord = (ctx, ufos, saucers, wings) => {
    let typer = document.getElementById("typing-box");
    typer.addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
            // var ufo = ufos.find(ufo => ufo.word === e.target.value);
            // ufos = ufos.filter(ufo => ufo.word !== e.target.value),
            ufos.forEach((ufo, i) => {
                if (ufo.word === e.target.value) {
                    delete ufos[i];
                    laser(ctx, ufo.x + 21, ufo.y + 21);
                    ufo.drawExplosion(ufo.x, ufo.y);
                }
            });
            saucers.forEach((saucer, i) => {
                if (saucer.word === e.target.value) {
                    delete saucers[i];
                    laser(ctx, saucer.x + 21, saucer.y + 21);
                    saucer.drawExplosion(saucer.x, saucer.y);
                }
            });
            wings.forEach((wing, i) => {
                if (wing.word === e.target.value) {
                    delete wings[i];
                    laser(ctx, wing.x + 21, wing.y + 21);
                    wing.drawExplosion(wing.x, wing.y);
                }
            });
            e.target.value = "";
            // laser(ufo.x + 21, ufo.y + 21);
            // ufo.drawExplosion(ufo.x, ufo.y);
        }
    })
}

const laser = (x, y) => {
    let i = 0;
    const laser = setInterval(() => {
        if (i < 25) {
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.5, 525);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.closePath();
        } else {
            clearInterval(laser);
        }
        i++;
    })
}