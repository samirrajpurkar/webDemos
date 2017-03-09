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

