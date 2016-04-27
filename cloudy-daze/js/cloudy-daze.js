// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );

// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();

//Create a three.js camera
var camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 2, 10000 );
scene.add(camera);

//Apply VR headset positional data to camera.
var controls = new THREE.VRControls( camera );

//Apply VR stereo rendering to renderer
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );


/************* TODO: Generate Your VR Scene Below *********************/


var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 20,
      map: new THREE.TextureLoader().load(
          "assets/particle.png"
        ),
      blending: THREE.AdditiveBlending,
      transparent:true

    });


for (var p = 0; p < particleCount; p++) {
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3( pX, pY, pZ );
  particle.velocity = {};
  particle.velocity.y = 0;
  particles.vertices.push(
    particle
  );
}

var particleSystem = new THREE.Points(
  particles,
  pMaterial
);
particleSystem.sortParticles = true;

scene.add( particleSystem );

/*
Request animation frame loop function
*/
function animate() {

  // particleSystem.rotation.y += 0.005;
  // var particle = new THREE.Vector3();
  // var pCount = particleCount;
  // while (pCount--) {
  //
  //   particle = particles.vertices[pCount];
  //
  //
  //   if (particle.y < -200) {
  //     particle.y = 200;
  //     particle.velocity.y = 0;
  //   }
  //
  //   particle.velocity.y -= Math.random() * 0.1;
  //
  //   particle.y += particle.velocity.y;
  //
  // }
  //
  // particles.verticesNeedUpdate = true;

  //Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect.
  effect.render( scene, camera );
  requestAnimationFrame( animate );
}

animate();	// Kick off animation loop



/***************** TODO: Generate Your VR Scene Above *****************/



/*
Listen for click event to enter full-screen mode.
We listen for single click because that works best for mobile for now
*/
document.body.addEventListener( 'click', function(){
  effect.setFullScreen( true );
})

/*
Listen for keyboard events
*/
function onkey(event) {
  event.preventDefault();

  if (event.keyCode == 90) { // z
    controls.resetSensor(); //zero rotation
  } else if (event.keyCode == 70 || event.keyCode == 13) { //f or enter
    effect.setFullScreen(true) //fullscreen
  }
};
window.addEventListener("keydown", onkey, true);

/*
Handle window resizes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
