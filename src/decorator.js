// A vehicle constructor
function Vehicle(vehicleType) {
  // some defaults
  this.vehicleType = vehicleType;
  this.model = 'default';
  this.license = '00000-000';
}

// Test instance for a basic vehicle
var testInstance = new Vehicle('car');
console.log(testInstance);

// Let us create a new instance of vehicle to be decorated
var truck = new Vehicle('truck');

// New functionality we are decorating vehcile with
truck.setModel = function (modelName) {
  this.model = modelName;
};

truck.setColor = function (color) {
  this.color = color;
};

// Test the value setters and value assignment work correctly
truck.setModel('CAT');
truck.setColor('blue');
console.log(truck);

// Demonstrate 'vehicle' is still unaltered
var secondInstance = new Vehicle('car');
console.log(secondInstance);
