import React from 'react';
import { Link } from 'react-router-dom';
function Failed() {
	  return (
    <section>
      <div className="container-fluid py-3">
         <div className="row text-center py-4">
            <h1>Oh no , your payment failed</h1>
            <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
         </div>

         <p className="text-center">
          <Link className="btn btn-warning btn-sm text-white" to="/checkout">
            Please try again
          </Link>
         </p>

      </div>
    </section>
  );
}

export default Failed