// ============================================================
// Snake 3D — game.js
// Smooth interpolation + Three.js best practices
// ============================================================

import * as THREE from 'three';

// ---- Constants ----
const GRID = 20;
const HALF = GRID / 2;
const TICK_MS = 150;        // ms between logic steps
const SCORE_PER_FOOD = 10;
const LERP_SPEED = 14;      // interpolation speed (higher = snappier)
const CAM_LERP = 4;         // camera smoothing speed

// ---- Mobile detection ----
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || ('ontouchstart' in window);

// ---- DOM refs ----
const canvas = document.getElementById('gameCanvas');
const scoreEl = document.getElementById('scoreValue');
const bestEl = document.getElementById('bestValue');
const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('startBtn');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const finalScoreEl = document.getElementById('finalScore');
const bestLabelEl = document.getElementById('bestScoreLabel');
const restartBtn = document.getElementById('restartBtn');
const pauseOverlay = document.getElementById('pauseOverlay');
const themeToggle = document.getElementById('themeToggle');
const dpad = document.getElementById('dpad');

// ---- Three.js Setup ----
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 60);

// ---- Reusable vectors (render-avoid-allocations) ----
const _targetPos = new THREE.Vector3();

// ---- Lighting ----
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(8, 15, 10);
dirLight.castShadow = false;
scene.add(dirLight);

// ---- Ground / Grid ----
const groundGeo = new THREE.PlaneGeometry(GRID + 1, GRID + 1);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a1028, roughness: 0.9, metalness: 0.0 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.1, 0);
scene.add(ground);

const gridHelper = new THREE.GridHelper(GRID, GRID, 0x443355, 0x332244);
scene.add(gridHelper);

// Border walls
const wallMat = new THREE.MeshStandardMaterial({ color: 0xff6ec7, transparent: true, opacity: 0.18, roughness: 0.3 });
const wallGeo = new THREE.BoxGeometry(GRID, 0.5, 0.1);
const wallGeoSide = new THREE.BoxGeometry(0.1, 0.5, GRID);

[
  { geo: wallGeo, pos: [0, 0.25, -HALF] },
  { geo: wallGeo, pos: [0, 0.25, HALF] },
  { geo: wallGeoSide, pos: [-HALF, 0.25, 0] },
  { geo: wallGeoSide, pos: [HALF, 0.25, 0] },
].forEach(w => {
  const m = new THREE.Mesh(w.geo, wallMat);
  m.position.set(...w.pos);
  scene.add(m);
});

// ---- Snake geometry & material (reuse) ----
const snakeGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
const snakeHeadMat = new THREE.MeshStandardMaterial({ color: 0xff6ec7, emissive: 0xff6ec7, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.4 });
const snakeBodyMat = new THREE.MeshStandardMaterial({ color: 0xc850a0, emissive: 0xc850a0, emissiveIntensity: 0.35, roughness: 0.4, metalness: 0.3 });

// ---- Food ----
const foodGeo = new THREE.SphereGeometry(0.4, 8, 8);
const foodMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x9333ea, emissiveIntensity: 0.5, roughness: 0.2 });
const foodMesh = new THREE.Mesh(foodGeo, foodMat);
foodMesh.position.y = 0.45;
scene.add(foodMesh);

// ---- Game State ----
// Each segment: { x, z, mesh, targetX, targetZ } — x/z are grid coords, target* are world coords
let snake = [];
let dir = { x: 1, z: 0 };
let nextDir = { x: 1, z: 0 };
let food = { x: 5, z: 0 };
let score = 0;
let bestScore = parseInt(localStorage.getItem('snake3d_best') || '0', 10);
let gameState = 'start'; // start | playing | paused | over
let lastTick = 0;
let snakePool = [];
let isDark = true;

// ---- Helpers ----

function gridToWorld(gx, gz) {
  return { x: gx - HALF + 0.5, z: gz - HALF + 0.5 };
}

function getSegmentMesh(isHead) {
  let mesh;
  if (snakePool.length > 0) {
    mesh = snakePool.pop();
    mesh.visible = true;
  } else {
    mesh = new THREE.Mesh(snakeGeo, snakeBodyMat);
    scene.add(mesh);
  }
  mesh.material = isHead ? snakeHeadMat : snakeBodyMat;
  mesh.scale.setScalar(1);
  return mesh;
}

function returnSegmentMesh(mesh) {
  mesh.visible = false;
  snakePool.push(mesh);
}

