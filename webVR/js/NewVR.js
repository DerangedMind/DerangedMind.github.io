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


/*
TODO: Create, position, and add 3d objects here
*/
var cubes = [];
var up = true;
var pi = 3.141592653589793238;

var urlPrefix = "assets/skybox_beach/";
var urls = [urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
            urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
            urlPrefix + "posz.jpg", urlPrefix + "negz.jpg"];
var textureCube = THREE.ImageUtils.loadTextureCube(urls);

var shader = THREE.ShaderLib["cube"];
var uniforms = THREE.UniformsUtils.clone (shader.uniforms);
uniforms['tCube'].texture = textureCube;
var material = new THREE.ShaderMaterial( {
  fragmentShader : shader.fragmentShader,
  vertexShader : shader.vertexShader,
  uniforms : uniforms
});

var triangleGeometry = new THREE.Geometry();
//verts
triangleGeometry.vertices.push( new THREE.Vector3( 1, 1, 0) );
triangleGeometry.vertices.push( new THREE.Vector3( 3, 1, 0) );
triangleGeometry.vertices.push( new THREE.Vector3( 3, 3, 0) );
//face
triangleGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

var triangleMaterial = new THREE.MeshBasicMaterial( { color: 0x2685AA, side: THREE.DoubleSide });

var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
scene.add( triangleMesh );

triangleMesh.position.y += 150;
triangleMesh.position.z += 150;


var skyboxMesh = new THREE.Mesh( new THREE.CubeGeometry( 10000, 10000, 10000, 1, 1, 1, null, true ), material );
scene.add(skyboxMesh);

// draw out origins and directions for easier navigation
var originSphere = new THREE.Mesh(new THREE.SphereGeometry(5,32,32), new THREE.MeshBasicMaterial({color: 0x0fade0}));
originSphere.position = new THREE.Vector3(0,0,0);
scene.add(originSphere);

var xAxisGeo = new THREE.Geometry();
xAxisGeo.vertices.push(new THREE.Vector3(0,0,0));
xAxisGeo.vertices.push(new THREE.Vector3(100,0,0));
var xAxis = new THREE.Line(xAxisGeo, new THREE.LineBasicMaterial({ color: 'blue', linewidth: 5}));
scene.add(xAxis);

var yAxisGeo = new THREE.Geometry();
yAxisGeo.vertices.push(new THREE.Vector3(0,0,0));
yAxisGeo.vertices.push(new THREE.Vector3(0,100,0));
var yAxis = new THREE.Line(yAxisGeo, new THREE.LineBasicMaterial({ color: 'red', linewidth: 5}));
scene.add(yAxis);

var zAxisGeo = new THREE.Geometry();
zAxisGeo.vertices.push(new THREE.Vector3(0,0,0));
zAxisGeo.vertices.push(new THREE.Vector3(0,0,100));
var zAxis = new THREE.Line(zAxisGeo, new THREE.LineBasicMaterial({ color: 'green', linewidth: 5}));
scene.add(zAxis);



// Create a line at the top of where the boxes bounce to
var lineGeo = new THREE.Geometry();
lineGeo.vertices.push(new THREE.Vector3(0, 250, 100));
lineGeo.vertices.push(new THREE.Vector3(-200, 250, -100));
var line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 5 }));
scene.add(line);

// and a box below...

var lineGeo_bot = new THREE.Geometry();
lineGeo_bot.vertices.push(new THREE.Vector3(0, 0, 100));
lineGeo_bot.vertices.push(new THREE.Vector3(-200, 0, -100));
var line_bot = new THREE.Line(lineGeo_bot, new THREE.LineBasicMaterial({ color: 0x0000ff }));
scene.add(line_bot);

for (var i = 0; i < 20; i++) {
  cubes[i] = new THREE.Mesh(new THREE.BoxGeometry(10,10,10), new THREE.MeshBasicMaterial( {color: 0x99ff00} ));
  cubes[i].position.x = i*(-20);
  cubes[i].position.y = i*10;
  cubes[i].position.z = i*(-20) + 100;
  scene.add(cubes[i]);

}
var floors = [];
var colors = ['cyan', 'green', 'magenta', 'yellow'];


console.log("is it safe here?");

for (var i = 0; i < 5; i++ ) {
  floors[i] = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(i*200 + 200, i*200 + 200, 1, 1 ),
      new THREE.MeshBasicMaterial(
                { color: colors[i],
                  side: THREE.DoubleSide }
      ));
  floors[i].rotation.x = pi/2;
  floors[i].position.y = -5*i - 10;
  scene.add( floors[i] );

}

camera.position.z += 200;
camera.position.y += 125;



/*
Request animation frame loop function
*/


function animate() {
  // TODO: Apply any desired changes for the next frame here.

  for (var i = 0; i < cubes.length; i++) {
    //cubes[i].rotation.x += 0.01;
    //cubes[i].rotation.z += 0.01;
    if (up) {
      cubes[i].position.y += 5;
      if (cubes[i].position.y >= 250) up = false;
    }
    else {
      cubes[i].position.y -= 5;
      if (cubes[i].position.y <= 0) up = true;

    }

    if (cubes[i].position.y > 250) {
      //cubes[i].material.color.setHex( 0xff0000);

    }
  }


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
