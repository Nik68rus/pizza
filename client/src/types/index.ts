export interface IPizzaInput {
  title: string;
  imageUrl: string;
  categoryId: number | null;
  sizes: number[];
  bases: string[];
  price: number;
}

export type TSortingOrder = 'asc' | 'desc';
export interface ISorting {
  id: number;
  title: string;
  property: string;
  order: TSortingOrder;
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

export type TStatus = 'loading' | 'success' | 'failed';

export interface PizzaFetchParams {
  categoryId: number;
  sortingProperty: string;
  sortingOrder: TSortingOrder;
  searchTerm: string;
  page: number;
  limit: number;
}
