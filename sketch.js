let planes = [];
let frameCount = 0;
let x = 5; // Change x to the desired number of frames for new plane appearance
let speed = 1; // Speed at which planes move
let textures = [];
let numTextures = 8; // Number of textures you have in the img folder
let camPos = { x: 0, y: 0 };
let moveSpeed = 5;

function preload() {
  for (let i = 1; i <= numTextures; i++) {
    textures.push(loadImage("img" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(255);
}

function draw() {
  // background(200);

  // Update camera position based on key input
  if (keyIsDown(87)) {
    // W key
    camPos.y -= moveSpeed;
  }
  if (keyIsDown(83)) {
    // S key
    camPos.y += moveSpeed;
  }
  if (keyIsDown(65)) {
    // A key
    camPos.x -= moveSpeed;
  }
  if (keyIsDown(68)) {
    // D key
    camPos.x += moveSpeed;
  }

  // Place the camera in a 3/4 view with WASD control
  let camX = camPos.x;
  let camY = camPos.y + mouseY;
  let camZ = 150;
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);

  if (frameCount % x == 1) {
    let w = random(20, 100);
    let h = random(20, 100);
    let img = random(textures);
    planes.push({ x: 0, y: 0, z: 0, w: w, h: h, img: img });
  }

  for (let i = planes.length - 1; i >= 0; i--) {
    texture(planes[i].img);
    noStroke();
    push();
    translate(planes[i].x, planes[i].y, planes[i].z);
    plane(planes[i].w, planes[i].h);
    pop();
    planes[i].z -= speed;

    if (planes[i].z < -height / 2) {
      planes.splice(i, 1);
    }
  }

  frameCount++;
}
