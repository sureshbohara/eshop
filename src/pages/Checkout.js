import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleProceed = async () => {
    if (selectedPaymentMethod === 'cod') {
      const orderData = {
        shipping_charge: '0.00',
        amount: getTotalPrice(),
        order_status: 'New',
        payment_status: 'Pending',
        payment_method: selectedPaymentMethod,
        cartItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        }))
      };

      try {
        const response = await axios.post('/api/cod-order', orderData);
        if (response.status === 200) {
          toast.success('Payment successful!');
          localStorage.removeItem('cartItems');
          navigate('/success');
        } else if (response.status === 401) {
          toast.error('No cart items found');
        } else {
          toast.error('Payment failed. Please try again.');
          navigate('/failed');
        }
      } catch (error) {
        toast.error('Payment failed. Please try again.');
        navigate('/failed');
      }
    } else if (selectedPaymentMethod === 'paypal') {
      try {
        const orderData = {
          shipping_charge: '0.00',
          amount: getTotalPrice(),
          order_status: 'New',
          payment_status: 'Pending',
          payment_method: selectedPaymentMethod,
          cartItems: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size
          }))
        };

        const response = await axios.post('/api/paypal/pay', orderData);
        if (response.status === 200) {
          const script = document.createElement('script');
          script.src =
            'https://www.paypal.com/sdk/js?client-id=ARVYoDCNq3YTEUuGZA9oo1HuZ6WPljQi-kFfcVM2pj9bhGhAaDH2kfbT0LoFjbKzUEOBWFcakRcACd2u';
          script.async = true;
          script.onload = setupPayPalButton;
          script.setAttribute('data-namespace', 'paypal-sdk');
          document.body.appendChild(script);
        } else {
          toast.error('Payment failed. Please try again.');
          navigate('/failed');
        }
      } catch (error) {
        toast.error('Payment failed. Please try again.');
        navigate('/failed');
      }
    } else if (selectedPaymentMethod === 'eSewa') {
      
    }
  };

  const setupPayPalButton = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: getTotalPrice()
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          // Handle successful payment
          const orderId = data.orderID;
          try {
            const response = await axios.post('/api/paypal/payment/success', { orderID: orderId });
            if (response.status === 200) {
              toast.success('Payment successful!');
              localStorage.removeItem('cartItems');
              navigate('/success');
            } else {
              toast.error('Payment failed. Please try again.');
              navigate('/failed');
            }
          } catch (error) {
            toast.error('Payment failed. Please try again.');
            navigate('/failed');
          }
        },
        onCancel: (data) => {
          // Handle payment cancellation
          toast.error('Payment cancelled.');
        },
        onError: (err) => {
          // Handle error during payment
          toast.error('Payment failed. Please try again.');
          navigate('/failed');
        }
      })
      .render('#paypal-button-container');
  };


  return (
    <section className="payment-form dark py-4">
      <div className="container-fluid">
        <div className="row">
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
                Checkout
              </li>
            </ol>
          </nav>
        </div>

        <form>
          <div className="products">
            <h3 className="title">Order Summary</h3>
            {cartItems.map((item, index) => (
              <div className="item" key={index}>
                <span className="price">Rs. {item.price * item.quantity}</span>
                <p className="item-name">
                  {item.name} - Qty({item.quantity})
                </p>
              </div>
            ))}
            <div className="total">
              Total<span className="price">Rs. {getTotalPrice()}</span>
            </div>
          </div>

          <div className="card-details">
            <h3 className="title">Payment Option</h3>
            <div className="row">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_type"
                  id="cod"
                  value="cod"
                  onChange={e => setSelectedPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="cod">
                  COD
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_type"
                  id="paypal"
                  value="paypal"
                  checked={selectedPaymentMethod === 'paypal'}
                  onChange={e => setSelectedPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="paypal">
                  Paypal
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_type"
                  id="eSewa"
                  value="eSewa"
                  onChange={e => setSelectedPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="eSewa">
                  eSewa
                </label>
              </div>

            </div>

            <div className="row">
              <div className="form-group col-md-12">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleProceed}
                >
                  Payment Now
                </button>
              </div>
            </div>
          </div>

          <div id="paypal-button-container"></div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
