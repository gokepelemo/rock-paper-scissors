/*----- constants -----*/
const AUDIO = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3"
);

/*----- app's state (variables) -----*/
let ties = 0, audioPlaying = 0;
const playerScores = [
  { name: "Player", score: 0 },
  { name: "Computer", score: 0 },
  {name: "Tie", score: 0}
];

class GameToken {
  constructor(player, playToken) {
    this.player = player;
    this.playToken = playToken;
  }
  static token = {
    1: { name: "rock", piece: "/imgs/rock.png", beats: "scissors" },
    2: { name: "paper", piece: "/imgs/paper.png", beats: "rock" },
    3: { name: "scissors", piece: "/imgs/scissors.png", beats: "paper" },
  };
  playTurn() {
    let computerPlay = Math.floor(Math.random() * 3)
    console.log(`Computer play is ${computerPlay}`)
  }
}
/*----- cached element references -----*/
const countdownDisplay = document.querySelector("#countdown");

/*----- event listeners -----*/
AUDIO.addEventListener("onplaying", (event) => {
  audioPlaying = 1
})

/*----- functions -----*/

const countdown = (seconds, cb) => {
  countdownDisplay.style.visibility = "visible";
  setTimeout(function () {
    if (audioPlaying == 0) AUDIO.play();
    countdownDisplay.innerText = seconds;
    if (seconds === 0) {
      cb;
      countdownDisplay.style.visibility = "hidden";
      return;
    }
    countdown(--seconds);
  }, 1000);
};

const getWinner = (play1,play2) => {
  if (play1 == "rock") {
    return;
  }
}
const renderScores = () => {
  return;
};
const renderResults = () => {
  return;
};
const render = () => {
  countdown(3, function() {
    renderScores();
    renderResults();
  });
};
const init = () => {
  render();
};

init();
const gamePlay = new GameToken("Player","rock")
gamePlay.playTurn();