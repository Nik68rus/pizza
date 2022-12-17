export enum SortType {
  POPULAR = 'популярности',
  PRICE = 'цене',
  ALPHABET = 'алфавиту',
}

export enum FilterType {
  ALL = 'Все',
  MEAT = 'Мясные',
  VEGY = 'Вегетарианские',
  GRILL = 'Гриль',
  SPICY = 'Острые',
  COVERED = 'Закрытые',
}

export enum TypeName {
  THIN = 'тонкое',
  TRADITION = 'традиционное',
}

export type TType = 0 | 1;

export interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  types: TType[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
