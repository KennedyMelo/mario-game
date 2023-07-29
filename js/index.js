const score = document.querySelector('.score');
const bestScore = document.querySelector('.bestScore');

const points = localStorage.getItem('score');
const highestPoints = localStorage.getItem('bestScore');

score.innerHTML = `You won ${points} points`
bestScore.innerHTML = `Your best score is ${highestPoints} points`