import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context.jsx';

const Navbar = () => {
  const { name } = useUserContext();

  return (
    <nav className='container'>
      <ul>
        <li>
          <Link to='/'>
            <strong>PERN Todo</strong>
          </Link>
        </li>
      </ul>
      <ul>
        {!name && (
          <li>
            <NavLink to='/register'>S'enregister</NavLink>
          </li>
        )}
        {name ? (
          <>
            <li>
              <NavLink to='/todos'>Tâches à faire</NavLink>
            </li>
            <li>
              <NavLink to='/logout'>Déconnexion</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to='/login'>Connexion</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
