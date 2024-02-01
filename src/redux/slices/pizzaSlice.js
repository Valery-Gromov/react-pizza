import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
  const { category, sortBy, orderDirection, searchFilter } = params;

  const { data } = await axios.get(
    `https://64fde7d0596493f7af7ec0c4.mockapi.io/pizzas?${category}&${sortBy}&${orderDirection}&${searchFilter}`,
  );

  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
