import { SortingOrder } from '../types/index';
import { ICategory, ISorting } from './../types/index';

export const PIZZA_MIN_WIDTH = 300;

export const ALL_CAT: ICategory = {
  title: 'Все',
  id: 0,
};

export const SORTINGS: ISorting[] = [
  {
    id: 0,
    title: 'популярности ⬆️',
    property: 'rating',
    order: SortingOrder.DESC,
  },
  {
    id: 1,
    title: 'популярности ⬇️',
    property: 'rating',
    order: SortingOrder.ASC,
  },
  { id: 2, title: 'цене ⬇️', property: 'price', order: SortingOrder.ASC },
  { id: 3, title: 'цене ⬆️', property: 'price', order: SortingOrder.DESC },
  { id: 4, title: 'алфавиту ⬇️', property: 'title', order: SortingOrder.ASC },
  { id: 5, title: 'алфавиту ⬆️', property: 'title', order: SortingOrder.DESC },
];
