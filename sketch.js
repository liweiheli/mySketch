let potValue = 0; // Value received from Node.js server
let lightData;
let index = 0;
let angle = 0;

function preload() {
  lightData = loadJSON("data.json"); // Load static data
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
  angleMode(DEGREES);

  // Fetch data from the server every second
  setInterval(fetchData, 1000);
}

function draw() {
  background(255);

  // Access light data value
  let lightValue = lightData.lightData[index];
  let circleSize = map(lightValue, 440, 615, 500, 600);
  let circleColor = map(lightValue, 440, 615, 50, 0);
  let STROKEweight = map(lightValue, 440, 615, 0.1, 1);
  let spinAngle = map(lightValue, 440, 615, 0.5, 1.5);

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

function cloudBg() {
  background(250);
  for (var x = 0; x < 100; x++) {
    for (var y = 0; y < 100; y++) {
      var r = noise(x / 50, y / 50);
      var col = map(r, 0, 1, 0, 100);
      fill(220, col, 100, 50);
      rect(x * 10, y * 10, 10, 10);
    }
  }
}

// Fetch data from the Node.js server
function fetchData() {
  fetch("http://<laptop-ip>:8000/data") // Replace <laptop-ip> with your laptop’s local IP
    .then((response) => response.json())
    .then((data) => {
      potValue = data.value; // Get potValue from server
      console.log("Fetched potValue:", potValue);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}
