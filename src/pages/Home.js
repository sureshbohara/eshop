import React, { useEffect, useState } from 'react';
import Banner from '../components/HomePage/Banner.js';
import Category from '../components/HomePage/Category.js';
import FeatureItems from '../components/HomePage/FeatureItems.js';
import Process from '../components/HomePage/Process.js';
import Brand from '../components/HomePage/Brand.js';
import HotSection from '../components/HomePage/HotSection.js';
import RecenltyViewItems from '../components/HomePage/RecenltyViewItems.js';
import { Link } from 'react-router-dom';
function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
         <div style={{ width: '100%', height: '100%' }} className="d-flex justify-content-center align-items-center py-4">
           <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Banner />
          <HotSection />

          <section>
            <div className="container-fluid categorySection">
              <div className="row">
                <div className="box-heading py-2">
                  <h2 className="cnit-h2">Whisky Items</h2>
                  <div className="float-right">
                    <Link to="" style={{ color: '#3f3f3f' }} className="seeAll">
                      See All &gt;
                    </Link>
                  </div>
                </div>
                <hr />
                <Category />
              </div>
            </div>
          </section>

          <div className="brands">
            <div className="container-fluid">
              <div className="box-heading">
                <h2 className="cnit-h2">Popular Brands</h2>
                <div className="float-right">
                  <Link to="/brands" style={{ color: '#3f3f3f' }} className="seeAll">
                    See All &gt;
                  </Link>
                </div>
              </div>
              <hr />
              <div className="nav d-flex flex-wrap product" role="tablist">
                <Brand />
              </div>
            </div>
          </div>
          <FeatureItems />

          <RecenltyViewItems/>

          <Process />
        </>
      )}
    </div>
  );
}
export default Home;
