var CarManager =
(function () {
  var carManager = {
    // request information
    requestInfo: function (model, id) {
      return 'request Info ' + model + ' ' + id;
    },
    // purchase the car
    buyVehicle: function (model, id) {
      return 'You have bought : ' + model + ' ' + id;
    },
    // arrange a viewing
    arrangeViewing: function (model, id) {
      return 'You have arranged viewing of ' + model + ' ' + id;
    }
  };
  // We would like to achieve
  // carManager.execute('buyVehicle', 'Ford Escort', '12345')
  carManager.execute = function (name) {
    console.log(carManager[name]);
    console.log(arguments);
    console.log([].slice.call(arguments, 1));
    return carManager[name] &&
           carManager[name].apply(carManager, [].slice.call(arguments, 1));
  };
  return carManager;
})();

console.log(CarManager);
console.log(CarManager.execute('buyVehicle', 'Ford Escort', '12345'));
console.log(CarManager.execute('arrangeViewing', 'Ferrari', '23456'));
