const scene = new THREE.Scene();

const light = new THREE.DirectionalLight("#ffffff", 0.9);
light.position.set(-20, 0, 100);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objLoader = new THREE.ObjectLoader();
objLoader.setPath("./obj/");

const mtlLoader = new THREE.MaterialLoader();
mtlLoader.setPath("./obj/");

new Promise((resolve) => {
  mtlLoader.load("Stone.mtl", (materials) => {
    resolve(materials);
  });
}).then((materials) => {
  materials.preload();
  objLoader.setMaterials(materials);
  objLoader.load("Stone.obj", (object) => {
    scene.add(object);
  });
});

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
