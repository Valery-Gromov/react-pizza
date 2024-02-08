import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveSortOptionItem, FilterSliceState, OptionsNamesEnum } from "./types";

const initialState: FilterSliceState = {
    selectedCategory: 0,
    sortDirection: true,
    activeSortOption: {
      option: 'popularity',
      optionName: OptionsNamesEnum.RATING,
    },
    textFilter: '',
  };
  
  export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      setSelectedCategory(state, action: PayloadAction<number>) {
        state.selectedCategory = action.payload;
      },
      setSortDirection(state, action: PayloadAction<boolean>) {
        state.sortDirection = action.payload;
      },
      setActiveSortOption(state, action: PayloadAction<ActiveSortOptionItem>) {
        state.activeSortOption = action.payload;
      },
      setTextFilter(state, action: PayloadAction<string>) {
        state.textFilter = action.payload;
      },
      setFilter(state, action: PayloadAction<FilterSliceState>) {
        state.selectedCategory = Number(action.payload.selectedCategory);
        state.sortDirection = action.payload.sortDirection;
        state.activeSortOption = action.payload.activeSortOption;
        state.textFilter = action.payload.textFilter;
      },
    },
  });
  
  export const {
    setSelectedCategory,
    setSortDirection,
    setActiveSortOption,
    setTextFilter,
    setFilter,
  } = filterSlice.actions;
  
  export default filterSlice.reducer;