const Register = () => {
  return (
    <main className='main'>
      <article className='grid'>
        <div>
          <h1>S'enregister</h1>
          <form>
            <label htmlFor='name'>Nom d'utilisateur</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder="Nom d'utilisateur"
              required
            />
            <label htmlFor='email'>Adresse email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email address'
              required
            />
            <label htmlFor='password'>
              Mot de passe
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Mot de passe'
                required
              />
            </label>
            <button type='submit'>S'inscrire</button>
          </form>
        </div>
        <div></div>
      </article>
    </main>
  );
};

export default Register;
