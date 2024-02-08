import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CatigoriesProps = {
  selectedCategory: number;
  onClickCategory: (i: number) => void;
}

const Catigories: React.FC<CatigoriesProps> = React.memo(({ selectedCategory, onClickCategory }) => {
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
})

export default Catigories;
