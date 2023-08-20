const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const icono = document.getElementById('icono');
const usedLettersElement = document.getElementById('usedLetters');
const letra = document.getElementById('letra');

let canvas = document.getElementById('canvas');
let titulo = document.getElementById('titulo');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
  [4,2,1,1], // CABEZA
  [4,3,1,2], // TRONCO
  [3,3,1,1], // BRAZO IZQ.
  [3,5,1,1], // PIERNA IZQ.
  [5,3,1,1], // BRAZO DER.
  [5,5,1,1]  // PIERNA DER.
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
  const letterElement = document.createElement('span');
  letterElement.innerHTML = letter.toUpperCase();
  usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
  ctx.fillStyle = '#fff';
  ctx.fillRect(...bodyPart);
}

const wrongLetter = () => {
  addBodyPart(bodyParts[mistakes]);
  mistakes++;
  if (mistakes === bodyParts.length) endGame();
}

const endGame = () => {
  document.removeEventListener('keydown', letterEvent);
  startButton.style.display = 'block';
  letra.innerHTML = 'RETRY';
  //document.getElementById('startButton').innerHTML = 'RETRY';
  buttomGame();
}

const correctLetter = letter => {
  const {children} = wordContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML === letter) {
      children[i].classList.toggle('hidden');
      hits++;
    }
  }
  if (hits === selectedWord.length) endGame();
}

const letterInput = letter => {
  if (selectedWord.includes(letter)) {
    correctLetter(letter);
  } else {
    wrongLetter();
  }
  addLetter(letter);  
  usedLetters.push(letter);
}

const letterEvent = event => {
  let newLetter = event.key.toUpperCase();
  if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
    letterInput(newLetter);
  }
}

const drawWord = () => {
  selectedWord.forEach(letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    letterElement.classList.add('letter');
    letterElement.classList.add('hidden');
    wordContainer.appendChild(letterElement);
  });
};

const selectedRandomWord = () => {
  let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
  selectedWord = word.split('');
}

const drawHangMan = () => {
  ctx.canvas.width = 120;
  ctx.canvas.height = 160;
  ctx.scale(20, 20);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#d95d39';
  ctx.fillRect(0, 7, 4, 1);
  ctx.fillRect(1, 0, 1, 8);
  ctx.fillRect(2, 0, 3, 1);
  ctx.fillRect(4, 1, 1, 1);
}

const letterGame = () => {
  titulo.style.fontSize = '50px';
  titulo.style.position = 'absolute';
  titulo.style.top = '80px'; 
  canvas.style.marginTop = "125px"
}

const buttomGame = () => {
  startButton.style.background = '#000';
  startButton.style.boxShadow = '0 0 25px #green';
  startButton.style.textShadow = '0 0 5px #fff';
  startButton.style.color = '#fff';
}

const startGame = () => {
  usedLetters = [];
  mistakes = 0;
  hits = 0;
  wordContainer.innerHTML = '';
  usedLettersElement.innerHTML = '';
  startButton.style.display = 'none';
  icono.style.display = 'none';
  drawHangMan();
  selectedRandomWord();
  drawWord();
  document.addEventListener('keydown', letterEvent);
  letterGame();
}

startButton.addEventListener('click', startGame);
