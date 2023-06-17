import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Popup = ({ selectedItem, onClose }) => {
  const [formData, setFormData] = useState({
    name: selectedItem.name,
    price: selectedItem.product_price,
    qty: '',
    customer_name: '',
    contact_no: '',
    address: '',
    email: '',
    comment: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.qty) {
      newErrors.qty = 'Quantity is required';
      isValid = false;
    }

    if (!formData.customer_name) {
      newErrors.customer_name = 'Customer name is required';
      isValid = false;
    }

    if (!formData.contact_no) {
      newErrors.contact_no = 'Contact number is required';
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post('/api/quick-order', formData)
        .then((response) => {
          toast.success(response.data.message);
          onClose();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleClose = () => {
    onClose();
  };

  const isValidEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      {selectedItem && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Item Name: {selectedItem.name}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 form-group">
                    <label>Item Name</label>
                    <input type="text" className="form-control" name="name" value={selectedItem.name} readOnly />
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Item Price</label>
                    <input type="text" className="form-control" name="price" value={selectedItem.product_price} readOnly />
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Qty</label>
                    <input
                      type="number"
                      className={`form-control ${errors.qty ? 'is-invalid' : ''}`}
                      name="qty"
                      value={formData.qty}
                      onChange={handleChange}
                    />
                    {errors.qty && <div className="invalid-feedback">{errors.qty}</div>}
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.customer_name ? 'is-invalid' : ''}`}
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                    />
                    {errors.customer_name && <div className="invalid-feedback">{errors.customer_name}</div>}
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Contact No</label>
                    <input
                      type="text"
                      className={`form-control ${errors.contact_no ? 'is-invalid' : ''}`}
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                    />
                    {errors.contact_no && <div className="invalid-feedback">{errors.contact_no}</div>}
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="col-md-12 form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-12 form-group">
                    <label>Message</label>
                    <textarea
                      className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                    ></textarea>
                    {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
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
