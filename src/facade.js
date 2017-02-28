var addMyEvent = function (el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + ev, fn);
  } else {
    el['on' + ev] = fn;
  }
};

// In a similar manner, were all familar with
// jQuery's $document.ready().
// Internally this is actually being powered by
// a method called bindReady(), which is doing this

var facadeTemplateObject = {
  bindReady: function () {
    if (document.addEventListener) {
      // Use the handy event callback
      document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
      // A fallback to window.onload that will always work
      window.addEventListener('load', jQuery.ready, false);
    } else if (document.attachEvent) { // If IE Event model is used
      document.attachEvent('onreadystatechange', DOMContentLoaded);
      // A fallback to window.onload, that will always work
      window.attachEvent('onload', jQuery.ready);
    }
  }
};
