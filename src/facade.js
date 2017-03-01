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
// Facades don't just have to be used on their own, however.
// They can also be integrated with other pattern such as Module pattern.
// As we can see below, our instance of the module patterns
// contains a number of methods which have been privately defined.
// A Facade is then used to supply a much simpler API to accessing these
// methods.

var module = ((function () {
  var _private = {
    i: 5,
    get: function () {
      console.log('current value : ', this.i );
    },
    set: function (val) {
      this.i = val;
    },
    run: function () {
      console.log('running');
    },
    jump: function () {
      console.log('jumping');
    }
  };

  return {
    facade: function (args) {
      _private.set(args.val);
      _private.get();
      if (args.run) {
        _private.run();
      }
    }
  };
})());

module.facade({run: true, val: 10}); // Outputs: 'current value: 10 and 'running'
