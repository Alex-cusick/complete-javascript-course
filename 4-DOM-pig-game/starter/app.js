
var activePlayer, roundScore, scores, playing, previousRoll, targetScore;
var diceDOM = document.querySelector('.dice');

function init() {
    playing = true
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    previousRoll = 0;
    diceDOM.style.display = 'none';
    targetScore = document.getElementById('tScore').value;
    document.getElementById("currentTarget").textContent = ("Current Target: " + targetScore);
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
};

function changePlayer() {
    previousRoll = 0;
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
};

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (playing) {
        //random number
        var dice = Math.floor(Math.random() * 6)+1;
        //
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //
        if (dice === 6 && previousRoll === 6) {
            scores[activePlayer] = 0;
            changePlayer();
        } else  if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            previousRoll = dice
        } else {
            changePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += roundScore;
        //
        if (scores[activePlayer] >= targetScore) {
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            diceDOM.style.display = 'none';
            playing = false
        } else {
            changePlayer();
        }
    }
});

init();

document.querySelector('.btn-new').addEventListener('click', init);
