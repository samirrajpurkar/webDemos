var pubsub = { };

(function (myObject) {
  // Storage for topics that can be broadcast or listened to
  var topics = {};
  // An topic identifier
  var subUid = -1;

  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  myObject.publish = function (topic, args) {
    if (!topics[topic]) {
      return false;
    }
    var subscribes = topics[topic];
    var len = subscribes ? subscribes.length : 0;
    while (len--) {
      subscribes[len].func(topic,args);
    }
    return this;
  };

  myObject.subscribe = function (topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };
})(pubsub);

// Example: mini application
// var subscription = pubsub.subscribe('inbox/newMessage',
//   function (topics, data) {
//     console.log('Logging: ' + topics + ' : ' + data);
//   });
// pubsub.publish('inbox/newMessage', 'hello world!');
// pubsub.publish('inbox/newMessage', ['test', 'a', 'b','c']);
// pubsub.publish('inbox/newMessage', {sender: 'sender@ex.com', body: 'hi body'});

// Example: User-Interface Notification
// Imagine a Web Application responsible for displaying
// real time stock information

// Return the current local time to be used in our UI later
var getCurrentTime = function () {
  var date = new Date();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var y = date.getFullYear();
  var t = date.toLocaleTimeString().toLowerCase();

  return (m + '/' + d + '/' + y + ' ' + t);
};

// Add a new row of data to our fictional grid component
var addGridRow = function (data) {
  //ui.grid.addRow(data);
  console.log('updated grid component with : ' + data);
};

// Update our fictional grid to show the time it was last updated
var updateCounter = function (data) {
  // ui.grid.updateLastChanged(getCurrentTime());
  console.log('data last updated at: ' + getCurrentTime() + ' with ' + data);
};

// Update the grid using the data passed to our subscribers
var gridUpdate = function (topic, data) {
  if (data !== undefined) {
    addGridRow(JSON.stringify(data));
    updateCounter(JSON.stringify(data));
  }
};

// Create a subscription to the newDataAvaliable topic
var subscribe = pubsub.subscribe('newDataAvaliable', gridUpdate);

// The following represents updates to our data layer.
// This could be powered by ajax requests which broadcast
// that new data is available to the rest of the application

// Publish changes to the gridUpdated topic representing new entries
pubsub.publish('newDataAvaliable', {
  summary: 'Apple',
  identifier: 'APPL',
  stockPrice: 570.91
});

pubsub.publish('newDataAvaliable', {
  summary: 'Microsoft',
  identifier: 'MSFT',
  stockPrice: 30.85
});
