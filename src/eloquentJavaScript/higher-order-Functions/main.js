//Functions that operate on other functions
// either taking them as arguments
// or returning them
// are called higher order functions
function greaterThan(n) {
  return function (m) {
    return m > n;
  };
}

var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

function noisy(f) {
  return function (arg) {
    console.log('calling with ' + arg);
    var value = f(arg);
    console.log('called with arg ' + arg, ' -got value ' + value);
  };
}

noisy(Boolean)(0);

function unless(test, then) {
  if (test === false) {
    then();
  }
}
