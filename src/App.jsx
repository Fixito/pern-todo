import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context.jsx';
// pages
import SharedLayout from './pages/SharedLayout.jsx';
import Error from './pages/Error.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Todos from './pages/Todos.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

const App = () => {
  const { user } = useGlobalContext();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/todos'
            element={
              <ProtectedRoute user={user}>
                <Todos user={user} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
