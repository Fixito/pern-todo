import React, { useContext, useReducer, useRef, useCallback } from 'react';
import axios from 'axios';
import { todos_url as url } from '../utils/constants.js';
import todos_reducer from '../reducers/todos_reducer.js';
import { getUserFromLocallStorage } from '../utils/helpers.js';
import { useGlobalContext } from '../context.jsx';
// actions
import {
  GET_TODOS_BEGIN,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  HANDLE_CHANGE,
  CREATE_TODO,
  EDIT_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  CLEAR_TODOS,
  BACK_TO_DEFAULT
} from '../action.js';

const initialState = {
  todos_loading: false,
  todos_error: false,
  todos: [],
  todo_input: '',
  todo_editing: false,
  todo_id: null
};

const TodosContext = React.createContext();

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todos_reducer, initialState);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    dispatch({ type: HANDLE_CHANGE, payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = getUserFromLocallStorage();
    const { todos, todo_id, todo_input, todo_editing } = state;

    if (!todo_input) {
      // showAlert('Veuillez remplir le champ', 'danger', true);
    } else if (todo_input && !todo_editing) {
      try {
        const {
          data: { todo: todoData }
        } = await axios.post(
          url,
          { name: todo_input },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const newTodo = {
          todo_id: todoData.todo_id,
          name: todo_input,
          completed: false
        };

        dispatch({ type: CREATE_TODO, payload: newTodo });
      } catch (error) {
        console.log(error.response.data.msg);
      }
      // showAlert('Tâche ajoutée', 'success', true);
    } else {
      const newTodos = todos.map((todo) =>
        todo.todo_id === todo_id ? { ...todo, name: todo_input } : todo
      );
      dispatch({ type: UPDATE_TODO, payload: newTodos });

      try {
        await axios.patch(
          `${url}${todo_id}`,
          { name: todo_input },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.log(error.response.data.msg);
      }
      // showAlert('Tâche éditée', 'success', true);
    }

    backTodefault();
  };

  const editTodo = (id, name) => {
    dispatch({
      type: EDIT_TODO,
      payload: { id, name }
    });
    inputRef.current.focus();
  };

  const deleteTodo = async (id) => {
    const { token } = getUserFromLocallStorage();
    dispatch({ type: DELETE_TODO, payload: id });

    try {
      await axios.delete(`${url}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }

    // showAlert('Tâche supprimée', 'danger', true);
    backTodefault();
  };

  const clearTodos = async () => {
    const { token } = getUserFromLocallStorage();

    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({ type: CLEAR_TODOS });
      // showAlert('Tableau vidé', 'danger', true);
      backTodefault();
    } catch (error) {
      console.log(error.response.data.msg);
    }

    try {
    } catch (error) {
      dispatch({ type: GET_TODOS_ERROR });
    }
  };

  const backTodefault = () => {
    dispatch({ type: BACK_TO_DEFAULT });
  };

  const fetchTodos = useCallback(async () => {
    const { token } = getUserFromLocallStorage();
    dispatch({ type: GET_TODOS_BEGIN });

    try {
      const {
        data: { todos }
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({ type: GET_TODOS_SUCCESS, payload: todos });
    } catch (error) {
      dispatch({ type: GET_TODOS_ERROR });
    }
  }, []);

  return (
    <TodosContext.Provider
      value={{
        ...state,
        dispatch,
        fetchTodos,
        handleChange,
        handleSubmit,
        editTodo,
        deleteTodo,
        clearTodos,
        inputRef
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  return useContext(TodosContext);
};
