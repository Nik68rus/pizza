import { IPizza, IPizzaInput, TSortingOrder } from './../types/index';
import { api } from '.';

interface IPizzaPostResponse {
  payload: IPizza;
}

interface IPizzaGetResponse {
  payload: { count: number; rows: IPizza[] };
}

export const createPizza = async (pizza: IPizzaInput) => {
  const { data } = await api.post<IPizzaPostResponse>('/pizza', pizza);
  return data.payload;
};

export const getPizzas = async (
  categoryId: number,
  sortingProperty: string,
  sortingOrder: TSortingOrder,
  searchTerm: string,
  page: number,
  limit: number
) => {
  const { data } = await api.get<IPizzaGetResponse>('/pizza', {
    params: {
      sortBy: sortingProperty,
      categoryId,
      order: sortingOrder,
      search: searchTerm,
      page,
      limit,
    },
  });
  return data.payload;
};
