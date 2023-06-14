import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Search from '../inc/Search';
import axios from 'axios';
function Navbar() {
  // redirect to other page
  const navigate = useNavigate();
  // user name display
  const username = localStorage.getItem('auth_name');
  // first word name display
  const firstName = username ? username.split(' ')[0] : '';


  const logoutSubmit = (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('auth_token');
    axios
      .post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
          toast.success(res.data.message);
          navigate('/');
        } else {
          toast.error('Logout failed');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred');
      });
  };

  const AuthButtons = localStorage.getItem('auth_token') ? (
    <li className="nav-item headerLogin" style={{ fontSize: '20px' }}>
      <Link onClick={logoutSubmit} className="btn btn-outline-warning text-white me-1 my-1 rounded-0" style={{ width: '100px' }}>
        Logout
      </Link>
    </li>
  ) : (
    <li className="nav-item headerLogin" style={{ fontSize: '20px' }}>
      <Link to="/login" className="btn btn-outline-warning text-white me-1 my-1 rounded-0" style={{ width: '100px' }}>
        Login
      </Link>
    </li>
  );


   const AuthButtons1 = localStorage.getItem('auth_token') ? (
    <li className="nav-item d-none d-sm-block">
      <Link className="nav-link active d-flex flex-column" to="/dashboard">
        <small style={{ fontSize: '11px' }}>Hello</small>
        <strong style={{ fontSize: '12px' }}>
          {localStorage.getItem('auth_token') ? firstName : null}
        </strong>
      </Link>
    </li>
  ) : (
    <li className="nav-item d-none d-sm-block">
      <Link className="nav-link active d-flex flex-column" to="/">
        <small style={{ fontSize: '11px' }}>Hello</small>
        <strong style={{ fontSize: '12px' }}>
          Guest
        </strong>
      </Link>
    </li>
  );



  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <i className="bi bi-shop-window fs-4 text-warning me-2"></i>
        <Link className="navbar-brand" to="/">
          eShop
        </Link>
        
        <Search/>
        

        <ul className="navbar-nav me-auto mt-2 ms-2 mt-lg-0">
          <div className="dropdown d-none d-sm-block">
            <button className="btn btn-dark dropdown-toggle bg-dark mt-1" id="dropdownMenuButton2" data-bs-toggle="dropdown">
              More
            </button>
            <ul className="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="dropdownMenuButton2">
              <li>
                <Link className="dropdown-item" to="delivery-info">
                  <i className="bi bi-bell-fill"></i>&nbsp;Delivery Info
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="customer-care">
                  <i className="bi bi-question-diamond-fill"></i>&nbsp;24x7 Customer Care
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="payment-policy">
                  <i className="bi bi-graph-up"></i>&nbsp;Payment Policy
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/about-us">
                  <i className="bi bi-gift-fill"></i>&nbsp;About Us
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="help-center">
                  <i className="bi bi-question-circle-fill"></i>&nbsp;Help Center
                </Link>
              </li>
            </ul>
          </div>

          {AuthButtons1}

          <li className="nav-item d-none d-sm-block">
            <Link className="nav-link active d-flex flex-column" to="/">
              <small style={{ fontSize: '11px' }}>You</small>
              <strong style={{ fontSize: '12px' }}>Shop</strong>
            </Link>
          </li>

          <li className="nav-item d-none d-sm-block" style={{ fontSize: '20px' }}>
            <Link className="nav-link d-flex" to="/cart">
              <i className="bi bi-basket2 text-white me-2 fs-5"></i>
            </Link>
          </li>

          <li className="nav-item d-none d-sm-block" style={{ fontSize: '20px' }}>
            <Link className="nav-link d-flex" to="/wishlist">
              <i className="bi bi-heart-fill text-white me-2 fs-5"></i>
            </Link>
          </li>

          {AuthButtons}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
