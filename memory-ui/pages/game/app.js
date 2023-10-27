import { ressources } from "../../shared/card-ressources.js";
import { updateUser } from "../../shared/user-service.js";

window.onload = createCards;

/* ==================================== */
/* ========== GET SAVED GRID ========== */
/* ==================================== */
const user = JSON.parse(localStorage.getItem("user"));
const selectedMemoryList = getList();

function getList() {
  if (user != null) {
    const selectedGridName = user.preferences.name;
    return ressources.find((el) => el.name === selectedGridName).imgPath;
  } else {
    return ressources[7].imgPath;
  }
}

const memoryContainer = document.querySelector(".memory-grid");

/* ================================= */
/* ========== POPULATE UI ========== */
/* ================================= */
function createCards() {
  memoryContainer.innerHTML = "";
  let renderedHtml = "";

  const taille = getCalculatedSize();

  for (let i = 0; i < taille; i++) {
    let img = selectedMemoryList[i];
    renderedHtml += createHtmlCard(img, i);
  }

  memoryContainer.innerHTML = renderedHtml;
  addClickListener();
  animateCard();
}

function getCalculatedSize() {
  let calculatedSize;
  if (user != null) {
    calculatedSize = user.preferences.size.split("*");
    calculatedSize = parseInt(calculatedSize[0]) * parseInt(calculatedSize[1]);
    calculatedSize /= 2;
  } else {
    calculatedSize = 6;
  }
  return calculatedSize;
}

function createHtmlCard(img, index) {
  return `
<div data-id="img-${index}" class="flip-card" style="order:${getRandomNumber()};">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="/ressources/question.svg" alt="" />
    </div>
    <div class="flip-card-back">
      <img src="${img}" alt="game card" />
    </div>
  </div>
</div>
<div data-id="img-${index}" class="flip-card" style="order:${getRandomNumber()};">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="/ressources/question.svg" alt="" />
    </div>
    <div class="flip-card-back">
      <img src="${img}" alt="game card" />
    </div>
  </div>
</div>
`;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 12);
}

/* =============================== */
/* ========== FLIP CARD ========== */
/* =============================== */
let selectedCards = [];

function addClickListener() {
  const cardList = document.querySelectorAll(".flip-card");

  cardList.forEach((card) => {
    card.addEventListener("click", handleClick);
  });
}

function handleClick(e) {
  let card = e.target;
  if (!card.classList.contains("active") && selectedCards.length < 3) {
    e.target.classList.add("active");
    selectedCards.push(card);
    compareSelectedCards();
  } else {
    return;
  }
}

/* ================================ */
/* ========== GAME LOGIC ========== */
/* ================================ */
const scoreElement = document.getElementById("score");
const indicationElement = document.querySelector(".indication-heading");
let nbTries = 0;

function compareSelectedCards() {
  if (selectedCards.length !== 2) {
    return;
  }
  const card1 = selectedCards[0].getAttribute("data-id").split("-")[1];
  const card2 = selectedCards[1].getAttribute("data-id").split("-")[1];

  if (card1 !== card2) {
    nbTries++;
    setTimeout(flipBack, 1000);
  } else {
    nbTries++;
    selectedCards = [];
  }

  updateScoreDisplay();
  checkWin();
}

function flipBack() {
  selectedCards.forEach((card) => {
    card.classList.remove("active");
  });
  selectedCards = [];
}

function updateScoreDisplay() {
  scoreElement.innerText = nbTries;
}

function checkWin() {
  let activeCard = document.querySelectorAll(".active");
  if (activeCard.length == 12) {
    indicationElement.innerText = "Bravo, vous avez gagné !";
    if (user != null) {
      saveScore();
    }
  }
}

/* =================================== */
/* ========== REPLAY GAME ============ */
/* =================================== */
window.addEventListener("keypress", handleReplay);

function handleReplay(e) {
  const pressedKey = e.code;
  if (pressedKey == "Space") {
    e.preventDefault();

    nbTries = 0;
    selectedCards = [];
    indicationElement.innerText =
      "Tentez de gagner avec le moins d'essais possible.";

    updateScoreDisplay();
    createCards();
  }
}

/* ================================== */
/* ========== SAVE SCORE ============ */
/* ================================== */
function saveScore() {
  const currentScore = {
    score: nbTries,
    memory: {
      name: user.preferences.name,
      size: user.preferences.size,
    },
  };

  user.scores.push(currentScore);

  updateUser(user)
    .then((savedUser) => {
      localStorage.setItem("user", JSON.stringify(savedUser));
    })
    .catch(() => {
      alert("Failed to save last score");
    });
}

/* ========================================= */
/* ========== DISPLAY ANIMATION ============ */
/* ========================================= */

function animateCard() {
  const cards = document.querySelectorAll(".flip-card");

  cards.forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add("come-back");
    }, index * 150);
  });
}
