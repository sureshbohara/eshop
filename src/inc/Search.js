import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`/api/search?search=${searchTerm}`)
        .then(response => {
          setProducts(response.data.products);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setProducts([]);
    }
  }, [searchTerm]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
   <>
  <div className="input-group">
    <input
      type="text"
      name="search"
      className="form-control rounded-0"
      placeholder="Search for products, brands, and more"
      value={searchTerm}
      onChange={handleSearchChange}
    />
    <div className="input-group-append bg-warning">
      <span className="input-group-text bg-warning" id="basic-addon2">
        <i className="bi bi-search"></i>
      </span>
    </div>
  </div>

  <ul className="searchItems">
    {products.map(product => (
      <li key={product.id}>
        <Link to={`/product/${product.slug}`} target="_">
          {product.name}
        </Link>
      </li>
    ))}
  </ul>
</>

  );
}
export default Search;
