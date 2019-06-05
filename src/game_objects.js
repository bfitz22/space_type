import UFO from './ufo';
import Saucer from './saucer';
import Wing from './wing';
import BonusSaucer from './bonus_saucer';

class Game {
    constructor(ctx, sound, shield) {
        this.ufos = [new UFO(ctx), new UFO(ctx)];
        this.ufoForce = ["x", "x"];
        this.saucers = [new Saucer(ctx), new Saucer(ctx), new Saucer(ctx), new Saucer(ctx)];
        this.saucerForce = [];
        this.wings = [];
        this.wingForce = [];
        this.bonuses = [];
        // this.shieldHeight = 460;
        // this.shieldCenter = 580;
        // this.shieldRadius = 220;
        this.ctx = ctx;
        this.shield = shield; 
        this.lights = 0; 
        this.sound = sound; 
        this.createBonus = this.createBonus.bind(this);
        this.flash = this.flash.bind(this);
        this.drawUFOs = this.drawUFOs.bind(this);
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
            this.ufos.push(new UFO(this.ctx));
            i++;
            if (i > squadSize) {
                clearInterval(spawnInterval);
            }
        }, 3000)
    }
    
    drawUFOs() {
        let dy = 0.75;
        const ufoImg = new Image();
        ufoImg.src = "./images/mod-ufo.png";
        this.ufos.forEach((ufo, i) => {
            let dx = (ufo.x - 575) / (ufo.y - this.shield.shieldHeight - 140);
            this.ctx.drawImage(ufoImg, 0, this.lights, 32, 32, ufo.x, ufo.y, 42, 42),
            ufo.x += dx,
            ufo.y += dy,
            ufo.drawText();
            if ((ufo.y > this.shield.shieldHeight ) && 
                ((ufo.x > this.shield.shieldCenter - (this.shield.shieldRadius + 10)) && 
                (ufo.x < this.shield.shieldCenter + (this.shield.shieldRadius - 10))) ||
                (ufo.y > this.shield.shieldHeight + 30) && 
                ((ufo.x > this.shield.shieldCenter - (this.shield.shieldRadius + 20)) && 
                (ufo.x < this.shield.shieldCenter + (this.shield.shieldRadius - 20))) || 
                (ufo.y > this.shield.shieldHeight + 50) && 
                ((ufo.x > this.shield.shieldCenter - (this.shield.shieldRadius + 40)) && 
                (ufo.x < this.shield.shieldCenter + (this.shield.shieldRadius - 40))))
                {
                    this.sound.powerDown.play();
                    ufo.drawExplosion(ufo.x, ufo.y);
                    delete this.ufos[i];
                    this.shield.shieldIndex++;
                    // this.shield.rechargeShield();
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
            this.saucers.push(new Saucer(this.ctx));
            i++;
            if (i > squadSize) {
                clearInterval(spawnInterval);
            }
        }, 3000)
    }
    
    drawSaucers() {
        let dy = 1.25;
        const saucerImg = new Image();
        saucerImg.src = "./images/mod-saucer.png";
        this.saucers.forEach((saucer, i) => {
            let dx = (saucer.x - 575) / (saucer.y - this.shield.shieldHeight);
            this.ctx.drawImage(saucerImg, 0, this.lights, 32, 32, saucer.x, saucer.y, 42, 42),
            saucer.x += dx,
            saucer.y += dy,
            saucer.drawText();
    
            if (saucer.y > this.shield.shieldHeight ) {
                this.sound.powerDown.play();
                saucer.drawExplosion(saucer.x, saucer.y);
                delete this.saucers[i];
                this.shield.shieldIndex++;
                // this.shield.rechargeShield();
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
            this.wings.push(new Wing(this.ctx));
            i++;
            if (i > squadSize) {
                clearInterval(spawnInterval);
            }
        }, 6000)
    }
    
    drawWings() {
        let dy = 1.75;
        const wingImg = new Image();
        wingImg.src = "./images/mod-wing.png";
        this.wings.forEach((wing, i) => {
            let dx = (wing.x - 575) / (wing.y - this.shield.shieldHeight - 25);
            this.ctx.drawImage(wingImg, 0, this.lights, 32, 32, wing.x, wing.y, 42, 42),
            wing.x += dx,
            wing.y += dy,
            wing.drawText();
    
            if (wing.y > this.shield.shieldHeight ) {
                this.sound.powerDown.play();
                wing.drawExplosion(wing.x, wing.y);
                delete this.wings[i];
                this.shield.shieldIndex++;
                // this.shield.rechargeShield();
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

    createBonus() {
        this.bonuses.push(new BonusSaucer(this.ctx));
    }
}

export default Game;