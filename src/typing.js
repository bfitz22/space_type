class Typing {
    constructor(ctx, game, sound, base) {
        this.ctx = ctx; 
        this.game = game;
        this.sound = sound;
        this.typer = document.getElementById("typing-box");
        this.totalPoints = 0;
        this.extras = 0;
        this.base = base;
        this.laser = this.laser.bind(this);
        this.updatePoints = this.updatePoints.bind(this);
        this.bonusLaser = this.bonusLaser.bind(this);
        this.typeWord = this.typeWord.bind(this);
    }

    startTyping() {
        this.typer.addEventListener('keypress', this.typeWord)
    }

    stopTyping() {
        this.typer.removeEventListener('keypress', this.typeWord)
    }

    typeWord(e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            let badEntry = true;
            this.game.ufos.forEach((ufo, i) => {
                if (ufo.word === e.target.value) {
                    this.laser(ufo.x + 21, ufo.y + 21);
                    ufo.drawExplosion(ufo.x, ufo.y);
                    ufo.drawPoints(this.game.combo, ufo.x + 21, ufo.y);
                    delete this.game.ufos[i];
                    this.updatePoints(this.game.combo * 1);
                    if (this.game.combo < 10) this.game.combo ++;
                    badEntry = false;
                }
            });
            this.game.saucers.forEach((saucer, i) => {
                if (saucer.word === e.target.value) {
                    this.laser(saucer.x + 21, saucer.y + 21);
                    saucer.drawExplosion(saucer.x, saucer.y);
                    saucer.drawPoints(this.game.combo, saucer.x + 21, saucer.y);
                    delete this.game.saucers[i];
                    this.updatePoints(this.game.combo * 3);
                    if (this.game.combo < 10) this.game.combo ++;
                    badEntry = false;
                }
            });
            this.game.wings.forEach((wing, i) => {
                if (wing.word === e.target.value) {
                    this.laser(wing.x + 21, wing.y + 21);
                    wing.drawExplosion(wing.x, wing.y);
                    wing.drawPoints(this.game.combo, wing.x + 21, wing.y);
                    delete this.game.wings[i];
                    this.updatePoints(this.game.combo * 5);
                    if (this.game.combo < 10) this.game.combo ++;
                    badEntry = false;
                }
            });
            this.game.bonuses.forEach((bonus, i) => {
                if (bonus.word === "recharge" && bonus.word === e.target.value) {
                    this.laser(bonus.x + 21, bonus.y + 21);
                    bonus.drawExplosion(bonus.x, bonus.y);
                    delete this.game.bonuses[i];
                    this.sound.bonusSound.pause();
                    this.base.rechargeShield();
                    this.updatePoints(this.game.combo * 10);
                    badEntry = false;
                    if (this.game.combo < 10) this.game.combo ++;
                } else if (bonus.word === e.target.value) {
                    this.extras = 0;
                    badEntry = false;
                    delete this.game.bonuses[i];
                    this.sound.bonusSound.pause();
                    this.laser(bonus.x + 21, bonus.y + 21);
                    bonus.drawExplosion(bonus.x, bonus.y);
                    bonus.drawPoints(this.game.combo, bonus.x + 21, bonus.y);
                    if (this.game.combo < 10) this.game.combo ++;
                    
                    this.sound.bonusLaserSound.play();
                    this.game.ufos.forEach((ufo, i) => {
                        delete this.game.ufos[i];
                        this.bonusLaser(ufo.x + 21, ufo.y + 21);
                        ufo.drawExplosion(ufo.x, ufo.y);
                        this.extras += 1;
                    })
                    this.game.saucers.forEach((ufo, i) => {
                        delete this.game.saucers[i];
                        this.bonusLaser(ufo.x + 21, ufo.y + 21);
                        ufo.drawExplosion(ufo.x, ufo.y);
                        this.extras += 3;
                    })
                    this.game.wings.forEach((ufo, i) => {
                        delete this.game.wings[i];
                        this.bonusLaser(ufo.x + 21, ufo.y + 21);
                        ufo.drawExplosion(ufo.x, ufo.y);
                        this.extras += 5;
                    })

                }
                this.updatePoints(this.game.combo * 10 + this.extras);
                bonus.drawPoints(this.game.combo, this.extras, bonus.x + 21, bonus.y);
            })
            if (badEntry) {
                this.game.combo = 1;
                badEntry = 0;
            }
            this.game.ufos = this.game.ufos.filter(Boolean);
            this.game.saucers = this.game.saucers.filter(Boolean);
            this.game.wings = this.game.wings.filter(Boolean);
            this.game.bonuses = this.game.bonuses.filter(Boolean);
            this.typer.value = '';
        }
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
        this.ctx.fillText(`${this.totalPoints} points`, 1000, 670);
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    resetPoints() {
        this.totalPoints = 0;
    }
}

export default Typing; 



 


