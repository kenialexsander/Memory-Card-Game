const cardsArray = [
  { name: "A", img: "A" },
  { name: "B", img: "B" },
  { name: "C", img: "C" },
  { name: "D", img: "D" },
  { name: "E", img: "E" },
  { name: "F", img: "F" },
  { name: "G", img: "G" },
  { name: "H", img: "H" },
];

let gameBoard = document.getElementById("game-board");
let firstCard = null,
  secondCard = null,
  lockBoard = false;
let matchedPairs = 0;

// Shuffle function to randomize cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize the game board
function initGame() {
  let shuffledCards = shuffle([...cardsArray, ...cardsArray]);
  gameBoard.innerHTML = "";
  shuffledCards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
        <div class="card-inner">
          <div class="card-front">${card.img}</div>
          <div class="card-back"></div>
        </div>`;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// Flip card function
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check if cards match
function checkForMatch() {
  let isMatch = firstCard.innerHTML === secondCard.innerHTML;

  if (isMatch) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === cardsArray.length) {
      setTimeout(() => alert("You won!"), 500);
    }
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset the board state
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Restart game function
document.getElementById("restart").addEventListener("click", restartGame);

function restartGame() {
  matchedPairs = 0;
  initGame();
}

// Start game on load
initGame();
