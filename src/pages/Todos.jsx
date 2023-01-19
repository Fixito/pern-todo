import { useGlobalContext } from '../context.jsx';
import Alert from '../components/Alert.jsx';
import TodoList from '../components/TodoList.jsx';
import { useEffect } from 'react';

const Todos = () => {
  const {
    user: { user },
    todoList,
    getTodos,
    todo,
    setTodo,
    handleSubmit,
    isEditing,
    inputRef,
    alert
  } = useGlobalContext();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main>
      <article>
        <div>
          {alert.show && <Alert {...alert} />}
          <hgroup>
            <h1>
              Bonjour{' '}
              {`${user.name.split('')[0].toUpperCase()}${user.name.slice(1)}`},
            </h1>
            <h2>Voici la liste de vos tâches à faire</h2>
          </hgroup>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='todo'
              id='todo'
              placeholder='Ex : Projet perso'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              ref={inputRef}
            />
            <button className='btn'>{isEditing ? 'Éditer' : 'Ajouter'}</button>
          </form>
        </div>
      </article>
      {todoList.length > 0 && <TodoList />}
    </main>
  );
};

export default Todos;
