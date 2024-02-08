export enum OptionsNamesEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type ActiveSortOptionItem = {
  option: string;
  optionName: OptionsNamesEnum;
};

export interface FilterSliceState {
  selectedCategory: number;
  sortDirection: boolean;
  activeSortOption: ActiveSortOptionItem;
  textFilter: string;
}
