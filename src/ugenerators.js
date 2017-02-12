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

// Yielding to other generators
// yield* statement is used
function* genFuncA() {
  yield 'a';
  yield 'b';
  yield 'c';

  return 'done with genFuncA()!';
}

function* genFuncB() {
  yield 1;
  var returnValueFuncA = yield* genFuncA(); // contains iterable [a, b,c]
  yield returnValueFuncA;
  yield 2;
  yield 3;
  yield* [4,5];

  return 'done with genFuncB()!';
}

var genObject2 = genFuncB();

var one = genObject2.next();
var aa = genObject2.next();
var bb = genObject2.next();
var cc = genObject2.next();
var resultFuncA = genObject2.next();
var two = genObject2.next();
var three = genObject2.next();
var four = genObject2.next();
var five = genObject2.next();
var done = genObject2.next();

console.log(one);
console.log(aa);
console.log(bb);
console.log(cc);
console.log(resultFuncA);
console.log(two);
console.log(three);
console.log(four);
console.log(five);
console.log(done);

// Sending input using next()
function* genFunction2() {
  var aaa = yield;
  console.log(aaa);
  var bbb = yield;
  console.log(bbb);
  var ccc = yield;
  console.log(ccc);
}

var genObject3 = genFunction2();

genObject3.next(0); //starts genFunction2 the value inside the next() call is ignored
genObject3.next('aaa'); // sends a value of 1 to genFunction2()
genObject3.next('bbb');
genObject3.next('ccc');
genObject3.next(4); // the value inside next() is ignored because genFunction2() has no more yields

// next() method is used to obtain values from yield, modify them and then send back
function* genFunction3() {
  var m = yield 'm';
  console.log(m);
  var n = yield 'n';
  console.log(n);
  var o = yield 'o';
  console.log(o);
}

var genObject4 = genFunction3();
var ym = genObject4.next(); // starts genFunction3(), w = {value: 'm', done: false}
var yn = genObject4.next(ym.value + '!'); // yn = {value: 'n', done: false}
var yo = genObject4.next(yn.value.toUpperCase()); //  yo = {value: 'o', done: false}
var done3 = genObject4.next(ym.value + yn.value + yo.value); // done3 = {value: undefined, done: true}
