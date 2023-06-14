import React, { useState } from 'react';
import { Link ,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: '',
    address: '',
    mobile: '',
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      address: registerInput.address,
      mobile: registerInput.mobile,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          //localStorage.setItem('auth_token', res.data.token);
          //localStorage.setItem('auth_name', res.data.username);
          toast.success(res.data.message);
          navigate('/login');
        } else {
          setRegisterInput({ ...registerInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

	return (
	<section>
      <div className="container-fluid py-3">
        <div className="row">
          <nav style={{ '--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'currentColor\'/%3E%3C/svg%3E");' }} aria-label="breadcrumb">
	        <ol className="breadcrumb">
	          <li className="breadcrumb-item"><Link  to="/">Home</Link ></li>
	          <li className="breadcrumb-item active" aria-current="page">Register</li>
	        </ol>
	      </nav>
        </div>

        <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={registerSubmit}>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                      Register into your account
                    </h5>

                    <div className="row">
                      <div className="form-outline mb-4 col-md-6">
                       <label className="form-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={registerInput.name}
                          onChange={handleInput}
                          className="form-control form-control-lg"
                          placeholder="Full Name"
                        />
                        <span className="errorDisplay">{registerInput.error_list.name}</span>
                      </div>

                      <div className="form-outline mb-4 col-md-6">
                      <label className="form-label">
                          Mobile
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          value={registerInput.mobile}
                          onChange={handleInput}
                          className="form-control form-control-lg"
                          placeholder="Mobile"
                        />
                        <span className="errorDisplay">{registerInput.error_list.mobile}</span>
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={registerInput.address}
                          onChange={handleInput}
                          className="form-control form-control-lg"
                          placeholder="Address"
                        />
                        <span className="errorDisplay">{registerInput.error_list.address}</span>
                        
                      </div>

                      <div className="form-outline mb-4 col-md-6">
                       <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={registerInput.email}
                          onChange={handleInput}
                          className="form-control form-control-lg"
                          placeholder="Email address"
                        />
                        <span className="errorDisplay">{registerInput.error_list.email}</span>
                       
                      </div>

                      <div className="form-outline mb-4 col-md-6">
                      <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={registerInput.password}
                          onChange={handleInput}
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                        <span className="errorDisplay">{registerInput.error_list.password}</span>
                        
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Register
                        </button>
                      </div>
                    </div>

                    <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                      Already have an account? <Link to="/login" style={{ color: '#393f81' }}>Login here</Link>
                    </p>
                  </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    
      </div>
    </section>
	)
}

export default Register