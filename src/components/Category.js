import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import electronicsImage from '../images/product.jpg';
function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get('/api/category')
      .then(response => {
        const { category } = response.data;
        setCategories(category);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
  }, []);

  const handleCategoryHover = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section>
      <div className="line-menu-container">
        <div className="line-menu">
          <ul>
            {categories.map((categoryItem) => (
              <li
                key={categoryItem.id}
                className={selectedCategory === categoryItem.id ? 'active' : ''}
                onMouseEnter={() => handleCategoryHover(categoryItem.id)}
                onMouseLeave={() => handleCategoryHover(null)}
              >
                <Link to={`/category/${categoryItem.slug}`}>
                  <div className="menu-item">
                    <img
                      src={categoryItem.image_url || electronicsImage}
                      alt={categoryItem.name}
                      className="menu-icon"
                    />&nbsp;
                    <span className="menu-text">{categoryItem.name}</span>
                  </div>
                </Link>
                {selectedCategory === categoryItem.id && (
                  <ul className="submenu">
                    {categoryItem.children.map((childCategory) => (
                      <li key={childCategory.id} className="submenu-item">
                        <Link to={`/category/${childCategory.slug}`}>
                          <span className="submenu-text">{childCategory.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Category;
