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

// Set the background color to white
scene.background = new THREE.Color(0xffffff);


// // Add blue fog to simulate a glow effect
// scene.fog = new THREE.Fog(0x87CEEB, 1, 900); 

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, -2, 0.5).normalize();
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10);
directionalLight2.position.set(-2, 0, 0).normalize();
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 10);
directionalLight3.position.set(2, 0, 2).normalize();
scene.add(directionalLight3);




const loader = new GLTFLoader();
let loadedModel;
loader.load('/sigil/sigil.glb', function (gltf) {
    gltf.scene.scale.set(1, 1, 1); // Adjust scale if needed
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set(0x87CEEB); // Ensure visible color
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
