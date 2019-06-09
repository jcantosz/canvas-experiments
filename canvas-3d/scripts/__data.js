var faces = (function(){
  var top = [[-10, -10, 10], [10, -10, 10], [10, 10, 10], [-10, 10, 10]];
  var bottom = [[10, -10, -10], [-10, -10, -10], [-10, 10, -10], [10, 10, -10]];

  var front = [[-10, -10, -10], [10, -10, -10], [10, -10, 10], [-10, -10, 10]];
  var back = [[10, 10, 10], [-10, 10, 10], [-10, 10, -10], [10, 10, -10]];

  var right = [[10, 10, 10], [10, -10, 10], [10, -10, -10], [10, 10, -10]];
  var left = [[-10, -10, -10], [-10, 10, -10], [-10, 10, 10], [-10, -10, 10]];

  faces = [top, bottom, front, back, left, right];
  return faces;
})();
