const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');

let accumulatedPoints = 0;
const jump = () => {
  mario.classList.add('jump');
  
  setTimeout(() => {
    
    mario.classList.remove('jump');
  
  }, 500);

}

const loop = setInterval(() => {
  
  const pipePosition = pipe.offsetLeft;
  // + -> convert string to number
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  accumulatedPoints += 0.1;
  score.innerHTML = `Score: ${Math.floor(accumulatedPoints)}`;

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './../images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(loop);
    
    setTimeout(() => {
      localStorage.setItem('score', Math.floor(accumulatedPoints));
      location.href='game-over.html'
    }, 1000)
    
  }
}, 10);

document.addEventListener('keydown', jump);
