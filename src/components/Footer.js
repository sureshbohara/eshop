import React from 'react';
import { Link } from 'react-router-dom';
import Subscribe from '../inc/Subscribe'; 
function Footer() {
	return (
	<>
  <Subscribe/>
  <footer className="top-footer">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 col-sm-3 col-6">
        <h5>About</h5>
        <ul className="list-unstyled">
          <li><Link to="#">Company</Link></li>
          <li><Link to="#">Contact Us</Link></li>
          <li><Link to="#">Careers</Link></li>
          <li><Link to="#">Press</Link></li>
        </ul>
      </div>
      <div className="col-md-3 col-sm-3 col-6">
        <h5>Help</h5>
        <ul className="list-unstyled">
          <li><Link to="#">Payments</Link></li>
          <li><Link to="#">Shipping</Link></li>
          <li><Link to="#">Cancellation & Returns</Link></li>
          <li><Link to="#">FAQ</Link></li>
        </ul>
      </div>
      <div className="col-md-3 col-sm-3 col-6">
        <h5>Policy</h5>
        <ul className="list-unstyled">
          <li><Link to="#">Return Policy</Link></li>
          <li><Link to="#">Terms Of Use</Link></li>
          <li><Link to="#">Security</Link></li>
          <li><Link to="#">Privacy</Link></li>
        </ul>
      </div>
      <div className="col-md-3 col-sm-3 col-6">
        <h5>Social</h5>
        <ul className="list-unstyled">
          <li><Link to="#"><i className="fab fa-facebook-f"></i> Facebook</Link></li>
          <li><Link to="#"><i className="fab fa-twitter"></i> Twitter</Link></li>
          <li><Link to="#"><i className="fab fa-instagram"></i> Instagram</Link></li>
          <li><Link to="#"><i className="fab fa-youtube"></i> YouTube</Link></li>
        </ul>
      </div>
    </div>
  </div>
</footer>


       <footer className="bottom-footer">
        <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2023 eShop. All Rights Reserved.</p>
          </div>
        </div>
      </div>
      </footer>
    </>
	)
}

export default Footer