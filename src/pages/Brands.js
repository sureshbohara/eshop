import React, { useEffect, useState } from 'react';
import electronicsImage from '../images/icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Brand() {
  const [brandData, setBrandData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/brands')
      .then(response => {
        setBrandData(response.data.brands);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        className="d-flex justify-content-center align-items-center py-4"
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="brands">
      <div className="container-fluid">
        <div className="row">
          <nav
            style={{
              '--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'currentColor\'/%3E%3C/svg%3E");',
            }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                All Brands
              </li>
            </ol>
          </nav>
        </div>

        <div className="box-heading">
          <h2 className="cnit-h2">Popular Brands</h2>
        </div>
        <hr />
        <div className="nav d-flex flex-wrap product" role="tablist">
          {brandData.map(brand => (
            <Link key={brand.id} to={`/brands/${brand.slug}`} className="listItem">
              <div className="image-block">
                <img
                  alt={brand.name}
                  title={brand.name}
                  className="img-fluid brandImg"
                  src={brand.image_url || electronicsImage}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brand;
