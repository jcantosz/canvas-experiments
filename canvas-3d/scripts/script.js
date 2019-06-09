//import {} from 'https://unpkg.com/mathjs@6.0.0/dist/math.min.js'

var ctx;
var width;
var height;
var faces
var step_size = 360 / 360;

//camera distance
var x_dist = -30;
var y_dist = -30


function euclidian(camera_pos){
  //avg_x, avg_y, avg_z
  //+ tx, + ty, +tz
  //square each
  //add values together

  // get the average (center) of the face, then get distance to camera to
  //  determine view order
  var avg = [];
  for (var i=0; i < faces.length; i++) {
    var sum = [0, 0, 0]
    face = faces[i];
    for( var j=0; j < face.length; j++) {
      points = face[j];

      var x = points[0];
      var y = points[1];
      var z = points[2];
      sum[0] += x;
      sum[1] += y;
      sum[2] += z;
    }
    avg.push(
      Math.pow((sum[0] / face.length - camera_pos[0]), 2) +
      Math.pow((sum[1] / face.length - camera_pos[1]), 2) +
      Math.pow((sum[2] / face.length - camera_pos[2]), 2)
    );
  }

  var new_faces = faces.map(function(e, i){
    return [e, avg[i]];
  });

  return new_faces.sort(sortFunction);
}

function get2D(faces){
  var new_faces = [];
  for (var i=0; i < faces.length; i++) {
    var face = faces[i];
    for (var j=0; j < face.length; j++) {
      var new_face = [];
      for (var k=0; k < face[j].length; k++) {
        var point = face[j][k];
        var x = point[0];
        var y = point[1];
        var z = point[2];

        new_face.push( [x/z, y/z] );
      }
      if( new_face.length != 0 ){
        new_faces.push(new_face);
      }
    }
  }
  return new_faces;
}

function paintPoints(faces){
  var translate_by = [width/2, height/2];
  var dimensions = [4,4];
  var scale = 20;

  for (var i=0; i < faces.length; i++) {
    var face = faces[i];
    for (var j=0; j < face.length; j++) {
      var point = face[j];
      ctx.fillRect(translate_by[0] + point[0]*scale, translate_by[1] + point[1]*scale, dimensions[0], dimensions[1]);
    }
  }
}

function updateFrame(frame_number){
  var step = step_size * frame_number
  var alpha = deg2rad(90); // tilt
  var beta = deg2rad(180); //twist
  var gamma = deg2rad(180 - step);
  var tx = x_dist * Math.sin(gamma);
  var ty = y_dist * Math.cos(gamma);
  var tz = 0;
  var camera_pos = [tx, ty, tz];
  //var camera_pos = [10, 0, 0];

  var k = camera.k;
  var tilt = camera.tilt(alpha);
  var twist = camera.twist(beta);
  var yaw = camera.yaw(gamma);
  var it = camera.IT(tx,ty,tz);

  var projectionMatrix = m_mult( m_mult( m_mult( m_mult(k, tilt), twist), yaw), it);


  //alert(projectionMatrix);
  new_faces = get2D(euclidian(camera_pos));
  //new_faces = get2D(euclidian(camera_pos));
  console.log(new_faces);
  paintPoints(new_faces);
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
