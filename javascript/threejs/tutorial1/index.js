var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

var loader = new THREE.ObjectLoader();
loader.load("./obj/Stone.obj", (object) => {
  scene.add(object);
});

// create the shape
var geometry = new THREE.BoxGeometry(2, 2, 2);
var cubeMaterials = [
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("./img/1.jpg"),
    side: THREE.DoubleSide,
  }), // RIGHT SIDE
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./img/2.jpg"),
    side: THREE.DoubleSide,
  }), // LEFT SIDE
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("./img/3.jpg"),
    side: THREE.DoubleSide,
  }), // TOP SIDE
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./img/4.jpg"),
    side: THREE.DoubleSide,
  }), // BOTTOM SIDE
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("./img/5.jpg"),
    side: THREE.DoubleSide,
  }), // FRONT SIDE
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./img/6.jpg"),
    side: THREE.DoubleSide,
  }), // BACK SIDE
];

// create a material, colour or image texture
var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 3;

var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

var light1 = new THREE.PointLight(0xff0040, 2, 50);
// scene.add(light1);
var light2 = new THREE.PointLight(0x0040ff, 1.1, 50);
// scene.add(light2);
var light3 = new THREE.PointLight(0x80ff80, 1.05, 50);
// scene.add(light3);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
// scene.add(directionalLight);

var spotLight = new THREE.SpotLight(0xff45f6, 25);
spotLight.position.set(0, 3, 0);
scene.add(spotLight);

// game logic
var update = function () {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.005;
  var time = Date.now() * 0.0005;

  light1.position.x = Math.sin(time * 0.7) * 30;
  light1.position.y = Math.cos(time * 0.5) * 40;
  light1.position.z = Math.cos(time * 0.3) * 30;

  light2.position.x = Math.sin(time * 0.3) * 30;
  light2.position.y = Math.cos(time * 0.5) * 40;
  light2.position.z = Math.cos(time * 0.7) * 30;

  light3.position.x = Math.sin(time * 0.7) * 30;
  light3.position.y = Math.cos(time * 0.5) * 40;
  light3.position.z = Math.cos(time * 0.3) * 30;
};

// draw Scene
var render = function () {
  renderer.render(scene, camera);
};

// run game loop (update, render, repleat)
var GameLoop = function () {
  // 게임 개발 이론
  requestAnimationFrame(GameLoop);
  update();
  render();
};

GameLoop();
