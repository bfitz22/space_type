import UFO from './ufo';
import Saucer from './saucer';
import Wing from './wing';
import BonusSaucer from './bonus_saucer';

class Game {
    constructor(ctx, canvas, sound, base) {
        this.ufos = [new UFO(ctx), new UFO(ctx)];
        this.ufoForce = ["x", "x"];
        this.saucers = [new Saucer(ctx)];
        this.saucerForce = ["X"];
        this.wings = [];
        this.wingForce = [];
        this.bonuses = [];
        this.ctx = ctx;
        this.canvas = canvas; 
        this.base = base; 
        this.lights = 0; 
        this.sound = sound; 
        this.createBonus = this.createBonus.bind(this);
        this.flash = this.flash.bind(this);
        this.drawUFOs = this.drawUFOs.bind(this);
        this.combo = 1;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    flash() {
        if (this.lights === 0) {
            this.lights = 32;
        } else if (this.lights === 32) {
            this.lights = 0;
        }
    }

    spawnUFOs() {
        let i = 0;
        let squadSize = this.ufoForce.length;
        const spawnInterval = setInterval(() => {
            if (i >= squadSize) {
                clearInterval(spawnInterval);
            } else {
                this.ufos.push(new UFO(this.ctx));
                i++;
            }
        }, 1000)
    }
    
    drawUFOs() {
        let dy = 0.75;
        const ufoImg = new Image();
        ufoImg.src = "./images/mod-ufo.png";
        this.ufos.forEach((ufo, i) => {
            let dx = (ufo.x - 575) / (ufo.y - this.base.shieldHeight - 140);
            this.ctx.drawImage(ufoImg, 0, this.lights, 32, 32, ufo.x, ufo.y, 42, 42),
            ufo.x += dx,
            ufo.y += dy,
            ufo.drawText();
            if ((ufo.y > this.base.shieldHeight ) && 
                ((ufo.x > this.base.shieldCenter - (this.base.shieldRadius + 10)) && 
                (ufo.x < this.base.shieldCenter + (this.base.shieldRadius - 10))) ||
                (ufo.y > this.base.shieldHeight + 30) && 
                ((ufo.x > this.base.shieldCenter - (this.base.shieldRadius + 20)) && 
                (ufo.x < this.base.shieldCenter + (this.base.shieldRadius - 20))) || 
                (ufo.y > this.base.shieldHeight + 50) && 
                ((ufo.x > this.base.shieldCenter - (this.base.shieldRadius + 40)) && 
                (ufo.x < this.base.shieldCenter + (this.base.shieldRadius - 40))))
                {
                    this.sound.poweringDown();
                    ufo.drawExplosion(ufo.x, ufo.y);
                    delete this.ufos[i];
                    this.base.shieldIndex++;
                    this.combo = 1;
                    setTimeout(() => {
                        this.createBonus(this.base.shieldIndex)
                    }, 12000)                
                }
        });
    }
    
    addUFOs() {
        this.ufoForce.push("x");
    }

    spawnSaucers() {
        let i = 0;
        let squadSize = this.saucerForce.length;
        const spawnInterval = setInterval(() => {
            if (i >= squadSize) {
                clearInterval(spawnInterval);
            } else {
                this.saucers.push(new Saucer(this.ctx));
                i++;
            }
        }, 2500)
    }
    
    drawSaucers() {
        let dy = 1.25;
        const saucerImg = new Image();
        saucerImg.src = "./images/mod-saucer.png";
        this.saucers.forEach((saucer, i) => {
            let dx = (saucer.x - 575) / (saucer.y - this.base.shieldHeight);
            this.ctx.drawImage(saucerImg, 0, this.lights, 32, 32, saucer.x, saucer.y, 42, 42),
            saucer.x += dx,
            saucer.y += dy,
            saucer.drawText();
    
            if (saucer.y > this.base.shieldHeight ) {
                this.sound.poweringDown();
                saucer.drawExplosion(saucer.x, saucer.y);
                delete this.saucers[i];
                this.base.shieldIndex++;
                this.combo = 1;
                setTimeout(() => {
                    this.createBonus(this.base.shieldIndex)
                }, 12000)
            }
        });
    }
    
    addSaucers() {
        this.saucerForce.push("x");
    }
    
    spawnWings() {
        let i = 0;
        let squadSize = this.wingForce.length;
        const spawnInterval = setInterval(() => {
            if (i >= squadSize) {
                clearInterval(spawnInterval);
            } else {
                this.wings.push(new Wing(this.ctx));
                i++;
            }
        }, 3000)
    }
    
    drawWings() {
        let dy = 1.75;
        const wingImg = new Image();
        wingImg.src = "./images/mod-wing.png";
        this.wings.forEach((wing, i) => {
            let dx = (wing.x - 575) / (wing.y - this.base.shieldHeight - 25);
            this.ctx.drawImage(wingImg, 0, this.lights, 32, 32, wing.x, wing.y, 42, 42),
            wing.x += dx,
            wing.y += dy,
            wing.drawText();
    
            if (wing.y > this.base.shieldHeight ) {
                this.sound.poweringDown();
                wing.drawExplosion(wing.x, wing.y);
                delete this.wings[i];
                this.base.shieldIndex++;
                this.combo = 1;
                setTimeout(() => {
                    this.createBonus(this.base.shieldIndex)
                }, 12000)            
            }
        });
    }
    
    addWings() {
        this.wingForce.push("x");
    }

    drawBonus() {
        this.bonuses.forEach((bonus, i) => {
            this.sound.bonusSound.play();
    
            if (bonus.x > canvas.width) {
                delete this.bonuses[i];
                this.sound.bonusSound.pause();
            } 
    
            let dx = 4;
            this.ctx.drawImage(bonus.bonusImg, 0, 0, 32, 32, bonus.x, bonus.y, 55, 55),
            bonus.x += dx,
            bonus.drawText();
        })
    }

    createBonus(shieldIndex) {
        if (!this.bonuses.some((bonus) => bonus instanceof BonusSaucer)) {
            this.bonuses.push(new BonusSaucer(this.ctx, shieldIndex));
        }
    }
}

export default Game;