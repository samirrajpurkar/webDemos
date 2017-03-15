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
    this.methods.push(method[i]);
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