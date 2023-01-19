import { NavLink, Link } from 'react-router-dom';
import { useGlobalContext } from '../context.jsx';

const Navbar = () => {
  const { user, logout } = useGlobalContext();

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
        {!user?.user.name && (
          <li>
            <NavLink to='/register'>S'enregister</NavLink>
          </li>
        )}
        {user?.user.name ? (
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
