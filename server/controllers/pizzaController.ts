import { Pizza } from './../models/index';
import { IPizzaInput } from './../../client/src/types/index';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/error';

interface PostPizzaRequest extends Request {
  body: IPizzaInput;
}

class PizzaController {
  async getPizzas(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await Pizza.findAll();
      return res.status(200).json({ payload: items });
    } catch (error) {
      return next(
        ApiError.internal('Ошибка при работе с БД. Повторите позднее!')
      );
    }
  }

  async postPizza(req: PostPizzaRequest, res: Response, next: NextFunction) {
    console.log(req.body);
    const { title, imageUrl, categoryId, sizes, bases, price } = req.body;

    if (
      title.trim().length < 3 ||
      imageUrl.trim().length < 5 ||
      !categoryId ||
      !sizes.length ||
      !bases.length ||
      price < 10
    ) {
      return next(ApiError.validation('Недопустимые характеристики пиццы!'));
    }

    try {
      const pizza = await Pizza.create({
        title,
        imageUrl,
        categoryId,
        sizes,
        bases,
        price,
      });
      return res.status(201).json({ payload: pizza });
    } catch (error) {
      return next(
        ApiError.internal('Ошибка при работе с БД. Повторите позднее!')
      );
    }
  }
}

export default new PizzaController();
