import { gameOverEvents } from "./game_over";

class Typing {
    constructor(ctx, game, sound) {
        this.ctx = ctx; 
        this.game = game;
        this.sound = sound;
        this.typer = document.getElementById("typing-box");
        this.totalPoints = 0;
        this.laser = this.laser.bind(this);
        this.updatePoints = this.updatePoints.bind(this);
        this.bonusLaser = this.bonusLaser.bind(this);
    }

    typeWord() {
        this.typer.addEventListener('keypress', (e) => {
            var key = e.which || e.keyCode;
            if (key === 13) {
                this.game.ufos.forEach((ufo, i) => {
                    if (ufo.word === e.target.value) {
                        delete this.game.ufos[i];
                        this.laser(ufo.x + 21, ufo.y + 21);
                        ufo.drawExplosion(ufo.x, ufo.y);
                        this.updatePoints(1);
                    }
                });
                this.game.saucers.forEach((saucer, i) => {
                    if (saucer.word === e.target.value) {
                        delete this.game.saucers[i];
                        this.laser(saucer.x + 21, saucer.y + 21);
                        saucer.drawExplosion(saucer.x, saucer.y);
                        this.updatePoints(3);
                    }
                });
                this.game.wings.forEach((wing, i) => {
                    if (wing.word === e.target.value) {
                        delete this.game.wings[i];
                        this.laser(wing.x + 21, wing.y + 21);
                        wing.drawExplosion(wing.x, wing.y);
                        this.updatePoints(5);
                    }
                });
                this.game.bonuses.forEach((bonus, i) => {
                    if (bonus.word === e.target.value) {
                        this.sound.bonusLaserSound.play();
                        delete this.game.bonuses[i];
                        this.sound.bonusSound.pause();
                        this.laser(bonus.x + 21, bonus.y + 21);
                        bonus.drawExplosion(bonus.x, bonus.y);
                        this.game.ufos.forEach((ufo, i) => {
                            delete this.game.ufos[i];
                            this.bonusLaser(ufo.x + 21, ufo.y + 21);
                            ufo.drawExplosion(ufo.x, ufo.y);
                            this.updatePoints(1);
                        })
                        this.game.saucers.forEach((ufo, i) => {
                            delete this.game.saucers[i];
                            this.bonusLaser(ufo.x + 21, ufo.y + 21);
                            ufo.drawExplosion(ufo.x, ufo.y);
                            this.updatePoints(3);
                        })
                        this.game.wings.forEach((ufo, i) => {
                            delete this.game.wings[i];
                            this.bonusLaser(ufo.x + 21, ufo.y + 21);
                            ufo.drawExplosion(ufo.x, ufo.y);
                            this.updatePoints(5);
                        })
                    }
                })
                e.target.value = "";
            }
        })
    }
    
    laser(x, y) {
        this.sound.laser();
        let i = 0;
        let laser = setInterval(() => {
            if (i < 25) {
                this.ctx.beginPath();
                this.ctx.moveTo(600, 530);
                this.ctx.lineTo(x, y); 
                this.ctx.stroke();
                this.ctx.closePath();
            } else {
                clearInterval(laser);
            }
            i++;
        })
    }
    
    bonusLaser(x, y) {
        let i = 0;
        let laser = setInterval(() => {
            if (i < 100) {
                this.ctx.beginPath();
                this.ctx.moveTo(600, 530);
                this.ctx.lineTo(x, y);
                this.ctx.strokeStyle = "yellow";
                this.ctx.stroke();
                this.ctx.closePath();
            } else {
                clearInterval(laser);
            }
            i++;
        })
    }
    
    updatePoints(num) {
        this.totalPoints += num;
    }
    
    displayPoints() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillText(`${this.totalPoints} points`, 800, 670);
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    resetPoints() {
        this.totalPoints = 0;
    }
}

export default Typing; 



 


