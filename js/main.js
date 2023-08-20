/*----- constants -----*/
const countdownAudio = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3"
);
/*----- app's state (variables) -----*/
let countdownRolling = 0,
  gamePlay;
const gameScores = {
  player: 0,
  computer: 0,
  tie: 0,
};
/*----- cached element references -----*/
const countdownDisplay = document.querySelector("#countdown");
const playerScore = document.querySelector("#p-score");
const tieScore = document.querySelector("#t-score");
const computerScore = document.querySelector("#c-score");
const mainContainer = document.querySelector("main");
/*----- classes -----*/
// class to create an instance of a game
class GameScene {
  constructor() {
    this.playerToken = document.querySelector("#p-result");
    this.computerToken = document.querySelector("#c-result");
    this.computerTurn = function() {
      return Math.ceil(Math.random() * 3);
    };
    this.token = {
      1: { name: "rock", piece: "imgs/rock.png", beats: 3 },
      2: { name: "paper", piece: "imgs/paper.png", beats: 1 },
      3: { name: "scissors", piece: "imgs/scissors.png", beats: 2 },
    };
  }
}
/*----- functions -----*/
// controller for when a player selects their token
const playTurn = (pToken) => {
  let cToken = gamePlay.computerTurn();
  gamePlay.computerToken.src = gamePlay.token[cToken].piece;
  gamePlay.playerToken.src = gamePlay.token[pToken].piece;
  // condition: when there's a tie
  if (pToken === cToken) {
    gameScores.tie++;
    renderScores();
    // condition: when the computer wins
  } else if (pToken === gamePlay.token[cToken].beats) {
    gameScores.computer++;
    renderScores();
    gamePlay.computerToken.style.border = "var(--winner)";
    // condition: when the player wins
  } else if (cToken === gamePlay.token[pToken].beats) {
    gameScores.player++;
    renderScores();
    gamePlay.playerToken.style.border = "var(--winner)";
  }
};
const resetTokens = () => {
  // reset the game scene for a new game
  countdownAudio.pause();
  countdownAudio.currentTime = 0;
  gamePlay.playerToken.removeAttribute("src");
  gamePlay.computerToken.removeAttribute("src");
  gamePlay.computerToken.style.border = "none";
  gamePlay.playerToken.style.border = "none";
  gameScores.player = 0;
  gameScores.computer = 0;
  gameScores.tie = 0;
  renderScores();
};
const renderScores = () => {
  // update new scores after game play
  playerScore.innerText = gameScores.player;
  computerScore.innerText = gameScores.computer;
  tieScore.innerText = gameScores.tie;
};
const handleClick = (e) => {
  // prevent user error by exiting the function if a play is in progress
  if (countdownRolling === 1) return;
  resetTokens();
  // use the element id to determine the token that the user played
  switch (e.target.id) {
    case "1":
      countdown(3);
      setTimeout(function() {
        playTurn(1);
      }, 4000);
      break;
    case "2":
      countdown(3);
      setTimeout(function() {
        playTurn(2);
      }, 4000);
      break;
    case "3":
      countdown(3);
      setTimeout(function() {
        playTurn(3);
      }, 4000);
      break;
  }
};

// render the countdown before each play
const countdown = (seconds) => {
  setTimeout(function() {
    if (countdownRolling === 0) countdownAudio.play();
    countdownDisplay.style.visibility = "visible";
    countdownDisplay.innerText = seconds;
    if (seconds === 0) {
      countdownDisplay.style.visibility = "hidden";
      setTimeout(function() {
        countdownAudio.pause();
        countdownRolling = 0;
        countdownAudio.currentTime = 0;
      }, 1000);
      return;
    }
    countdown(--seconds);
  }, 1000);
};

// create a new game scene
const render = () => {
  gamePlay = new GameScene();
  resetTokens();
  renderScores();
};

// initialize the app
const init = () => {
  render();
};

init();

/*----- event listeners -----*/
countdownAudio.addEventListener("playing", () => {
  countdownRolling = 1;
});
mainContainer.addEventListener("click", handleClick);
