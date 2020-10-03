let mouseChangeY, mouseChangeX;

let img;
function preload() {
  img = loadImage('LogoChaotikumOhneRand.png');
}

function setup() {
  createCanvas(400, 400);
  noCursor();
}

function draw() {
  if (mouseChangeY != mouseY || mouseChangeX != mouseX){
    clear();
    for (let i = 0; i<mouseY/20; i++){
      push();
      translate(random(190, 210), random(190, 210));
      let size1 = random(width/10, width/3);
      //let size1 = 10;
      let size2 = random(height/10, height/3);
      //let size2 = 10;
      rotate(random(mouseX));
      noStroke();
      fill(color(251, 162, 42, 40));
      rect(0, 0, size1, size2);
      pop();
    }
    image(img, 50, 150);
    mouseChangeY = mouseY;
    mouseChangeX = mouseX;
  }
  
}
