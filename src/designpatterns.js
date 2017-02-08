// A car "class"
function Car(model) {
  this.model = model;
  this.color = 'silver';
  this.year = '2012';

  this.getInfo = function () {
    return this.model + ' ' + this.color + ' ' + this.year;
  };
}

var myCar = new Car('mercBenz');
myCar.color = 'grey';
myCar.year = '2014';

// console.log(myCar.getInfo());

// The Constructor Pattern
// The three common ways to create new Objects in Javascript
var newObject = { };
var newObject1 = Object.create(Object.prototype);
// var newObject2 = new Object(); // not a prefer way of creating new objects

// set property on object
newObject.someKey = 'Hello World';

// get property on object
var someKey = newObject.someKey;

// Square bracket syntax
newObject['someKey1'] = 'Hello World again!';

// Get property
var somekey1 = newObject['somekey1'];

// set property
Object.defineProperty(newObject, 'someNewKey', {
  value: 'for more control of the property behaviour',
  writable: true,
  enumerable: true,
  configurabel: true
});

// if the above feels difficult
var defineProp = function (obj, key, value) {
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurabel: true
  };
  Object.defineProperty(obj, key, config);
};

// Create empty Person Object
var person = Object.create(Object.prototype);
// Populate person object with properties
defineProp(person, 'car', 'Delorean');
defineProp(person, 'dateOfBirth', '1981');
defineProp(person, 'hasBeard', false);
// console.log(person);
///

// Object define properties
Object.defineProperties(newObject1, {
  someKey: {
    value: 'Hello World one more time',
    writable: true
  },
  anotherKey: {
    value: 'Another key and not sure what should be the value',
    writable: false
  }
});

// console.log(newObject1.anotherKey);

// Inheritance
// create a race driver who inherits from person object
var driver = Object.create(person);

// set some property for the driver
defineProp(driver, 'topSpeed', '100mph');

// get an inherited property
// console.log(driver.dateOfBirth);

// get a property that we set
// console.log(driver.topSpeed);

// BASIC CONSTRUCTORs

var Car1 = function (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function () {
    return this.model + ' made in ' + this.year + ' has done ' + ' miles ' + this.miles;
  };
};

var civic = new Car1('Honda Civic', 2009, 20000);
var mondeo = new Car1('Ford Mondeo', 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());

// Constructors with Prototypes
var Car2 = function (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
};
Car2.prototype.toString = function ( ) {
  return this.model + ' made in ' + this.year + ' has covered ' + this.miles + ' miles';
};

var lambogini = new Car2('Lambogini', '2016', 10000);
console.log(lambogini.toString());