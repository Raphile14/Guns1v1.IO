let scene, camera, renderer, mesh;
let meshFloor, ambientLight, light, controls;
let firstPOV;
 
let keyboard = {};
let player = { height:10, speed:1, turnSpeed:Math.PI*0.02 };
let USE_WIREFRAME = false;

// Hand Parts
let playerHandRight, indexR1, indexR2, pointR1, pointR2, middleR1, middleR2, thumbR1, thumbR2;
let playerHandLeft, index1, index2, point1, point2, middle1, middle2, thumb1, thumb2;

// Hand Parts Enemy
let playerHandRightE, indexR1E, indexR2E, pointR1E, pointR2E, middleR1E, middleR2E, thumbR1E, thumbR2E;
let playerHandLeftE, index1E, index2E, point1E, point2E, middle1E, middle2E, thumb1E, thumb2E;

// Hover Logic Variables
let hoverMax = 0.5;
let hoverMin = 0.2;
let hoverSpeed = 0.01;
let curPosition = 0;
let hoverTop = true;

// Instruction Logic
// Player
let hoverCharge = false, hoverPistol = false, hoverCounter = false, hoverShield1 = false, hoverEvade = false;
let hoverBlock = false, hoverDoublePistol = false, hoverGrenade = false, hoverShotgun = false, hoverShield2 = false;
let hoverLaser = false, hoverShield3 = false, hoverNuke = false;

// Enemy
let hoverChargeE = false, hoverPistolE = false, hoverCounterE = false, hoverShield1E = false, hoverEvadeE = false; 
let hoverBlockE = false, hoverDoublePistolE = false, hoverGrenadeE = false, hoverShotgunE = false, hoverShield2E = false;
let hoverLaserE = false, hoverShield3E = false, hoverNukeE = false;

// Player Face
let playerFace;
let playerFace2;

// Perspective Logic
let loginRegistrationPage = true;
let swapSpeed = 0.01;
let swapTimer = 0;
let swapCounter = 0;
let maxSwap = 13;
let inGamePage = false;
let instructionsPage = false;
let mainMenuPage = false;
 
// Font
let bungeeFont;

// Text
let enemyName;

// Enemy and Place Face
let textureFace;
let materialFace;
let textureNew;

