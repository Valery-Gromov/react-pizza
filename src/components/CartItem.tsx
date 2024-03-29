import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, handleTotalCount, minusItem, removeItem } from '../redux/cart/slice';
import { CartItemType } from '../redux/cart/types';


type CartItemProps = {
  id: number;
  title: string;
  price: number;
  size: number;
  count: number;
  type: string;
  imageUrl: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, price, size, count, type, imageUrl }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id } as CartItemType));
    dispatch(handleTotalCount())
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
    dispatch(handleTotalCount());
  }

  const onClickRemoveItem = () => {
    if (window.confirm('Do you really not want this pizza?(((')) {
      dispatch(removeItem(id));
      dispatch(handleTotalCount());
    }
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type} dough, {size} см.</p>
      </div>
      <div className="cart__item-count">
        <div onClick={onClickMinus} className="button button--outline button--circle cart__item-count-minus">-</div>
        <b>{count}</b>
        <div onClick={onClickPlus} className="button button--outline button--circle cart__item-count-plus">+</div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div onClick={onClickRemoveItem} className="button button--outline button--circle">X</div>
      </div>
    </div>
  );
}

export default CartItem;
