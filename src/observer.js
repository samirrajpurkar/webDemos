function ObserverList() {
  this.observerList = [];
}
ObserverList.prototype.add = function (obj) {
  return this.observerList.push(obj);
};
ObserverList.prototype.count = function () {
  return this.observerList.length;
};
ObserverList.prototype.get = function (index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
  return undefined;
};
ObserverList.prototype.indexOf = function (obj, startIndex) {
  var i = startIndex;
  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i;
    }
    i++;
  }
  return -1;
};
ObserverList.prototype.removeAt = function (index) {
  return this.observerList.splice(index, 1);
};

function Subject() {
  this.observers = new ObserverList();
}
Subject.prototype.addObserver = function (observer) {
  return this.observers.add(observer);
};
Subject.prototype.removeObserver = function (observer) {
  return this.observers.removeAt(this.observers.indexOf(observer, 0));
};
Subject.prototype.notify = function (context) {
  var observersCount = this.observers.count();
  for (var i = 0; i < observersCount; i++) {
    this.observers.get(i).update(context); // update functionality will be overwrittern
  }
};

// The Observer
function Observer() {
  this.update = function (value) {
    // ...
  };
}

// Extend an Object with an extension
function extend(obj, extension) {
  for (var key in extension) {
    if (key) {
      obj[key] = extension[key];
    }
  }
}

// Reference to our DOM elements
var controlCheckbox = document.getElementById('mainCheckbox');
var addBtn = document.getElementById('addNewObserver');
var container = document.getElementById('observersContainer');

// Concrete Subject
//console.log(controlCheckbox);
//Extending the controlling checkbox with a new instance of the Subject class
extend(controlCheckbox, new Subject());

// Clicking the checkbox will trigger nofifications to its observers
controlCheckbox.onclick = function () {
  controlCheckbox.notify(controlCheckbox.checked);
};

function addNewObserver() {
  //Create a new checkbox to be added
  var check = document.createElement('input');
  check.type = 'checkbox';

  // Extend the checkbox with a Observer
  extend(check, new Observer());

  // Override with custom update behaviour
  check.update = function (value) {
    this.checked = value;
  };

  // Add the new observer to our list of observers
  // for our main subject
  controlCheckbox.addObserver(check);

  // Append the item to the container
  container.appendChild(check);
}

addBtn.onclick = addNewObserver;