import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AppProvider } from './context/global_context.jsx';
import { TodosProvider } from './context/todos_context.jsx';
import { UserProvider } from './context/user_context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <TodosProvider>
          <App />
        </TodosProvider>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>
);
