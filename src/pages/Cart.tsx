import React from 'react';
import CartItem from '../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearSort, handleTotalCount } from '../redux/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalCount } = useSelector((state: any) => state.cart);

  const onClickClear = () => {
    if (window.confirm('Ты действительно передумал кушать питсу?(((')) {
      dispatch(clearSort());
      dispatch(handleTotalCount());
    }
  };

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title"> Cart</h2>
        <div onClick={onClickClear} className="cart__clear">
          <span>Empty the cart</span>
        </div>
      </div>
      <div className="content__items">
        {items.map((item: any) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Total pizzas: <b>{totalCount} шт.</b>{' '}
          </span>
          <span>
            Order amount: <b>{totalPrice} ₽</b>{' '}
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <a href="/" className="button button--outline button--add go-back-btn">
            <span>Go back</span>
          </a>
          <div className="button pay-btn">
            <span>Pay now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
