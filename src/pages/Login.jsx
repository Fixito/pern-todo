const Login = () => {
  return (
    <main className='main'>
      <article className='grid'>
        <div>
          <h1>Se connecter</h1>
          <form>
            <label htmlFor='email'>Adresse email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email address'
              required
            />
            <label htmlFor='password'>Mot de passe</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Mot de passe'
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
