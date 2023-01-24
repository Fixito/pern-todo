import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { TodosProvider } from './context/todos_context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </React.StrictMode>
);
