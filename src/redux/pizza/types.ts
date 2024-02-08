export type PizzaItem = {
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

export interface pizzaSticeState {
  items: PizzaItem[];
  status: Status;
}

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  orderDirection: string;
  searchFilter: string;
};
