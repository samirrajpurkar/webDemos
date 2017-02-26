var myCar = {
  name: 'Ford Escort',

  drive: function () {
    console.log('Weeee...I am driving');
  },

  panic: function () {
    console.log('Wait... How do you stop this thing?');
  }
};

// Use Object.create to instantiate a new Car
var yourCar = Object.create(myCar);

// Now we can see that one is a prototype of the other
console.log(yourCar.name);

// Understand the details in browser console.
console.log('myCar Object : ',myCar);
console.log('yourCar is a prototype of myCar : ', yourCar);

// Object.create also allows
// us to implement advanced concepts
// such as differential inheritance
// where objects are able to directly inherit from other objects
var vehicle = {
  getModel: function () {
    console.log('The model of this vehicle is..' + this.model);
  }
};

var car = Object.create(vehicle, {
  'id': {
    value: 1,
    //value: MY_GLOBAL.nextId(),
    // writable: false, configurable: false by default
    enumerable: true
  },
  'model': {
    value: 'Ford',
    enumerable: true
  }
});

console.log('Car : ', car);

// If we wish to implement the prototype pattern without directly
// using Object.create, we can simulate the pattern as follows

var vehiclePrototype = {
  init: function (carModel) {
    this.model = carModel;
  },
  getModel: function () {
    console.log('The model of this vehicle is...' + this.model);
    return this.model;
  }
};

function vehicle1(model) {
  function F() {}
  F.prototype = vehiclePrototype;
  var f = new F();
  f.init(model);
  return f;
}

var carMustang = vehicle1('Ford Mustang');
carMustang.getModel();

// A final alternative implementation of the Prototype
// pattern could be
var beget = (function (model) {
  function F() {}
  return function (proto) {
    F.prototype = proto;
    var f = new F();
    f.init(model);
    return f;
  };
})('Car Monta');

console.log(beget(vehiclePrototype).getModel());