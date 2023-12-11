// Circle Collision

// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

let mouseX = 0;
let mouseY = 0;
let mouseMove = false;

let player = {
  x: cnv.width / 2,
  y: cnv.height / 2,
  r: 20,
  s: 5,
  color: "blue"
};

let circle = [];
for (let n = 1; n <= 50; n++) {
  circle.push(randomCircle());
}

function randomCircle() {
  return {
    x: randomInt(0, cnv.width),
    y: randomInt(0, cnv.height),
    r: randomInt(1, 5),
    color: "green"
  }
}

// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC

  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Player
  ctx.lineWidth = 3;
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
  ctx.stroke();
 
 // Draw circle
  for (let i = 0; i < circle.length; i++) {
    drawCircle(circle[i]);
    let food = circle[i];
    let d = Math.sqrt((player.x - food.x)**2 + (player.y - food.y)**2);
    if (d < player.r + food.r) {
      console.log(circle.length);
      circle.splice(i, 1);
      player.r += (circle.r / 8);
    }
  
   //  if (circle.length < 50) {
   //    circle.push(circle[i]);
   //   }
  }

  // Check if player collides with circle

  // Animation Loop
  requestAnimationFrame(draw);
}

//Circle Stuff

function drawCircle(aCircle) {
  ctx.lineWidth = 3;   
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(aCircle.x, aCircle.y, aCircle.r, 0, 2 * Math.PI)
  ctx.fill();
}

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function update() {
  // for (let i = 0; i < circle.length; i++) {
  //   let circle = circle[i];
  //   // Check for collisions (e.g., player eating circle)
  //  let dx = player.x - circle.x;
  //  let dy = player.y - circle.y;
  //  let distance = Math.sqrt(dx * dx + dy * dy);

  //  if (distance < player.r + circle.r) {
  //     // Collision detected, regenerate circle
  //     circle.splice(i, 1);
  //     circle.x = getRandomPosition(cnv.width);
  //     circle.y = getRandomPosition(cnv.height);
  //   }
  // }
  

  // Update player position or add more logic here

  // Draw everything
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Call update function recursively
  requestAnimationFrame(update);
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