import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
function Dashboard() {
	// get user order
  const [orders, setOrders] = useState([]);
  // bar chart
  const [labels, setLabels] = useState([]);
  const [dataCount, setDataCount] = useState([]);

  useEffect(() => {
    axios.get('/api/get-order', {
    headers: {
    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
   })
  .then(response => {
      setOrders(response.data.userorders);
      setLabels(response.data.labels1);
      setDataCount(response.data.dataCount1);
   })
  .catch(error => {
    console.error('Error fetching orders data:', error);
  });
 }, []);
  return (
    <section>
      <div className="container-fluid py-4">
        <div className="row">
          <nav aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Transaction ID</th>
                <th>Amount Rs.</th>
                <th>Payment Method</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(item => (
                <tr key={item.id}>
                 <td>{new Date(item.created_at).toLocaleDateString('en-GB')}</td>
                  <td>{item.ref_id}</td>
                  <td>{item.amount}</td>
                  <td>{item.payment_method}</td>
                  <td>{item.payment_status}</td>
                  <td>
                   <OverlayTrigger
					  placement="left"
					  overlay={<Tooltip id={item.id}>View Details</Tooltip>}
					>
					  <Link key={item.id} to={`/order/${item.id}`} className="listItem" title="View Details">
					    <i className="bi bi-file-earmark-text"></i>
					  </Link>
					</OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

         <div className="row">
          <div className="col-md-12 py-4">
            <h4>Order Status By Count</h4>
          </div>
          <div className="col-md-12">
			 <BarChart width={1300} height={300} data={dataCount.map((count, index) => ({
				  order_status: labels[index],
				  count: count,
				}))}>
				  <CartesianGrid strokeDasharray="3 3" />
				  <XAxis dataKey="order_status" />
				  <YAxis />
				  <Tooltip />
				  <Legend />
				  <Bar dataKey="count" fill="#8884d8" />
				</BarChart>

			</div>

         </div>

      </div>
    </section>
  );
}
export default Dashboard;
