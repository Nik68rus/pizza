export interface IPizzaInput {
  title: string;
  imageUrl: string;
  categoryId: number | null;
  sizes: number[];
  bases: string[];
  price: number;
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
