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
                {width: 900, height: 500, style: 'border:1px solid #cfd1d3'});
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
  var pWrap = createHTMLElementByName('p', null, 'Tool');
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
  return createHTMLElementByName('span', null, '', pWrap, select);
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
  if (cx.lineWidth < 5) {
    cx.lineWidth = 10;
  }
  cx.globalCompositeOperation = 'destination-out';
  tools.Line(event, cx, function () {
    cx.globalCompositeOperation = 'source-over';
  });
};
/*
tools.Text = function (event, cx) {
  var text = prompt('Text:', '');
  if (text) {
    var pos = relativePos(event, cx.canvas);
    cx.font = Math.max(7, cx.lineWidth) + 'px sans-serif';
    cx.fillText(text, pos.x, pos.y);
  }
};
*/
controls.color = function (cx) {
  var input = createHTMLElementByName('input', {type: 'color'});
  var pWrap = createHTMLElementByName('p', null, 'Color');
  input.addEventListener('change', function () {
    cx.fillStyle = input.value;
    cx.strokeStyle = input.value;
  });
  return createHTMLElementByName('span', null, '', pWrap, input);
};

controls.brushSize = function (cx) {
  var select = createHTMLElementByName('select',null);
  var sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100];

  sizes.forEach(function (size) {
    select.appendChild(createHTMLElementByName('option', {value: size}, size + ' pixels'));
  });

  select.addEventListener('change', function (event) {
    cx.lineWidth = select.value;
  });

  var pWrap = createHTMLElementByName('p', null, 'Brush Size');
  return createHTMLElementByName('span', null, '', pWrap, select);
};

controls.save = function (cx) {
  var link = createHTMLElementByName('a', {href: '/', class: 'btn btn-default'}, ' Save ');
  function update() {
    try {
      link.href = cx.canvas.toDataURL();
    } catch (error) {
      if (error instanceof SecurityError) {
        link.href = 'javascript:alert(' +
                  JSON.stringify('Cant save: ' + e.toString()) + ')';
      }
      else {
        throw error;
      }
    }
  }
  link.addEventListener('mouseover', update);
  link.addEventListener('focus', update);
  return link;
};

function loadImageURL(cx, url) {
  var image = document.createElement('img');
  image.addEventListener('load', function (event) {
    var color = cx.fillStyle;
    var size = cx.lineWidth;
    cx.canvas.width = image.width;
    cx.canvas.height = image.height;
    cx.drawImage(image, 0, 0);
    cx.fillStyle = color;
    cx.strokeStyle = color;
    cx.lineWidth = size;
  });
  image.src = url;
}

controls.openFile = function (cx) {
  var pWrap = createHTMLElementByName('p', null, 'Open File :');
  var input = createHTMLElementByName('input', {type: 'file'});
  input.addEventListener('change', function (event) {
    if (input.files.length === 0) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', function (event2) {
      loadImageURL(cx, reader.result);
    });
  });
  var hr = createHTMLElementByName('hr');
  return createHTMLElementByName('span', null, hr, pWrap, input);
};

controls.openURL = function (cx) {
  var label = createHTMLElementByName('label', null, ' Open URL : ');
  var input = createHTMLElementByName('input', {type: 'text', class: 'form-control'});
  var button = createHTMLElementByName('button', {type: 'submit',
                                                  class: 'btn btn-secondary'}, 'Load');
  var div_form_group = createHTMLElementByName('div', {class: 'form-group'},label,input);
  var form = createHTMLElementByName('form', {class: 'form-inline'},
                                        div_form_group,
                                        button);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    loadImageURL(cx, input.value);
  });

  var hr = createHTMLElementByName('hr');
  return createHTMLElementByName('span', null, hr, form);
};
//createPaint(document.body);
//console.log(tools);

//THE SECRET LIFE OF OBJECTS
// var rabbit = {};
// rabbit.speak = function (line) {
//   console.log('The rabbit says -> ' + line);
// };
// rabbit.speak('Ha ha I am here');
function speak(line) {
  console.log('The ' + this.type + ' rabbit says ' + line + ' ');
}
var whiteRabbit = {type: 'white', speak: speak};
var fatRabbit = {type: 'fat', speak: speak};
whiteRabbit.speak('Oh my ears and whiskers, ' + 'how late its getting');
fatRabbit.speak('I could sure use a carrot right now.');

speak.apply(fatRabbit, ['Burp!']);
speak.call({type: 'old'}, 'Oh my.');
//Prototypes - watch closely
var empty = {};
console.log(empty.toString);
console.log(empty.toString());
console.log(Object.getPrototypeOf({}) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Object.getPrototypeOf(isNaN) === Function.prototype);
console.log(Object.getPrototypeOf([]) === Array.prototype);

console.log('-----Prototypes -----');
var protoRabbit = {
  speak: function (line) {
    console.log('The ' + this.type + ' rabbit says ' + line + ' ');
  }
};
var kRabbit = Object.create(protoRabbit);
kRabbit.type = 'k';
kRabbit.speak('skreeeee!');

console.log('-----Constructors-----');
function Rabbit(type) {
  this.type = type;
}
var kR = new Rabbit('k');
var blackRabbit = new Rabbit('black');
console.log(blackRabbit.type);