function resetGame() {
  snake.forEach(s => returnSegmentMesh(s.mesh));
  snake = [];

  for (let i = 2; i >= 0; i--) {
    const mesh = getSegmentMesh(i === 2);
    const gx = HALF - 3 + i;
    const gz = HALF;
    const w = gridToWorld(gx, gz);
    mesh.position.set(w.x, 0.45, w.z);
    snake.push({ x: gx, z: gz, mesh, targetX: w.x, targetZ: w.z });
  }

  dir = { x: 1, z: 0 };
  nextDir = { x: 1, z: 0 };
  score = 0;
  scoreEl.textContent = '0';
  bestEl.textContent = bestScore.toString();
  lastTick = 0;
  placeFood();
}

function placeFood() {
  const occupied = new Set(snake.map(s => `${s.x},${s.z}`));
  let attempts = 0;
  do {
    food.x = Math.floor(Math.random() * GRID);
    food.z = Math.floor(Math.random() * GRID);
    attempts++;
  } while (occupied.has(`${food.x},${food.z}`) && attempts < 400);

  const w = gridToWorld(food.x, food.z);
  foodMesh.position.x = w.x;
  foodMesh.position.z = w.z;
}

/** Logic step — updates grid positions and target world coords */
function step() {
  dir = { ...nextDir };

  const head = snake[0];
  const nx = head.x + dir.x;
  const nz = head.z + dir.z;

  // Wall collision
  if (nx < 0 || nx >= GRID || nz < 0 || nz >= GRID) { gameOver(); return; }

  // Self collision
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === nx && snake[i].z === nz) { gameOver(); return; }
  }

  const ate = (nx === food.x && nz === food.z);
  const w = gridToWorld(nx, nz);

  // New head — start at previous head position for smooth lerp
  const newMesh = getSegmentMesh(true);
  const prevW = gridToWorld(head.x, head.z);
  newMesh.position.set(prevW.x, 0.45, prevW.z);  // start from previous head pos

  // Previous head becomes body
  if (snake.length > 0) snake[0].mesh.material = snakeBodyMat;

  snake.unshift({ x: nx, z: nz, mesh: newMesh, targetX: w.x, targetZ: w.z });

  if (ate) {
    score += SCORE_PER_FOOD;
    scoreEl.textContent = score.toString();
    if (score > bestScore) {
      bestScore = score;
      bestEl.textContent = bestScore.toString();
      localStorage.setItem('snake3d_best', bestScore.toString());
    }
    placeFood();
  } else {
    const tail = snake.pop();
    returnSegmentMesh(tail.mesh);
  }
}

function gameOver() {
  gameState = 'over';
  finalScoreEl.textContent = score.toString();
  bestLabelEl.textContent = `Best: ${bestScore}`;
  gameOverOverlay.style.display = 'flex';
}

function startGame() {
  startOverlay.style.display = 'none';
  gameOverOverlay.style.display = 'none';
  pauseOverlay.style.display = 'none';
  resetGame();
  gameState = 'playing';
}

function togglePause() {
  if (gameState === 'playing') {
    gameState = 'paused';
    pauseOverlay.style.display = 'flex';
  } else if (gameState === 'paused') {
    gameState = 'playing';
    pauseOverlay.style.display = 'none';
  }
}

// ---- Theme ----
function setTheme(dark) {
  isDark = dark;
  const root = document.documentElement;
  if (dark) {
    root.classList.add('dark');
    root.classList.remove('light');
    themeToggle.textContent = '🌙';
    scene.background = new THREE.Color(0x0e0818);
    scene.fog = new THREE.Fog(0x0e0818, 15, 35);
    groundMat.color.set(0x1a1028);
    gridHelper.material.color.set(0x443355);
    wallMat.color.set(0xff6ec7);
    snakeHeadMat.color.set(0xff6ec7);
    snakeHeadMat.emissive.set(0xff6ec7);
    snakeHeadMat.emissiveIntensity = 0.6;
    snakeBodyMat.color.set(0xc850a0);
    snakeBodyMat.emissive.set(0xc850a0);
    snakeBodyMat.emissiveIntensity = 0.35;
    ambientLight.intensity = 0.7;
    dirLight.intensity = 0.9;
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    themeToggle.textContent = '☀️';
    scene.background = new THREE.Color(0xf0e8f5);
    scene.fog = new THREE.Fog(0xf0e8f5, 15, 35);
    groundMat.color.set(0xe8ddf0);
    gridHelper.material.color.set(0xc8b8d8);
    wallMat.color.set(0x9333ea);
    snakeHeadMat.color.set(0x9333ea);
    snakeHeadMat.emissive.set(0x9333ea);
    snakeHeadMat.emissiveIntensity = 0.3;
    snakeBodyMat.color.set(0xb560e8);
    snakeBodyMat.emissive.set(0xb560e8);
    snakeBodyMat.emissiveIntensity = 0.2;
    ambientLight.intensity = 0.9;
    dirLight.intensity = 0.8;
  }
}

setTheme(true);
themeToggle.addEventListener('click', () => setTheme(!isDark));

