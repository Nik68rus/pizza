export enum TypeNames {
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
