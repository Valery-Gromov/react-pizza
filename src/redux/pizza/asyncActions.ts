import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, SearchPizzaParams } from "./types";

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