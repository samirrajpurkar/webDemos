import $ from 'jquery';
import Rx from 'rxjs/Rx';

function main(sources) {
  const click$ = sources.DOM;

  const sinks =  {
    DOM: click$
      .startWith(null)
      .switchMap(() =>
        Rx.Observable.timer(0,1000)
          .map(i => `Seconds elapsed ${i}`)
      ),
    Log: Rx.Observable.timer(0,2000) // 0 -- 1 -- 2 -- 3
          .map(i => 2 * i)
  };
  return sinks;
}

//Effects (imperatives)
function DOMDriver(text$) {
  text$.subscribe(
    text => {
      const app = document.querySelector('#app');
      app.textContent = text;
    }
  );
  // DOM Source
  const DOMSource = Rx.Observable.fromEvent(document, 'click');
  return DOMSource;
}

function consoleLogDriver(msg$) {
  msg$.subscribe(
    msg => {
      console.log(msg);
    }
  );
}
const drivers = {
  DOM: DOMDriver,
  Log: consoleLogDriver
};

function run(mainFn, mainDrivers) {
  //we need to pass something like mainFn(DOMsource), but we cannot do that...
  // bProxy =
  // a= f(bProxy)
  // b = g(a)
  //bProxy.imitiate(b)
  const proxySources = {};
  Object.keys(mainDrivers).forEach(key => {
    proxySources[key] = new Rx.Subject();
  });
  const sinks = mainFn(proxySources);
  Object.keys(mainDrivers).forEach(key => {
    const source = mainDrivers[key](sinks[key]);
    source.subscribe(x => proxySources[key].next(x));
  });
}

run(main, drivers);
