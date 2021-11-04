let map = null; 
let input;
let img;

//Sliderwerte
let a;
let b;
let c;
let sliderA;
let sliderB;
let sliderC;


function getSvgDataUrl() {
  let svg = document.getElementsByTagName('svg')[0].parentNode.innerHTML;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function getImageData(callback) {
  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  const i = new Image();
  i.onload = function() {
    ctx.drawImage(i, 0, 0, canvas.width, canvas.height);
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    callback(imageData);
  };
  i.src = getSvgDataUrl();
}

/*function preload() {
  img = loadImage('assets/fuji.png'); 
}*/


function setup() {
  input = createFileInput(handleFile);
  input.position(600, 30);
  sketchName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  console.log(sketchName);
  canvasWidth = 1000;
  canvasHeight = 1000; 
  //canvasHeight = canvasWidth/img.width*img.height;
  createCanvas(canvasWidth, canvasHeight, SVG);
  
  
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

  input = createFileInput(handleFile);
  input.position(600, 30);

  
  //resizeCanvas(1000, 1000/img.width*img.height);
}

function draw(){
  if (img) {
    translate(width / 2, height / 2);
    //img.filter(GRAY);
    image(img, 0-width/2, 0-height/2, width, height);
    getImageData(function(imageData){
      getMap(imageData);
      console.table(map);
      console.log(imageData.length/20/4)
      clear();
      background(10);
      sliderA.input(drawLinesFromPixel3D);
      sliderB.input(drawLinesFromPixel3D);
      sliderC.input(drawLinesFromPixel3D);
      
      //drawLinesFromPixel3D();
      drawOneLineFromPixel3D();
    });
  }
  
}

function drawLinesFromPixel3D(){
  clear();
  
  background(10);
  a = sliderA.value();
  b = sliderB.value();
  c = sliderC.value();
  
  for(let y = 0; y < height; y = y + 4){
    strokeWeight(1);
    noFill();
    stroke(255);
    beginShape();
    for(let x = 0; x < width; x++){
      let z = map[x][y];
      xa = x/1.5 - width/5;
      ya = y/1.5 - height/5;
      let xr = xa * cos(b) * cos(c) + z * sin(b) - ya * cos(b) * sin(c);
      let yr = -z * cos(b) * sin(a) + xa * (cos(c) * sin(a) * sin(b) + cos(a) * sin(c)) + ya * (cos(a) * cos(c) - sin(a) * sin(b) * sin(c));
      vertex(xr, yr);
    }    
    endShape();
  }
}
function drawOneLineFromPixel3D(){
  clear();
  
  background(10);
  a = sliderA.value();
  b = sliderB.value();
  c = sliderC.value();

  strokeWeight(1);
  noFill();
  stroke(255);
  beginShape();
  for(let y = 0; y < height; y = y + 3){
    if (y%2==0) {
      for(let x = 0; x < width; x++){
        let z = map[x][y];
        xa = x/1.5 - width/5;
        ya = y/1.5 - height/5;
        let xr = xa * cos(b) * cos(c) + z * sin(b) - ya * cos(b) * sin(c);
        let yr = -z * cos(b) * sin(a) + xa * (cos(c) * sin(a) * sin(b) + cos(a) * sin(c)) + ya * (cos(a) * cos(c) - sin(a) * sin(b) * sin(c));
        vertex(xr, yr);
      }  
    }else{
      for(let x = width-1; x > 0; x--){
        let z = map[x][y];
        xa = x/1.5 - width/5;
        ya = y/1.5 - height/5;
        let xr = xa * cos(b) * cos(c) + z * sin(b) - ya * cos(b) * sin(c);
        let yr = -z * cos(b) * sin(a) + xa * (cos(c) * sin(a) * sin(b) + cos(a) * sin(c)) + ya * (cos(a) * cos(c) - sin(a) * sin(b) * sin(c));
        vertex(xr, yr);
      }
    }  
  }
  
  endShape();
}

function getMap(imageData){
  map = [];
  for(let i = 0; i < width; i++){
    map[i] = [];
    for(let j = 0; j < height; j++){
      //map[i][j] = imageData[(j * width + i) * 4] * 1; //1st version
      map[i][j] = imageData[(i * width + j) * 4] * 0.25;
    }
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
  redraw();
}

function keyReleased(){
  if(key == 's'){
    save(sketchName);
  }
}

