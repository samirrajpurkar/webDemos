//import $ from 'jquery';
//import Rx from 'rxjs/Rx';

/*
When dealing with a nested data structure,
recursive functions are often useful.
The following
Recursive function which scans a document for text nodes containing a given string
and returns true when it has found one:

function talksAbout(node, string) {
  if (node.nodeType === document.ELEMENT_NODE) {
    for (var i = 0; i < node.childNodes.length; i++) {
      if (talksAbout(node.childNodes[i], string)) {
        return true;
     }
     return false;
 }
 else {
    if (node.nodeType === document.TEXT_NODE) {
     return node.nodeValue.indexOf(string) > -1;
    };
  }
}

*/
/* function to create HTML Element by name with attributes */

function createHTMLElementByName(name, attributes) {
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

/*
Define an object called controls,
which will hold functions to initialize the various controls
below the image
*/

var controls = Object.create(null);

function createPaint(parent) {
  var canvas = createHTMLElementByName('canvas',
                {width: 900, height: 600, style: 'border:1px solid #cfd1d3'});
  var cx = canvas.getContext('2d');
  var toolbar = createHTMLElementByName('div', {class: 'toolbar'});
  for (var name in controls) {
    if (name) {
      toolbar.appendChild(controls[name](cx));
    }
  }
  var panel = createHTMLElementByName('div', {class: 'picturepanel'}, canvas);
  parent.appendChild(createHTMLElementByName('div', null, panel, toolbar));
}

//console.log(createPaint(document.body));

var tools = Object.create(null);

controls.tool = function (cx) {
  var select = createHTMLElementByName('select', null);
  for (var tool in tools) {
    if (tool) {
      select.appendChild(createHTMLElementByName('option', null, tool));
    }
    cx.canvas.addEventListener('mousedown', function (event) {
      if (event.which === 1) {
        tools[select.value](event, cx);
        event.preventDefault();
      }
    });
  }
  return createHTMLElementByName('span', null, 'Tool :  ', select);
};

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

tools.Line = function (event, cx, onEnd) {
  cx.lineCap = 'round';

  var pos = relativePos(event, cx.canvas);
  trackDrag(function (e) {
    cx.beginPath();
    cx.moveTo(pos.x, pos.y);
    pos = relativePos(e, cx.canvas);
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

controls.color = function (cx) {
  var input = createHTMLElementByName('input', {type: 'color'});
  input.addEventListener('change', function () {
    cx.fillStyle = input.value;
    cx.StrokeStyle = input.value;
  });
  return createHTMLElementByName('span', null,' Color : ', input);
};

createPaint(document.body);
//console.log(tools);

