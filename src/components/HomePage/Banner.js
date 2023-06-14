import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Banner() {
  const [banner, setBanner] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {axios.get('/api/banner')
      .then(response => {
        setBanner(response.data.banner);
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
      });
  },[]);
  
  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? banner.length - 1 : activeIndex - 1);
  };
  const handleNext = () => {
    setActiveIndex(activeIndex === banner.length - 1 ? 0 : activeIndex + 1);
  };
  return (
    <section>
    <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {banner.map((bannerItem, idx) => (
          <div key={idx} className={`carousel-item ${idx === activeIndex ? 'active' : ''}`}>
            <img src={bannerItem.image_url} className="d-block w-100" alt={`Slide ${bannerItem.id}`} />
          </div>
        ))}
      </div>

      <Link
        className="carousel-control-prev"
        href="#bannerCarousel"
        role="button"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </Link>

      <Link
        className="carousel-control-next"
        href="#bannerCarousel"
        role="button"
        data-bs-slide="next"
        onClick={handleNext}
      >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
      </Link>
    </div>
     </section>
  );
}

export default Banner;
