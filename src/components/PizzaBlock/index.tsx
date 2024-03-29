import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, handleTotalCount } from '../../redux/cart/slice';
import { CartItemType } from '../../redux/cart/types';
import { RootState } from '../../redux/store';

const typesNames: string[] = ['thin', 'traditional'];

type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, types, sizes }) => {
  const dispatch = useDispatch();

  const cardItem = useSelector((state: RootState) => state.cart.items.find((obj) => obj.id === id));
  const [activeSizeIndex, setActiveSizeIndex] = React.useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = React.useState(0);

  const addedCount = cardItem ? cardItem.count : 0;

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      type: typesNames[activeTypeIndex],
      size: sizes[activeSizeIndex],
      count: 1,
    };

    dispatch(addItem(item));
    dispatch(handleTotalCount());
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => {
            return (
              <li
                className={activeTypeIndex === i ? 'active' : ''}
                onClick={() => setActiveTypeIndex(i)}
                key={type}>
                {typesNames[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, i) => {
            return (
              <li
                className={activeSizeIndex === i ? 'active' : ''}
                onClick={() => setActiveSizeIndex(i)}
                key={size}>{`${size} cm.`}</li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{`From ${price} ₽`}</div>
        <div onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
