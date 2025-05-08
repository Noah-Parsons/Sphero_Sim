// Initialize the physics world  
const world = new CANNON.World();  
world.gravity.set(0, -9.82, 0); // Gravity in m/s²  
  
// Create a Three.js scene  
const scene = new THREE.Scene();  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
const renderer = new THREE.WebGLRenderer();  
renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);  
  
// Create the Sphero (sphere)  
const spheroRadius = 0.5;  
const spheroGeometry = new THREE.SphereGeometry(spheroRadius, 32, 32);  
const spheroMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });  
const spheroMesh = new THREE.Mesh(spheroGeometry, spheroMaterial);  
scene.add(spheroMesh);  
  
// Create the Cannon.js body for Sphero  
const spheroBody = new CANNON.Body({  
    mass: 1,  
    position: new CANNON.Vec3(-5, spheroRadius, 0), // Start position  
    shape: new CANNON.Sphere(spheroRadius),  
});  
world.addBody(spheroBody);  
  
// Create the Barrier (box)  
const barrierWidth = 0.1;  
const barrierHeight = 2;  
const barrierDepth = 2;  
const barrierGeometry = new THREE.BoxGeometry(barrierWidth, barrierHeight, barrierDepth);  
const barrierMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });  
const barrierMesh = new THREE.Mesh(barrierGeometry, barrierMaterial);  
barrierMesh.position.set(5, barrierHeight / 2, 0);  
scene.add(barrierMesh);  
  
// Create the Cannon.js body for the barrier  
const barrierBody = new CANNON.Body({  
    mass: 0, // Static  
    position: new CANNON.Vec3(5, barrierHeight / 2, 0),  
});  
barrierBody.addShape(new CANNON.Box(new CANNON.Vec3(barrierWidth / 2, barrierHeight / 2, barrierDepth / 2)));  
world.addBody(barrierBody);  
  
// Lighting  
const light = new THREE.DirectionalLight(0xffffff, 1);  
light.position.set(10, 10, 10).normalize();  
scene.add(light);  
scene.add(new THREE.AmbientLight(0x404040));  
  
// Camera position  
camera.position.set(0, 3, 10);  
camera.lookAt(0, 0, 0);  
  
// Function to update the physics world and render  
function animate() {  
    requestAnimationFrame(animate);  
  
    // Step the physics world  
    world.step(1 / 60);  
  
    // Update the Sphero mesh position and rotation  
    spheroMesh.position.copy(spheroBody.position);  
    spheroMesh.quaternion.copy(spheroBody.quaternion);  
  
    // Render the scene  
    renderer.render(scene, camera);  
}  
  
// Function to launch the Sphero  
function launchSphero() {  
    spheroBody.velocity.set(10, 0, 0); // Set velocity to the right  
}  
  
// Launch the Sphero after a short delay  
setTimeout(launchSphero, 1000);  
  
// Start the animation loop  
animate();  
