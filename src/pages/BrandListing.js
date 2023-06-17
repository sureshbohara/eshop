import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../inc/Sidebar.js';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Popup from '../components/Popup.js';
function BrandListing() {
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const [cartItems, setCartItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleShow = (product) => {
    setSelectedItem(product);
  };
  const handleClose = () => {
    setSelectedItem(null);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/brands/${slug}`);
      const { brand, products } = response.data;
      setBrand(brand);
      setProducts(products);
    } catch (error) {
      console.error('Error fetching brand data:', error);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.name === product.name);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.product_price,
        quantity: 1,
        image: product.image_url,
        color: '',
        size: ''
      };
      setCartItems([...cartItems, cartItem]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, cartItem]));
    }
    toast.success('Item added to cart');
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  


  const addWishlist = (product) => {
  // Make an API call to add the item to the wishlist
  axios.post('/api/wishlist', {
    product_id: product.id,
    product_name: product.name,
    product_price: product.product_price,
    color: product.color,
    size: product.size,
    product_qty: 1
  })
    .then((response) => {
      if (response.status === 200) {
        toast.success(response.data.message);
      } else if (response.status === 202) {
        toast.info(response.data.message);
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Please login to continue');
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error('An error occurred while adding to the wishlist');
      }
    });
};
  return (
    <section>
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-3 d-none d-md-block">
            <div className="sidebar">
              <Sidebar />
            </div>
          </div>

          <div className="col-md-9">
            <div className="row categorySection">
              {brand && (
                <nav
                  style={{
                    '--bs-breadcrumb-divider':
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'currentColor\'/%3E%3C/svg%3E");',
                  }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {brand.name}
                    </li>
                  </ol>
                </nav>
              )}

              {products.map((product) => (
                <div key={product.id} className="col-lg-3 col-md-4 col-6 mb-4">
                  <div className="card">
                    <Link to={`/product/${product.slug}`}>
                      <img src={product.image_url} className="card-img-top" alt={`Product: ${product.name}`} />
                      <div className="card-body d-flex flex-column align-items-center">
                        <h5 className="card-title">{product.name.substring(0, 20)}</h5>
                        <p className="card-text">Price: Rs.{product.product_price}</p>
                      </div>
                    </Link>
                    <div className="card-footer d-flex justify-content-center justify-content-md-between" onClick={() => addToCart(product)}>
                      <Link to="#" className="btn text-warning">
                        <i className="bi bi-basket"></i>
                      </Link>
                      <Link to="#" className="btn text-warning" onClick={() => addWishlist(product)}>
                        <i className="bi bi-bookmark-heart"></i>
                      </Link>
                      
                      <Link to="#" className="btn text-warning" onClick={() => handleShow(product)}>
                                  <i className="bi bi-envelope"></i>
                        </Link>
                    </div>
                  </div>
                </div>
              ))}

              {selectedItem && (
                <Popup selectedItem={selectedItem} onClose={handleClose} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandListing;
