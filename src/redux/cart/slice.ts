import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItemType, CartSliceState } from "./types";

const initialState: CartSliceState = {
    items: getCartFromLS().data,
    totalPrice: getCartFromLS().totalPrice,
    totalCount: getCartFromLS().totalCount,
  };

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      handleTotalCount(state) {
        state.totalPrice = state.items.reduce((sum, obj) => {
          return sum + obj.price * Number(obj.count);
        }, 0);
  
        state.totalCount = state.items.reduce((sum, obj) => {
          return obj.count + sum;
        }, 0);
      },
      addItem(state, action: PayloadAction<CartItemType>) {
        const currentItem = state.items.find((item) => item.id === action.payload.id);
  
        if (currentItem) {
          currentItem.count++;
        } else {
          console.log('else');
          state.items.push(action.payload);
        }
      },
      minusItem(state, action: PayloadAction<number>) {
        const currentItem = state.items.find((item) => item.id === action.payload);
  
        if (currentItem && currentItem.count > 1) {
          currentItem.count--;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      },
      removeItem(state, action: PayloadAction<number>) {
        state.items = state.items.filter((item) => item.id !== action.payload);
  
      },
      clearSort(state) {
        state.items = [];
      }
    },
  });
  
  export const { handleTotalCount, addItem, minusItem, removeItem, clearSort } = cartSlice.actions;
  
  export default cartSlice.reducer;