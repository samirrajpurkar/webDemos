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
