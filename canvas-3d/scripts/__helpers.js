var camera = {
  //camera focal length
  f: 1,
  // intrinsic callibration matrix
  get k() {
    return [ [ this.f, 0, 0 ],
             [ 0, this.f, 0 ],
             [ 0, 0, this.f ]];
  },
  tilt: function(alpha) {
    return [ [1,          0,           0 ],
             [0, cos(alpha), -sin(alpha) ],
             [0, sin(alpha),  cos(alpha) ]]
  },
  twist: function(beta) {
    return [ [cos(beta), 0, -sin(beta) ],
             [        0, 1,          0 ],
             [sin(beta), 0,  cos(beta) ]]
  },
  yaw: function(gamma){
    return [ [cos(gamma), -sin(gamma), 0 ],
             [sin(gamma),  cos(gamma), 0 ],
             [         0,           0, 1 ]]
  },
  //extrinsic matrix - position of apperature in 3d space
  IT: function(tx, ty, tz){
    return [ [1, 0, 0, tx ],
             [0, 1, 0, ty ],
             [0, 0, 1, tz ]]
  }
}

function deg2rad(degrees){
  return (degrees * Math.PI / 180.0);
}

function sin(rad){
  return Math.sin(rad);
}

function cos(rad){
  return Math.cos(rad);
}

function m_mult(a, b){
  return math.multiply(a, b);
}

function sortFunction(a, b){
  if(a[1] === b[1]){
    return 0;
  }else{
    return (a[1] < b[1]) ? -1 : 1;
  }
}
