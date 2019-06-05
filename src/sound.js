
class Sound {
    constructor() {
        this.speaker = document.getElementById("speaker");
        this.mainTheme = new Audio();
        this.mainTheme.src = "./audio/main-theme.mp3";
        this.powerUp = new Audio();
        this.powerUp.src = "./audio/power-up.mp3";
        this.powerDown = new Audio();
        this.powerDown.src = "./audio/power-down.mp3";
        this.laserSound = new Audio();
        this.bonusSound = new Audio();
        this.bonusSound.src = "./audio/big_saucer.mp3";
        this.bonusLaserSound = new Audio();
        this.bonusLaserSound.src = './audio/big-laser.mp3';
        this.gameOverMusic = new Audio();
        this.gameOverMusic.src = "./audio/game_over.mp3";
        this.gameOverMusic.loop = false; 
        this.gameOverMusic.currentTime = 0;
        this.isPlaying = true; 
        this.typer = document.getElementById("typing-box");
        this.toggleMusic = this.toggleMusic.bind(this);
    }

    laser() {
        if (this.isPlaying) {
            this.laserSound = new Audio();
            this.laserSound.src = "./audio/laser.mp3";
            this.laserSound.volume = 0.5;
            this.laserSound.play();
        }
    }

    toggleMusic() {
        this.speaker.addEventListener('click', () => {
            if (this.isPlaying) {
                this.speaker.classList.remove("fa-volume-up");
                this.speaker.classList.add("fa-volume-mute");
                this.mainTheme.muted = true;
                this.powerUp.muted = true;
                this.powerDown.muted = true;
                this.laserSound.muted = true;
                this.bonusSound.muted = true;
                this.bonusLaserSound.muted = true;
                this.gameOverMusic.muted = true;
                this.isPlaying = false;
            } else {
                this.speaker.classList.remove("fa-volume-mute");
                this.speaker.classList.add("fa-volume-up");
                this.mainTheme.muted = false;
                this.powerUp.muted = false;
                this.powerDown.muted = false; 
                this.laserSound.muted = false;
                this.bonusSound.muted = false;
                this.bonusLaserSound.muted = false;
                this.gameOverMusic.muted = false;
                this.isPlaying = true; 
            }
            this.typer.focus();
        })
    }
}

export default Sound; 