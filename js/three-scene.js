/**
 * Three.js Interactive 3D Background - Fluid Geometric Mesh & Wave Grid
 * Non-globe, ultra-sleek, physics-based mouse reactive 3D canvas
 */

class Interactive3DCanvas {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mesh = null;
    this.points = null;
    this.gridHelper = null;

    this.cols = 75;
    this.rows = 50;
    this.spacing = 16;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.mouseWorld = new THREE.Vector3(0, 0, 0);

    this.clock = new THREE.Clock();
    this.ripples = [];

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x090d16, 0.0012);

    // 2. Camera
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(55, width / height, 1, 2000);
    this.camera.position.set(0, -180, 320);
    this.camera.lookAt(0, 40, 0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.container.appendChild(this.renderer.domElement);

    // 4. Create 3D Geometric Wave Grid
    this.buildWaveGrid();

    // 5. Ambient Floating Particles
    this.buildAmbientDust();

    // 6. Lighting
    this.setupLighting();

    // 7. Event Handlers
    this.bindEvents();

    // 8. Animation Loop
    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    this.scene.add(ambientLight);

    this.cursorLight = new THREE.PointLight(0x38bdf8, 4, 400);
    this.cursorLight.position.set(0, 0, 100);
    this.scene.add(this.cursorLight);

    const accentLight1 = new THREE.PointLight(0x6366f1, 3, 600);
    accentLight1.position.set(-300, 200, 150);
    this.scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x10b981, 2.5, 600);
    accentLight2.position.set(300, -100, 120);
    this.scene.add(accentLight2);
  }

  buildWaveGrid() {
    const planeWidth = (this.cols - 1) * this.spacing;
    const planeHeight = (this.rows - 1) * this.spacing;

    this.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, this.cols - 1, this.rows - 1);
    
    // Store original vertex coordinates
    this.posAttr = this.geometry.attributes.position;
    this.origPositions = new Float32Array(this.posAttr.array.length);
    this.origPositions.set(this.posAttr.array);

    // Wireframe Mesh Material
    this.material = new THREE.MeshPhongMaterial({
      color: 0x1e3a8a,
      emissive: 0x0c1e4a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      shininess: 90
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2.6;
    this.mesh.position.set(0, -60, -50);
    this.scene.add(this.mesh);

    // Glowing Node Points at Vertices
    const pointsMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 2.2,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.points = new THREE.Points(this.geometry, pointsMat);
    this.points.rotation.x = this.mesh.rotation.x;
    this.points.position.copy(this.mesh.position);
    this.scene.add(this.points);
  }

  buildAmbientDust() {
    const count = 400;
    const dustGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x38bdf8);
    const color2 = new THREE.Color(0x818cf8);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600 + 100;

      const c = Math.random() > 0.5 ? color1 : color2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    this.dust = new THREE.Points(dustGeo, dustMat);
    this.scene.add(this.dust);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());

    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update cursor light world position
      if (this.cursorLight) {
        this.cursorLight.position.x = this.targetMouseX * 350;
        this.cursorLight.position.y = this.targetMouseY * 200 + 20;
      }
    });

    window.addEventListener('click', (e) => {
      this.triggerRipple(this.targetMouseX * 300, this.targetMouseY * 200);
    });
  }

  triggerRipple(x, y) {
    this.ripples.push({
      x: x,
      y: y,
      time: 0,
      maxTime: 1.8,
      strength: 45,
      speed: 380
    });
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth Mouse Lerp
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.06;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.06;

    // Camera subtle parallax
    this.camera.position.x = this.mouseX * 60;
    this.camera.position.y = -180 + this.mouseY * 40;
    this.camera.lookAt(0, 40 + this.mouseY * 20, 0);

    // Dust gentle floating
    if (this.dust) {
      this.dust.rotation.y = time * 0.015;
    }

    // Update Ripples
    for (let r = this.ripples.length - 1; r >= 0; r--) {
      this.ripples[r].time += delta;
      if (this.ripples[r].time > this.ripples[r].maxTime) {
        this.ripples.splice(r, 1);
      }
    }

    // Dynamic Wave Mathematics on Mesh Vertices
    const pos = this.posAttr.array;
    const orig = this.origPositions;
    const mousePlaneX = this.mouseX * 350;
    const mousePlaneY = this.mouseY * 250;

    for (let i = 0; i < pos.length; i += 3) {
      const ox = orig[i];
      const oy = orig[i + 1];

      // Ambient harmonic rolling waves
      let z = Math.sin(ox * 0.012 + time * 1.4) * 16 +
              Math.cos(oy * 0.015 + time * 1.2) * 14 +
              Math.sin((ox + oy) * 0.008 + time * 0.8) * 12;

      // Mouse interactive gravitational repulsion / swell
      const dx = ox - mousePlaneX;
      const dy = oy - mousePlaneY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 180) {
        const factor = 1 - dist / 180;
        z += Math.sin(factor * Math.PI) * 38;
      }

      // Add ripple effects
      for (let r = 0; r < this.ripples.length; r++) {
        const rip = this.ripples[r];
        const rdx = ox - rip.x;
        const rdy = oy - rip.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const radius = rip.time * rip.speed;

        const diff = Math.abs(rdist - radius);
        if (diff < 60) {
          const ripFactor = (1 - diff / 60) * (1 - rip.time / rip.maxTime);
          z += Math.sin((rdist - radius) * 0.15) * rip.strength * ripFactor;
        }
      }

      pos[i + 2] = z;
    }

    this.posAttr.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    window.interactive3D = new Interactive3DCanvas('three-bg-canvas');
  }
});
