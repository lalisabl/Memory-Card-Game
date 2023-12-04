const cards = document.querySelectorAll(".card");
const refreshBtn = document.querySelector("button");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const highScoreTag = document.querySelector(".highscore b");
const gameOver = document.querySelector(".game");
let highScore = 0;
let cardOne, cardTwo, timer;
let disableDeck = false;
let isPlaying = false;
let matchCard = 0;
let maxTime = 60;
let timeLeft = maxTime;
let flips = 0;
function updateHighScore() {
  if (highScore == 0 || flips < highScore) {
    highScore = flips;
    highScoreTag.innerText = highScore;
  }
}

function initTimer() {
  if (timeLeft <= 0) {
    gameOver.remove("over");
    return clearInterval(timer); //to clear time interval when reaches 0s
  }
  timeLeft--;
  timeTag.innerText = timeLeft;
}
//function which is used to flip the card
function flipcard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");
    if (!cardOne) {
      //check if cardOne has a valeu or not
      return (cardOne = clickedCard);
    }
    disableDeck = true;
    cardTwo = clickedCard;
    let cardOneImg = cardOne.querySelector(".back-view img").src;
    let cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchedCards(cardOneImg, cardTwoImg);
  }
}
//function which checks wheather the images are the same or not
function matchedCards(img1, img2) {
  if (img1 === img2) {
    matchCard++;
    if (matchCard == 8 && timeLeft > 0) {
      updateHighScore();
      reset_game(); //check it it shoud be returned
      return clearInterval(timer);
    }
    //used to remove click action from user after the images are matched
    cardOne.removeEventListener("click", flipcard);
    cardTwo.removeEventListener("click", flipcard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}
function reset_game() {
  timeLeft = maxTime;
  flips = matchCard = 0;
  clearInterval(timer);
  cardOne = cardTwo = "";
  disableDeck = isPlaying = false;
  timeTag.innerText = timeLeft;
  flipsTag.innerText = flips;
  let list = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  list.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let back_img = card.querySelector(".back-view img");
    setTimeout(() => {
      back_img.src = `images/img-${list[index]}.png`;
    }, 500);

    card.addEventListener("click", flipcard);
  });
}
reset_game();
// clickable html content
refreshBtn.addEventListener("click", reset_game);
cards.forEach((card) => {
  card.addEventListener("click", flipcard);
});
