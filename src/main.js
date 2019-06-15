import Base from './base';
import Game from './game_objects';
import Typing from './typing';
import Sound from './sound';
import Action from './action';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let sound = new Sound;
sound.toggleMusic();
let base = new Base(ctx, sound);
let game = new Game(ctx, canvas, sound, base);
let typing = new Typing(ctx, game, sound, base);
let action = new Action(ctx, canvas, sound, base, game, typing);
const startScreen = document.getElementById("start");


const startup = () => { 
    startScreen.removeEventListener("click", startup);
    startScreen.classList.add("hidden");
    base.shieldIndex = 3;
    sound.mainTheme.play();
    sound.mainTheme.loop = true; 
    typing.typer.focus();
    base.baseAlive = true; 
    const startInt = setInterval(() => {game.clear(), base.drawShield(),  base.drawBase()}, 40);
    
    setTimeout(() => {
        base.shieldIndex -= 1;
    }, 2060)

    setTimeout(() => {
        base.shieldIndex -= 1;
    }, 2740)

    setTimeout(() => {
        base.shieldIndex -= 1;
    }, 3420)

    setTimeout(() => {
        clearInterval(startInt);
        action.paused = false; 
        action.renderGame();
    }, 4000)
}


startScreen.addEventListener("click", startup); 
 
