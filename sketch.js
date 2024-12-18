// This example is also available online in the p5.js web editor:
// https://editor.p5js.org/gohai/sketches/X0XD9xvIR

let port;
let connectBtn;
let potValue = 0;

//
let lightData;
let index = 0;
let angle = 0;

function preload() {
  lightData = loadJSON("data.json");
}
//

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
  angleMode(DEGREES);

  port = createSerial();

  // in setup, we can open ports we have used previously
  // without user interaction

if (usedPorts.length > 0) {
  try {
    port.open(usedPorts[0], 9600);
  } catch (error) {
    console.error("Error opening port:", error);
  }
}
  
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(width/2, height/2);
  connectBtn.mousePressed(connectBtnClick);

  setInterval(fetchData, 1000);
}

function draw() {
  background(255);
  //data value
  let lightValue = lightData.lightData[index];

  let circleSize = map(lightValue, 440, 615, 500, 600);
  let circleColor = map(lightValue, 440, 615, 50, 0);
  let STROKEweight = map(lightValue, 440, 615, 0.1, 1);
  let spinAngle = map(lightValue, 440, 615, 0.5, 1.5);
  let randomNUmber = map(lightValue, 440, 615, 4.5, 8);

let str = port.readUntil("\n");
if (str.length > 0) {
  potValue = parseFloat(str); // Convert string to a number
  print("Potentiometer Value:", potValue);
}

  if (potValue > 0.5) {
    fill(0);
    rect(0, 0, width, height);
  } else {
    cloudBg();

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
      strokeWeight(STROKEweight);
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
}

//This part's sky and cloud noise effect is referencing to Perlin Noise Clouds made by runemadsen(I initially try to implement an image of cloud background, but doesn't work well)  --> https://editor.p5js.org/runemadsen/sketches/SkpOPexT7

//background
function cloudBg() {
  background(250);
  for (var x = 0; x < 100; x++) {
    for (var y = 0; y < 100; y++) {
      var r = noise(x / 50, y / 50);
      var col = map(r, 0, 1, 0, 100);
      fill(220, col, 100, 50); // HSB fill color
      rect(x * 10, y * 10, 10, 10);
    }
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open("Arduino", 9600);
    connectBtn.html('Disconnect from Arduino');
  } else {
    port.close();
    connectBtn.html('Connect to Arduino');
  }
}


// Fetch data from the Node.js server
function fetchData() {
  fetch("http://192.168.1.100:8000/data") // Replace with your laptop's IP
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from Flask server:", data.value);
      potValue = data.value; // Update potValue for use in the sketch
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

