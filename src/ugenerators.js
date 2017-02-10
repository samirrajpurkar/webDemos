function* genFunction( ) {
  console.log('started');
  yield 'a'; // pauses the generator and sends out a value of 'a'
  console.log('passed first yield');
  yield; // pauses the generator and sends out an undefined value
  console.log('passed second yield');
  yield 123; // pauses the generator and sends out a value of 123
  console.log('passed third yield');

  return 'finished'; // return value of 'finished'
}

var genObject = genFunction(); // creates a generator object called genObject

var a = genObject.next(); // Object {value: 'a', done: false}
console.log(a);
//console.log('started')
var b = genObject.next(); // Object {value: undefined, done: false}
console.log(b);
//console.log('passed first yield')
var c = genObject.next(); // Object {value: undefined, done: false}
console.log(c);
//console.log('passed second yield')
var d = genObject.next(); // Object {value: 'finsihed', done: true}
console.log(d);
// value property takes the return value of genFunction()
//console.log('passed third yied')
var e = genObject.next(); // Object {value: undefined, done: true}
console.log(e);

// Throwing Errors Inside a Generator Function
function* genFunction1() {
  yield 'a';
  yield 'b';
  throw new Error('error thrown by genFunc1()');
  yield 'c';
  yield 'd';
}
var genObject1 = genFunction1();
try {
  var f = genObject1.next(); // Object {value: 'a', done: false}
  console.log('f :', f);
  var g = genObject1.next(); // Object {value: 'b', done: false}
  console.log('g :', g);
  var h = genObject1.next(); // undefined since an uncaught error was thrown,
                             // generator function terminated
                             // console.log('error thrown by genFunc1()')
  console.log('h ', h);
  var i = genObject.next(); // undefined other yield statements are ignored
                            // after the error
  console.log('i ', i);
}
catch (error) {
  console.log(error.message);
}
