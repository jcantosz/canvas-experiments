//import {} from 'https://unpkg.com/mathjs@6.0.0/dist/math.min.js'

var ctx;
var width;
var height;
var faces
var step_size = 360 / 360;

//camera distance
var x_dist = -30;
var y_dist = -30


function euclidian(face, position){

}

function updateFrame(frame_number){
  var step = step_size * frame_number
  var alpha = deg2rad(90); // tilt
  var beta = deg2rad(180); //twist
  var gamma = deg2rad(180 - step);
  var tx = x_dist * Math.sin(gamma);
  var ty = y_dist * Math.cos(gamma);
  var tz = 0;

  var k = camera.k;
  var tilt = camera.tilt(alpha);
  var twist = camera.twist(beta);
  var yaw = camera.yaw(gamma);
  var it = camera.IT(tx,ty,tz);

  var projectionMatrix = m_mult( m_mult( m_mult( m_mult(k, tilt), twist), yaw), it);


  alert(projectionMatrix);
}

function loaded(){
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  updateFrame(20);
  //alert(camera.tilt(deg2rad(22))[2][2] );
  //alert(FACES);
//  faces = [bottom, top, front, back, left, right];
}
