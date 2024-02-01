import React from 'react';

const Catigories = ({ selectedCategory, onClickCategory }) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Hot', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => {
          return (
            <li
              className={selectedCategory === i ? 'active' : ''}
              onClick={() => onClickCategory(i)}
              key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Catigories;
