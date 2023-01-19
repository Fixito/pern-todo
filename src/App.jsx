import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import SharedLayout from './pages/SharedLayout.jsx';
import Error from './pages/Error.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import Todos from './pages/Todos.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
// context
import AppProvider from './context.jsx';

const App = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/logout'
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
            <Route
              path='/todos'
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
