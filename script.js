'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial configuration
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const setGame = function () {
  // Setting big/total scores display to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  // Setting current scores display to 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  // Hiding the dice image
  diceEl.classList.add('hidden');
  // Removing winner class from active player
  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--winner');
  // Setting active class to player 0
  document.querySelector('.player--0').classList.add('player--active');
  // Setting current score calculater to 0
  currentScore = 0;
  // Setting total scores calculator to 0
  (scores[0] = 0), (scores[1] = 0);
  // Setting active player back to player 0
  active = 0;
  // Setting playing flag to 0 to enable the functionality of buttons
  playing = true;
};

const switchPlayers = function () {
  document.getElementById(`current--${active}`).textContent = 0;
  active = 1 - active;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores = [0, 0];
let currentScore = 0;
let active = 0;
let playing = true;

//Rolling a dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for dice roll === 1 : if true, switch the player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      switchPlayers();
    }
  }
});

// Holding score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add the current score to the total score
    scores[active] += currentScore;
    document.getElementById(`current--${active}`).textContent = scores[active];
    document.getElementById(`score--${active}`).textContent = scores[active];

    //2. Check if total score >= 100, finish the game
    if (scores[active] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
    }
    //3. Switch players
    else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', setGame);
