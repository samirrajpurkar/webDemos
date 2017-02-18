// A very simple new mail handler

// A count of the number of messages received
var mailCounter = 0;

// Initialize subscibers that will listen out for a topic
// with the name 'inbox/newMessage'.

// Render a preview of new messages
var subsciber1 = subscribe('inbox/newMessage',function (topic, data) {
  // Log the topic for debugging purposes
  console.log('A new message was received', topic);

  // Use the data that was passed from our subject
  // to display a message preview to the user
  $('.messageSender').html(data.sender);
  $('.messagePreview').html(data.body);
});

// Here is another subscriber using the same data to perform
//another task

// Update the counter displaying the number of new messages
// received by the publisher
var subsciber2 = subscribe('inbox/newMessage', function (topic, data) {
  $('.newMessageCounter').html(++mailCounter);
});

publish('inbox/newMessage', [{
  sender: 'hello@example.com',
  body: 'Hey there, how are you doing today'
}]);

// We could then at a later point unsubscribe our subcribers
// from receiving any new topic notifications as follows
// unsubscribe(subscriber1);
// unsubscribe(subscriber2);

// Jquery implementation of Publish / Subscribe system
// Publish
// jQuery : $(obj).trigger('channel', [arg1, arg2, arg3]);
$(el).trigger('/login', [{
  username: 'test Name',
  userdata: 'test Data'
}]);

// Subscribe
// jQuery: $(obj).on('channel', [data], fn);
$(el).on('/login', function (event) {
  //...
  console.log(event);
});

// Unsubscribe
$(el).off('/login');
