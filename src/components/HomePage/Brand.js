import React, { useEffect, useState } from 'react';
import electronicsImage from '../../images/icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Brand() {
  const [brandData, setBrandData] = useState([]);
  useEffect(() => {
    axios.get('/api/brands')
        .then(response => setBrandData(response.data.brands.slice(0, 12)))
      .catch(error => console.error(error));
  }, []);
  return (
    <>
      {brandData.map(brand => (
        <Link key={brand.id} to={`/brands/${brand.slug}`} className="listItem">
          <div className="image-block">
            <img
              alt={brand.name}
              title={brand.name}
              className="img-fluid brandImg"
              src={brand.image_url ? brand.image_url : electronicsImage}
            />
          </div>
        </Link>
      ))}
    </>
  );
}

export default Brand;
