import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='hero'>
      <header className='container'>
        <hgroup>
          <h1>PERN Todo</h1>
          <p>Il est temps de se mettre au travail</p>
          <Link role='button' to='/register' className='cta'>
            S'enregister
          </Link>
        </hgroup>
      </header>
    </div>
  );
};

export default Home;
