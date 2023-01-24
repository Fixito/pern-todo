import { useUserContext } from '../context/user_context.jsx';
import { useGlobalContext } from '../context/global_context.jsx';
import Alert from '../components/Alert.jsx';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { alert, showAlert } = useGlobalContext();
  const { handleChange, user_inputs, register } = useUserContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let occuredError = false;

    try {
      await register();
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
          <h1>S'enregister</h1>
          <form onSubmit={handleRegister}>
            <label htmlFor='name'>Nom d'utilisateur</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder="Nom d'utilisateur"
              value={user_inputs.name}
              onChange={handleChange}
              required
            />
            <label htmlFor='email'>Adresse email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email address'
              value={user_inputs.email}
              onChange={handleChange}
              required
            />
            <label htmlFor='password'>
              Mot de passe
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Mot de passe'
                value={user_inputs.password}
                onChange={handleChange}
                required
              />
            </label>
            <button type='submit'>S'enregistrer</button>
          </form>
        </div>
        <div id='register-img'></div>
      </article>
    </main>
  );
};

export default Register;
