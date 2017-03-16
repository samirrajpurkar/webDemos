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

// Create interfaces using a pre-defined Interface
// constructor that accepts an interface name and
// skeleton methods to expose.

// In our reminder example summary() and placeOrder()
// represent functionality that the interface should
// support
var reminder = new Interface('List', ['summary', 'placeOrder']);

var properties = {
  name: 'Remember to buy the milk',
  date: '05/06/2016',
  actions: {
    summary: function () {
      return 'Remember to buy the milk, we are almost out!';
    },
    placeOrder: function () {
      return 'Ordering milk from your local grocery store';
    }
  }
};

// Now create a constructor implementing the above properties
// and methods

var Todo = function (config) {
  // State the methods we expect to be supported
  // as well as the Interface instance being checked
  // against

  //Interface.ensureImplements(config.actions, reminder);
  this.name = config.name;
  this.methods = config.actions;
};
// Create a new instance of out Todo constructor

var todoItem = new Todo(properties);

// Finally test to make sure these function correctly
console.log(todoItem.methods.summary());
console.log(todoItem.methods.placeOrder());
