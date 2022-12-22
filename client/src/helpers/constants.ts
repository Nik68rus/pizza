import { ICategory, ISorting } from './../types/index';

export const PIZZA_MIN_WIDTH = 300;

export const ALL_CAT: ICategory = {
  title: 'Все',
  id: 0,
};

export const SORTINGS: ISorting[] = [
  { id: 0, title: 'популярности ⬆️', property: 'rating', order: 'desc' },
  { id: 1, title: 'популярности ⬇️', property: 'rating', order: 'asc' },
  { id: 2, title: 'цене ⬇️', property: 'price', order: 'asc' },
  { id: 3, title: 'цене ⬆️', property: 'price', order: 'desc' },
  { id: 4, title: 'алфавиту ⬇️', property: 'title', order: 'asc' },
  { id: 5, title: 'алфавиту ⬆️', property: 'title', order: 'desc' },
];
