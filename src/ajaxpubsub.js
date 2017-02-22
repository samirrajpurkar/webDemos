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
  // Pre-compile template and cache it using closure
  var resultTemplate = _.template($('#resultTemplate').html());

  $('#flickrSearch').submit( function (e) {
    e.preventDefault();
    var tags = $(this).find('#query').val();

    if (!tags) {
      return;
    }
    $.publish('/search/tags', [$.trim(tags)]);
  });

  // Subscribe to the new search tags topic
  $.subscribe('/search/tags', function (e, tags) {
    $('#lastQuery')
      .html('<p> Searched for ' + tags + '</p>');
  });
})(jQuery);