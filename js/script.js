'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
let diceState = 0;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceState = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  localStorage.setItem('scores', JSON.stringify(scores));
  localStorage.setItem('currentScore', currentScore);
  localStorage.setItem('activePlayer', activePlayer);
  localStorage.setItem('playing', playing);
  localStorage.setItem('diceState', diceState);
};

if (!localStorage.getItem('playing')) {
  init();
} else {
  scores = JSON.parse(localStorage.getItem('scores'));
  currentScore = +localStorage.getItem('currentScore');
  activePlayer = +localStorage.getItem('activePlayer');
  playing = JSON.parse(localStorage.getItem('playing'));
  diceState = +localStorage.getItem('diceState');

  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  if (activePlayer === 0) {
    current0El.textContent = currentScore;
    current1El.textContent = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  } else {
    current0El.textContent = 0;
    current1El.textContent = currentScore;
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  }
  if (diceState !== 0) {
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${diceState}.png`;
  }
  if (!playing) {
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  localStorage.setItem('currentScore', currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  localStorage.setItem('activePlayer', activePlayer);

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    localStorage.setItem('diceState', dice);

    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      localStorage.setItem('currentScore', currentScore);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    localStorage.setItem('scores', JSON.stringify(scores));
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      localStorage.setItem('playing', playing);

      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
