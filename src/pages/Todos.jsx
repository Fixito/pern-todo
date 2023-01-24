import { useGlobalContext } from '../context/global_context.jsx';
import { useTodosContext } from '../context/todos_context.jsx';
import { useUserContext } from '../context/user_context.jsx';
import TodoList from '../components/TodoList.jsx';
import Alert from '../components/Alert.jsx';
import Error from '../components/Error.jsx';
import Loader from '../components/Loader.jsx';
import { useEffect } from 'react';

const Todos = () => {
  const { alert } = useGlobalContext();
  const { name } = useUserContext();
  const {
    fetchTodos,
    todos,
    todos_loading: isLoading,
    todos_error: isError,
    handleChange,
    handleSubmit,
    todo_input,
    todo_editing: isEditing,
    backTodefault,
    inputRef
  } = useTodosContext();

  useEffect(() => {
    backTodefault();
    fetchTodos();
  }, [fetchTodos, backTodefault]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <main>
      <article>
        <div>
          {alert.show && <Alert {...alert} />}
          <hgroup>
            <h1>
              Bonjour {`${name.split('')[0].toUpperCase()}${name.slice(1)}`},
            </h1>
            <h2>Voici la liste de vos tâches à faire</h2>
          </hgroup>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='todo'
              id='todo'
              placeholder='Ex : Faire le ménage'
              value={todo_input}
              onChange={handleChange}
              ref={inputRef}
            />
            <button className='btn'>{isEditing ? 'Éditer' : 'Ajouter'}</button>
          </form>
        </div>
      </article>
      {todos.length > 0 && <TodoList />}
    </main>
  );
};

export default Todos;
