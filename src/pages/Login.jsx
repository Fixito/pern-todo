import { useGlobalContext } from '../context.jsx';
import Alert from '../components/Alert.jsx';

const Login = () => {
  const { alert, userInputs, handleChange, login } = useGlobalContext();

  return (
    <main className='main'>
      <article className='grid'>
        <div>
          {alert.show && <Alert {...alert} />}
          <h1>Se connecter</h1>
          <form onSubmit={login}>
            <label htmlFor='email'>Adresse email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email address'
              value={userInputs.email}
              onChange={handleChange}
              required
            />
            <label htmlFor='password'>Mot de passe</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Mot de passe'
              value={userInputs.password}
              onChange={handleChange}
              required
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
