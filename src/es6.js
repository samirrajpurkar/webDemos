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