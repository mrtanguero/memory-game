"use strict";
const game = document.querySelector(".game-container");
const allBacksides = document.querySelectorAll(".card__side--back");

const state = {};

// Kreira random niz duplih brojeva od 1-8

function reactToMove(e) {
  const card = e.target.closest(".card");
  if (!card) return;

  card.querySelector(".card__side--front").classList.add("rotated");
  card.querySelector(".card__side--back").classList.add("rotated");
  state.movesPlayed++;
  state.currentMove.push(card);
  console.log(state.currentMove);

  if (state.movesPlayed === 2) {
    if (card === state.currentMove[0]) {
      state.currentMove.pop();
      console.log(state.currentMove);
      state.movesPlayed--;
      return;
    }
    game.removeEventListener("click", reactToMove);
    state.movesPlayed = 0;
    if (card.dataset.value === state.currentMove[0].dataset.value) {
      state.cardsOpen.push(...state.currentMove);
      state.currentMove = [];
      state.score[state.player]++;
      console.log(state.score);
      game.addEventListener("click", reactToMove);
    } else {
      state.player = state.player ? 0 : 1;
      console.log(state.player);
      setTimeout(() => {
        state.currentMove.forEach((c) => {
          c.querySelector(".card__side--front").classList.remove("rotated");
          c.querySelector(".card__side--back").classList.remove("rotated");
          state.currentMove = [];
          game.addEventListener("click", reactToMove);
        });
      }, 2000);
    }
  }
}

function init() {
  state.player = 0;
  state.score = [0, 0];
  state.movesPlayed = 0;
  state.randomArray = [];
  state.currentMove = [];
  state.cardsOpen = [];

  const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  for (let i = 0; i < 16; i++) {
    state.randomArray.push(
      array.splice(Math.floor(Math.random() * array.length), 1)[0]
    );
  }

  // Postavljanje fotki i data-value atributa koje koristim za poređenje
  state.randomArray.forEach((num, ind) => {
    const image = document.createElement("img");
    image.src = `img/${num}.png`;
    allBacksides[ind].textContent = "";
    allBacksides[ind].append(image);
    allBacksides[ind].parentElement.setAttribute("data-value", num);
  });
}

init();

// Event listeners
game.addEventListener("click", reactToMove);
