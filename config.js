// env
const fps = 60;
const groundHeight = 100;
const gravity = 2;
const friction = 0.6;
const airResistance = 0.2;
let hiScore = 0;
let score = 0;
let enemyGenerate = 0;

// player
const playerSize = 50;
let playerColor = "rgba(255, 255, 255, 1)";
let opacity = 1;
let opacityDesc = true;

// enemy
let enemies = [];
const enemySize = 30;
const enemyColor = "blue";

// platforms
let platforms = [];
