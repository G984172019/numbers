let numbers = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
const cells = document.getElementById("cells");
const score = document.getElementById("time");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const rankButton = document.getElementById("rankButton");
const ranking = document.getElementById("ranking");
const timer = document.getElementsByClassName("score");
let start = new Date();
const correct = new Audio('sound/Correct.mp3');
const wrong = new Audio('sound/Wrong.mp3');
