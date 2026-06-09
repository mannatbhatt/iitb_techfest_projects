const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 6;

/* LIGHTS */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

/* 🎯 MAIN OBJECT */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x00ffcc })
);
scene.add(cube);

/* 🔴 SECOND OBJECT */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff0055 })
);
sphere.position.x = 2.5;
scene.add(sphere);

/* 🧱 FLOATING INFO PANELS */
function createPanel(text, x, y, z, color = 0x111111) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 256;

  ctx.fillStyle = "#00ffff";
  ctx.font = "28px Arial";
  ctx.fillText(text, 20, 120);

  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  const geometry = new THREE.PlaneGeometry(3, 1.5);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(x, y, z);
  scene.add(mesh);

  return mesh;
}

/* INFO PANELS */
const p1 = createPanel("TECHFEST 2026", -3, 1.5, -2);
const p2 = createPanel("Robotics • AI • Hackathons", 3, 0.5, -3);
const p3 = createPanel("Join Workshops & Competitions", -2, -1.5, -4);

/* CLICK INTERACTION */
window.addEventListener("click", () => {
  cube.material.color.set(Math.random() * 0xffffff);
});

/* SCROLL EFFECT */
document.body.style.height = "200vh";

document.body.onscroll = () => {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = 6 + t * -0.002;
  camera.position.x = t * 0.0005;
};

/* ANIMATION */
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.y += 0.005;

  p1.rotation.y += 0.002;
  p2.rotation.y -= 0.002;
  p3.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();

/* RESIZE */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});