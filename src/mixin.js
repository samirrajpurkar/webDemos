var Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = 'male';
};

// a new instance of Person can then easily be created as follows:
var clark = new Person('Clark', 'Kent');
console.log('Person clark : ', clark);

// Define a subclass constructor for 'Superhero':
var Superhero = function (firstName, lastName, powers) {
  // Invoke the superclass constructor on the new object
  // then use .call() to invoke the constructor as a method of
  // the object to be initialized.
  console.log(this);
  Person.call(this, firstName, lastName);

  // Finally, store their powers, a new array of traits not found
  // in a normal Person
  this.powers = powers;
};

Superhero.prototype = Object.create(Person.prototype);

var superman = new Superhero('Clark', 'Kent', ['flight', 'heat-vision']);
console.log(superman);