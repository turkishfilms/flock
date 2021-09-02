

let simIsOn = true,
  qtShow = false,
  agents = [],
  counter = 0,
  fr = 60

let numberOfAgents = 20,
  qt,
  sliderA, sliderR, sliderC, sliderM;

let matchR = congregateR = 80,
  avoidR = congregateR / 2,
  rn = 124
let w = 0,
  h = 0

let allx = 0,
  ally = 0

function sliderStuff(x) {
  sliderA = createSlider(0, 80, 20);
  sliderA.position(x, 30);
  sliderA.style('width', '150px');

  sliderC = createSlider(0, 180, 17, 0.5);
  sliderC.position(x, 70);
  sliderC.style('width', '150px');

  sliderM = createSlider(0, 180, 17, 0.5);
  sliderM.position(x, 110);
  sliderM.style('width', '150px');

  sliderR = createSlider(0, 20, 3.01, 0.67);
  sliderR.position(x, 150);
  sliderR.style('width', '150px');
}

function touchStarted(){
  text(`${mouseX.toPrecision(2) * 1}, ${mouseY.toPrecision(2) * 1}`, mouseX, mouseY)
  console.log(mouseX.toPrecision(2) * 1,mouseY.toPrecision(2) * 1)
}

function textStuff() {
  fill(0)
  noStroke()
  rect(width * 0.835, height * 0.064, 100,30)

  strokeWeight(1)
  textSize(32)
  fill(255)
  text('Fr: ' + floor(frameRate()), width * 0.84, height * 0.1)

  textSize(20)
  text(counter, width * 0.9, height * 0.9)

  //   slider show values
  textSize(30)
  var x = width * 0.05 + 20 + 180
  //text(sliderR.value() + ': Radius (Sight)', x, 40)
  //text(sliderV.value() + ': Velocity', x, 70)
  //text(sliderB.value() + ': Beta', x, 110)
}

function setup() {
  w = windowWidth
  h = windowHeight
  frameRate(fr)
  createCanvas(w, h)
  // sliderStuff(width * 0.05)
  for (k = 0; k < numberOfAgents; k++) agents.push(new Agent());
  background(23);
}

function pause() {
  simIsOn = simIsOn == true ? false : true
}

function keyPressed() {
  if (key == ' ') {
    pause()
  }
  if (key == 'q') qtShow = qtShow == true ? false : true
}

function draw() {
  if (simIsOn) {
    background(23);
    qt = new Quadtree()
    allx = 0
    ally = 0
    for (let i = 0; i < numberOfAgents; i++) qt.insert(agents[i])
    for (let i = 0; i < numberOfAgents; i++) agents[i].go();
    
    ellipse(allx / agents.length, ally / agents.length, 10, 10)
  }
  // textStuff()
  if (simIsOn) {
    // text('Press Spacebar To Pause Simulation.', width * 0.03, height * 0.93)
    counter++
    if (qtShow) qt.show()
  } else {
    textSize(30)
    text(agents.filter((i)=>i.x>0).length, width * 0.1, height * 0.9)
  }
}