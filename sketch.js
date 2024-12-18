let lightData;
let index = 0;

let angle = 0;
// let size = 200;
// let grow = 1;
// let inc = 0;

// let shift = 0;
// let speed = 1;

function preload() {
  lightData = loadJSON("data.json");
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
  angleMode(DEGREES);
}

function draw() {

  cloudBg();

  //data value
  let lightValue = lightData.lightData[index];

  let circleSize = map(lightValue, 440, 615, 500, 600);
  let circleColor = map(lightValue, 440, 615, 50,0);
  let sWeight = map(lightValue, 440, 615, 0.1, 1);
  let spinAngle = map(lightValue, 440, 615, 0.5, 1.5);
  let randomNUmber = map(lightValue, 440, 615, 4.5, 8);

//       for (var y = -200; y <= 600; y+=5) {
//     push();
//     noFill();
//     stroke(0);
//     fill(0);
//     rect(0, y + shift, 400, 1);
//     pop();
//   }
//     if (shift >= 200 || shift< 0) {
//     speed = speed * -1;
// }
//   shift = shift + speed;

  //animation
  for (let x = 0; x <= 200; x++) {
    push();
    translate(200, 200);
    rotate(angle);
    noFill();
    // stroke(circleColor);
    strokeWeight(1);
    rectMode(CENTER);
    rect(0, 0, 200 - x * 5, 200 - x * 5);
    pop();
  }

  for (var x = 0; x <= 400; x++) {
    push();
    translate(200, 200);
    rotate(angle);
    noFill();
    stroke(circleColor);
    strokeWeight(sWeight);
    rectMode(CENTER);
    rect(0, 0, circleSize - x * 4, circleSize - x * 4);
    pop();
  }


  angle += spinAngle;
  frameRate(5);

  index++;
  if (index >= lightData.lightData.length) {
    index = 0;
  }

}

//This part's sky and cloud noise effect is referencing to Perlin Noise Clouds made by runemadsen(I initially try to implement an image of cloud background, but doesn't work well)  --> https://editor.p5js.org/runemadsen/sketches/SkpOPexT7

//background
function cloudBg() {
  background(250);
  for (var x = 0; x < 100; x++) {
    for (var y = 0; y < 100; y++) {
      var r = noise(x / 50, y / 50);
      var col = map(r, 0, 1, 0, 100);
      fill(220, col, 100,50); // HSB fill color
      rect(x * 10, y * 10, 10, 10);
    }
  }
}
