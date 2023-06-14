import React, { useState } from 'react';

function Sidebar({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  if (!categories) {
    return null;
  }

  // Find the selected category object
  const selectedCategoryObj = selectedCategory ? categories.find((category) => category.name === selectedCategory) : null;

  return (
    <>
      <h5 className="sidebar-title">Categories</h5>
      <ul className="list-group">
        {categories.map((category) => (
          <li
            className={`list-group-item ${category.name === selectedCategory ? 'active' : ''}`}
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      {selectedCategoryObj && (
        <>
          <h5 className="sidebar-title">Subcategories</h5>
          <ul className="list-group">
            {selectedCategoryObj.subcategories.map((subcategory) => (
              <li className="list-group-item" key={subcategory.id}>
                {subcategory.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Sidebar;
