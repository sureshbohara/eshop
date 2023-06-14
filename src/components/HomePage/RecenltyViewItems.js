import React, { useEffect, useState } from 'react';
import { Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function RecenltyViewItems() {
  const [recentView, setRecentView] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/recent-view-items');
      setRecentView(response.data.recentItems);
    } catch (error) {
      console.log(error);
    }
  };

  const chunks = recentView.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 6);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);


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
        quantity: 1,
        image: product.image_url,
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


  const addWishlist = (product) => {
  // Make an API call to add the item to the wishlist
  axios.post('/api/wishlist', {
    product_id: product.id,
    product_name: product.name,
    product_price: product.product_price,
    color: product.color,
    size: product.size,
    product_qty: 1
  })
    .then((response) => {
      if (response.status === 200) {
        toast.success(response.data.message);
      } else if (response.status === 202) {
        toast.info(response.data.message);
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Please login to continue');
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error('An error occurred while adding to the wishlist');
      }
    });
};

  return (
    <section>
      <div className="container-fluid categorySection">
        <div className="row">
          <div className="box-heading py-2">
            <h2 className="cnit-h2">Recent View Items</h2>
            <div className="float-right">
              <Link to="#" style={{ color: '#3f3f3f' }} className="seeAll">
                See All &gt;
              </Link>
            </div>
          </div>
          <hr />
          <div className="col-12">
            <Carousel indicators>
              {chunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                  <div className="row">
                    {chunk.map((product) => (
                      <div
                        className="col-lg-2 col-md-4 col-6 mb-4"
                        key={product.id}
                      >
                        <Card>
                          <Link to={`/product/${product.slug}`}>
                            <Card.Img
                              variant="top"
                              src={product.image_url}
                              alt="Product Image"
                            />
                            <Card.Body className="d-flex flex-column align-items-center">
                              <h5 className="card-title">
                                {product.name.substring(0, 20)}
                              </h5>
                              <Card.Text>
                                Price: Rs.{product.product_price}
                              </Card.Text>
                            </Card.Body>
                          </Link>
                          <Card.Footer className="d-flex justify-content-center justify-content-md-between">
                            <Link to="#" className="btn text-warning" onClick={() => addToCart(product)}>
                            <i className="bi bi-basket"></i>
                            </Link>
                            <Link
                              to="#"
                              className="btn text-warning" onClick={() => addWishlist(product)}
                            >
                              <i className="bi bi-bookmark-heart"></i>
                            </Link>
                            <Link
                              to="#"
                              className="btn text-warning"
                            >
                              <i className="bi bi-envelope"></i>
                            </Link>
                          </Card.Footer>
                        </Card>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <style>
        {`
        .carousel-indicators {
          display: none;
        }
      `}
      </style>
    </section>
  );
}

export default RecenltyViewItems;
