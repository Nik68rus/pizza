import { IPizza, IPizzaInput } from './../types/index';
import { api } from '.';

interface IPizzaPostResponse {
  payload: IPizza;
}

interface IPizzaGetResponse {
  payload: IPizza[];
}

export const createPizza = async (pizza: IPizzaInput) => {
  const { data } = await api.post<IPizzaPostResponse>('/pizza', pizza);
  return data.payload;
};

export const getPizzas = async () => {
  const { data } = await api.get<IPizzaGetResponse>('/pizza');
  return data.payload;
};
