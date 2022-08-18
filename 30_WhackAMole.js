
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
// let BGM = new Audio('107-battle-(vs-wild-pokemon).mp3')

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('You again?!');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(700, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
    // console.log(time, hole);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 20000)
}

function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
    console.log(e);
}

// BGM.play();
// BGM.currentTime=0;

function play_single_sound() {
    document.getElementById('BGM').play();
}

moles.forEach(mole => mole.addEventListener('click', bonk));
