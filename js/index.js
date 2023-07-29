const score = document.querySelector('.score');
const points = localStorage.getItem('score');

score.innerHTML = `You won ${points} points`