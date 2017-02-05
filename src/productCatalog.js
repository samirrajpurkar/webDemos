var createTableHeader = function (tableId) {
  var tableHeaderRow = document.createElement('TR');
  var th1 = document.createElement('TH');
  var th2 = document.createElement('TH');
  var th3 = document.createElement('TH');
  var th4 = document.createElement('TH');
  th1.appendChild(document.createTextNode('ProductId'));
  th2.appendChild(document.createTextNode('Type'));
  th3.appendChild(document.createTextNode('Price'));
  th4.appendChild(document.createTextNode('Examine'));
  tableHeaderRow.appendChild(th1);
  tableHeaderRow.appendChild(th2);
  tableHeaderRow.appendChild(th3);
  tableHeaderRow.appendChild(th4);
  document.getElementById(tableId).appendChild(tableHeaderRow);
};
var getIntersection = function (arrA, arrB, searchId) {
  var samePrice = arrA;
  var sameType = arrB;
  var similarArray = [];
  samePrice.forEach(function (obj1) {
    sameType.forEach(function (obj2) {
      if (obj1.id === obj2.id && obj1.id !== searchId) {
        similarArray.push(obj1);
      }
    });
  });
  return similarArray;
};

var processSearch = function (searchId) {
  api.searchProductById(searchId).then(function (val) {
    console.log(val);
  });
};
var updateTable = function (tableId, productArray) {
  // take a reference to table element
  var tableBody = document.getElementById(tableId);
  //reset table
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
  // create table header
  createTableHeader(tableId);
  // populate table rows
  for (var i = 0; i < productArray.length; i++) {
    var tr = document.createElement('TR');
    var td1 = document.createElement('TD');
    var td2 = document.createElement('TD');
    var td3 = document.createElement('TD');
    var td4 = document.createElement('button');

    td4.addEventListener('click', function () {
    });

    td1.appendChild(document.createTextNode(productArray[i].id));
    td2.appendChild(document.createTextNode(productArray[i].type));
    td3.appendChild(document.createTextNode(productArray[i].price));
    td4.appendChild(document.createTextNode('Examine'));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tableBody.appendChild(tr);
  }
};

api.searchAllProducts().then(function (products) {
  updateTable('allTable', products);
});

var updateExaminedText = function (product) {
  var outputString = 'Product Id: ' + product.id;
  outputString += '<br> Price : ' + product.price;
  outputString += '<br> Type : ' + product.type;
  document.getElementById('productText').innerHTML = outputString;
};

document.getElementById('inputButton').addEventListener('click', function ( ) {
  console.log(document.getElementById('input').value);
  processSearch(document.getElementById('input').value);
});

