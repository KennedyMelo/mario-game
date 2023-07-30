const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');
const bestScoreElement = document.querySelector('.bestScore');
const coin = document.querySelector('.coin');
const scoreCoin = document.querySelector('.scoreCoin');

let accumulatedPoints = 0;
let onAir = false;
let existCoin = true;

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
  if(!existCoin){
    scoreCoin.style.display = 'block'
  } else{
    scoreCoin.style.display = 'none'
  }
  const pipePosition = pipe.offsetLeft;
  const coinPositionLeft = coin.offsetLeft;
  const coinPositionRight = +window.getComputedStyle(coin).right.replace('px', '');
  
  // + -> convert string to number
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  accumulatedPoints += 0.1;
  score.innerHTML = `Score: ${Math.floor(accumulatedPoints)}`;

  //reappear the coin
  console.log(coinPositionRight)
  if(coinPositionRight <= -60){
    coin.style.width='60px';
    existCoin = true;
  }
  //catch coin conditional
  if (existCoin && coinPositionLeft <= 120 && marioPosition >= 110){
    coin.style.width='0px';
    accumulatedPoints +=30;
    existCoin = false;
  }

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
