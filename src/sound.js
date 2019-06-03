
class Sound {
    constructor() {
        this.speaker = document.getElementById("speaker");
        this.mainTheme = new Audio();
        this.mainTheme.src = "./audio/main-theme.mp3";
        this.powerDown = new Audio();
        this.powerDown.src = "./audio/power-down.mp3";
        this.isPlaying = true; 
    }

    speaker() {
        this.speaker.addEventListener('click', () => {
            if (isPlaying) {
                this.speaker.classList.remove("fa-volume-up");
                this.speaker.classList.add("fa-volume-mute");
                mainTheme.muted = true;
                powerDown.muted = true;
                isPlaying = false;
            } else {
                this.speaker.classList.remove("fa-volume-mute");
                this.speaker.classList.add("fa-volume-up");
                mainTheme.muted = false;
                powerDown.muted = false; 
                isPlaying = true; 
            }
            typer.focus();
        })
    }
}

export default Sound; 