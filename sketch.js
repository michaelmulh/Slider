


let sliderHeight = 200;
let sliderWidth = 140;
let handleHeight = 64;
let cornerRadius = 30;
let sliderY;
let sliderValue = 70;

let isDragging = false;
let yOffset = 0;
let handleColor;

function setup() {
  createCanvas(1280, 800);
  sliderY = height / 2 - sliderHeight / 2;
  textSize(20);
  noStroke();
  handleColor = (sliderValue <= 90) ? color('#1976D2') : color('#FDB022');
}

function draw() {
  background(0);

  // Draw slider track
  fill('#333333');
  rect(width / 2 - sliderWidth / 2, sliderY, sliderWidth, sliderHeight, cornerRadius);

  // Calculate handle position
  let handleY = map(sliderValue, 20, 120, sliderY + sliderHeight - handleHeight / 2, sliderY + handleHeight / 2);
  handleY = constrain(handleY, sliderY + handleHeight / 2, sliderY + sliderHeight - handleHeight / 2);

  // Calculate fill height
  let fillHeight = sliderY + sliderHeight - handleY + handleHeight / 2;

  // Draw fill above the handle
  if (sliderValue <= 90) {
    fill('#0F477E');
  } else {
    fill('#986A14');
  }
  rect(width / 2 - sliderWidth / 2, sliderY + sliderHeight - fillHeight, sliderWidth, fillHeight, cornerRadius);

  // Draw slider handle
  fill(handleColor);
  rect(width / 2 - sliderWidth / 2, handleY - handleHeight / 2, sliderWidth, handleHeight, cornerRadius);

  // Draw slider value above the slider track
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(sliderValue, width / 2, sliderY - 30);

  // Draw psi indication text
  fill('#A6A6A6');
  textSize(28);
  textAlign(CENTER, CENTER);
  text('psi', width / 2, sliderY + 250);

}

function mousePressed() {
  let handleY = map(sliderValue, 20, 120, sliderY + sliderHeight - handleHeight / 2, sliderY + handleHeight / 2);
  if (mouseX > width / 2 - sliderWidth / 2 && mouseX < width / 2 + sliderWidth / 2 &&
      mouseY > handleY - handleHeight / 2 && mouseY < handleY + handleHeight / 2) {
    isDragging = true;
    yOffset = mouseY - handleY;
    handleColor = (sliderValue <= 90) ? color('#0D3B68') : color('#885E10');
  }
}

function mouseReleased() {
  isDragging = false;
  handleColor = (sliderValue <= 90) ? color('#1976D2') : color('#FDB022');
}

function mouseDragged() {
  if (isDragging) {
    let newValue = map(mouseY - yOffset, sliderY + handleHeight / 2, sliderY + sliderHeight - handleHeight / 2, 120, 20);
    newValue = round(newValue / 5) * 5;
    sliderValue = constrain(newValue, 20, 120);
    handleColor = (sliderValue <= 90) ? color('#0D3B68') : color('#885E10');
  }
}
