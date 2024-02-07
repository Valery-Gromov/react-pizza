import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActiveSortOptionItem } from './filterSlice';

type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface pizzaSticeState {
  items: PizzaItem[];
  status: Status;
}

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  orderDirection: string;
  searchFilter: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { category, sortBy, orderDirection, searchFilter } = params;

    const { data } = await axios.get<PizzaItem[]>(
      `https://64fde7d0596493f7af7ec0c4.mockapi.io/pizzas?${category}&${sortBy}&${orderDirection}&${searchFilter}`,
    );

    return data;
  },
);

const initialState: pizzaSticeState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
