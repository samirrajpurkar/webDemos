// function MacBook() {
//   this.cost = function () { return 997; };
//   this.screenSize = function () { return 11.6; };
// }

// Constructor
var Interface = function (name, methods) {
  if (arguments.length !== 2) {
    throw new Error('Interface constructor called with ' +
                     arguments.length +
                    ' arguments, but expected exactly 2.');
  }
  this.name = name;
  this.methods = [];
  for (var i = 0; i < methods.length; i++) {
    if (typeof methods[i] !== 'string') {
      throw new Error('Interface constructor expects method names to be ' +
                      'passed in as string.');
    }
    this.methods.push(methods[i]);
  }
};

// Static class method
Interface.ensureImplements = function (object) {
  if (arguments.length < 2) {
    throw new Error('Function Interface.ensureImplements called with ' +
                    arguments.length +
                    ' arguments, but expected at least 2.');
  }
  for (var i = 0; i < arguments.length; i++) {
    var interFace = arguments[i];
    console.log('Interface : ', interFace);
    if (interFace.constructor !== Interface) {
      throw new Error('Function Interface.ensureImplements expects arguments ' +
                      ' two and above to be instances of Interface.');
    }
    for (var j = 0; i < interFace.methods.length; j++) {
      var method = interFace.methods[j];
      if (!object[method] || typeof object[method] !== 'function') {
        throw new Error('Function interFace.ensureImplements: object ' +
                        'does not implement the ' +
                        interFace.name +
                        '  interFace. Method ' +
                        method +
                        ' wa not found');
      }
    }
  }
};

var MacBook = new Interface('MacBook',
  ['addEngraving', 'addParallels', 'add4GBRam', 'add8GBRam', 'addCase']);

// A MacBook Pro might thus be represented as follows
var MacBookPro = function () {
  // Implements MacBook
};

MacBookPro.prototype = {
  addEngraving: function () {},
  addParallels: function () {},
  add4GBRam: function () {},
  add8GBRam: function () {},
  addCase: function () {},
  getPrice: function () {
    return 900.00; // base price
  }
};

// Macbook decorator abstract decorator class
var MacBookDecorator = function (macbook) {
  Interface.ensureImplements(macbook, Macbook);
  this.macbook = macbook;
};

MacBookDecorator.prototype = {
  addEngraving: function () {
    return this.macbook.addEngraving();
  },
  addParallels: function () {
    return this.macbook.addParallels();
  },
  add4GBRam: function () {
    return this.macbook.add4GBRam();
  },
  add8GBRam: function () {
    return this.macbook.add8GBRam();
  },
  getPrice: function () {
    return this.macbook.getPrice();
  }
};

// Edtend an object a
// with properties in object b
function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var CaseDecorator = function (macbook) {
  this.macbook = macbook;
};

extend(CaseDecorator, MacBookDecorator);

CaseDecorator.prototype.addCase = function () {
  return this.macbook.addCase() + 'adding Case to the macbook';
};
CaseDecorator.prototype.getPrice = function () {
  return this.macbook.getPrice() + 45;
};

var run = function () {
  var myMacbookPro = new MacBookPro();
  console.log(myMacbookPro.getPrice());
  var decoratoredMacbookPro = new CaseDecorator(myMacbookPro);
  console.log(decoratoredMacbookPro.getPrice());
};

run();

