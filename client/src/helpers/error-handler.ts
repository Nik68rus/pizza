import { toast, Id } from 'react-toastify';
import { AxiosError } from 'axios';

const defaultError = 'Что-то пошло не так! Попробуйте позже!';

export const handleError = (error: any, id?: Id) => {
  if (!id) {
    id = new Date().toISOString();
  }
  if (!toast.isActive(id)) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || defaultError, {
        toastId: id,
        autoClose: 2000,
      });
    } else if (error instanceof Error) {
      toast.error(error.message || defaultError, {
        toastId: id,
        autoClose: 2000,
      });
    } else if (typeof error === 'string') {
      toast.error(error || defaultError, {
        toastId: id,
        autoClose: 2000,
      });
    } else {
      toast.error(defaultError, { toastId: id, autoClose: 2000 });
    }
  }
};
