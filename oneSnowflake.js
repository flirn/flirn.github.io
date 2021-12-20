var centerX;
var centerY;

function setup() {
  frameRate(2);
  const cnv = createCanvas(397, 560, SVG); //dies entspricht etwa Inkscape Din A6
  cnv.parent("poseContainer");
  sketchName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  console.log(sketchName);
  centerX = width / 2;
  centerY = height / 3;
}

function draw() {
  translate(centerX, centerY);
  background(0);
  //background(255);
  makeFlake();
  noStroke();

  //textSize(32);
  //fill(255);
  //text('Merry Christmas!', -120, 280);
  noLoop();
  //wait(1);

}

function keyReleased(){
  if(key == 's'){
    save(sketchName);
  }
}

function makeFlake(){
  var minArms = 5;
  var maxArms = 10;
  var armLength = width/3;
  var numberOfSubArmPairs = random(minArms, maxArms);
  var minLength = 5; 
  var maxLength = 30;
  var subArmPairLength = [random(minLength, maxLength),random(minLength, maxLength),random(minLength, maxLength),random(minLength, maxLength),random(minLength, maxLength),random(minLength, maxLength),random(minLength, maxLength),random(minLength, minLength),random(minLength, minLength),random(minLength, minLength)];
  /*for (var k = 0; k < maxArms; k++){
    subArmPairLength.push(random(minLength, maxLength));
  }*/
  var direction = Math.random() < 0.5 ? -1 : 1;
  var subArmPairAngle = random(PI/10, PI/3);
  //subArmPairAngle = PI/3;
  //var subArmPairAngle = [random(-PI/2, PI/2), random(-PI/2, PI/2), random(-PI/2, PI/2), random(-PI/2, PI/2), random(-PI/2, PI/2),  random(-PI/2, PI/2)]
  for(var i = 0; i < 6; i++){
    stroke(255);
    //stroke(0);
    strokeWeight(4);
    line(0, 0, 0, armLength);
    var partsOfPair = armLength/numberOfSubArmPairs;
    
    for(var j = 0; j<numberOfSubArmPairs-1; j++){
      //stroke(0, 255, 0);
      positionOfPair = partsOfPair * j; 
      
      var x = 0 + subArmPairLength[j] * cos(subArmPairAngle);
      var y = positionOfPair + subArmPairLength[j] * sin(subArmPairAngle);
      line(0, positionOfPair, x, y);
      line(0, positionOfPair, -x, y);
    }
    /*stroke(0, 0, 255);
    line(0, positionOfPair*2, 10, positionOfPair*2); 
    stroke(255, 0, 255);
    line(0, positionOfPair*3, 10, positionOfPair*3); 
    stroke(255, 255, 0);
    line(0, positionOfPair*4, 10, positionOfPair*4); */


    /*stroke(0, 0, 255);
    line(0, positionOfPair*2, 1, 1);
    line(0, positionOfPair*2, -1, 1);*/
    rotate(PI/3);
  }
}
function mousePressed() {
  sketchName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  console.log(sketchName);
  redraw();
}