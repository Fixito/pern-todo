import { useUserContext } from '../context/user_context.jsx';
import { useGlobalContext } from '../context/global_context.jsx';
import Alert from '../components/Alert.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user_inputs, handleChange, login } = useUserContext();
  const { alert, showAlert } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let occuredError = false;

    try {
      await login();
    } catch (error) {
      occuredError = true;
      showAlert(error.message, 'danger', true);
    }

    if (!occuredError) {
      navigate('/todos');
    }
  };

  return (
    <main className='main'>
      <article className='grid'>
        <div>
          {alert.show && <Alert {...alert} />}
          <h1>Se connecter</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor='email'>Adresse email</label>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Email address'
              value={user_inputs.email}
              onChange={handleChange}
            />
            <label htmlFor='password'>Mot de passe</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Mot de passe'
              value={user_inputs.password}
              onChange={handleChange}
            />
            <button type='submit'>Se connecter</button>
          </form>
        </div>
        <div></div>
      </article>
    </main>
  );
};

export default Login;
