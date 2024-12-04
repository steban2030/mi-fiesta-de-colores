const title = document.getElementById('party-title');
const colorButtons = document.getElementById('color-buttons');
const addColorButton = document.getElementById('add-color');
const resetButton = document.getElementById('reset');
const popularColorDiv = document.getElementById('votes');
let votes = {};
let inactivityTimer;
let colorsGenerated = 0;

const mainColors = [
  { color: '#FF0000', name: 'Rojo' },
  { color: '#00FF00', name: 'Verde' },
  { color: '#0000FF', name: 'Azul' },
  { color: '#FFFF00', name: 'Amarillo' }
];

const predefinedColors = [
  { color: '#FF5733', name: 'Rojo Coral' },
  { color: '#FFC300', name: 'Amarillo Oro' },
  { color: '#A0ff7D', name: 'Verde Menta' },
  { color: '#33FF57', name: 'Verde Primavera' },
  { color: '#33FFF5', name: 'Cian' },
  { color: '#3375FF', name: 'Azul Real' },
  { color: '#8433FF', name: 'Morado' },
  { color: '#FF33B5', name: 'Rosa' },
  { color: '#FF6F33', name: 'Naranja' },
  { color: '#8B8B8B', name: 'Gris Oscuro' }
];

const playSound = (index) => {
  const audio = new Audio(`sounds/sound.mp3`);
  audio.play();
};

const changeTitleColor = (color, name) => {
  title.style.color = color;
  votes[name] = (votes[name] || 0) + 1;
  updateMostPopular();
  resetInactivityTimer();
};

const updateMostPopular = () => {
  const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  const mostPopular = sortedVotes[0] || ['Ninguno', 0];
  popularColorDiv.innerHTML = `<strong>El color más popular es el ${mostPopular[0]}</strong>`;
};

const attachColorEvent = (button, color, name, index) => {
  button.addEventListener('click', () => {
    changeTitleColor(color, name);
    playSound(index);
  });
};

const generateInitialButtons = () => {
  mainColors.forEach(({ color, name }, index) => {
    const button = document.createElement('button');
    button.classList.add('color-button');
    button.style.backgroundColor = color;
    attachColorEvent(button, color, name, index + 1);
    colorButtons.appendChild(button);
  });
};

const addDynamicColor = () => {
  if (colorsGenerated < predefinedColors.length) {
    const { color, name } = predefinedColors[colorsGenerated];
    const button = document.createElement('button');
    button.classList.add('color-button');
    button.style.backgroundColor = color;
    attachColorEvent(button, color, name, colorsGenerated + 5);
  }
};

resetButton.addEventListener('click', () => {
  title.style.color = '';
  votes = {};
  colorsGenerated = 0;
  colorButtons.innerHTML = '';
  generateInitialButtons();
  popularColorDiv.innerHTML = `<strong>No hay ningun color popular por ahora</strong>`;
});

addColorButton.addEventListener('click', addDynamicColor);

generateInitialButtons();
resetInactivityTimer = () => clearTimeout(inactivityTimer);
