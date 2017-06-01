const counter = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
};

const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  document.body.innerHTML = (store.getState());
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
}
);

expect(counter(0,{type: 'Something'})).toEqual(0);
expect(counter(0, {type: 'INCREMENT'})).toEqual(1);
expect(counter(0, {type: 'DECREMENT'})).toEqual(-1);

console.log('All test passed');
