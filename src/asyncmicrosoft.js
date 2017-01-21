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
console.log(a);

var m = calculate(4, 4, multiply);
console.log(m);

console.log(c);
console.log(d);