// ---- Controls ----
function setDir(x, z) {
  if (dir.x === -x && dir.z === -z) return;
  if (nextDir.x === x && nextDir.z === z) return;
  nextDir = { x, z };
}

document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp': case 'KeyW': setDir(0, -1); e.preventDefault(); break;
    case 'ArrowDown': case 'KeyS': setDir(0, 1); e.preventDefault(); break;
    case 'ArrowLeft': case 'KeyA': setDir(-1, 0); e.preventDefault(); break;
    case 'ArrowRight': case 'KeyD': setDir(1, 0); e.preventDefault(); break;
    case 'Space':
      e.preventDefault();
      if (gameState === 'playing' || gameState === 'paused') togglePause();
      break;
    case 'KeyR':
      if (gameState === 'over') startGame();
      break;
  }
});

// Mobile D-Pad
if (isMobile) dpad.classList.remove('hidden');

dpad.querySelectorAll('.dpad-btn').forEach(btn => {
  const handler = (e) => {
    e.preventDefault();
    const d = btn.dataset.dir;
    if (d === 'up') setDir(0, -1);
    if (d === 'down') setDir(0, 1);
    if (d === 'left') setDir(-1, 0);
    if (d === 'right') setDir(1, 0);
  };
  btn.addEventListener('touchstart', handler, { passive: false });
  btn.addEventListener('mousedown', handler);
});

// Swipe
let touchStartX = 0, touchStartY = 0;
canvas.addEventListener('touchstart', (e) => {
  if (gameState === 'paused') { togglePause(); return; }
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

canvas.addEventListener('touchend', (e) => {
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
  if (Math.abs(dx) > Math.abs(dy)) {
    setDir(dx > 0 ? 1 : -1, 0);
  } else {
    setDir(0, dy > 0 ? 1 : -1);
  }
}, { passive: true });

// Buttons
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
pauseOverlay.addEventListener('click', () => { if (gameState === 'paused') togglePause(); });

// ---- Camera ----
const camTarget = new THREE.Vector3(0, 20, 18);
const camLookAt = new THREE.Vector3(0, 0, 5);
camera.position.copy(camTarget);
camera.lookAt(camLookAt);

// ---- Resize ----
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, 100);
});

// ---- Animation Loop — smooth interpolation ----
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  // Smooth lerp factor (frame-rate independent)
  const lerpFactor = 1 - Math.exp(-LERP_SPEED * dt);

  // --- Smooth snake segment interpolation ---
  for (let i = 0; i < snake.length; i++) {
    const seg = snake[i];
    const mesh = seg.mesh;

    // Lerp X and Z toward target
    mesh.position.x += (seg.targetX - mesh.position.x) * lerpFactor;
    mesh.position.z += (seg.targetZ - mesh.position.z) * lerpFactor;

    // Body segments get progressively smaller toward the tail
    if (i > 0) {
      const tailScale = 0.95 - (i / snake.length) * 0.15;
      mesh.scale.setScalar(tailScale);
    }
  }

  // Head pulse
  if (snake.length > 0 && gameState === 'playing') {
    const pulse = 1 + Math.sin(elapsed * 6) * 0.05;
    snake[0].mesh.scale.setScalar(pulse);
  }

  // Food bobbing
  foodMesh.position.y = 0.45 + Math.sin(elapsed * 3) * 0.1;
  foodMesh.rotation.y = elapsed * 2;

  // Smooth camera — subtle follow toward snake head
  if (snake.length > 0 && gameState === 'playing') {
    const headWorld = snake[0].mesh.position;
    // Camera offset from center based on head position (subtle, ±2 units max)
    camTarget.x = headWorld.x * 0.15;
    camTarget.z = 18 + headWorld.z * 0.1;
    camLookAt.x = headWorld.x * 0.2;
    camLookAt.z = headWorld.z * 0.2;
  } else {
    camTarget.x = 0;
    camTarget.z = 18;
    camLookAt.x = 0;
    camLookAt.z = 0;
  }
  camTarget.y = 20;
  camLookAt.y = 0;

  const camLerp = 1 - Math.exp(-CAM_LERP * dt);
  camera.position.x += (camTarget.x - camera.position.x) * camLerp;
  camera.position.z += (camTarget.z - camera.position.z) * camLerp;
  camera.lookAt(
    camera.position.x + (camLookAt.x - camera.position.x) * 0.5,
    0,
    camera.position.z + (camLookAt.z - camera.position.z) * 0.5 - 14
  );

  // Game tick
  if (gameState === 'playing') {
    const now = performance.now();
    if (now - lastTick > TICK_MS) {
      step();
      lastTick = now;
    }
  }

  renderer.render(scene, camera);
});

// ---- Init ----
bestEl.textContent = bestScore.toString();
