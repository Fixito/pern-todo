import { useTodosContext } from '../context/todos_context.jsx';
import Todo from './Todo.jsx';

const TodoList = () => {
  const { todos, clearTodos } = useTodosContext();

  return (
    <table role='grid'>
      <thead>
        <tr>
          <th scope='col'>Tâches</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          return <Todo key={todo.todo_id} {...todo} />;
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan='2'>
            <button className='clear-btn' onClick={clearTodos}>
              Vider le tableau
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TodoList;
