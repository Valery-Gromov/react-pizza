export type CartItemType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
}

