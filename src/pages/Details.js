import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Details() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    axios
      .get(`/api/product/${slug}`)
      .then(response => response.data)
      .then(data => {
        if (data.product) {
          setProduct(data.product);
        } else {
          // Handle product not found
        }
      })
      .catch(error => {
        // Handle error
      });
  }, [slug]);



   const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.name === product.name);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.product_price,
        quantity: quantity,
        image: product.image_url,
        color: '',
        size: ''
      };
      setCartItems([...cartItems, cartItem]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, cartItem]));
    }
    toast.success('Item added to cart');
  };


  // Quantity Increment/Decrement in Hooks - Start
    const handleDecrement = () => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if(quantity < 10){
            setQuantity(prevCount => prevCount + 1);
        }
    }
    // Quantity Increment/Decrement in Hooks - End


// relared item add to caer
  const addToCart1 = (relatedProduct) => {
    const existingCartItem = cartItems.find((item) => item.name === relatedProduct.name);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.name === relatedProduct.name ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const cartItem = {
        id: relatedProduct.id,
        name: relatedProduct.name,
        price: relatedProduct.product_price,
        quantity: 1,
        image: relatedProduct.image_url,
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


  if (!product) {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        className="d-flex justify-content-center align-items-center py-4"
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="container-fluid py-3">
        <div className="row">
          <nav style={{ '--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'currentColor\'/%3E%3C/svg%3E");' }} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{product.category.name}</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      <img id="main-image" src={product.image_url} width="250" alt="Product" />
                    </div>
                    <div className="thumbnail text-center">
                      {product.media.map((image, index) => (
                        <img key={index} src={image.url} width="70" alt={`Thumbnail ${index}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="productDetails p-4">
                    <div className="mt-4 mb-3">
                      <span className="text-uppercase text-muted brand">{product.brand.name}</span>
                      <h5 className="text-uppercase">{product.name}</h5>
                      <div className="price d-flex flex-row align-items-center">
                        <span className="act-price">Rs.{product.product_price * quantity}</span>

                        <div className="ml-2">
                          <small className="dis-price">Rs.{product.previous_price}</small> ||
                          <span>10% OFF</span>
                        </div>
                      </div>
                    </div>
                    <p className="about" dangerouslySetInnerHTML={{ __html: product.details }}></p>
                    <div className="cart mt-4 align-items-center">
                      <div className="row g-2">
                        <div className="col-md-auto col-12">

                         <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                        </div>

                        </div>
                        <div className="col-md-auto col-6">
                          <button className="btn btn-danger text-uppercase" style={{ borderRadius: '0px' }} onClick={() => addToCart(product)}>
                            <i className="bi bi-basket"></i> Add to cart
                          </button>
                        </div>
                        <div className="col-md-auto col-6">
                          <button className="btn btn-danger text-uppercase" style={{ borderRadius: '0px' }}>
                            <i className="bi bi-heart"></i> Whitelist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {product.related_products.length > 0 && (
          <div className="row">
            <div className="col-md-12">
              <h2 className='py-4'>Related Items</h2>
              <div className="row">
             {product.related_products.map(relatedProduct => (
              <div className="col-lg-2 col-md-4 col-6 mb-4">
              <div className="card">

               <Link to={`/product/${relatedProduct.slug}`}>
                 <img src={relatedProduct.image_url} className="card-img-top" alt={relatedProduct.name} />
                 <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title">{relatedProduct.name.substring(0, 20)}</h5>
                  <p className="card-text">Price: Rs.{relatedProduct.product_price}</p>
                </div>
               </Link>

                <div className="card-footer d-flex justify-content-center justify-content-md-between">
                  <Link to="#" className="btn text-warning" onClick={() => addToCart1(relatedProduct)}>
                        <i className="bi bi-basket"></i>
                  </Link>
                  <Link to="#" className="btn text-warning">
                    <i className="bi bi-bookmark-heart"></i>
                  </Link>
                  <Link to="#" className="btn text-warning">
                    <i className="bi bi-envelope"></i>
                  </Link>
                </div>
              </div>
            </div>
           ))}
        </div>
        </div>
        </div>
        )}
      </div>
    </section>
  );
}

export default Details;
