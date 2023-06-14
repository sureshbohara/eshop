import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <section>
      <div className="container-fluid py-3">
         <div className="row text-center py-4">
            <h1>Order Success</h1>
            <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
            <p><strong>Please check your email</strong> Your order has been placed successfully !!</p>
         </div>

         <p className="text-center">
          <Link className="btn btn-warning btn-sm text-white" to="/">
           <i className='bi bi-basket'></i> Continue to Add to cart
          </Link>
         </p>

      </div>
    </section>
  );
}

export default Success;
