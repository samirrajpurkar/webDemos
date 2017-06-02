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

// Simple implementation of Redux.
// const createStore = (reducer) => {
//   let state;
//   let listeners = [];

//   const getState = () => {
//     return state;
//   };

//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach(listener => {
//       listener();
//     });
//   };

//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listeners.filter(l => l !== listener);
//     };
//   };

//   dispatch({});

//   return ({getState, dispatch, subscribe});
// };

const store = createStore(counter);

// document.addEventListener('click', () => {
//   store.dispatch({type: 'INCREMENT'});
// }
// );

const Counter = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
  );

const render = () => {
  //document.body.innerHTML = (store.getState());
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => (store.dispatch({type: 'INCREMENT'}))}
      onDecrement={() => (store.dispatch({type: 'DECREMENT'}))}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

const addCounter = (list) => {
  //return list.concat([0]);
  return [...list, 0];
};

const removeCounter = (list, index) => {
  //list.splice(index, 1);
  //return list.slice(0, index).concat(list.slice(index + 1));
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

const incrementCounter = (list, index) => {
  // return list
  //           .slice(0,index)
  //           .concat([list[index] + 1])
  //           .concat(list.slice(index + 1));
  return [
    ...list.slice(0,index), list[index] + 1, ...list.slice(index + 1)
  ];
};

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
};

expect(counter(0,{type: 'Something'})).toEqual(0);
expect(counter(0, {type: 'INCREMENT'})).toEqual(1);
expect(counter(0, {type: 'DECREMENT'})).toEqual(-1);

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [10, 20, 30];
  const listAfter = [10,30];
  deepFreeze(listBefore);
  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [10,20, 30];
  const listAfter = [10, 21, 30];
  deepFreeze(listBefore);
  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Text Redux',
    completed: true
  };
  const todoAfter = {
    id: 0,
    text: 'Text Redux',
    completed: false
  };

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
testToggleTodo();

console.log('All test passed');
