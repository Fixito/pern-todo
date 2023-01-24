import { useTodosContext } from '../context/todos_context.jsx';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Todo = ({ todo_id, name }) => {
  const { editTodo, deleteTodo } = useTodosContext();

  return (
    <tr key={todo_id}>
      <td>{name}</td>
      <td className='flex'>
        <button className='edit-btn' onClick={() => editTodo(todo_id, name)}>
          <FaEdit />
        </button>
        <button className='delete-btn' onClick={() => deleteTodo(todo_id)}>
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default Todo;
