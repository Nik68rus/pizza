import { ICategory } from './../types/index';
import { api } from '.';

interface ICategoryPostResponse {
  payload: ICategory;
}

interface ICategoryGetResponse {
  payload: ICategory[];
}

export const createCategory = async (title: string) => {
  const { data } = await api.post<ICategoryPostResponse>('/categories', {
    title,
  });
  return data.payload;
};

export const getCategories = async () => {
  const { data } = await api.get<ICategoryGetResponse>('/categories');
  return data.payload;
};
