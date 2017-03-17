var createGreeting = function (message, name) {
  return message + name;
};

var arrowGreeting = (message, name) => {
  return message + name;
};

var square = x => x * x;

var deliveryBoy = {
  name: 'John',
  handleMessage: function (message, handler) {
    handler(message);
  },
  receive: function () {
    var that = this;
    this.handleMessage('Hello ', function (message) {
      that.name; // get the proper name
      console.log(message + that.name);
    });
  }
};
deliveryBoy.receive();

var e_deliveryBoy = {
  name: 'eJohn',
  handleMessage: function (message, handler) {
    return handler(message);
  },
  receive: function () {
    this.handleMessage('Hello ', (message) => {
      console.log(message + this.name);
    });
  }
};

e_deliveryBoy.receive();

// The let keyword in ES6
var fs = [];
for (var i = 0; i < 10 ; i++) {
  fs.push(function () {
    console.log(i);
  });
}
fs.forEach(function (f) {
  f();
});

var efs = [];
for (let j = 0; j < 10 ; j++) {
  efs.push(function () {
    console.log(j);
  });
}
efs.forEach(function (f) {
  f();
});

function varFunc() {
  var previous = 0;
  var current = 1;
  var i;
  var temp;

  for (i = 0; i < 10; i += 1) {
    temp = previous;
    previous = current;
    current = temp + current;
  }
  return current;
}

function letFunc() {
  let previous = 0;
  let current = 1;

  for (let j = 0; j < 10; j += 1) {
    let temp = previous;
    previous = current;
    current = temp + current;
  }
  return current;
}

console.log('varFunc', varFunc());
console.log('letFunc', letFunc());

// Default values for Function Paramater in ES6
