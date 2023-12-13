// Circle Collision

// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let mouseX = 0;
let mouseY = 0;
let mouseMove = false;
let frameCount = 0;

// Spawn Player
let player = {
  x: cnv.width / 2,
  y: cnv.height / 2,
  r: 20,
  s: 3
};

// Food Array
let circle = [];
for (let n = 1; n <= 50; n++) {
  circle.push(randomCircle());
}

function randomCircle() {
  return {
    x: randomInt(0, cnv.width),
    y: randomInt(0, cnv.height),
    r: randomInt(2, 8),
    c: randomRGB()
  }
}

// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC
  frameCount++;
  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Player
  ctx.lineWidth = 3;
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
  ctx.stroke();
 
  // Draw food (circles)
  for (let i = 0; i < circle.length; i++) {
    drawCircle(circle[i]);
    let food = circle[i];

    // Check if player collides with circle
    let d = Math.sqrt((player.x - food.x)**2 + (player.y - food.y)**2);
    if (d < player.r + food.r) {
      player.r += (food.r / 8);
      console.log(circle.length);
      circle.splice(i, 1);
    }

    // Add food on an interval
    if (frameCount > 200) {
     circle.push((randomCircle()));
     frameCount = 0;
    }  
  }
  
  // Keep player in canvas boundaries
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x > cnv.width) {
    player.x = cnv.width;
  } else if (player.y < 0) {
    player.y = 0;
  } else if (player.y > cnv.height) {
    player.y = cnv.height;
  }

  // Animation Loop
  requestAnimationFrame(draw);
}

//Circle Stuff

function drawCircle(aCircle) { 
  ctx.fillStyle = `${aCircle.c}`;
  ctx.beginPath();
  ctx.arc(aCircle.x, aCircle.y, aCircle.r, 0, 2 * Math.PI)
  ctx.fill();
}

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

// Event Stuff
document.addEventListener("mousemove", mousemoveHandler);
      
function mousemoveHandler(event) {
  mouseMove = true;
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect(); 

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(event.clientX - cnvRect.left);
  mouseY = Math.round(event.clientY - cnvRect.top);

  let run = mouseX - player.x;
  let rise = mouseY - player.y;
  let d = Math.sqrt((run)**2 +(rise)**2);
  let dx = (run / d) * player.s;
  let dy = (rise / d) * player.s;

  player.x += dx;
  player.y += dy;
}