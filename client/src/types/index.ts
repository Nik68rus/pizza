export interface IPizzaInput {
  title: string;
  imageUrl: string;
  categoryId: number | null;
  sizes: number[];
  bases: string[];
  price: number;
}

export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc',
}
export interface ISorting {
  id: number;
  title: string;
  property: string;
  order: SortingOrder;
}

export interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  bases: string[];
  sizes: number[];
  price: number;
  categoryId: number;
  rating: number;
}

export interface ICategory {
  id: number;
  title: string;
}

export interface IToCartItem {
  id: string;
  imageUrl: string;
  title: string;
  base: string;
  size: number;
  price: number;
}

export interface IInCartItem extends IToCartItem {
  qty: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface PizzaFetchParams {
  categoryId: number;
  sortingProperty: string;
  sortingOrder: SortingOrder;
  searchTerm: string;
  page: number;
  limit: number;
}
