"use strict";
const game = document.querySelector(".game-container");
const allCards = document.querySelectorAll(".card");
const allBacksides = document.querySelectorAll(".card__side--back");

const state = {};
let timeout;

function reactToMove(e) {
  const card = e.target.closest(".card");
  if (
    !card ||
    state.currentMove.includes(card) ||
    state.cardsOpen.includes(card)
  ) {
    return;
  }

  card.classList.add("rotated");

  state.movesPlayed++;
  if (state.movesPlayed === 1) {
    clearTimeout(timeout);
    resetMove();
  }
  state.currentMove.push(card);

  if (state.movesPlayed === 2) {
    state.movesPlayed = 0;
    if (card.dataset.value === state.currentMove[0].dataset.value) {
      state.cardsOpen.push(...state.currentMove);
      state.currentMove = [];
    } else {
      timeout = setTimeout(resetMove, 1500);
    }
  }
}

function resetMove() {
  state.currentMove.forEach((card) => {
    card.classList.remove("rotated");
    state.currentMove = [];
  });
}

function init() {
  state.movesPlayed = 0;
  state.randomArray = [];
  state.currentMove = [];
  state.cardsOpen = [];

  // Kreira random niz duplih brojeva od 1-8
  const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  for (let i = 0; i < 16; i++) {
    state.randomArray.push(
      array.splice(Math.floor(Math.random() * array.length), 1)[0]
    );
  }

  // Postavljanje fotki po random nizu i data-value atributa koje koristim za
  // poređenje poslije
  state.randomArray.forEach((num, ind) => {
    const image = document.createElement("img");
    image.src = `img/${num}.png`;
    allBacksides[ind].append(image);
    allBacksides[ind].parentElement.setAttribute("data-value", num);
  });
}

// On load
init();

// Event listeners
game.addEventListener("click", reactToMove);
