import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
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
    addItem(state, action) {
      const currentItem = state.items.find((item) => item.id === action.payload.id);

      if (currentItem) {
        currentItem.count++;
      } else {
        console.log('else');
        state.items.push(action.payload);
      }
    },
    minusItem(state, action) {
      const currentItem = state.items.find((item) => item.id === action.payload);

      if (currentItem.count > 1) {
        currentItem.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);

    },
    clearSort(state) {
      state.items = [];
    }
  },
});

export const { handleTotalCount, addItem, minusItem, removeItem, clearSort } = cartSlice.actions;

export default cartSlice.reducer;
