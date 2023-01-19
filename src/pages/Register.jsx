import { useGlobalContext } from '../context.jsx';
import Alert from '../components/Alert.jsx';

const Register = () => {
  const { alert, userInputs, handleChange, register } = useGlobalContext();

  return (
    <main className='main'>
      <article className='grid'>
        <div>
          {alert.show && <Alert {...alert} />}
          <h1>S'enregister</h1>
          <form onSubmit={register}>
            <label htmlFor='name'>Nom d'utilisateur</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder="Nom d'utilisateur"
              value={userInputs.name}
              onChange={handleChange}
              required
            />
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
            <label htmlFor='password'>
              Mot de passe
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Mot de passe'
                value={userInputs.password}
                onChange={handleChange}
                required
              />
            </label>
            <button type='submit'>S'inscrire</button>
          </form>
        </div>
        <div id='register-img'></div>
      </article>
    </main>
  );
};

export default Register;
