(function ($) {
  var o = $({});

  $.subscribe = function () {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function () {
    o.off.apply(o, arguments);
  };

  $.publish = function () {
    o.trigger.apply(o, arguments);
  };

  // Pre-compiled templates and cache them using closure
  var userTemplate = _.template($('#userTemplate').html());
  var ratingsTemplate = _.template($('#ratingsTemplate').html());

  // Subscribe to the new user topic, which adds a user
  // to a list of users who have submitted reviews
  $.subscribe('/new/user', function (e, data) {
    if (data) {
      console.log(data);
      $('#users').append(userTemplate(data));
    }
  });
  // Subscribe to the new rating topic.
  // This is composed of a title and rating.
  // New ratings are appended to a running list of added user ratings
  $.subscribe('/new/rating', function (e, data) {
    if (data) {
      console.log(data);
      $('#ratings').append(ratingsTemplate(data));
    }
  });
  // Handler for adding a new user
  $('#add').on('click', function (e) {
    e.preventDefault();

    var strUser = $('#twitter_handle').val();
    var strMovie = $('#movie_seen').val();
    var strRating = $('#movie_rating').val();

    // Inform the application a new user is avaliable
    $.publish('/new/user', {name: strUser});

    // Inform the application a new rating is avaliable
    $.publish('/new/rating', {title: strMovie, rating: strRating});
  });
})(jQuery);