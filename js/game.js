const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');
const bestScoreElement = document.querySelector('.bestScore');

let accumulatedPoints = 0;
let onAir = false;

const remove_jump = (time) => {
  setTimeout(() => {
    
    mario.classList.remove('jump');
    onAir = false
  }, time);
}

const jump = (event) => {
  mario.classList.add('jump');
  onAir = true;

  remove_jump(500);
}

const updateScore = (accumulatedPoints) => {

  let score = Math.floor(accumulatedPoints);
  localStorage.setItem('score', score);
  let bestScore = localStorage.getItem('bestScore');
  
  if(bestScore){
    bestScore = Number(bestScore);
    if(score > bestScore){
      bestScore = score;
    }
  } else{
    bestScore = score;
  }

  bestScoreElement.innerHTML = `Best score: ${bestScore}`;
  localStorage.setItem('bestScore', bestScore);
  
}

updateScore(0);

const loop = setInterval(() => {
  
  const pipePosition = pipe.offsetLeft;
  // + -> convert string to number
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  accumulatedPoints += 0.1;
  score.innerHTML = `Score: ${Math.floor(accumulatedPoints)}`;

  //death conditional
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './../images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(loop);
    
    updateScore(accumulatedPoints);
    
    setTimeout(() => {
      
      
      location.href='game-over.html'
    }, 1000)
    
  }
}, 10);

document.addEventListener('keydown', event =>{
  if(onAir && (event.key === 'ArrowDown' || event.key === 's')){
    remove_jump(20);
  }
  if(!onAir && (event.key === 'ArrowUp' || event.key === 'w')){
    jump();
  }
  
});
