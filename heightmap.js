let map = null; 
let grid = 30;
let size
let amp = 200;
let noiseScale = 1/amp;
// let noiseScale = 2; 
let a;
let b;
let c;
let sliderA;
let sliderB;
let sliderC;


function setup() {
  sketchName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  console.log(sketchName);

  //createCanvas(size, size);
  createCanvas(793, 1122);
  size =  2/3*width;
  //background(10);
  noiseDetail(5, 0.5);
  noLoop();
  sliderStep = PI/16;

  sliderA = createSlider(0, TWO_PI,TWO_PI/6, sliderStep);
  sliderA.position(10, 10);
  sliderA.style('width', '500px');
  sliderB = createSlider(0, TWO_PI, 0, sliderStep);
  sliderB.position(10, 30);
  sliderB.style('width', '500px');
  sliderC = createSlider(0, TWO_PI, TWO_PI/8, sliderStep);
  sliderC.position(10, 50);
  sliderC.style('width', '500px');
  makePixelMap();
  

}

function draw(){
  //makeMap();
  //drawLines();
  //makeColorMap();
  translate(width / 2, height / 2);
  
  
  drawLinesFromPixel3D();
  /*sliderA.changed(drawLinesFromPixel3D);
  sliderB.changed(drawLinesFromPixel3D);
  sliderC.changed(drawLinesFromPixel3D);*/
  sliderA.input(drawLinesFromPixel3D);
  sliderB.input(drawLinesFromPixel3D);
  sliderC.input(drawLinesFromPixel3D);
  
  
  //drawMap();
}

/*function makeMap() {
  map = [];
  for(let i = 0; i < grid; i++)
  {
    map[i] = [];
    for(let j = 0; j < grid; j++)
    {
      let h= getHeight(i, j);
      h = h*sin((PI/grid)*j);
      h = h*sin((PI/grid)*i);
      map[i][j] = h;
    }
  }
}*/

function makePixelMap() {
  map = [];
  for(let i = 0; i < size; i++)
  {
    map[i] = [];
    for(let j = 0; j < size; j++)
    {
      let h= getHeight(i, j);
      h = h*sin((PI/size)*j);
      h = h*sin((PI/size)*i);
      map[i][j] = h*amp*2;
    }
  }
}

/*function makeColorMap() {
  map = [];
  for(let i = 0; i < size; i++)
  {
    map[i] = [];
    for(let j = 0; j < size; j++)
    {
      let h= getHeight(i, j);
      
      h = h*sin((PI/size)*j);
      h = h*sin((PI/size)*i);
      map[i][j] = color(h*255);

      //map[i][j] = color(getHeight(i, j)*255);
    }
  }
}*/

function getHeight(i, j) {
  //let heightC= color(255*noise(i), 255*noise(j));
  //return color(heightC);

  return noise(i*noiseScale, j*noiseScale);
  //return noise(i*noiseScale, j*noiseScale)-0.5;
}

function drawMap()
{
  for(let i = 0; i < size; i++)
  {
    for(let j = 0; j < size; j++)
    {
      set(i, j, map[i][j])
    }
  }
  updatePixels();
}

/*function drawLines() {
  let step = size/grid;
  for(let j = 0; j < grid; j++){
    strokeWeight(1);
    beginShape();
    for(let i = 0; i < grid; i++){
      curveVertex(i*step, (j+map[i][j])*step);
    }    DD
    endShape();
  }
}*/

function drawLinesFromPixel(){
  translate(width / 2, height / 2);
  for(let j = 0; j < size; j = j+5){
    strokeWeight(1);
    noFill();
    stroke(255);
    beginShape();
    for(let i = 0; i < size; i++){
      curveVertex(i-size/2, j + map[i][j] - size/1.5);
      //this looks nice aswell:
      //curveVertex(i-size/2, j * map[i][j]); //one line
    }    
    endShape();
  }
}

function drawLinesFromPixel3D(){
  clear();
  
  background(10);
  a = sliderA.value();
  b = sliderB.value();
  c = sliderC.value();
  
  for(let y = 0; y < size; y = y+5){
    strokeWeight(1);
    noFill();
    stroke(255);
    beginShape();
    for(let x = 0; x < size; x++){
      let z = map[x][y];
      xa = x - size/2;
      ya = y - size/2;
      let xr = xa * cos(b) * cos(c) + z * sin(b) - ya * cos(b) * sin(c);
      let yr = -z * cos(b) * sin(a) + xa * (cos(c) * sin(a) * sin(b) + cos(a) * sin(c)) + ya * (cos(a) * cos(c) - sin(a) * sin(b) * sin(c));
      vertex(xr, yr);
    }    
    endShape();
  }
}


function keyReleased(){
  if(key == 's'){
    save(sketchName);
  }
}

