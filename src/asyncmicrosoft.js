// Callback functions
// Callback functions are functions that are passed as arguments to other
//functions to be executed later in time

function multiply(x, y) {
  return x * y;
}

function add(x, y) {
  return x + y;
}

// use a callback function to process two numbers.
function calculate(x, y, compute) {
  return compute(x, y);
}

var c = calculate(10, 5, function (x, y) {
  return x - y;
});

var d = calculate(2, 3, (x, y) => {return x ^ y;});

var a = calculate(2 , 3, add);
var m = calculate(4, 4, multiply);

// Example of methods that uses Callback Functions
var array = [1,2,3,4,5];

var marray = array.map(function (e) {
  return e * e;
});

var farray = array.filter(function (e) {
  return e % 2 === 0;
});

//Chaining callback functions with Continuation Passing Style
var myFunction = function (x, callback) {
  callback(x);
};
var answer = 0;

myFunction(10, function (x) { // callback 1
  var result_0 = x * x; // result_0 = 100
  myFunction(result_0, function (y) { //callback 2
    var result_1 = result_0 + result_0; // result_1 = 200
    myFunction(result_1, function (z) { //callback 3
      answer = result_1 + 100; // answer = 300
    });
  });
});

// asynchronous code using timer
var asyncLog = function (value$) {
  setTimeout(function ( ) {
    console.log(value$);
  }, 0);
};

var count = 0;
var interval = setInterval(function () {
  count++;
  console.log(count);
  if (count >= 3) {
    clearInterval(interval);
  }
}, 1000);

