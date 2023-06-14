import React from 'react';
import { Link } from 'react-router-dom';
function HotSection() {
  return (
    <section className="categories">
      <div className="container-fluid d-flex categories-div">
        <Link to="" className="categories-menu">
          <div>
            <img
              src="https://hardwarepasal.com/src/img/sitesetting/2022-02-08-10-39-00_s5GYSKAoNH_hp_express_icon.gif"
              className="img-fluid categories-image"
              title="hp express"
              alt="hp express"
            />
            <span className="mt-2 mt-lg-0">HP Express</span>
          </div>
        </Link>
        <Link to="" className="categories-menu">
          <div>
            <img
              src="https://hardwarepasal.com/src/img/sitesetting/2022-02-08-10-39-00_vW0b8WnxyX_hot_deals_icon.gif"
              className="img-fluid categories-image"
              title="hot deals"
              alt="hot deals"
            />
            <span className="mt-2 mt-lg-0">Hot Deals</span>
          </div>
        </Link>
        <Link to="" className="categories-menu">
          <div>
            <img
              src="https://hardwarepasal.com/src/img/sitesetting/2022-02-08-10-39-00_3oQAuvNLB8_blogs_icon.gif"
              className="img-fluid categories-image"
              title="blogs"
              alt="blogs"
            />
            <span className="mt-2 mt-lg-0">Blogs</span>
          </div>
        </Link>
        <Link to="" className="categories-menu">
          <div>
            <img
              src="https://hardwarepasal.com/src/img/sitesetting/2022-02-08-10-39-00_HopJenJ3Dz_sell_with_us_icon.gif"
              className="img-fluid categories-image"
              title="discount"
              alt="discount"
            />
            <span className="mt-2 mt-lg-0">Sell With Us</span>
          </div>
        </Link>
        <Link to="" className="categories-menu">
          <div>
            <img
              src="https://hardwarepasal.com/src/img/sitesetting/2022-01-18-22-50-21_JpRtH1SPV4_new_arrivals_icon.gif"
              className="img-fluid categories-image"
              alt="new arrivals"
              title="new arrivals"
            />
            <span className="mt-2 mt-lg-0">New Arrivals</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default HotSection;