function init(){
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 7, 30);
    camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
 
    // BACKGROUND
    const bg = new THREE.TextureLoader();
    bg.load('assets/textures/sky3.jpg' , function(texture) {
        // scene.background = texture;  
    });

    // Textures 
    textureFace = new THREE.TextureLoader().load( 'textures/default.png' );
    textureFace.crossOrigin = '';
    let textureSkin = new THREE.TextureLoader().load( 'textures/skin.jpg' );
    let textureGround = new THREE.TextureLoader().load( 'textures/ground.jpg' );

    // Materials
    let materialWhite = new THREE.MeshBasicMaterial( { color:0xffffff } );
    let materialSkin = new THREE.MeshLambertMaterial( { map: textureSkin } );
    materialFace = new THREE.MeshLambertMaterial( { map: textureFace, transparent: true } );
    let materialGround = new THREE.MeshLambertMaterial( { map: textureGround } );

    // ==========================  OBJECTS ==========================
    // Ground
    const widthGround = 80;
    const heightGround = 100;
    const widthSegmentsGround = 2;
    const heightSegmentsGround = 2;
    const geometryGround = new THREE.PlaneBufferGeometry(widthGround, heightGround, widthSegmentsGround, heightSegmentsGround);
    let ground = new THREE.Mesh( geometryGround, materialGround );
    ground.receiveShadow = true;
    ground.castShadow = true;
    scene.add( ground );
    ground.position.y = -3; 
    ground.rotation.x = -1.575;

    // ====================== PLAYER 1 ======================
    // Face Player
    const width= 5;
    const height = 5;
    const depth = 5;
    const geometry = new THREE.BoxBufferGeometry(width, height, depth);
    playerFace = new THREE.Mesh( geometry, materialFace );
    playerFace.receiveShadow = true;
    playerFace.castShadow = true;
    scene.add(playerFace);
    playerFace.position.x = 0; 
    playerFace.position.y = 0;
    playerFace.position.z = 10;    

    // ====================== PLAYER 1 HAND LEFT ======================
    // Hand Left
    const widthPalm= 1;
    const heightPalm = 1.5;
    const depthPalm = 0.5;
    const geometryPalm = new THREE.BoxBufferGeometry(widthPalm, heightPalm, depthPalm);
    playerHandLeft = new THREE.Mesh( geometryPalm, materialSkin );
    playerHandLeft.receiveShadow = true;
    playerHandLeft.castShadow = true;
    playerFace.add( playerHandLeft );        

    // Left Index 1
    const widthFinger1 = 0.2;
    const heightFinger1 = 0.5;
    const depthFinger1 = 0.5;
    const geometryIndex1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    index1 = new THREE.Mesh( geometryIndex1, materialSkin);
    index1.receiveShadow = true;
    index1.castShadow = true;
    playerHandLeft.add( index1 );    

    // Left Index 2
    index2 = new THREE.Mesh( geometryIndex1, materialSkin);
    index2.receiveShadow = true;
    index2.castShadow = true;
    playerHandLeft.add( index2 );     

    // Left Point 1
    const geometryPoint1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    point1 = new THREE.Mesh( geometryPoint1, materialSkin);
    point1.receiveShadow = true;
    point1.castShadow = true;
    playerHandLeft.add( point1 );    

    // Left Point 2
    point2 = new THREE.Mesh( geometryPoint1, materialSkin);
    point2.receiveShadow = true;
    point2.castShadow = true;
    playerHandLeft.add( point2 );    

    // Left Middle 1
    const geometryMiddle1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    middle1 = new THREE.Mesh( geometryMiddle1, materialSkin);
    middle1.receiveShadow = true;
    middle1.castShadow = true;
    playerHandLeft.add( middle1 );    

    // Left Middle 2
    middle2 = new THREE.Mesh( geometryMiddle1, materialSkin);
    middle2.receiveShadow = true;
    middle2.castShadow = true;
    playerHandLeft.add( middle2 );    

    // Left Thumb 1
    const geometryThumb1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    thumb1 = new THREE.Mesh( geometryThumb1, materialSkin);
    thumb1.receiveShadow = true;
    thumb1.castShadow = true;
    playerHandLeft.add( thumb1 );    

    // Left Thumb 2
    thumb2 = new THREE.Mesh( geometryThumb1, materialSkin);
    thumb2.receiveShadow = true;
    thumb2.castShadow = true;
    playerHandLeft.add( thumb2 );    

    // ====================== PLAYER 1 HAND RIGHT ======================
    // Hand Right
    playerHandRight = new THREE.Mesh( geometryPalm, materialSkin );
    playerHandRight.receiveShadow = true;
    playerHandRight.castShadow = true;
    playerFace.add( playerHandRight );    

    // Right Index 1
    const geometryIndexR1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    indexR1 = new THREE.Mesh( geometryIndexR1, materialSkin);
    indexR1.receiveShadow = true;
    indexR1.castShadow = true;
    playerHandRight.add( indexR1 );    

    // Right Index 2
    indexR2 = new THREE.Mesh( geometryIndexR1, materialSkin);
    indexR2.receiveShadow = true;
    indexR2.castShadow = true;
    playerHandRight.add( indexR2 );    

    // Right Point 1
    const geometryPointR1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    pointR1 = new THREE.Mesh( geometryPointR1, materialSkin);
    pointR1.receiveShadow = true;
    pointR1.castShadow = true;
    playerHandRight.add( pointR1 );    

    // Right Point 2
    pointR2 = new THREE.Mesh( geometryPointR1, materialSkin);
    pointR2.receiveShadow = true;
    pointR2.castShadow = true;
    playerHandRight.add( pointR2 );    

    // Right Middle 1
    const geometryMiddleR1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    middleR1 = new THREE.Mesh( geometryMiddleR1, materialSkin);
    middleR1.receiveShadow = true;
    middleR1.castShadow = true;
    playerHandRight.add( middleR1 );
    
    // Right Middle 2
    middleR2 = new THREE.Mesh( geometryMiddleR1, materialSkin);
    middleR2.receiveShadow = true;
    middleR2.castShadow = true;
    playerHandRight.add( middleR2 );    

    // Right Thumb 1
    const geometryThumbR1 = new THREE.BoxBufferGeometry(widthFinger1, heightFinger1, depthFinger1);
    thumbR1 = new THREE.Mesh( geometryThumbR1, materialSkin);
    thumbR1.receiveShadow = true;
    thumbR1.castShadow = true;
    playerHandRight.add( thumbR1 );    

    // Right Thumb 2
    thumbR2 = new THREE.Mesh( geometryThumbR1, materialSkin);
    thumbR2.receiveShadow = true;
    thumbR2.castShadow = true;
    playerHandRight.add( thumbR2 );    

    // ====================== Duplicates ======================
    
    // Player 2
    playerFace2 = playerFace.clone();
    scene.add( playerFace2 );
    playerFace2.position.z = -10;
    playerFace2.rotation.y = 3.1;  

    // ====================== PLAYER 2 HAND LEFT ======================
    // Hand Left
    playerHandLeftE = new THREE.Mesh( geometryPalm, materialSkin );
    playerHandLeftE.receiveShadow = true;
    playerHandLeftE.castShadow = true;
    playerFace2.add( playerHandLeftE );        

    // Left Index 1
    index1E = new THREE.Mesh( geometryIndex1, materialSkin);
    index1E.receiveShadow = true;
    index1E.castShadow = true;
    playerHandLeftE.add( index1E );    

    // Left Index 2
    index2E = new THREE.Mesh( geometryIndex1, materialSkin);
    index2E.receiveShadow = true;
    index2E.castShadow = true;
    playerHandLeftE.add( index2E );     

    // Left Point 1
    point1E = new THREE.Mesh( geometryPoint1, materialSkin);
    point1E.receiveShadow = true;
    point1E.castShadow = true;
    playerHandLeftE.add( point1E );    

    // Left Point 2
    point2E = new THREE.Mesh( geometryPoint1, materialSkin);
    point2E.receiveShadow = true;
    point2E.castShadow = true;
    playerHandLeftE.add( point2E );    

    // Left Middle 1
    middle1E = new THREE.Mesh( geometryMiddle1, materialSkin);
    middle1E.receiveShadow = true;
    middle1E.castShadow = true;
    playerHandLeftE.add( middle1E );    

    // Left Middle 2
    middle2E = new THREE.Mesh( geometryMiddle1, materialSkin);
    middle2E.receiveShadow = true;
    middle2E.castShadow = true;
    playerHandLeftE.add( middle2E );    

    // Left Thumb 1
    thumb1E = new THREE.Mesh( geometryThumb1, materialSkin);
    thumb1E.receiveShadow = true;
    thumb1E.castShadow = true;
    playerHandLeftE.add( thumb1E );    

    // Left Thumb 2
    thumb2E = new THREE.Mesh( geometryThumb1, materialSkin);
    thumb2E.receiveShadow = true;
    thumb2E.castShadow = true;
    playerHandLeftE.add( thumb2E );    

    // ====================== PLAYER 2 HAND RIGHT ======================
    // Hand Right
    playerHandRightE = new THREE.Mesh( geometryPalm, materialSkin );
    playerHandRightE.receiveShadow = true;
    playerHandRightE.castShadow = true;
    playerFace2.add( playerHandRightE );    

    // Right Index 1
    indexR1E = new THREE.Mesh( geometryIndexR1, materialSkin);
    indexR1E.receiveShadow = true;
    indexR1E.castShadow = true;
    playerHandRightE.add( indexR1E );    

    // Right Index 2
    indexR2E = new THREE.Mesh( geometryIndexR1, materialSkin);
    indexR2E.receiveShadow = true;
    indexR2E.castShadow = true;
    playerHandRightE.add( indexR2E );    

    // Right Point 1
    pointR1E = new THREE.Mesh( geometryPointR1, materialSkin);
    pointR1E.receiveShadow = true;
    pointR1E.castShadow = true;
    playerHandRightE.add( pointR1E );    

    // Right Point 2
    pointR2E = new THREE.Mesh( geometryPointR1, materialSkin);
    pointR2E.receiveShadow = true;
    pointR2E.castShadow = true;
    playerHandRightE.add( pointR2E );    

    // Right Middle 1
    middleR1E = new THREE.Mesh( geometryMiddleR1, materialSkin);
    middleR1E.receiveShadow = true;
    middleR1E.castShadow = true;
    playerHandRightE.add( middleR1E );
    
    // Right Middle 2
    middleR2E = new THREE.Mesh( geometryMiddleR1, materialSkin);
    middleR2E.receiveShadow = true;
    middleR2E.castShadow = true;
    playerHandRightE.add( middleR2E );    

    // Right Thumb 1
    thumbR1E = new THREE.Mesh( geometryThumbR1, materialSkin);
    thumbR1E.receiveShadow = true;
    thumbR1E.castShadow = true;
    playerHandRightE.add( thumbR1E );    

    // Right Thumb 2
    thumbR2E = new THREE.Mesh( geometryThumbR1, materialSkin);
    thumbR2E.receiveShadow = true;
    thumbR2E.castShadow = true;
    playerHandRightE.add( thumbR2E );    
 
    // LIGHTS
    // Ambient Light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    
    // // Point Light
    // sunLight = new THREE.PointLight(0xffffff, 4, 18);
    // sunLight.position.set(-10,10,0);
    // sunLight.castShadow = true;
    // sunLight.shadow.camera.near = 0.1;
    // sunLight.shadow.camera.far = 25;
    // scene.add(sunLight);

    // Spot Light
    // let spotLight = new THREE.SpotLight( 0xFF0000, 1.5, 50);
    let spotLight = new THREE.SpotLight( 0xFFFFFF, 1, 50);
    spotLight.position.set( 0, 10, 0 );
    spotLight.target.position.set( 0, -100, 0 );
    spotLight.castShadow = true;
    // spotLight.shadow.radius = 0;
    scene.add( spotLight.target );
    scene.add( spotLight );
    // spotLight.shadow.mapSize.width = 100; 
    // spotLight.shadow.mapSize.height = 10; 
    // spotLight.shadow.camera.near = 0.5; 
    // spotLight.shadow.camera.far = 15000; 
    
    camera.position.set(0.2, 0, 7);
    camera.lookAt(new THREE.Vector3(0,0,0));
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight
      );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls (camera, renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
    animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
 
function useWaiting() {
  // Hand Right
  playerHandRight.position.x = 2; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.x = 0;
  playerHandRight.rotation.y = 0;
  playerHandRight.rotation.z = 0;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = 1.1;
  indexR1.position.z = 0; 
  indexR1.rotation.x = 0;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.1; 
  indexR2.position.y = 1.7;
  indexR2.rotation.x = 3; 
  indexR2.rotation.y = 0;
  indexR2.rotation.z = 0;  

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0;
  pointR1.rotation.y = 0;
  pointR1.rotation.z = 0;

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = 1.1;
  middleR1.position.z = 0; 
  middleR1.rotation.x = 0;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.1; 
  middleR2.position.y = 1.7;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = - 0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 0;

  // Hand Right Thumb 2
  thumbR2.position.x = - 0.8; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .6;
  thumbR2.rotation.x = 3; 
  thumbR2.rotation.y = 0; 
  thumbR2.rotation.z = 0; 

  // Hand Left
  playerHandLeft.position.x = -2; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = 0;
  playerHandLeft.rotation.y = 0;
  playerHandLeft.rotation.z = 0;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = 1.1;
  index1.position.z = 0; 
  index1.rotation.x = 0;
  index1.rotation.y = 0;
  index1.rotation.z = 0;

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.1; 
  index2.position.y = 1.7;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2.position.x = 0.8; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .6;
  thumb2.rotation.x = 3; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 0; 
}
function useWaitingEnemy() {
  // Hand Right
  playerHandRightE.position.x = 2; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.x = 0;
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 0;

  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = 1.1;
  indexR1E.position.z = 0; 
  indexR1E.rotation.x = 0;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;

  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.1; 
  indexR2E.position.y = 1.7;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.y = 0;
  indexR2E.rotation.z = 0;  

  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0;
  pointR1E.rotation.y = 0;
  pointR1E.rotation.z = 0;

  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = 1.1;
  middleR1E.position.z = 0; 
  middleR1E.rotation.x = 0;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;

  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.1; 
  middleR2E.position.y = 1.7;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1E.position.x = - 0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 0;

  // Hand Right Thumb 2
  thumbR2E.position.x = - 0.8; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .6;
  thumbR2E.rotation.x = 3; 
  thumbR2E.rotation.y = 0; 
  thumbR2E.rotation.z = 0; 

  // Hand Left
  playerHandLeftE.position.x = -2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = 0;
  playerHandLeftE.rotation.z = 0;

  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0;
  index1E.rotation.y = 0;
  index1E.rotation.z = 0;

  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;

  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;

  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 

  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;

  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function usePistol() {
  // Hand Right
  playerHandRight.position.x = 2; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.x = -1.6;
  playerHandRight.rotation.y = 1;
  playerHandRight.rotation.z = 0.2;  

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = .6;
  middleR1.position.z = -0.4; 
  middleR1.rotation.x = -1;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.5; 
  middleR2.position.y = 0.1;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2.position.x = - 1.4; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .05;
  thumbR2.rotation.x = 0;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;

  // Hand Left
  playerHandLeft.position.x = -2; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = 0;
  playerHandLeft.rotation.y = -1;
  playerHandLeft.rotation.z = -0.2;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = 1.1;
  index1.position.z = 0; 
  index1.rotation.x = 0; 
  index1.rotation.y = 0; 
  index1.rotation.z = 0; 

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.1; 
  index2.position.y = 1.7;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2.position.x = 0.8; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .6;
  thumb2.rotation.x = 3; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 0; 
}
function usePistolEnemy() {
  // Hand Right
  playerHandRightE.position.x = 2; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.x = -1.6;
  playerHandRightE.rotation.y = 1;
  playerHandRightE.rotation.z = 0.2;  

  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;

  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;

  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 

  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1E.position.x = -0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 1.4; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .05;
  thumbR2E.rotation.x = 0;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;
  
  // Hand Left
  playerHandLeftE.position.x = -2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = -1;
  playerHandLeftE.rotation.z = -0.2;

  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0; 
  index1E.rotation.y = 0; 
  index1E.rotation.z = 0; 

  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;

  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;

  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 

  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;

  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function useCharge() {
  // Hand Right
  playerHandRight.position.x = 1; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.y = 0;
  playerHandRight.rotation.z = 1.5;
  playerHandRight.rotation.x = -1.3;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = .6;
  pointR1.position.z = -0.4; 
  pointR1.rotation.x = -1; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.5; 
  pointR2.position.y = 0.1;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = .6;
  middleR1.position.z = -0.4; 
  middleR1.rotation.x = -1;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.5; 
  middleR2.position.y = 0.1;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.5; 
  thumbR1.position.y = -0.3;
  thumbR1.position.z = -0.3; 
  thumbR1.rotation.x = -0.5;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 2;
  
  // Hand Right Thumb 2
  thumbR2.position.x = 0; 
  thumbR2.position.z = -0.3; 
  thumbR2.position.y = -0.1;
  thumbR2.rotation.x = -0.5;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;

  // Hand Left
  playerHandLeft.position.x = -0.5; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = 0;
  playerHandLeft.rotation.y = -1.5;
  playerHandLeft.rotation.z = -0.2;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = 1.1;
  index1.position.z = 0; 
  index1.rotation.x = 0; 
  index1.rotation.y = 0; 
  index1.rotation.z = 0; 

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.1; 
  index2.position.y = 1.7;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2.position.x = 0.8; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .6;
  thumb2.rotation.x = 3; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 0;  

}
function useChargeEnemy() {
  // Hand Right
  playerHandRightE.position.x = 1; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 1.5;
  playerHandRightE.rotation.x = -1.3;

  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;

  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;

  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = .6;
  pointR1E.position.z = -0.4; 
  pointR1E.rotation.x = -1; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 

  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.5; 
  pointR2E.position.y = 0.1;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1E.position.x = -0.5; 
  thumbR1E.position.y = -0.3;
  thumbR1E.position.z = -0.3; 
  thumbR1E.rotation.x = -0.5;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 2;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = 0; 
  thumbR2E.position.z = -0.3; 
  thumbR2E.position.y = -0.1;
  thumbR2E.rotation.x = -0.5;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;

  // Hand Left
  playerHandLeftE.position.x = -0.5; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = -1.5;
  playerHandLeftE.rotation.z = -0.2;

  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0; 
  index1E.rotation.y = 0; 
  index1E.rotation.z = 0; 

  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;

  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;

  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 

  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;

  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0;  

}
function useShieldLvl1() {
  // Hand Right
  playerHandRight.position.x = 2; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.y = 0;
  playerHandRight.rotation.z = 0.2;
  playerHandRight.rotation.x = 0;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = .6;
  middleR1.position.z = -0.4; 
  middleR1.rotation.x = -1;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.5; 
  middleR2.position.y = 0.1;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2.position.x = - 1.4; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .05;
  thumbR2.rotation.x = 0;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;

  // Hand Left
  playerHandLeft.position.x = -2; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = 0;
  playerHandLeft.rotation.y = 0;
  playerHandLeft.rotation.z = -0.2;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = .6;
  index1.position.z = -0.4; 
  index1.rotation.x = -1; 
  index1.rotation.y = 0; 
  index1.rotation.z = 0; 

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.5; 
  index2.position.y = 0.1;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = .6;
  middle1.position.z = -0.4; 
  middle1.rotation.x = -1;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.5; 
  middle2.position.y = 0.1;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 1.5;

  // Hand Left Thumb 2
  thumb2.position.x = 1.4; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .05;
  thumb2.rotation.x = 0; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 1.5;  

}
function useShieldLvl1Enemy() {
  // Hand Right
  playerHandRightE.position.x = 2; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 0.2;
  playerHandRightE.rotation.x = 0;

  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;

  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;

  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 

  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1E.position.x = -0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 1.4; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .05;
  thumbR2E.rotation.x = 0;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;

  // Hand Left
  playerHandLeftE.position.x = -2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = 0;
  playerHandLeftE.rotation.z = -0.2;

  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = .6;
  index1E.position.z = -0.4; 
  index1E.rotation.x = -1; 
  index1E.rotation.y = 0; 
  index1E.rotation.z = 0; 

  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.5; 
  index2E.position.y = 0.1;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;

  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;

  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 

  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = .6;
  middle1E.position.z = -0.4; 
  middle1E.rotation.x = -1;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;

  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.5; 
  middle2E.position.y = 0.1;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 1.5;

  // Hand Left Thumb 2
  thumb2E.position.x = 1.4; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .05;
  thumb2E.rotation.x = 0; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 1.5;  

}
function useCounter() {
  // Hand Right
  playerHandRight.position.x = 1.5; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.x = 0;
  playerHandRight.rotation.y = 3;
  playerHandRight.rotation.z = 0;  

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = .6;
  middleR1.position.z = -0.4; 
  middleR1.rotation.x = -1;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.5; 
  middleR2.position.y = 0.1;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2.position.x = - 1.4; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .05;
  thumbR2.rotation.x = 0;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;

  // Hand Left
  playerHandLeft.position.x = -2; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = 0;
  playerHandLeft.rotation.y = -1;
  playerHandLeft.rotation.z = -0.2;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = 1.1;
  index1.position.z = 0; 
  index1.rotation.x = 0; 
  index1.rotation.y = 0; 
  index1.rotation.z = 0; 

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.1; 
  index2.position.y = 1.7;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2.position.x = 0.8; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .6;
  thumb2.rotation.x = 3; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 0; 
}
function useCounterEnemy() {
  // Hand Right
  playerHandRightE.position.x = 1.5; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.x = 0;
  playerHandRightE.rotation.y = 3;
  playerHandRightE.rotation.z = 0;  
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = -0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 1.4; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .05;
  thumbR2E.rotation.x = 0;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;
  
  // Hand Left
  playerHandLeftE.position.x = -2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = -1;
  playerHandLeftE.rotation.z = -0.2;
  
  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0; 
  index1E.rotation.y = 0; 
  index1E.rotation.z = 0; 
  
  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;
  
  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;
  
  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 
  
  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;
  
  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 
  
  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;
  
  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function useBlock() {
  // Hand Right
  playerHandRight.position.x = 1.2; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.x = 0;
  playerHandRight.rotation.y = 2.5;
  playerHandRight.rotation.z = 0;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = 1.1;
  indexR1.position.z = 0; 
  indexR1.rotation.x = 0;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.1; 
  indexR2.position.y = 1.7;
  indexR2.rotation.x = 3; 
  indexR2.rotation.y = 0;
  indexR2.rotation.z = 0;  

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0;
  pointR1.rotation.y = 0;
  pointR1.rotation.z = 0;

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = 1.1;
  middleR1.position.z = 0; 
  middleR1.rotation.x = 0;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.1; 
  middleR2.position.y = 1.7;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = - 0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 0;

  // Hand Right Thumb 2
  thumbR2.position.x = - 0.8; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .6;
  thumbR2.rotation.x = 3; 
  thumbR2.rotation.y = 0; 
  thumbR2.rotation.z = 0; 

  // Hand Left
  playerHandLeft.position.x = -1.2; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = 0;
  playerHandLeft.rotation.y = -2.5;
  playerHandLeft.rotation.z = 0;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = 1.1;
  index1.position.z = 0; 
  index1.rotation.x = 0;
  index1.rotation.y = 0;
  index1.rotation.z = 0;

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.1; 
  index2.position.y = 1.7;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2.position.x = 0.8; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .6;
  thumb2.rotation.x = 3; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 0; 
}
function useBlockEnemy() {
  // Hand Right
  playerHandRightE.position.x = 1.2; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.x = 0;
  playerHandRightE.rotation.y = 2.5;
  playerHandRightE.rotation.z = 0;
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = 1.1;
  indexR1E.position.z = 0; 
  indexR1E.rotation.x = 0;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.1; 
  indexR2E.position.y = 1.7;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.y = 0;
  indexR2E.rotation.z = 0;  
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0;
  pointR1E.rotation.y = 0;
  pointR1E.rotation.z = 0;
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = 1.1;
  middleR1E.position.z = 0; 
  middleR1E.rotation.x = 0;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.1; 
  middleR2E.position.y = 1.7;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = - 0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 0;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 0.8; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .6;
  thumbR2E.rotation.x = 3; 
  thumbR2E.rotation.y = 0; 
  thumbR2E.rotation.z = 0; 
  
  // Hand Left
  playerHandLeftE.position.x = -1.2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = -2.5;
  playerHandLeftE.rotation.z = 0;
  
  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0;
  index1E.rotation.y = 0;
  index1E.rotation.z = 0;
  
  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;
  
  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;
  
  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 
  
  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;
  
  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 
  
  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;
  
  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function useEvade() {
   // Hand Right
   playerHandRight.position.x = 1.3; 
   playerHandRight.position.y = -0.5;
   playerHandRight.position.z = -4.7;    
   playerHandRight.rotation.x = 0;
   playerHandRight.rotation.y = 0;
   playerHandRight.rotation.z = 0;
 
   // Hand Right Index 1
   indexR1.position.x = 0.4; 
   indexR1.position.y = 1.1;
   indexR1.position.z = 0; 
   indexR1.rotation.x = 0;
   indexR1.rotation.y = 0;
   indexR1.rotation.z = 0;
 
   // Hand Right Index 2
   indexR2.position.x = 0.4; 
   indexR2.position.z = -0.1; 
   indexR2.position.y = 1.7;
   indexR2.rotation.x = 3; 
   indexR2.rotation.y = 0;
   indexR2.rotation.z = 0;  
 
   // Hand Right Point 1
   pointR1.position.x = -0.4; 
   pointR1.position.y = 1.1;
   pointR1.position.z = 0; 
   pointR1.rotation.x = 0;
   pointR1.rotation.y = 0;
   pointR1.rotation.z = 0;
 
   // Hand Right Point 2
   pointR2.position.x = -0.4; 
   pointR2.position.z = -0.1; 
   pointR2.position.y = 1.7;
   pointR2.rotation.x = 3; 
   pointR2.rotation.y = 0; 
   pointR2.rotation.z = 0; 
 
   // Hand Right Middle 1
   middleR1.position.x = 0; 
   middleR1.position.y = 1.1;
   middleR1.position.z = 0; 
   middleR1.rotation.x = 0;
   middleR1.rotation.y = 0;
   middleR1.rotation.z = 0;
 
   // Hand Right Middle 2
   middleR2.position.x = 0; 
   middleR2.position.z = -0.1; 
   middleR2.position.y = 1.7;
   middleR2.rotation.x = 3; 
   middleR2.rotation.y = 0; 
   middleR2.rotation.z = 0; 
 
   // Hand Right Thumb 1
   thumbR1.position.x = - 0.8; 
   thumbR1.position.y = 0;
   thumbR1.position.z = 0; 
   thumbR1.rotation.x = 0;
   thumbR1.rotation.y = 0;
   thumbR1.rotation.z = 0;
 
   // Hand Right Thumb 2
   thumbR2.position.x = - 0.8; 
   thumbR2.position.z = -0.1; 
   thumbR2.position.y = .6;
   thumbR2.rotation.x = 3; 
   thumbR2.rotation.y = 0; 
   thumbR2.rotation.z = 0; 
 
   // Hand Left
   playerHandLeft.position.x = -1.3; 
   playerHandLeft.position.y = -0.5;
   playerHandLeft.position.z = -4.7; 
   playerHandLeft.rotation.x = 0;
   playerHandLeft.rotation.y = 0;
   playerHandLeft.rotation.z = 0;
 
   // Hand Left Index 1
   index1.position.x = -0.4; 
   index1.position.y = 1.1;
   index1.position.z = 0; 
   index1.rotation.x = 0;
   index1.rotation.y = 0;
   index1.rotation.z = 0;
 
   // Hand Left Index 2
   index2.position.x = -0.4; 
   index2.position.z = -0.1; 
   index2.position.y = 1.7;
   index2.rotation.x = 3;
   index2.rotation.y = 0;
   index2.rotation.z = 0;
 
   // Hand Left Point 1
   point1.position.x = 0.4; 
   point1.position.y = 1.1;
   point1.position.z = 0; 
   point1.rotation.x = 0;
   point1.rotation.y = 0;
   point1.rotation.z = 0;
 
   // Hand Left Point 2
   point2.position.x = 0.4; 
   point2.position.z = -0.1; 
   point2.position.y = 1.7;
   point2.rotation.x = 3; 
   point2.rotation.y = 0; 
   point2.rotation.z = 0; 
 
   // Hand Left Middle 1
   middle1.position.x = 0; 
   middle1.position.y = 1.1;
   middle1.position.z = 0; 
   middle1.rotation.x = 0;
   middle1.rotation.y = 0;
   middle1.rotation.z = 0;
 
   // Hand Left Middle 2
   middle2.position.x = 0; 
   middle2.position.z = -0.1; 
   middle2.position.y = 1.7;
   middle2.rotation.x = 3; 
   middle2.rotation.y = 0; 
   middle2.rotation.z = 0; 
 
   // Hand Left Thumb 1
   thumb1.position.x = 0.8; 
   thumb1.position.y = 0;
   thumb1.position.z = 0; 
   thumb1.rotation.x = 0;
   thumb1.rotation.y = 0;
   thumb1.rotation.z = 0;
 
   // Hand Left Thumb 2
   thumb2.position.x = 0.8; 
   thumb2.position.z = -0.1; 
   thumb2.position.y = .6;
   thumb2.rotation.x = 3; 
   thumb2.rotation.y = 0; 
   thumb2.rotation.z = 0; 
}
function useEvadeEnemy() {
  // Hand Right
  playerHandRightE.position.x = 1.3; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.x = 0;
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 0;

  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = 1.1;
  indexR1E.position.z = 0; 
  indexR1E.rotation.x = 0;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;

  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.1; 
  indexR2E.position.y = 1.7;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.y = 0;
  indexR2E.rotation.z = 0;  

  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0;
  pointR1E.rotation.y = 0;
  pointR1E.rotation.z = 0;

  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = 1.1;
  middleR1E.position.z = 0; 
  middleR1E.rotation.x = 0;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;

  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.1; 
  middleR2E.position.y = 1.7;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1E.position.x = - 0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 0;

  // Hand Right Thumb 2
  thumbR2E.position.x = - 0.8; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .6;
  thumbR2E.rotation.x = 3; 
  thumbR2E.rotation.y = 0; 
  thumbR2E.rotation.z = 0; 

  // Hand Left
  playerHandLeftE.position.x = -1.3; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = 0;
  playerHandLeftE.rotation.z = 0;

  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0;
  index1E.rotation.y = 0;
  index1E.rotation.z = 0;

  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;

  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;

  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 

  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;

  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function useDoublePistol() {
  // Hand Right
  playerHandRight.position.x = 2; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.y = 1;
  playerHandRight.rotation.z = 0.2;
  playerHandRight.rotation.x = -1.6;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = .6;
  middleR1.position.z = -0.4; 
  middleR1.rotation.x = -1;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.5; 
  middleR2.position.y = 0.1;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2.position.x = - 1.4; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .05;
  thumbR2.rotation.x = 0;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;

  // Hand Left
  playerHandLeft.position.x = -2; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = -1.6;
  playerHandLeft.rotation.y = -1;
  playerHandLeft.rotation.z = -0.2;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = .6;
  index1.position.z = -0.4; 
  index1.rotation.x = -1; 
  index1.rotation.y = 0; 
  index1.rotation.z = 0; 

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.5; 
  index2.position.y = 0.1;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = .6;
  middle1.position.z = -0.4; 
  middle1.rotation.x = -1;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.5; 
  middle2.position.y = 0.1;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 1.5;

  // Hand Left Thumb 2
  thumb2.position.x = 1.4; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .05;
  thumb2.rotation.x = 0; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 1.5; 
}
function useDoublePistolEnemy() {
  // Hand Right
  playerHandRightE.position.x = 2; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.y = 1;
  playerHandRightE.rotation.z = 0.2;
  playerHandRightE.rotation.x = -1.6;
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = -0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 1.4; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .05;
  thumbR2E.rotation.x = 0;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;
  
  // Hand Left
  playerHandLeftE.position.x = -2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = -1.6;
  playerHandLeftE.rotation.y = -1;
  playerHandLeftE.rotation.z = -0.2;
  
  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = .6;
  index1E.position.z = -0.4; 
  index1E.rotation.x = -1; 
  index1E.rotation.y = 0; 
  index1E.rotation.z = 0; 
  
  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.5; 
  index2E.position.y = 0.1;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;
  
  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;
  
  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 
  
  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = .6;
  middle1E.position.z = -0.4; 
  middle1E.rotation.x = -1;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;
  
  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.5; 
  middle2E.position.y = 0.1;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 
  
  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 1.5;
  
  // Hand Left Thumb 2
  thumb2E.position.x = 1.4; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .05;
  thumb2E.rotation.x = 0; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 1.5; 
}
function useShotgun() {
  // Hand Right
  playerHandRight.position.x = 1; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.y = 0;
  playerHandRight.rotation.z = 1.5;
  playerHandRight.rotation.x = -1.3;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = .6;
  pointR1.position.z = -0.4; 
  pointR1.rotation.x = -1; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.5; 
  pointR2.position.y = 0.1;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = .6;
  middleR1.position.z = -0.4; 
  middleR1.rotation.x = -1;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.5; 
  middleR2.position.y = 0.1;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.5; 
  thumbR1.position.y = -0.3;
  thumbR1.position.z = -0.3; 
  thumbR1.rotation.x = -0.5;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 2;
  
  // Hand Right Thumb 2
  thumbR2.position.x = 0; 
  thumbR2.position.z = -0.3; 
  thumbR2.position.y = -0.1;
  thumbR2.rotation.x = -0.5;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;
  // Hand Left
  playerHandLeft.position.x = 0; 
  playerHandLeft.position.y = -1.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = -1.5;
  playerHandLeft.rotation.y = -3;
  playerHandLeft.rotation.z = 1;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = 1.1;
  index1.position.z = 0; 
  index1.rotation.x = 0;
  index1.rotation.y = 0;
  index1.rotation.z = 0;

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.1; 
  index2.position.y = 1.7;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2.position.x = 0.8; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .6;
  thumb2.rotation.x = 3; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 0; 
}
function useShotgunEnemy() {
  // Hand Right
  playerHandRightE.position.x = 1; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 1.5;
  playerHandRightE.rotation.x = -1.3;
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = .6;
  pointR1E.position.z = -0.4; 
  pointR1E.rotation.x = -1; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.5; 
  pointR2E.position.y = 0.1;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = -0.5; 
  thumbR1E.position.y = -0.3;
  thumbR1E.position.z = -0.3; 
  thumbR1E.rotation.x = -0.5;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 2;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = 0; 
  thumbR2E.position.z = -0.3; 
  thumbR2E.position.y = -0.1;
  thumbR2E.rotation.x = -0.5;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;
  // Hand Left
  playerHandLeftE.position.x = 0; 
  playerHandLeftE.position.y = -1.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = -1.5;
  playerHandLeftE.rotation.y = -3;
  playerHandLeftE.rotation.z = 1;
  
  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0;
  index1E.rotation.y = 0;
  index1E.rotation.z = 0;
  
  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;
  
  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;
  
  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 
  
  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;
  
  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 
  
  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;
  
  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function useGrenade() {

 // Hand Right
 playerHandRight.position.x = 1; 
 playerHandRight.position.y = -0.5;
 playerHandRight.position.z = -4.7;    
 playerHandRight.rotation.y = 0;
 playerHandRight.rotation.z = 0;
 playerHandRight.rotation.x = 0;

 // Hand Right Index 1
 indexR1.position.x = 0.4; 
 indexR1.position.y = .6;
 indexR1.position.z = -0.4; 
 indexR1.rotation.x = -1;
 indexR1.rotation.y = 0;
 indexR1.rotation.z = 0;

 // Hand Right Index 2
 indexR2.position.x = 0.4; 
 indexR2.position.z = -0.5; 
 indexR2.position.y = 0.1;
 indexR2.rotation.x = 3; 
 indexR2.rotation.x = 0;
 indexR2.rotation.x = 0;

 // Hand Right Point 1
 pointR1.position.x = -0.4; 
 pointR1.position.y = .6;
 pointR1.position.z = -0.4; 
 pointR1.rotation.x = -1; 
 pointR1.rotation.y = 0; 
 pointR1.rotation.z = 0; 

 // Hand Right Point 2
 pointR2.position.x = -0.4; 
 pointR2.position.z = -0.5; 
 pointR2.position.y = 0.1;
 pointR2.rotation.x = 3; 
 pointR2.rotation.y = 0; 
 pointR2.rotation.z = 0; 

 // Hand Right Middle 1
 middleR1.position.x = 0; 
 middleR1.position.y = .6;
 middleR1.position.z = -0.4; 
 middleR1.rotation.x = -1;
 middleR1.rotation.y = 0;
 middleR1.rotation.z = 0;  

 // Hand Right Middle 2
 middleR2.position.x = 0; 
 middleR2.position.z = -0.5; 
 middleR2.position.y = 0.1;
 middleR2.rotation.x = 3; 
 middleR2.rotation.y = 0; 
 middleR2.rotation.z = 0; 

 // Hand Right Thumb 1
 thumbR1.position.x = -0.5; 
 thumbR1.position.y = -0.3;
 thumbR1.position.z = -0.3; 
 thumbR1.rotation.x = -0.5;
 thumbR1.rotation.y = 0;
 thumbR1.rotation.z = 2;
 
 // Hand Right Thumb 2
 thumbR2.position.x = 0; 
 thumbR2.position.z = -0.3; 
 thumbR2.position.y = -0.1;
 thumbR2.rotation.x = -0.5;
 thumbR2.rotation.y = 0;
 thumbR2.rotation.z = 1.5;

 // Hand Left
 playerHandLeft.position.x = -1.3; 
 playerHandLeft.position.y = -1.5;
 playerHandLeft.position.z = -4.7; 
 playerHandLeft.rotation.x = -1.5;
 playerHandLeft.rotation.y = -3;
 playerHandLeft.rotation.z = 0;

 // Hand Left Index 1
 index1.position.x = -0.4; 
 index1.position.y = 1.1;
 index1.position.z = 0; 
 index1.rotation.x = 0;
 index1.rotation.y = 0;
 index1.rotation.z = 0;

 // Hand Left Index 2
 index2.position.x = -0.4; 
 index2.position.z = -0.1; 
 index2.position.y = 1.7;
 index2.rotation.x = 3;
 index2.rotation.y = 0;
 index2.rotation.z = 0;

 // Hand Left Point 1
 point1.position.x = 0.4; 
 point1.position.y = 1.1;
 point1.position.z = 0; 
 point1.rotation.x = 0;
 point1.rotation.y = 0;
 point1.rotation.z = 0;

 // Hand Left Point 2
 point2.position.x = 0.4; 
 point2.position.z = -0.1; 
 point2.position.y = 1.7;
 point2.rotation.x = 3; 
 point2.rotation.y = 0; 
 point2.rotation.z = 0; 

 // Hand Left Middle 1
 middle1.position.x = 0; 
 middle1.position.y = 1.1;
 middle1.position.z = 0; 
 middle1.rotation.x = 0;
 middle1.rotation.y = 0;
 middle1.rotation.z = 0;

 // Hand Left Middle 2
 middle2.position.x = 0; 
 middle2.position.z = -0.1; 
 middle2.position.y = 1.7;
 middle2.rotation.x = 3; 
 middle2.rotation.y = 0; 
 middle2.rotation.z = 0; 

 // Hand Left Thumb 1
 thumb1.position.x = 0.8; 
 thumb1.position.y = 0;
 thumb1.position.z = 0; 
 thumb1.rotation.x = 0;
 thumb1.rotation.y = 0;
 thumb1.rotation.z = 0;

 // Hand Left Thumb 2
 thumb2.position.x = 0.8; 
 thumb2.position.z = -0.1; 
 thumb2.position.y = .6;
 thumb2.rotation.x = 3; 
 thumb2.rotation.y = 0; 
 thumb2.rotation.z = 0; 

}
function useGrenadeEnemy() {

  // Hand Right
  playerHandRightE.position.x = 1; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 0;
  playerHandRightE.rotation.x = 0;
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = .6;
  pointR1E.position.z = -0.4; 
  pointR1E.rotation.x = -1; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.5; 
  pointR2E.position.y = 0.1;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = -0.5; 
  thumbR1E.position.y = -0.3;
  thumbR1E.position.z = -0.3; 
  thumbR1E.rotation.x = -0.5;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 2;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = 0; 
  thumbR2E.position.z = -0.3; 
  thumbR2E.position.y = -0.1;
  thumbR2E.rotation.x = -0.5;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;
  
  // Hand Left
  playerHandLeftE.position.x = -1.3; 
  playerHandLeftE.position.y = -1.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = -1.5;
  playerHandLeftE.rotation.y = -3;
  playerHandLeftE.rotation.z = 0;
  
  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0;
  index1E.rotation.y = 0;
  index1E.rotation.z = 0;
  
  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;
  
  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;
  
  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 
  
  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;
  
  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 
  
  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;
  
  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
  
}
function useShieldLvl2() {
  // Hand Right
  playerHandRight.position.x = 2; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.y = 0;
  playerHandRight.rotation.z = 0.2;
  playerHandRight.rotation.x = 0;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = 1.1; 
  middleR1.position.z = 0; 
  middleR1.rotation.x = 0;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.1; 
  middleR2.position.y = 1.7;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2.position.x = - 1.4; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .05;
  thumbR2.rotation.x = 0;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;

  // Hand Left
  playerHandLeft.position.x = -2; 
  playerHandLeft.position.y = -0.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = 0;
  playerHandLeft.rotation.y = 0;
  playerHandLeft.rotation.z = -0.2;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = .6;
  index1.position.z = -0.4; 
  index1.rotation.x = -1; 
  index1.rotation.y = 0; 
  index1.rotation.z = 0; 

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.5; 
  index2.position.y = 0.1;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 1.5;

  // Hand Left Thumb 2
  thumb2.position.x = 1.4; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .05;
  thumb2.rotation.x = 0; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 1.5;  

}
function useShieldLvl2Enemy() {
  // Hand Right
  playerHandRightE.position.x = 2; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 0.2;
  playerHandRightE.rotation.x = 0;
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = 1.1; 
  middleR1E.position.z = 0; 
  middleR1E.rotation.x = 0;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.1; 
  middleR2E.position.y = 1.7;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = -0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 1.4; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .05;
  thumbR2E.rotation.x = 0;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;
  
  // Hand Left
  playerHandLeftE.position.x = -2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = 0;
  playerHandLeftE.rotation.z = -0.2;
  
  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = .6;
  index1E.position.z = -0.4; 
  index1E.rotation.x = -1; 
  index1E.rotation.y = 0; 
  index1E.rotation.z = 0; 
  
  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.5; 
  index2E.position.y = 0.1;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;
  
  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;
  
  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 
  
  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;
  
  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 
  
  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 1.5;
  
  // Hand Left Thumb 2
  thumb2E.position.x = 1.4; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .05;
  thumb2E.rotation.x = 0; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 1.5;  
  
}
function useLaser() {
  // Hand Right
  playerHandRight.position.x = 1.5; 
  playerHandRight.position.y = -0.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.x = -1.6;
  playerHandRight.rotation.y = 1.5;
  playerHandRight.rotation.z = 0.2;  

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = .6;
  indexR1.position.z = -0.4; 
  indexR1.rotation.x = -1;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.5; 
  indexR2.position.y = 0.1;
  indexR2.rotation.x = 3; 
  indexR2.rotation.x = 0;
  indexR2.rotation.x = 0;

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0; 
  pointR1.rotation.y = 0; 
  pointR1.rotation.z = 0; 

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = .6;
  middleR1.position.z = -0.4; 
  middleR1.rotation.x = -1;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.5; 
  middleR2.position.y = 0.1;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = -0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2.position.x = - 1.4; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .05;
  thumbR2.rotation.x = 0;
  thumbR2.rotation.y = 0;
  thumbR2.rotation.z = 1.5;

   // Hand Left
   playerHandLeft.position.x = 0; 
   playerHandLeft.position.y = -1.5;
   playerHandLeft.position.z = -4.7; 
   playerHandLeft.rotation.x = -1.5;
   playerHandLeft.rotation.y = -3;
   playerHandLeft.rotation.z = 1;
 
   // Hand Left Index 1
   index1.position.x = -0.4; 
   index1.position.y = 1.1;
   index1.position.z = 0; 
   index1.rotation.x = 0;
   index1.rotation.y = 0;
   index1.rotation.z = 0;
 
   // Hand Left Index 2
   index2.position.x = -0.4; 
   index2.position.z = -0.1; 
   index2.position.y = 1.7;
   index2.rotation.x = 3;
   index2.rotation.y = 0;
   index2.rotation.z = 0;
 
   // Hand Left Point 1
   point1.position.x = 0.4; 
   point1.position.y = 1.1;
   point1.position.z = 0; 
   point1.rotation.x = 0;
   point1.rotation.y = 0;
   point1.rotation.z = 0;
 
   // Hand Left Point 2
   point2.position.x = 0.4; 
   point2.position.z = -0.1; 
   point2.position.y = 1.7;
   point2.rotation.x = 3; 
   point2.rotation.y = 0; 
   point2.rotation.z = 0; 
 
   // Hand Left Middle 1
   middle1.position.x = 0; 
   middle1.position.y = 1.1;
   middle1.position.z = 0; 
   middle1.rotation.x = 0;
   middle1.rotation.y = 0;
   middle1.rotation.z = 0;
 
   // Hand Left Middle 2
   middle2.position.x = 0; 
   middle2.position.z = -0.1; 
   middle2.position.y = 1.7;
   middle2.rotation.x = 3; 
   middle2.rotation.y = 0; 
   middle2.rotation.z = 0; 
 
   // Hand Left Thumb 1
   thumb1.position.x = 0.8; 
   thumb1.position.y = 0;
   thumb1.position.z = 0; 
   thumb1.rotation.x = 0;
   thumb1.rotation.y = 0;
   thumb1.rotation.z = 0;
 
   // Hand Left Thumb 2
   thumb2.position.x = 0.8; 
   thumb2.position.z = -0.1; 
   thumb2.position.y = .6;
   thumb2.rotation.x = 3; 
   thumb2.rotation.y = 0; 
   thumb2.rotation.z = 0; 
}
function useLaserEnemy() {
  // Hand Right
  playerHandRightE.position.x = 1.5; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.x = -1.6;
  playerHandRightE.rotation.y = 1.5;
  playerHandRightE.rotation.z = 0.2;  
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = .6;
  indexR1E.position.z = -0.4; 
  indexR1E.rotation.x = -1;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.5; 
  indexR2E.position.y = 0.1;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = .6;
  middleR1E.position.z = -0.4; 
  middleR1E.rotation.x = -1;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.5; 
  middleR2E.position.y = 0.1;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = -0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 1.4; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .05;
  thumbR2E.rotation.x = 0;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;
  
  // Hand Left
  playerHandLeftE.position.x = 0; 
  playerHandLeftE.position.y = -1.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = -1.5;
  playerHandLeftE.rotation.y = -3;
  playerHandLeftE.rotation.z = 1;

  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0;
  index1E.rotation.y = 0;
  index1E.rotation.z = 0;

  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;

  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;

  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 

  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;

  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function useShieldLvl3() {
   // Hand Right
   playerHandRight.position.x = 2; 
   playerHandRight.position.y = -0.5;
   playerHandRight.position.z = -4.7;    
   playerHandRight.rotation.y = 0;
   playerHandRight.rotation.z = 0.2;
   playerHandRight.rotation.x = 0;
 
   // Hand Right Index 1
   indexR1.position.x = 0.4; 
   indexR1.position.y = 1.1;
   indexR1.position.z = 0; 
   indexR1.rotation.x = 0;
   indexR1.rotation.y = 0;
   indexR1.rotation.z = 0;
 
   // Hand Right Index 2
   indexR2.position.x = 0.4; 
   indexR2.position.z = -0.1; 
   indexR2.position.y = 1.7;
   indexR2.rotation.x = 3; 
   indexR2.rotation.x = 0;
   indexR2.rotation.x = 0;
 
   // Hand Right Point 1
   pointR1.position.x = -0.4; 
   pointR1.position.y = 1.1;
   pointR1.position.z = 0; 
   pointR1.rotation.x = 0; 
   pointR1.rotation.y = 0; 
   pointR1.rotation.z = 0; 
 
   // Hand Right Point 2
   pointR2.position.x = -0.4; 
   pointR2.position.z = -0.1; 
   pointR2.position.y = 1.7;
   pointR2.rotation.x = 3; 
   pointR2.rotation.y = 0; 
   pointR2.rotation.z = 0; 
 
   // Hand Right Middle 1
   middleR1.position.x = 0; 
   middleR1.position.y = 1.1; 
   middleR1.position.z = 0; 
   middleR1.rotation.x = 0;
   middleR1.rotation.y = 0;
   middleR1.rotation.z = 0;  
 
   // Hand Right Middle 2
   middleR2.position.x = 0; 
   middleR2.position.z = -0.1; 
   middleR2.position.y = 1.7;
   middleR2.rotation.x = 3; 
   middleR2.rotation.y = 0; 
   middleR2.rotation.z = 0; 
 
   // Hand Right Thumb 1
   thumbR1.position.x = -0.8; 
   thumbR1.position.y = 0;
   thumbR1.position.z = 0; 
   thumbR1.rotation.x = 0;
   thumbR1.rotation.y = 0;
   thumbR1.rotation.z = 1.5;
   
   // Hand Right Thumb 2
   thumbR2.position.x = - 1.4; 
   thumbR2.position.z = -0.1; 
   thumbR2.position.y = .05;
   thumbR2.rotation.x = 0;
   thumbR2.rotation.y = 0;
   thumbR2.rotation.z = 1.5;
 
   // Hand Left
   playerHandLeft.position.x = -2; 
   playerHandLeft.position.y = -0.5;
   playerHandLeft.position.z = -4.7; 
   playerHandLeft.rotation.x = 0;
   playerHandLeft.rotation.y = 0;
   playerHandLeft.rotation.z = -0.2;
 
   // Hand Left Index 1
   index1.position.x = -0.4; 
   index1.position.y = 1.1;
   index1.position.z = 0; 
   index1.rotation.x = 0; 
   index1.rotation.y = 0; 
   index1.rotation.z = 0; 
 
   // Hand Left Index 2
   index2.position.x = -0.4; 
   index2.position.z = -0.1; 
   index2.position.y = 1.7;
   index2.rotation.x = 3;
   index2.rotation.y = 0;
   index2.rotation.z = 0;
 
   // Hand Left Point 1
   point1.position.x = 0.4; 
   point1.position.y = 1.1;
   point1.position.z = 0; 
   point1.rotation.x = 0;
   point1.rotation.y = 0;
   point1.rotation.z = 0;
 
   // Hand Left Point 2
   point2.position.x = 0.4; 
   point2.position.z = -0.1; 
   point2.position.y = 1.7;
   point2.rotation.x = 3; 
   point2.rotation.y = 0; 
   point2.rotation.z = 0; 
 
   // Hand Left Middle 1
   middle1.position.x = 0; 
   middle1.position.y = 1.1;
   middle1.position.z = 0; 
   middle1.rotation.x = 0;
   middle1.rotation.y = 0;
   middle1.rotation.z = 0;
 
   // Hand Left Middle 2
   middle2.position.x = 0; 
   middle2.position.z = -0.1; 
   middle2.position.y = 1.7;
   middle2.rotation.x = 3; 
   middle2.rotation.y = 0; 
   middle2.rotation.z = 0; 
 
   // Hand Left Thumb 1
   thumb1.position.x = 0.8; 
   thumb1.position.y = 0;
   thumb1.position.z = 0; 
   thumb1.rotation.x = 0;
   thumb1.rotation.y = 0;
   thumb1.rotation.z = 1.5;
 
   // Hand Left Thumb 2
   thumb2.position.x = 1.4; 
   thumb2.position.z = -0.1; 
   thumb2.position.y = .05;
   thumb2.rotation.x = 0; 
   thumb2.rotation.y = 0; 
   thumb2.rotation.z = 1.5;  

}
function useShieldLvl3Enemy() {
  // Hand Right
  playerHandRightE.position.x = 2; 
  playerHandRightE.position.y = -0.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.y = 0;
  playerHandRightE.rotation.z = 0.2;
  playerHandRightE.rotation.x = 0;

  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = 1.1;
  indexR1E.position.z = 0; 
  indexR1E.rotation.x = 0;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;

  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.1; 
  indexR2E.position.y = 1.7;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.x = 0;
  indexR2E.rotation.x = 0;

  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0; 
  pointR1E.rotation.y = 0; 
  pointR1E.rotation.z = 0; 

  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = 1.1; 
  middleR1E.position.z = 0; 
  middleR1E.rotation.x = 0;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;  

  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.1; 
  middleR2E.position.y = 1.7;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1E.position.x = -0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 1.5;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 1.4; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .05;
  thumbR2E.rotation.x = 0;
  thumbR2E.rotation.y = 0;
  thumbR2E.rotation.z = 1.5;

  // Hand Left
  playerHandLeftE.position.x = -2; 
  playerHandLeftE.position.y = -0.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = 0;
  playerHandLeftE.rotation.y = 0;
  playerHandLeftE.rotation.z = -0.2;

  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0; 
  index1E.rotation.y = 0; 
  index1E.rotation.z = 0; 

  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;

  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;

  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 

  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;

  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 1.5;

  // Hand Left Thumb 2
  thumb2E.position.x = 1.4; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .05;
  thumb2E.rotation.x = 0; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 1.5;  

}
function useNuke() {
  // Hand Right
  playerHandRight.position.x = 1.3; 
  playerHandRight.position.y = -1.5;
  playerHandRight.position.z = -4.7;    
  playerHandRight.rotation.x = -1.5;
  playerHandRight.rotation.y = 3;
  playerHandRight.rotation.z = 0;

  // Hand Right Index 1
  indexR1.position.x = 0.4; 
  indexR1.position.y = 1.1;
  indexR1.position.z = 0; 
  indexR1.rotation.x = 0;
  indexR1.rotation.y = 0;
  indexR1.rotation.z = 0;

  // Hand Right Index 2
  indexR2.position.x = 0.4; 
  indexR2.position.z = -0.1; 
  indexR2.position.y = 1.7;
  indexR2.rotation.x = 3; 
  indexR2.rotation.y = 0;
  indexR2.rotation.z = 0;  

  // Hand Right Point 1
  pointR1.position.x = -0.4; 
  pointR1.position.y = 1.1;
  pointR1.position.z = 0; 
  pointR1.rotation.x = 0;
  pointR1.rotation.y = 0;
  pointR1.rotation.z = 0;

  // Hand Right Point 2
  pointR2.position.x = -0.4; 
  pointR2.position.z = -0.1; 
  pointR2.position.y = 1.7;
  pointR2.rotation.x = 3; 
  pointR2.rotation.y = 0; 
  pointR2.rotation.z = 0; 

  // Hand Right Middle 1
  middleR1.position.x = 0; 
  middleR1.position.y = 1.1;
  middleR1.position.z = 0; 
  middleR1.rotation.x = 0;
  middleR1.rotation.y = 0;
  middleR1.rotation.z = 0;

  // Hand Right Middle 2
  middleR2.position.x = 0; 
  middleR2.position.z = -0.1; 
  middleR2.position.y = 1.7;
  middleR2.rotation.x = 3; 
  middleR2.rotation.y = 0; 
  middleR2.rotation.z = 0; 

  // Hand Right Thumb 1
  thumbR1.position.x = - 0.8; 
  thumbR1.position.y = 0;
  thumbR1.position.z = 0; 
  thumbR1.rotation.x = 0;
  thumbR1.rotation.y = 0;
  thumbR1.rotation.z = 0;

  // Hand Right Thumb 2
  thumbR2.position.x = - 0.8; 
  thumbR2.position.z = -0.1; 
  thumbR2.position.y = .6;
  thumbR2.rotation.x = 3; 
  thumbR2.rotation.y = 0; 
  thumbR2.rotation.z = 0; 

  // Hand Left
  playerHandLeft.position.x = -1.3; 
  playerHandLeft.position.y = -1.5;
  playerHandLeft.position.z = -4.7; 
  playerHandLeft.rotation.x = -1.5;
  playerHandLeft.rotation.y = -3;
  playerHandLeft.rotation.z = 0;

  // Hand Left Index 1
  index1.position.x = -0.4; 
  index1.position.y = 1.1;
  index1.position.z = 0; 
  index1.rotation.x = 0;
  index1.rotation.y = 0;
  index1.rotation.z = 0;

  // Hand Left Index 2
  index2.position.x = -0.4; 
  index2.position.z = -0.1; 
  index2.position.y = 1.7;
  index2.rotation.x = 3;
  index2.rotation.y = 0;
  index2.rotation.z = 0;

  // Hand Left Point 1
  point1.position.x = 0.4; 
  point1.position.y = 1.1;
  point1.position.z = 0; 
  point1.rotation.x = 0;
  point1.rotation.y = 0;
  point1.rotation.z = 0;

  // Hand Left Point 2
  point2.position.x = 0.4; 
  point2.position.z = -0.1; 
  point2.position.y = 1.7;
  point2.rotation.x = 3; 
  point2.rotation.y = 0; 
  point2.rotation.z = 0; 

  // Hand Left Middle 1
  middle1.position.x = 0; 
  middle1.position.y = 1.1;
  middle1.position.z = 0; 
  middle1.rotation.x = 0;
  middle1.rotation.y = 0;
  middle1.rotation.z = 0;

  // Hand Left Middle 2
  middle2.position.x = 0; 
  middle2.position.z = -0.1; 
  middle2.position.y = 1.7;
  middle2.rotation.x = 3; 
  middle2.rotation.y = 0; 
  middle2.rotation.z = 0; 

  // Hand Left Thumb 1
  thumb1.position.x = 0.8; 
  thumb1.position.y = 0;
  thumb1.position.z = 0; 
  thumb1.rotation.x = 0;
  thumb1.rotation.y = 0;
  thumb1.rotation.z = 0;

  // Hand Left Thumb 2
  thumb2.position.x = 0.8; 
  thumb2.position.z = -0.1; 
  thumb2.position.y = .6;
  thumb2.rotation.x = 3; 
  thumb2.rotation.y = 0; 
  thumb2.rotation.z = 0; 
}
function useNukeEnemy() {
  // Hand Right
  playerHandRightE.position.x = 1.3; 
  playerHandRightE.position.y = -1.5;
  playerHandRightE.position.z = -4.7;    
  playerHandRightE.rotation.x = -1.5;
  playerHandRightE.rotation.y = 3;
  playerHandRightE.rotation.z = 0;
  
  // Hand Right Index 1
  indexR1E.position.x = 0.4; 
  indexR1E.position.y = 1.1;
  indexR1E.position.z = 0; 
  indexR1E.rotation.x = 0;
  indexR1E.rotation.y = 0;
  indexR1E.rotation.z = 0;
  
  // Hand Right Index 2
  indexR2E.position.x = 0.4; 
  indexR2E.position.z = -0.1; 
  indexR2E.position.y = 1.7;
  indexR2E.rotation.x = 3; 
  indexR2E.rotation.y = 0;
  indexR2E.rotation.z = 0;  
  
  // Hand Right Point 1
  pointR1E.position.x = -0.4; 
  pointR1E.position.y = 1.1;
  pointR1E.position.z = 0; 
  pointR1E.rotation.x = 0;
  pointR1E.rotation.y = 0;
  pointR1E.rotation.z = 0;
  
  // Hand Right Point 2
  pointR2E.position.x = -0.4; 
  pointR2E.position.z = -0.1; 
  pointR2E.position.y = 1.7;
  pointR2E.rotation.x = 3; 
  pointR2E.rotation.y = 0; 
  pointR2E.rotation.z = 0; 
  
  // Hand Right Middle 1
  middleR1E.position.x = 0; 
  middleR1E.position.y = 1.1;
  middleR1E.position.z = 0; 
  middleR1E.rotation.x = 0;
  middleR1E.rotation.y = 0;
  middleR1E.rotation.z = 0;
  
  // Hand Right Middle 2
  middleR2E.position.x = 0; 
  middleR2E.position.z = -0.1; 
  middleR2E.position.y = 1.7;
  middleR2E.rotation.x = 3; 
  middleR2E.rotation.y = 0; 
  middleR2E.rotation.z = 0; 
  
  // Hand Right Thumb 1
  thumbR1E.position.x = - 0.8; 
  thumbR1E.position.y = 0;
  thumbR1E.position.z = 0; 
  thumbR1E.rotation.x = 0;
  thumbR1E.rotation.y = 0;
  thumbR1E.rotation.z = 0;
  
  // Hand Right Thumb 2
  thumbR2E.position.x = - 0.8; 
  thumbR2E.position.z = -0.1; 
  thumbR2E.position.y = .6;
  thumbR2E.rotation.x = 3; 
  thumbR2E.rotation.y = 0; 
  thumbR2E.rotation.z = 0; 
  
  // Hand Left
  playerHandLeftE.position.x = -1.3; 
  playerHandLeftE.position.y = -1.5;
  playerHandLeftE.position.z = -4.7; 
  playerHandLeftE.rotation.x = -1.5;
  playerHandLeftE.rotation.y = -3;
  playerHandLeftE.rotation.z = 0;
  
  // Hand Left Index 1
  index1E.position.x = -0.4; 
  index1E.position.y = 1.1;
  index1E.position.z = 0; 
  index1E.rotation.x = 0;
  index1E.rotation.y = 0;
  index1E.rotation.z = 0;
  
  // Hand Left Index 2
  index2E.position.x = -0.4; 
  index2E.position.z = -0.1; 
  index2E.position.y = 1.7;
  index2E.rotation.x = 3;
  index2E.rotation.y = 0;
  index2E.rotation.z = 0;
  
  // Hand Left Point 1
  point1E.position.x = 0.4; 
  point1E.position.y = 1.1;
  point1E.position.z = 0; 
  point1E.rotation.x = 0;
  point1E.rotation.y = 0;
  point1E.rotation.z = 0;
  
  // Hand Left Point 2
  point2E.position.x = 0.4; 
  point2E.position.z = -0.1; 
  point2E.position.y = 1.7;
  point2E.rotation.x = 3; 
  point2E.rotation.y = 0; 
  point2E.rotation.z = 0; 
  
  // Hand Left Middle 1
  middle1E.position.x = 0; 
  middle1E.position.y = 1.1;
  middle1E.position.z = 0; 
  middle1E.rotation.x = 0;
  middle1E.rotation.y = 0;
  middle1E.rotation.z = 0;
  
  // Hand Left Middle 2
  middle2E.position.x = 0; 
  middle2E.position.z = -0.1; 
  middle2E.position.y = 1.7;
  middle2E.rotation.x = 3; 
  middle2E.rotation.y = 0; 
  middle2E.rotation.z = 0; 
  
  // Hand Left Thumb 1
  thumb1E.position.x = 0.8; 
  thumb1E.position.y = 0;
  thumb1E.position.z = 0; 
  thumb1E.rotation.x = 0;
  thumb1E.rotation.y = 0;
  thumb1E.rotation.z = 0;
  
  // Hand Left Thumb 2
  thumb2E.position.x = 0.8; 
  thumb2E.position.z = -0.1; 
  thumb2E.position.y = .6;
  thumb2E.rotation.x = 3; 
  thumb2E.rotation.y = 0; 
  thumb2E.rotation.z = 0; 
}
function animate(){
  // Player In Game Render
  if (inGamePage) {
    // Player Hand Movement
    if (hoverCharge) {useCharge();}
    else if (hoverPistol) {usePistol();}
    else if (hoverCounter) {useCounter();}
    else if (hoverShield1) {useShieldLvl1();}
    else if (hoverEvade) {useEvade();}
    else if (hoverBlock) {useBlock();}
    else if (hoverDoublePistol) {useDoublePistol();}
    else if (hoverGrenade) {useGrenade();}
    else if (hoverShotgun) {useShotgun();}
    else if (hoverShield2) {useShieldLvl2();}
    else if (hoverLaser) {useLaser();}
    else if (hoverShield3) {useShieldLvl3();}
    else if (hoverNuke) {useNuke();}
    else if (!hoverCharge && !hoverPistol && !hoverCounter && !hoverShield1 && !hoverEvade &&
      !hoverBlock && !hoverDoublePistol && !hoverGrenade && !hoverShotgun && !hoverShield2 &&
      !hoverLaser && !hoverShield3 && !hoverNuke) {useWaiting();}

    // Enemy Hand Movement
    if (hoverChargeE) {useChargeEnemy();}
    else if (hoverPistolE) {usePistolEnemy();}
    else if (hoverCounterE) {useCounterEnemy();}
    else if (hoverShield1E) {useShieldLvl1Enemy();}
    else if (hoverEvadeE) {useEvadeEnemy();}
    else if (hoverBlockE) {useBlockEnemy();}
    else if (hoverDoublePistolE) {useDoublePistolEnemy();}
    else if (hoverGrenadeE) {useGrenadeEnemy();}
    else if (hoverShotgunE) {useShotgunEnemy();}
    else if (hoverShield2E) {useShieldLvl2Enemy();}
    else if (hoverLaserE) {useLaserEnemy();}
    else if (hoverShield3E) {useShieldLvl3Enemy();}
    else if (hoverNuke) {useNukeEnemy();}
    else if (!hoverChargeE && !hoverPistolE && !hoverCounterE && !hoverShield1E && !hoverEvadeE &&
      !hoverBlockE && !hoverDoublePistolE && !hoverGrenadeE && !hoverShotgunE && !hoverShield2E &&
      !hoverLaserE && !hoverShield3E && !hoverNukeE) {useWaitingEnemy();}    
    camera.position.set(0.2, 0, 7);
    camera.lookAt(new THREE.Vector3(0,0,0));
    playerFace.position.y = 0;
    playerFace2.position.y = 0;
    playerFace.position.x = 0;
    playerFace.rotation.y = 0;
  }

  // Player In Login/Registration Page
  if (loginRegistrationPage) {
      if (swapTimer <= 0.1 && swapTimer >= 0) {
          useCharge();
      }
      else if (swapTimer <= 1.1 && swapTimer > 1) {
          usePistol();
      }
      else if (swapTimer <= 2.1 && swapTimer > 2) {
          useCounter();
      }
      else if (swapTimer <= 3.1 && swapTimer > 3) {
          useShieldLvl1();
      }
      else if (swapTimer <= 4.1 && swapTimer > 4) {
          useDoublePistol();
      }
      else if (swapTimer <= 5.1 && swapTimer > 5) {
          useGrenade();
      }
      else if (swapTimer <= 6.1 && swapTimer > 6) {
          useShotgun();
      }
      else if (swapTimer <= 7.1 && swapTimer > 7) {
          useShieldLvl2();
      }
      else if (swapTimer <= 8.1 && swapTimer > 8) {
          useLaser();
      }
      else if (swapTimer <= 9.1 && swapTimer > 9) {
          useShieldLvl3();
      }
      else if (swapTimer <= 10.1 && swapTimer > 10) {
          useNuke();
      }
      else if (swapTimer <= 11.1 && swapTimer > 11) {
          useEvade();
      }
      else if (swapTimer <= 12.1 && swapTimer > 12) {
          useBlock();            
      }
      else if (swapTimer > 13) {
          swapTimer = 0;
      }
      // console.log(swapTimer);
      swapTimer += swapSpeed;
      camera.position.set(0.2, 5, 0);
      camera.lookAt(new THREE.Vector3(0,4,5));
      playerFace.rotation.y += 0.005;
      playerFace.position.y = 0;
  }

  // Player In Main Menu Page
  if (mainMenuPage) {
    playerFace.position.y = 100;
    playerFace2.position.y = 100;
    camera.position.set(0.2, 0, 7);
    camera.lookAt(new THREE.Vector3(0,0,0));
  }
  // Player In Instructions Page
  if (instructionsPage) {
    if (hoverCharge) {useCharge();}
    else if (hoverPistol) {usePistol();}
    else if (hoverCounter) {useCounter();}
    else if (hoverShield1) {useShieldLvl1();}
    else if (hoverEvade) {useEvade();}
    else if (hoverBlock) {useBlock();}
    else if (hoverDoublePistol) {useDoublePistol();}
    else if (hoverGrenade) {useGrenade();}
    else if (hoverShotgun) {useShotgun();}
    else if (hoverShield2) {useShieldLvl2();}
    else if (hoverLaser) {useLaser();}
    else if (hoverShield3) {useShieldLvl3();}
    else if (hoverNuke) {useNuke();}
    else {
      useWaiting();
    }
    camera.position.set(-4, 0, 1);
    camera.lookAt(new THREE.Vector3(-4,0,4));
    // playerFace.rotation.y += 0.005;
    playerFace.position.y = 0;
    playerFace.rotation.y = 0;
  }

  // Hand Hover Logic
  if (curPosition >= hoverMax) {
    hoverTop = false;
  }
  if (curPosition <= hoverMin) {
    hoverTop = true;
  }
  if (hoverTop) {
    playerHandLeft.position.y += hoverSpeed;
    playerHandRight.position.y += hoverSpeed;
    playerHandLeftE.position.y += hoverSpeed;
    playerHandRightE.position.y += hoverSpeed;
    curPosition += hoverSpeed;
  }
  if (!hoverTop) {
    playerHandLeft.position.y -= hoverSpeed;
    playerHandRight.position.y -= hoverSpeed;
    playerHandLeftE.position.y -= hoverSpeed;
    playerHandRightE.position.y -= hoverSpeed;
    curPosition -= hoverSpeed;
  }
  textureFace.needsUpdate = true;
  materialFace.needsUpdate = true;;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
 
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}
 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;
