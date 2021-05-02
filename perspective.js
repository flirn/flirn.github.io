function setup() {
  //frameRate(30);
  inputW = createInput('550');
  inputW.position(20, 65);
  inputC = createInput('8');
  inputC.position(200, 65);
  let cnv = createCanvas(inputW.value() , inputW.value());
  cnv.position(20, 150);
  background(000);
  button = createButton('New');
  button.position(400, 65);
  button.mousePressed(drawSquares);
}

function drawSquares() {
  
  background(000);
  createCanvas(inputW.value() , inputW.value());
  background(000);
  let rectSize = 100;
  let blurSize = 1;
  noFill();
  stroke('white');
  strokeWeight(4);
  
  let r;
  let step = (inputW.value()-rectSize)/inputC.value();
  let randomH = inputW.value()-rectSize;
  let randomL = randomH - step;
  for (let i = 0; i<inputC.value(); i++){
    r = random(randomL, randomH);
    rect(r, r, rectSize, rectSize);   
    filter(BLUR, blurSize);
    randomH = randomL;
    randomL = randomL - step;
  }
  
}