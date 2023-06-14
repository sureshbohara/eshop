import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
   useEffect(() => {
    axios.get('/api/get-wishlist', {
    headers: {
    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
   })
  .then(response => {
      setWishlist(response.data.getAllData);
   })
  .catch(error => {
    console.error('Error fetching orders data:', error);
  });
 }, []);


//add to cart
  const addToCart = (item) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.name === item.name);
    if (existingCartItem) {
     const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
     );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const cartItem = {
        id: item.id,
        name: item.name,
        price: item.product_price,
        quantity: 1,
        image: item.image_url,
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


const deleteCartItem = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Removing';
    axios
      .post(`/api/delete-wishlist/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          thisClicked.closest('tr').remove();
        } else if (res.data.status === 404) {
          toast.error(res.data.message);
          thisClicked.innerText = 'Remove';
        }
      })
      .catch((error) => {
        toast.error('Error while processing the request');
        thisClicked.innerText = 'Remove';
      });
  }



return (
	 <section>
      <div className="container-fluid py-3">
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
                Wishlist
              </li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <aside className="col-lg-12">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width="120">
                        Price
                      </th>
                      <th scope="col" className="text-right d-none d-md-block" width="200">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <figure className="itemside align-items-center">
                            <div className="aside">
                              <img src={item.image_url} className="img-sm" alt="Product" />
                            </div>
                            <figcaption className="info">
                              <Link to="#" className="title text-dark" data-abc="true">
                                {item.name}
                              </Link>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                          <div className="price-wrap">
                            <var className="price">${item.product_price}</var>
                          </div>
                        </td>
                        <td className="text-right d-none d-md-block">
                           <button className="btn btn-danger text-white me-1 my-1 rounded-0" onClick={ (e) => deleteCartItem(e, item.id) }>
						    Remove
						  </button>
                           &nbsp;
                          <button className="btn btn-outline-info text-dark me-1 my-1 rounded-0" onClick={() => addToCart(item)}>
                            Add To Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
	)
}
export default Wishlist