import { createContext, useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppContext = createContext();

const getUserFromLocallStorage = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserFromLocallStorage());
  const [userInputs, setUserInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [todo, setTodo] = useState('');
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    const { name, email, password } = userInputs;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        { name, email, password }
      );

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setUserInputs({
        name: '',
        email: '',
        password: ''
      });
      navigate('/todos');
    } catch (error) {
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = userInputs;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        {
          email,
          password
        }
      );
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setUserInputs({
        name: '',
        email: '',
        password: ''
      });
      navigate('/todos');
    } catch (error) {
      showAlert(error.response.data.msg, 'danger', true);
    }
  };

  const getTodos = async () => {
    const { token } = getUserFromLocallStorage();

    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodoList(data.todos);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const showAlert = (msg = '', type = '', show = false) => {
    setAlert({ msg, type, show });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = getUserFromLocallStorage();

    if (!todo) {
      showAlert('Veuillez remplir le champ', 'danger', true);
    } else if (todo && !isEditing) {
      try {
        const {
          data: { todo: todoData }
        } = await axios.post(
          'http://localhost:5000/api/v1/todos',
          { name: todo },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const newTodo = {
          todo_id: todoData.todo_id,
          name: todo,
          completed: false
        };
        setTodoList([...todoList, newTodo]);
      } catch (error) {
        console.log(error.response.data.msg);
      }

      showAlert('Tâche ajoutée', 'success', true);
    } else {
      const newTodos = todoList.map((t) =>
        t.todo_id === editID ? { ...t, name: todo } : t
      );
      setTodoList(newTodos);

      try {
        await axios.patch(
          `http://localhost:5000/api/v1/todos/${editID}`,
          { name: todo },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.log(error.response.data.msg);
      }

      showAlert('Tâche éditée', 'success', true);
    }

    backTodefault();
  };

  const editTodo = (id, name) => {
    setEditID(id);
    setIsEditing(true);
    setTodo(name);
    inputRef.current.focus();
  };

  const deleteTodo = async (id) => {
    const { token } = getUserFromLocallStorage();
    const newTodos = todoList.filter((todo) => todo.todo_id !== id);
    setTodoList(newTodos);

    try {
      await axios.delete(`http://localhost:5000/api/v1/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }

    showAlert('Tâche supprimée', 'danger', true);
    backTodefault();
  };

  const clearTodos = async () => {
    const { token } = getUserFromLocallStorage();

    try {
      setTodoList([]);
      backTodefault();
      showAlert('Tableau vidé', 'danger', true);
      await axios.delete(`http://localhost:5000/api/v1/todos/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const backTodefault = () => {
    setTodo('');
    setEditID(null);
    setIsEditing(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        userInputs,
        todoList,
        todo,
        isEditing,
        editID,
        alert,
        inputRef,
        setUser,
        showAlert,
        setAlert,
        setTodo,
        handleSubmit,
        deleteTodo,
        clearTodos,
        editTodo,
        handleChange,
        login,
        getTodos,
        register
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
