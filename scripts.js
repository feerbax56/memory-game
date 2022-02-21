const cards = document.querySelectorAll('.memory-card');
const restart = document.querySelector('.restart__button')
const counter = document.querySelector('.counter');
const won = document.querySelector('.won');
const resultTable = document.querySelector('[data-js="result-table"]');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let win = 0;
let final = document.querySelector('.final');
let stepCount = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
    this.classList.add('flip');
      moves++;
      counter.innerHTML = moves;

     
 if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
     return;
}
secondCard = this;

checkForMatch();
}


function checkForMatch() {
let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
isMatch ? disableCards() : unFlipCards();

function disableCards() {
 firstCard.removeEventListener('click', flipCard);
 secondCard.removeEventListener('click', flipCard);
win +=2;
 if (win === 12) {
  won.classList.remove('none');
  final.innerHTML = "Congratulations! You won " + moves + " points";
  finishGame()
 }


 resetBoard();
}

function unFlipCards() {
   lockBoard = true;
   setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');
     
     resetBoard();
   }, 1200);
}}


function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
 }

 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })()


 function reset(){
  moves = 0;
  counter.innerHTML = moves;
  cards.forEach(el => el.classList.remove('flip'));
   let audio = new Audio();
   audio.src = './assets/sound/start.mp3';
   audio.autoplay = true;
// задержка от повтора мелодии
   restart.disabled = true;
  setTimeout(()=>{
    restart.disabled = false;
    console.log('restart')}, 5000)
    final.innerHTML = '';
    won.classList.add('none');

 }
 
// рекорды

function finishGame() {
  const gamerName = prompt('Введите ваше имя');
  const currentGamer = {};
  currentGamer[gamerName] = stepCount;
  getResults(currentGamer);
}

function getResults(gamer) {
  let results = JSON.parse(localStorage.getItem('moves'));
  if (!Array.isArray(results)) {
      results = [];
  }
  results.push(gamer);
  localStorage.setItem('moves', JSON.stringify(results));
  resultTable.innerHTML = `${results.sort((a, b) => Object.values(a) - Object.values(b)).map((el) => {
      return el === gamer ? `<li class="gamers__gamer gamers__gamer--current">${Object.keys(el)}: количество шагов - ${Object.values(el)}</li>` : `<li class="gamers__gamer">${Object.keys(el)}: количество шагов - ${Object.values(el)}</li>`
  })
  .slice(-10).join('')}`;
}



 

cards.forEach(card => card.addEventListener('click', flipCard));
restart.addEventListener('click', reset);
//работай давай