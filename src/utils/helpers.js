export const getLocalStorage = () =>
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
