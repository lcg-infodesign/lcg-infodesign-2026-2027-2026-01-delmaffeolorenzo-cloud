let xMax = 400;
let ymax = 600;
let xSub = xMax / 2;
let ySub = ymax * 0.5;

// velocità movimento diagonale
let vx = 1.7;
let vy = 1.3;
let angle;

// array posizione dinamica bolle
let bubbles = [];

function setup() {
  createCanvas(xMax, ymax);
  angle = atan2(vy, vx); // angolo di inclinazione diagonale

  // posizione casuale delle bolle
  randomSeed(99);
  for (let i = 0; i < 300; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(1.5, 30),
      alpha: random(25, 100), // opacità
      type: i % 2
    });
  }
}

function draw() {
  background(20, 25, 55);

  // bolle, movimento opposto
  push();
  noStroke();
  for (let b of bubbles) {
    // bolle
    fill(100, 200, 255, b.alpha);
    ellipse(b.x, b.y, b.size);

    // spostamento direzione opposta al sottomarino
    b.x -= vx;
    b.y -= vy;

    // rientro delle bolle dai bordi
    if (b.x < 0) b.x += width;
    if (b.y < 0) b.y += height;
  }
  pop();

  // sottomarino
  push();
  // rotazione delle coordinate nel centro del sottomarino
  translate(xSub, ySub);
  rotate(angle);

   rectMode(CENTER);

  // corpo del sottomarino
  fill(230, 170, 40);
  stroke(30);
  strokeWeight(4);
  rect(0, 0, 180, 75, 35);

   // 3 oblò
  stroke(120);
  strokeWeight(3.5);
  fill(40, 200, 250);
  ellipse(-45, 0, 30, 30);
  ellipse(0, 0, 30, 30);
  ellipse(45, 0, 30, 30);
  
    // eliche
  fill(190, 40, 40);
  stroke(0);
  strokeWeight(2);
  triangle(-90, 0, -120, -25, -90, -10);
  triangle(-90, 0, -120, 25, -90, 10);

  // torretta
  fill(180, 190, 200);
  stroke(20);
  strokeWeight(2);
  rect(0, -45, 24, 40, 5); // base  
  rect(10, -70, 30, 10, 3); // periscopio

  // lente periscopio
  fill(255, 220, 50);
  stroke(255);
  strokeWeight(2);
  ellipse(23, -70, 10, 10);

    // luce
  noStroke();
  fill(250, 250, 180, 100);
  triangle(90, 0, 250, -60, 250, 60);  

  pop();

  // animazione sottomarino
  xSub = (xSub + vx) % (xMax + 240);
  ySub = (ySub + vy) % (ymax + 60);
}