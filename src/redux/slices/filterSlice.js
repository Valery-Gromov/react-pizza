import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: 0,
  sortDirection: true,
  activeSortOption: {
    option: 'popularity',
    optionName: 'rating',
  },
  textFilter: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSortDirection(state, action) {
      state.sortDirection = action.payload;
    },
    setActiveSortOption(state, action) {
      state.activeSortOption = action.payload;
    },
    setTextFilter(state, action) {
      state.textFilter = action.payload;
    },
    setFilter(state, action) {
      state.selectedCategory = Number(action.payload.selectedCategory);
      state.sortDirection = action.payload.sortDirection;
      state.activeSortOption = action.payload.activeSortOption;
      state.textFilter = action.payload.textFilter;
    },
  },
});

export const { setSelectedCategory, setSortDirection, setActiveSortOption, setTextFilter, setFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
