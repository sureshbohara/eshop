import React, { useState } from 'react';
const Popup = ({ selectedItem, onClose }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  return (
    <>
      {show && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Item Name : {selectedItem.name}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 form-group">
                    <label>Item Name</label>
                    <input type="text" className="form-control" name="name"  value={selectedItem.name}  readOnly />
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Item Price</label>
                    <input type="text" className="form-control" name="price"  value={selectedItem.product_price}  readOnly />
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Qty</label>
                    <input type="number" min="1" className="form-control" name="qty" />
                  </div>


                  <div className="col-md-4 form-group">
                    <label>Customer Name</label>
                    <input type="text" className="form-control" name="customer_name" />
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Contact No</label>
                    <input type="text" className="form-control" name="contact_no" />
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" name="address" />
                  </div>

                  <div className="col-md-12 form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" />
                  </div>

                  <div className="col-md-12 form-group">
                    <label>Message</label>
                    <textarea className="form-control" name="comment" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Send Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
