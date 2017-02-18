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

var subscription = pubsub.subscribe('inbox/newMessage',
  function (topics, data) {
    console.log('Logging: ' + topics + ' : ' + data);
  });
//pubsub.publish('inbox/newMessage', 'hello world!');
pubsub.publish('inbox/newMessage', ['test', 'a', 'b','c']);
//pubsub.publish('inbox/newMessage', {sender: 'sender@ex.com', body: 'hi body'});