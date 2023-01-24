import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import {
  ErrorPage,
  Home,
  Login,
  Logout,
  ProtectedRoute,
  Register,
  SharedLayout,
  Todos
} from './pages';
// context

const App = () => {
  return (
    <Router>
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
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
