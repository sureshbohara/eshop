import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Process() {
  const [services, setServics] = useState([]);
  useEffect(() => {
    axios.get('/api/service')
      .then(response => {
        setServics(response.data.getServiceData);
      })
      .catch(error => {
        console.error('Error fetching service data:', error);
      });
  }, []);

  const divStyle = {
    background: '#f8f8f8',
  };

  return (
    <section style={divStyle}>
      <div className="container-fluid">
        <div className="row align-items-stretch">
          {services.map(service => (
            <div className="col-lg-3 col-md-4 col-6" key={service.id}>
              <div className="py-4 px-0 p-lg-4 border-color-light-black borders-bottom border-lg-bottom-0 border-lg-end shadow d-flex flex-column">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className={service.icon + " display-18"}></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="m-0 display-30">{service.title}</h5>
                    <p className="m-0 display-30">{service.details}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
