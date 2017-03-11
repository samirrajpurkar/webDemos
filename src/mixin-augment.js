// Define a simple Car constructor
var Car = function (settings) {
  this.model = settings.model || 'no model provided';
  this.color = settings.color || 'no color provided';
};

Car.prototype.selfDriving = function () {
  return ('I am selfless ....');
};

myMerz = new Car({model: 'Merz', color: 'grey'});
console.log('Simple Car Instance', myMerz, 'directly calling a prototype method on myMerz', myMerz.selfDriving());

// Mixin
var Mixin = function () {};

Mixin.prototype = {
  driveForward: function () {
    console.log('drive forward');
  },
  driveBackward: function () {
    console.log('drive backward');
  },
  driveSideways: function () {
    console.log('drive sideways');
  }
};

// Extend an existing object with method from another
function augment(receivingClass, givingClass) {
  //console.log(arguments);
  // only provide certain methods
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++ ) {
      receivingClass.prototype[arguments[i]]
          = givingClass.prototype[arguments[i]];
    }
  }
  else { // provide all methods
    for (var methodName in givingClass.prototype) {
      if (methodName) {
        //console.log(methodName);
        if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
          receivingClass.prototype[methodName] = givingClass.prototype[methodName];
        }
        //  Alternatively (check prototype chain as well):
        if (!receivingClass.prototype[methodName]) {
          receivingClass.prototype[methodName] = givingClass.prototype[methodName];
        }
      }
    }
  }
}

function test() {
  //augment(Car, Mixin, 'driveForward', 'driveBackward', 'driveSideways');
  augment(Car, Mixin);
}

// Test the module
//test();

// Run
function run() {
  // Augment the Car constructor to include 'driveForward' and 'driveBackward'
  augment(Car, Mixin, 'driveForward', 'driveBackward');
  // Create a new Car
  var myCar = new Car({
    model: 'Ford Escort',
    color: 'blue'
  });
  //Test to make sure we now have access to the methods
  console.log('My Car : ', myCar);
  myCar.driveForward();
  myCar.driveBackward();

  // We can also augment Car to include all functions from our mixin
  // by not explicity listing a selection of them
  augment(Car, Mixin);

  var mySportsCar = new Car({
    model: 'Porshe',
    color: 'red'
  });
  console.log(mySportsCar);

  mySportsCar.driveSideways();
}

run();