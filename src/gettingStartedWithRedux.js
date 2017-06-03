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

// -----------------------------------
const todo = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return {id: action.id, text: action.text, completed: false};
  case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state;
    }
    return {
      ...state,
      completed: !state.completed
    };
  default:
    return state;
  }
};
const todos = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return [
      ...state, todo(undefined, action)
    ];
  case 'TOGGLE_TODO':
    return state.map(t => todo(t, action));
  default:
    return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
  case 'SET_VISIBILITY_FILTER':
    return action.filter;
  default:
    return state;
  }
};

const {combineReducers} = Redux;

const todoApp = combineReducers({todos, visibilityFilter});
// const todoApp = (state = { }, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

const storeTodos = createStore(todoApp);

console.log('Initial state');
console.log(storeTodos.getState());
console.log('-------------');

console.log('Dispatching ADD_TODO');
storeTodos.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});
console.log('Current State:');
console.log(storeTodos.getState());
console.log('-------------');

console.log('Dispatching ADD_TODO');
storeTodos.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Clean the house'
});
console.log('Current State:');
console.log(storeTodos.getState());
console.log('-------------');

console.log('Dispatching TOGGLE_TODO on id 0');
storeTodos.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});
console.log('Current State:');
console.log(storeTodos.getState());
console.log('-------------');

console.log('Dispatching SET_VISIBILITY_FILTER');
storeTodos.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log('Current State:');
console.log(storeTodos.getState());
console.log('-------------');

// -----------------------------------
const testAddToDo = () => {
  const stateBefore = [];
  const action = {
    id: 0,
    text: 'Testing add to do',
    type: 'ADD_TODO'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Testing add to do',
      completed: false
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodoViaReducer = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Complete this lesson',
      completed: false
    },
    {
      id: 1,
      text: 'Clean up the house',
      completed: false
    }
  ];

  const action = {
    id: 1,
    type: 'TOGGLE_TODO'
  };

  const stateAfter = [
    {
      id: 0,
      text: 'Complete this lesson',
      completed: false
    },
    {
      id: 1,
      text: 'Clean up the house',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
testToggleTodo();
testAddToDo();
testToggleTodoViaReducer();

console.log('All test passed');
