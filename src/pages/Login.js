import React, { useState } from 'react';
import { Link ,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
  });
  const handelInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  }

const loginSubmit = (e) => {
  e.preventDefault();
  const data = {
    email: loginInput.email,
    password: loginInput.password,
  };

  if (!data.email || !data.password) {
    toast.warning('Please fill in all required fields.');
    return;
  }

  axios.get('/sanctum/csrf-cookie').then(() => {
    axios
      .post('/api/login', data)
      .then((res) => {
        const status = res.status;
        const message = res.data.msg;
        if (status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          toast.success(message);
          navigate('/');
        } else if (status === 401) {
          toast.warning(message);
        } else if (status === 403) {
          toast.info(message);
        } else if (status === 201) {
          toast.warning(message);
        } else if (status === 202) {
          toast.error(message);
         }
      })
      .catch((error) => {
        toast.error('An error occurred. Please try again.');
      });
  });
};
return (
	<section>
      <div className="container-fluid py-3">
        <div className="row">
          <nav style={{ '--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'currentColor\'/%3E%3C/svg%3E");' }} aria-label="breadcrumb">
	        <ol className="breadcrumb">
	          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
	          <li className="breadcrumb-item active" aria-current="page">Login</li>
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
                       <form  onSubmit={loginSubmit}>
 
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="form2Example17">
                            Email address
                          </label>
                         <input
                          className="form-control"
                          onChange={handelInput} 
                          value={loginInput.email}
                          type="email"
                          name="email"
                          placeholder="Your email address"
                        />
                           
                        </div>

                        <div className="form-outline mb-4">
                         <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                          <input
                          className="form-control"
                          onChange={handelInput} 
                          value={loginInput.password}
                          type="password"
                          name="password"
                          placeholder="Password should be more than 6 character"
                        />
                         
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Login
                          </button>
                        </div>

                        <Link className="small text-muted" to="#">
                          Forgot password?
                        </Link>

                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                          Don't have an account? <Link to="/register" style={{ color: '#393f81' }}>Register here</Link>
                        </p>
                        <Link to="#!" className="small text-muted">
                          Terms of use.
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link to="#!" className="small text-muted">
                          Privacy policy
                        </Link>
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

export default Login