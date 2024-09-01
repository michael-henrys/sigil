import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040, 2); // Bright ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Point Light (Glowing Light Effect)
const pointLight = new THREE.PointLight(0xffffff, 2, 100); // Bright light with a range
pointLight.position.set(0, 0, 0); // Position in the center
scene.add(pointLight);


const loader = new GLTFLoader();
let loadedModel;
loader.load('/sigil/sigil.glb', function (gltf) {
    gltf.scene.scale.set(1, 1, 1); // Adjust scale if needed
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set(0xffffff); // Ensure visible color
            child.material.emissive.set(0x000000); // Add some emissive light
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    loadedModel = gltf.scene; // Store reference to the loaded model
    scene.add(loadedModel);
}, undefined, function (error) {
    console.error(error);
});

camera.position.set(0, 0, 500);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    
    if (loadedModel) {
        // Rotate the model
        loadedModel.rotation.y += 0.01; // Rotate around Y-axis
    }
    
    renderer.render(scene, camera);
}
animate();
