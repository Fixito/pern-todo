import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='container'>
      <ul>
        <li>
          <strong>PERN Todo</strong>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to='/register'>S'enregister</NavLink>
        </li>
        <li>
          <NavLink to='/login'>Connexion</NavLink>
        </li>
        <li>
          <NavLink to='/todos'>Tâches à Faire</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
