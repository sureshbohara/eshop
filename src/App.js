import React from 'react';
import MyRouter from './router/index.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import CategoryMenu from './components/Category.js';
import AppBar from './components/AppBar.js';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://eshop.ezonlinestorenp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
// Enable CORS in Axios
axios.interceptors.request.use(function (config) {
  config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
  config.headers['Access-Control-Allow-Credentials'] = 'true';
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
  return config;
});
// Set the CSRF token if your Laravel application uses it
// Replace 'csrf_token' with your actual CSRF token field name
const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}


// logout script
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
//end



function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <CategoryMenu/>
      <MyRouter />
      <Footer />
      <AppBar/>
    </>
  );
}

export default App;
