function elt(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }
    node.appendChild(child);
  }
  return node;
}

function relativePos(event, element) {
  var rect = element.getBoundingClientRect();
  return {x: Math.floor(event.clientX - rect.left),
          y: Math.floor(event.clientY - rect.top)};
}

function trackDrag(onMove, onEnd) {
  function end(event) {
    removeEventListener('mousemove', onMove);
    removeEventListener('mouseup', end);
    if (onEnd) {
      onEnd(event);
    }
  }
  addEventListener('mousemove', onMove);
  addEventListener('mouseup', end);
}

var controls = Object.create(null);
var tools = Object.create(null);

tools.Line = function (event, cx, onEnd) {
  cx.lineCap = 'round';

  var pos = relativePos(event, cx.canvas);
  trackDrag(function (eventLine) {
    cx.beginPath();
    cx.moveTo(pos.x, pos.y);
    pos = relativePos(eventLine, cx.canvas);
    cx.lineTo(pos.x, pos.y);
    cx.stroke();
  }, onEnd);
};

tools.Erase = function (event, cx) {
  cx.globalCompositeOperation = 'destination-out';
  tools.Line(event, cx, function () {
    cx.globalCompositeOperation = 'source-over';
  });
};

controls.tool = function (cx) {
  var select = elt('select');
  for (var name in tools) {
    if (name in tools) {
      select.appendChild(elt('option', null, name));
    }
  }

  cx.canvas.addEventListener('mousedown', function (event) {
    if (event.which === 1) {
      tools[select.value](event, cx);
      event.preventDefault();
    }
  });

  return elt('span', null, 'Tool: ', select);
};

controls.color = function (cx) {
  var input = elt('input', {type: 'color'});
  input.addEventListener('change', function () {
    cx.fillStyle = input.value;
    cx.strokeStyle = input.value;
  });
  return elt('span', null, 'Color: ', input);
};

controls.brushSize = function (cx) {
  var select = elt('select');
  var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];
  sizes.forEach(function (size) {
    select.appendChild(elt('option', {value: size}, size + ' pixels'));
  });
  select.addEventListener('change', function () {
    cx.lineWidth = select.value;
  });
  return elt('span', null, 'Brush size: ', select);
};

function createPaint(parent) {
  var canvas = elt('canvas', {width: 500, height: 300});
  var cx = canvas.getContext('2d');
  var toolbar = elt('div', {class: 'toolbar'});
  for (var name in controls) {
    if (name in controls) {
      toolbar.appendChild(controls[name](cx));
    }
  }

  var panel = elt('div', {class: 'picturepanel'}, canvas);
  parent.appendChild(elt('div', null, panel, toolbar));
}

createPaint(document.body);