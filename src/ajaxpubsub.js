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

  // Subscribe to new tags being published and perform
  // a search query using them. Once data has returned
  // pubish this data for the rest of the applicaiton
  // to consume
  $.subscribe('/search/tags', function (e, tags) {
    $.ajax('http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
      {
        tags: tags,
        tagmode: 'any',
        format: 'json'
      },
    function (data) {
      if (!data.items.length) {
        return;
      }
      $.publish('/search/resultSet', {items: data.items});
    });
  });

  // Subscribe to the new results topic
  $.subscribe('/search/resultSet', function (e, results) {
    $('#searchResults').empty().append(resultTemplate(results));
  });
})(jQuery);