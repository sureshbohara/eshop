import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CmsPage({ slug }) {
  const [cmsDetails, setCmsDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCmsDetails = async () => {
      try {
        const response = await axios.get(`/api/pages/${slug}`);
        const { cmsDetails, message } = response.data;

        if (cmsDetails) {
          setCmsDetails(cmsDetails);
        } else {
          setErrorMessage(message);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while fetching the CMS page.');
      } finally {
        setLoading(false);
      }
    };

    fetchCmsDetails();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ width: '100%', height: '100%' }} className="d-flex justify-content-center align-items-center py-4">
        <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section>
      <div className="container-fluid py-3">
        <div className="row">
          <nav
            style={{
              '--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'currentColor\'/%3E%3C/svg%3E");',
            }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {cmsDetails.name}
              </li>
            </ol>
          </nav>
        </div>

        <div className="about-section">
          <h1>{cmsDetails.name}</h1>
           <p dangerouslySetInnerHTML={{ __html: cmsDetails.description }}></p>
           <p dangerouslySetInnerHTML={{ __html: cmsDetails.content }}></p>
       </div>

      </div>
    </section>
  );
}
export default CmsPage;