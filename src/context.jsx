import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState('Thomas');
  const [todo, setTodo] = useState('');
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: true,
  });
  const [todoList, setTodoList] = useState([
    {
      todo_id: 1,
      name: 'Faire le front',
      user_id: 1,
    },
    {
      todo_id: 2,
      name: 'Faire la BDD',
      user_id: 1,
    },
    {
      todo_id: 3,
      name: 'Faire le back',
      user_id: 1,
    },
  ]);
  const inputRef = useRef(null);

  const showAlert = (msg = '', type = '', show = false) => {
    setAlert({ msg, type, show });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) {
      showAlert('Veuillez remplir le champ', 'danger', true);
    } else if (todo && !isEditing) {
      const id = new Date().getTime();
      const newTodo = { todo_id: id, name: todo, completed: false };
      setTodoList([...todoList, newTodo]);
      showAlert('Tâche ajoutée', 'success', true);
    } else {
      const newTodos = todoList.map((t) =>
        t.todo_id === editID ? { ...t, name: todo } : t
      );
      setTodoList(newTodos);
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

  const deleteTodo = (id) => {
    const newTodos = todoList.filter((todo) => todo.todo_id !== id);
    setTodoList(newTodos);
    backTodefault();
    showAlert('Tâche supprimée', 'danger', true);
  };

  const clearTodos = () => {
    setTodoList([]);
    backTodefault();
    showAlert('Tableau vidé', 'danger', true);
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
        todoList,
        todo,
        isEditing,
        editID,
        alert,
        inputRef,
        showAlert,
        setAlert,
        setTodo,
        handleSubmit,
        deleteTodo,
        clearTodos,
        editTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
