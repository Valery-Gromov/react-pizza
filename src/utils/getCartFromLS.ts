import { CartItemType } from '../redux/cart/types';

export const getCartFromLS = () => {
  const json = localStorage.getItem('cart');

  const data: CartItemType[] = json ? JSON.parse(json) : [];

  const totalPrice = data.reduce((sum, obj) => {
    return sum + obj.price * Number(obj.count);
  }, 0);

  const totalCount = data.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);

  console.log(data);

  return { data, totalPrice, totalCount };
};
