import { useGlobalContext } from '../context.jsx';
import Todo from './Todo.jsx';

const TodoList = () => {
  const { todoList, clearTodos } = useGlobalContext();

  return (
    <table role='grid'>
      <thead>
        <tr>
          <th scope='col'>Tâches</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map((todo) => {
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
