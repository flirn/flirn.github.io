let input, button1, button2, greeting, mouseChange, sliderChange, sliderCChange, timestamp;
var d = new Date();
timestamp = d.getTime();
function setup() {
  
  inputW = createInput('600');
  inputW.position(20, 65);
  inputH = createInput('600');
  inputH.position(200, 65);
  
  slider = createSlider(0, 500, 250, 1);
  slider.position(20, 100);
  slider.style('width', '500px');
  
  sliderC = createSlider(0, 255, 25, 1);
  sliderC.position(20, 120);
  sliderC.style('width', '255px');

  greeting = createElement('h3', 'Dimensions');
  greeting.position(20, 5);
  
  greeting = createElement('h4', 'Rectangle Count');
  greeting.position(530, 80);
  greeting = createElement('h4', 'Oppacity');
  greeting.position(530, 100);

  textAlign(CENTER);
  textSize(50);
}

function draw(){
  timestamp = d.getTime();
  //if (mouseChange != mouseY){
  if(sliderChange != slider.value() || sliderCChange != sliderC.value()){
    let cnv = createCanvas(inputW.value(), inputH.value());
    //noCursor();
    cnv.position(20, 150);
    background('#fba22a');
    //for (let i = 0; i<mouseY; i++){
    for (let i = 0; i<slider.value(); i++){
      noStroke();
      fill(color(231, 81, 37, sliderC.value()));
      rotate(random(PI*2));
      rect(random(width), random(height), random(width), random(height));
    }  
    mouseChange = mouseY;
    sliderChange = slider.value();
    sliderCChange = sliderC.value();
  }
}