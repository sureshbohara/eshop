import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Order() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`/api/order-details/${id}`)
      .then(response => {
        const data = response.data;
        if (data.details) {
          setOrderDetails(data.details);
          calculateGrandTotal(data.details);
        }
      })
      .catch(error => {
        // Handle error
      });
  }, [id]);

  const calculateGrandTotal = (details) => {
    let total = 0;
    details.forEach(order_details => {
      const price = parseFloat(order_details.product_price);
      const quantity = parseInt(order_details.product_qty);
      total += price * quantity;
    });
    setGrandTotal(total);
  };

  return (
    <section>
      <div className="container-fluid py-4">
        <div className="row">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Order</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Order Details
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Product Qty</th>
                <th>Item Price</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orderDetails) &&
                orderDetails.map(order_details => (
                  <tr key={order_details.id}>
                    <td>{order_details.product_name}</td>
                     <td>{order_details.product_qty}</td>
                    <td>{order_details.product_price}</td>
                   
                  </tr>
                ))}
              <tr>
                <td></td>
                <td>Grand Total</td>
                <td>Rs. {grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Order;
