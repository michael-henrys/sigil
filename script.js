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

const textureLoader = new THREE.CubeTextureLoader();
const textureCube = textureLoader.load([
    '/sigil/cube-map/px.png', '/sigil/cube-map/nx.png',
    '/sigil/cube-map/py.png', '/sigil/cube-map/ny.png',
    '/sigil/cube-map/pz.png', '/sigil/cube-map/nz.png'
], () => {
    console.log('Cube texture loaded successfully');
}, undefined, (error) => {
    console.error('An error occurred while loading the texture', error);
});

// Set the environment map for the scene
scene.background = textureCube;   // Use it as a background
scene.environment = textureCube;  // Use it for lighting reflections


// // Add blue fog to simulate a glow effect
// scene.fog = new THREE.Fog(0x87CEEB, 1, 1000); 

const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, -2, 1).normalize();
scene.add(directionalLight);

const directionalLight5 = new THREE.DirectionalLight(0xffffff, 10);
directionalLight5.position.set(-0.5, 0., 0.25).normalize();
scene.add(directionalLight5);

const directionalLight2 = new THREE.DirectionalLight(0xf700ff, 20);
directionalLight2.position.set(-4, 0, 0).normalize();
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0x00c9ff, 20);
directionalLight3.position.set(-4, 0, 0).normalize();
scene.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0x00c9ff, 20);
directionalLight4.position.set(2, 1, 2).normalize();
scene.add(directionalLight4);


const loader = new GLTFLoader();
let loadedModel;
loader.load('/sigil/sigil.glb', function (gltf) {
    gltf.scene.scale.set(1, 1, 1); // Adjust scale if needed
    // Traverse the model to find all meshes
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            // Ensure the mesh uses a PBR material
            if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                // // Adjust PBR material properties
                child.material.metalness = 1;    // Fully metallic
                child.material.roughness = 0.7; 
                child.material.transparent = true;
                child.material.opacity = 0.6;
                // child.material.transmission = 0.85;
                child.material.envMapIntensity = 3.0;
                child.material.envMap = textureCube; // Set the environment map for reflection
                child.material.needsUpdate = true;  // Ensure material update is triggered
            }
        }
    });
    loadedModel = gltf.scene; // Store reference to the loaded model
    scene.add(loadedModel);
}, undefined, function (error) {
    console.error(error);
});

camera.position.set(0, 0, 300);

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
