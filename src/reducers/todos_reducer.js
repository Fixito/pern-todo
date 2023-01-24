import {
  GET_TODOS_BEGIN,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  HANDLE_CHANGE,
  CREATE_TODO,
  CLEAR_TODOS,
  EDIT_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  BACK_TO_DEFAULT
} from '../action.js';

const todos_reducer = (state, action) => {
  if (action.type === GET_TODOS_BEGIN) {
    return { ...state, todos_loading: true };
  }

  if (action.type === GET_TODOS_SUCCESS) {
    return {
      ...state,
      todos: action.payload,
      todos_loading: false
    };
  }

  if (action.type === GET_TODOS_ERROR) {
    return { ...state, todos_loading: false, todos_error: true };
  }

  if (action.type === HANDLE_CHANGE) {
    return { ...state, todo_input: action.payload };
  }

  if (action.type === CREATE_TODO) {
    return { ...state, todos: [...state.todos, action.payload] };
  }

  if (action.type === EDIT_TODO) {
    const { id, name } = action.payload;
    return { ...state, todo_id: id, todo_input: name, todo_editing: true };
  }

  if (action.type === UPDATE_TODO) {
    return { ...state, todos: action.payload };
  }

  if (action.type === DELETE_TODO) {
    const newTodos = state.todos.filter(
      (todo) => todo.todo_id !== action.payload
    );

    return {
      ...state,
      todos: newTodos
    };
  }

  if (action.type === CLEAR_TODOS) {
    return {
      ...state,
      todos: []
    };
  }

  if (action.type === BACK_TO_DEFAULT) {
    return {
      ...state,
      todo_input: '',
      todo_id: null,
      todo_editing: false
    };
  }

  throw new Error(`Pas d'action correspondante ${action.type}`);
};

export default todos_reducer;
