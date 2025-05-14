let lastResult = '';
let lastPlayerMove = '';
let lastComputerMove = '';

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function playGame(playerMove) {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }

    let result = '';

    if (playerMove === computerMove) {
        result = 'Tie';
    } else if (
        (playerMove === 'Rock' && computerMove === 'Scissors') ||
        (playerMove === 'Paper' && computerMove === 'Rock') ||
        (playerMove === 'Scissors' && computerMove === 'Paper')
    ) {
        result = 'You Win';
    } else {
        result = 'You Lose';
    }

    if (result === 'You Win') {
        score.wins += 1;
    } else if (result === 'You Lose') {
        score.losses += 1;
    } else {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement(playerMove, computerMove, result);

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
                <img src="images/${playerMove}.jpeg" class="move-icon">
                <img src="images/${computerMove}.jpeg" class="move-icon">
                Computer`;
}



function updateScoreElement(playerMove = '', computerMove = '', result = '') {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}