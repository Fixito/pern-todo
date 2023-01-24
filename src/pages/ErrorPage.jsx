import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className='container'>
      <hgroup>
        <h1>404</h1>
        <h2>Désolé, la page que vous cherchez n'existe pas</h2>
      </hgroup>
      <Link to='/'>Retour à l'accueil</Link>
    </section>
  );
};

export default ErrorPage;
