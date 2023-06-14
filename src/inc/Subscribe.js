import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Subscribe() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/subscribers', { email })
      .then((response) => {
        toast.success(response.data.msg);
        setEmail('');
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          toast.error(error.response.data.errors.email[0]);
        } else {
          toast.error('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="subscribe-section">
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <div className="subscribe-content">
              <h4>
                <i className="fa fa-envelope" /> Newsletter
              </h4>
              <p>If you are going to use a passage of Lorem you need.</p>
              <form className="form-inline subscribe-form" onSubmit={handleSubmit}>
                <div className="form-group mb-0 d-flex">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email..."
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <button type="submit" className="btn btn-solid">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
