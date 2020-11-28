/* 
    two players. 
        Player A: user 
        Player B: computer

    Game Rules
        - Best of Five
        - The player with highest score wins. whoever get 3 first wins.

    What do we need to build?
        - Running total score 
            separate total score for player A and B
        - A way for the player to take their turn. (rounds)
        - A way to determine who won the round
            paper > rock
            rock > scissors
            scissors > paper
        - how to get paper, rocks or scissors. 
            random. 
        - store the paper, rocks or scissors somewhre to compare. 
        - reset it at the start of each round
                totalscore ++ on win
        
        // algorithm seems to give more scissors than rock or paper
            
*/

const p = "paper";
const r = "rock";
const s = "scissors";
const max = 3;

let userRoundScore = 0;
let compRoundScore = 0;

let userInput = "";
let computerInput = "";

let rockBtn = document.getElementById("rock");
let paperBtn = document.getElementById("paper");
let scissorsBtn = document.getElementById("scissors");
let playAgainBtn = document.getElementById("replayButton");
let userScoreNum = document.getElementById("scoreuser");
let compScoreNum = document.getElementById("scorecomputer");
let resultText = document.getElementById("result");
let userImage = document.getElementById("user_result_img");
let compImage = document.getElementById("comp_result_img");

function round(value) {
  console.log("value", value);
  userInput = value;
  setUserImg(); // set user image on turn
  if (userInput != undefined) computerTurn(); // starts computer turn
  checkWinnerOnRound(); // check who own the round
  //replayGame();
}
function setUserImg() {
  // change the image of the user
  if (userInput === r) {
    userImage.src = "./assets/userrock.png";
  } else if (userInput === p) {
    userImage.src = "./assets/userhand.png";
  } else if (userInput === s) {
    userImage.src = "./assets/userscissors.png";
  }
}

function computerTurn() {
  // calculate computer result
  let number = Math.ceil(Math.random() * 3);

  if (number === 1) {
    computerInput = p;
    compImage.src = "./assets/comphand.png";
  } else if (number === 2) {
    computerInput = r;
    compImage.src = "./assets/comprock.png";
  } else {
    computerInput = s;
    compImage.src = "./assets/compscissors.png";
  }
}

function checkWinnerOnRound() {
  switch (userRoundScore < 5 && compRoundScore < 5) {
    case userInput === p && computerInput === r:
      userRoundScore++;
      resultText.innerHTML = "You won. Paper beats rock.";
      break;
    case userInput === r && computerInput === s:
      userRoundScore++;
      resultText.innerHTML = "You won. Rock beats scissors.";
      break;
    case userInput === r && computerInput === p:
      compRoundScore++;
      resultText.innerHTML = "Computer won. Paper beats rock.";
      break;
    case userInput === s && computerInput === r:
      compRoundScore++;
      resultText.innerHTML = "Computer won. Rock beats scissors.";
      break;
    case userInput === p && computerInput === s:
      compRoundScore++;
      resultText.innerHTML = "Computer won. Scissors beats paper.";
      break;
    default:
      resultText.innerHTML = "Its a Draw";
  }

  if (userRoundScore === 5) {
    resultText.innerHTML = "VICTORY!!!";
    resetGameButton();
  }
  if (compRoundScore === 5) {
    resultText.innerHTML = "Computer had defeated you!";
    resetGameButton();
  }
  userScoreNum.innerHTML = userRoundScore;
  compScoreNum.innerHTML = compRoundScore;
}

function resetGameButton() {
  rockBtn.classList.add("hidden");
  paperBtn.classList.add("hidden");
  scissorsBtn.classList.add("hidden");
  playAgainBtn.classList.remove("hidden");
}

function replayGame() {
  userScoreNum.innerHTML = 0;
  compScoreNum.innerHTML = 0;
  playAgainBtn.classList.remove("hidden");
  resultText.innerHTML = "Choose Your Weapon Wisely";
  playAgainBtn.addEventListener("click", () => {
    rockBtn.classList.remove("hidden");
    paperBtn.classList.remove("hidden");
    scissorsBtn.classList.remove("hidden");
    playAgainBtn.classList.add("hidden");
    userRoundScore = 0;
    compRoundScore = 0;
  });
}
