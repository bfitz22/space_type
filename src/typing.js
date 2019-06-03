import { gameOverEvents } from "./game_over";

class Typing {
    constructor(ctx, ufos, saucers, wings, bonuses, isPlaying) {
        this.ctx = ctx; 
        this.ufos = ufos; 
        this.saucers = saucers;
        this.wings = wings; 
        this.bonuses = bonuses; 
        this.isPlaying = isPlaying;
        this.typer = document.getElementById("typing-box");
        this.totalPoints = 0;
        this.laser = this.laser.bind(this);
        this.updatePoints = this.updatePoints.bind(this);
    }

    typeWord() {
        this.typer.addEventListener('keypress', (e) => {
            var key = e.which || e.keyCode;
            if (key === 13) {
                this.ufos.forEach((ufo, i) => {
                    if (ufo.word === e.target.value) {
                        delete this.ufos[i];
                        this.laser(ufo.x + 21, ufo.y + 21);
                        ufo.drawExplosion(ufo.x, ufo.y);
                        this.updatePoints(1);
                    }
                });
                this.saucers.forEach((saucer, i) => {
                    if (saucer.word === e.target.value) {
                        delete this.saucers[i];
                        this.laser(saucer.x + 21, saucer.y + 21);
                        saucer.drawExplosion(saucer.x, saucer.y);
                        this.updatePoints(3);
                    }
                });
                this.wings.forEach((wing, i) => {
                    if (wing.word === e.target.value) {
                        delete this.wings[i];
                        this.laser(wing.x + 21, wing.y + 21);
                        wing.drawExplosion(wing.x, wing.y);
                        this.updatePoints(5);
                    }
                });
                this.bonuses.forEach((bonus, i) => {
                    if (bonus.word === e.target.value) {
                        if (isPlaying) {
                            const bonusLaserSound = new Audio();
                            bonusLaserSound.src = './audio/big-laser.mp3';
                            bonusLaserSound.play();
                        }
                        delete this.bonuses[i];
                        bonus.bonusSound.pause();
                        this.laser(bonus.x + 21, bonus.y + 21);
                        bonus.drawExplosion(bonus.x, bonus.y);
                        this.ufos.forEach((ufo, i) => {
                            delete this.ufos[i];
                            bonusLaser(ufo.x + 21, ufo.y + 21);
                            ufo.drawExplosion(ufo.x, ufo.y);
                            this.updatePoints(1);
                        })
                        this.saucers.forEach((ufo, i) => {
                            delete this.saucers[i];
                            bonusLaser(ufo.x + 21, ufo.y + 21);
                            ufo.drawExplosion(ufo.x, ufo.y);
                            this.updatePoints(3);
                        })
                        this.wings.forEach((ufo, i) => {
                            delete this.wings[i];
                            bonusLaser(ufo.x + 21, ufo.y + 21);
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
        if (this.isPlaying) {
            const laserSound = new Audio();
            laserSound.src = "./audio/laser.mp3";
            laserSound.volume = 0.5;
            laserSound.play();
        }
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



 


