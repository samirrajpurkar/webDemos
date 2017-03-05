// It is also useful to be aware of the Abstract Factory Pattern
// which aims to enscapsulate a group of individual factories
// with a common goal.

function Car(options) {
  //some defaults
  this.doors = options.doors || 4;
  this.state = options.state || 'brand new';
  this.color = options.color || 'silver';
}
Car.prototype.drive = 'drive';
Car.prototype.breakDown = 'breakDown';

// A constructor for defining new trucks
function Truck(options) {
  this.state = options.state || 'used';
  this.wheelSize = options.wheelSize || 'large';
  this.color = options.color || 'blue';
}
Truck.prototype.drive = 'drive';
Truck.prototype.breakDown = 'breakDown';

var abstractVehicleFactory = ((function () {
  // Storage for our vehicle types
  var types = {};

  return {
    getVehicle: function (type, customizations) {
      var Vehicle = types[type];
      return (Vehicle ? new Vehicle(customizations) : null);
    },
    registerVehicle: function (type, Vehicle) {
      var proto = Vehicle.prototype;

      // only register classes that fulfill the vehicle contract
      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle;
      }

      return abstractVehicleFactory;
    }
  };
})());

// Usage:
abstractVehicleFactory.registerVehicle('car', Car);
abstractVehicleFactory.registerVehicle('truck', Truck);

// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle('car', {
  color: 'lime green',
  state: 'like new'
});
console.log(car);

// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle('truck', {
  wheelSize: 'medium',
  color: 'neon yellow'
});
console.log(truck);