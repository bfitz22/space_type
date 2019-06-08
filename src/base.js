class Base {
    constructor(ctx, sound) {
        this.ctx = ctx;
        this.baseAlive = false;
        this.stroke = ["rgba(0, 128, 255)", "rgba(255, 128, 0", "red", "white", "rgba(0, 0, 0, 0)"];
        this.fill = ["rgba(0, 0, 51)", "rgba(51, 25, 0)", "rgba(51, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"];
        this.shieldIndex = 0;
        this.shieldHeight = 460;
        this.shieldCenter = 580;
        this.shieldRadius = 220;
        this.sound = sound;
        this.base = document.createElement('img');
        this.base.src = "images/base.png";
        this.rechargeShield = this.rechargeShield.bind(this);
    }

    drawBase() {
        if (this.baseAlive) {
            this.ctx.beginPath();
            this.ctx.drawImage(this.base, canvas.width * 0.425, 525, canvas.width * 0.15, canvas.height * 0.25);
            this.ctx.closePath();
        }
    }

    drawShield() { 
        if (this.baseAlive) {
            this.ctx.beginPath();
            this.ctx.moveTo(450, 700);
            this.ctx.bezierCurveTo(465, 425, 730, 425, 750, 700);
            this.ctx.strokeStyle = this.stroke[this.shieldIndex];
            this.ctx.fillStyle = this.fill[this.shieldIndex];
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.shadowColor = 100;
            this.ctx.lineWidth = 8;
            this.ctx.closePath();
        }
    }

    rechargeShield() {
        if (this.shieldIndex > 0 && this.baseAlive) {
            this.shieldIndex -= 1;
            this.sound.powerUp.play(); 
        }
    }
}

export default Base;