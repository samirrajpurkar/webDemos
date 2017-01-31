(function (window) {
  function myLibrary() {
    //Internal function definition
    var createRandomProduct = function () {
      var typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
      var price = (Math.random() * 500).toFixed(2);
      var type = typeArray[Math.floor(Math.random() * 4)];
      return {price: price, type: type};
    };
    var createRandomCatalog = function (num) {
      var catalog = [];
      for (var i = 0; i < catalog.length; i++) {
        var rproduct = createRandomProduct();
        catalog.push({id: i, price: rproduct.price, type: rproduct.type});
      }
      return catalog;
    };
    // Global variables, Execute code
    var catalog = createRandomCatalog(100);

    // External function definition
    var searchAllProducts = function () {
      var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(catalog);
        }, 1000);
      });
      return promise;
    };
    var searchProductById = function (id) {
      var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          for (var i = 0; i < catalog.length; i++) {
            if (catalog[i].id === id) {
              resolve({id: id, price: catalog[i].price, type: catalog[i].type});
            } else {
              reject('Invalid ID : ' + id);
            }
          }
        }, 1000);
      });
      return promise;
    };
    var searchProductsByType = function (type) {
      var promise = new Promise(function (resolve, reject) {
        var typeArray = [];
        var possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
        if (!possibleTypes.includes(type)) {
          reject('Invalid Type: ' + type);
        } else {
          setTimeout(function () {
            for (var i = 0; i < catalog.length; i++) {
              if (catalog[i].type === type) {
                typeArray.push({id: catalog[i].id,
                                price: catalog[i].price,
                                type: catalog[i].type});
              }
            }
            resolve(typeArray);
          }, 1000);
        }
      });
      return promise;
    };
    var searchProductByPrice = function (price, difference) {
      var promise = new Promise(function (resolve, reject) {
        var result = [];
        if (!isFinite(price)) {
          reject('Invalid Price : ' + price);
        }
        else {
          setTimeout(function () {
            for (var i = 0; i < catalog.length; i++) {
              if (Math.abs(catalog[i].price - price) < difference) {
                result.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type
                });
              }
            }
            resolve(result);
          }, 1000);
        }
      });
      return promise;
    };

    // return api object
    return {
      searchProductById: searchProductById,
      searchProductByPrice: searchProductByPrice,
      searchProductsByType: searchProductsByType,
      searchAllProducts: searchAllProducts
    };
  }

  if (typeof (window.api) === 'undefined') {
    window.api = myLibrary();
  }
})(window);