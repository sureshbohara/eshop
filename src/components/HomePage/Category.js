import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Popup from '../Popup';
function Category() {
  const [whisky, setWhisky] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  // popup
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShow = (whiskyItem) => {
    setSelectedItem(whiskyItem);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };
// end popup
  useEffect(() => {
    axios
      .get('/api/whisky')
      .then(response => {
        setWhisky(response.data.whisky);
      })
      .catch(error => {
        console.error('Error fetching whisky data:', error);
      });
  }, []);

  const addToCart = (whiskyItem) => {
    const existingCartItem = cartItems.find((item) => item.name === whiskyItem.name);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.name === whiskyItem.name ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const cartItem = {
        id: whiskyItem.id,
        name: whiskyItem.name,
        price: whiskyItem.product_price,
        quantity: 1,
        image: whiskyItem.image_url,
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

const addWishlist = (whiskyItem) => {
  // Make an API call to add the item to the wishlist
  axios.post('/api/wishlist', {
    product_id: whiskyItem.id,
    product_name: whiskyItem.name,
    product_price: whiskyItem.product_price,
    color: whiskyItem.color,
    size: whiskyItem.size,
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
    <>
      {whisky.map((whiskyItem, idx) => (
        <div className="col-lg-2 col-md-4 col-6 mb-4" key={idx}>
          <div className="card">
            <Link to={`/product/${whiskyItem.slug}`}>
              <img src={whiskyItem.image_url} className="card-img-top" alt="{whiskyItem.name}" />
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">{whiskyItem.name.substring(0, 20)}</h5>
                <p className="card-text">Price: Rs.{whiskyItem.product_price}</p>
              </div>
            </Link>
            <div className="card-footer d-flex justify-content-center justify-content-md-between">
              <Link to="#" className="btn text-warning" onClick={() => addToCart(whiskyItem)}>
                <i className="bi bi-basket"></i>
              </Link>
              <Link to="#" className="btn text-warning" onClick={() => addWishlist(whiskyItem)}>
                <i className="bi bi-bookmark-heart"></i>
              </Link>
               <Link to="#" className="btn text-warning" onClick={() => handleShow(whiskyItem)}>
                  <i className="bi bi-envelope"></i>
               </Link>
            </div>
          </div>
        </div>

      ))}

       {selectedItem && (
        <Popup selectedItem={selectedItem} onClose={handleClose} />
      )}

    </>
  );
}

export default Category;
