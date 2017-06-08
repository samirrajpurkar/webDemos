const {createStore} = Redux;
const {combineReducers} = Redux;

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

const todoApp = combineReducers({todos, visibilityFilter});

const store = createStore(todoApp);

const {Component} = React;
let nextTodoId = 0;


const getVisibileTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
    default:
      todos;
  }
}

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
</li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

const AddTodo = ({
  onAddTodo
}) => {
  let input;
  return (
    <div>
      <input ref = {node => {input = node}}/>
      <button
        onClick={() => {
          onAddTodo(input.value);
          input.value='';
        }}
      >
        Add ToDo
      </button>
  </div>
  );
}

const FilterLink = ({filter, currentFilter, children, onClick}) => {
  console.log(filter, currentFilter, children);
  if (currentFilter === filter) {
    return(<span>{children}</span>)
  }
  return(
    <a href='#'
       onClick={e => {
         e.preventDefault();
         onClick(filter);
       }}
      >
      {children}
    </a>
  )
};


const Footer = ({
  visibilityFilter,
  onFilterClick
} ) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>
      Completed
    </FilterLink>
  </p>
);

class TodoApp extends Component {
  render () {
    console.log(store.getState());
    const {todos, visibilityFilter} = this.props;
    const visibileTodos = getVisibileTodos(todos, visibilityFilter);
    return(
      <div>
        <AddTodo
          onAddTodo={text => {
            store.dispatch({
              type: 'ADD_TODO',
              id: nextTodoId++,
              text: text
            })
          }}
        />
        <TodoList
          todos={visibileTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          } />
        <Footer
          visibilityFilter={visibilityFilter}
          onFilterClick={filter => {
            store.dispatch({
              type:'SET_VISIBILITY_FILTER',
              filter: filter
            })
          }}/>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
