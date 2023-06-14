import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);

  const handleQuantityChange = (e, index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = parseInt(e.target.value);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const makePurchase = () => {
    const storedIsLoggedIn = localStorage.getItem('auth_token');
    if (storedIsLoggedIn) {
      navigate('/checkout');
    } else {
      toast.error('Please log in to make a checkout');
      navigate('/login');
    }
  };

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
                Cart
              </li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <aside className="col-lg-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width="120">
                        Quantity
                      </th>
                      <th scope="col" width="120">
                        Price
                      </th>
                      <th scope="col" width="120">
                        Total Price
                      </th>
                      <th scope="col" className="text-right d-none d-md-block" width="200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <figure className="itemside align-items-center">
                            <div className="aside">
                              <img src={item.image} className="img-sm" alt="Product" />
                            </div>
                            <figcaption className="info">
                              <Link to="#" className="title text-dark" data-abc="true">
                                {item.name}
                              </Link>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(e, index)}
                          />
                        </td>
                        <td>
                          <div className="price-wrap">
                            <var className="price">${item.price}</var>
                          </div>
                        </td>
                        <td>
                          <div className="price-wrap">
                            <var className="price">${item.price * item.quantity}</var>
                          </div>
                        </td>
                        <td className="text-right d-none d-md-block">
                          <button className="btn btn-light" onClick={() => handleRemoveItem(index)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>

          <aside className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <dl className="dlist-align">
                  <dt>Total price:</dt>
                  <dd className="text-right ml-3">Rs.{getTotalPrice()}</dd>
                </dl>

                <hr />
                <button className="btn btn-out btn-primary btn-square btn-main" data-abc="true" onClick={makePurchase}>
                  Checkout Process
                </button>

                <Link to="/" className="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
