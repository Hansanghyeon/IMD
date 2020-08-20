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

// game logic
var update = function () {};

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
