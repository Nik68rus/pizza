import { Op } from 'sequelize';
import { Pizza } from './../models/index';
import { IPizzaInput } from './../../client/src/types/index';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/error';

interface PostPizzaRequest extends Request {
  body: IPizzaInput;
}

interface GetPizzaRequest extends Request {
  query: {
    sortBy?: string;
    order?: string;
    categoryId?: string;
    search?: string;
    page?: string;
    limit?: string;
  };
}

const sortProperties = ['title', 'price', 'categoryId', 'rating'];
const sortingOrders = ['asc', 'desc'];

class PizzaController {
  async getPizzas(req: Request, res: Response, next: NextFunction) {
    try {
      const { sortBy, order, categoryId, search, page, limit } = req.query;

      let filteringCategory = 0;

      if (categoryId && !isNaN(+categoryId)) {
        filteringCategory = +categoryId;
      }

      let sortingProperty = 'rating';

      if (
        sortBy &&
        sortProperties.some((property) => property === sortBy.toString())
      ) {
        sortingProperty = sortBy.toString();
      }

      let sortingOrder = 'asc';

      if (order && sortingOrders.some((or) => or === order)) {
        sortingOrder = order.toString();
      }

      let searchTerm = '';

      if (search && search.toString().trim().length >= 3) {
        searchTerm = search.toString().trim();
      }

      const searchParams: any = {
        title: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      };

      if (filteringCategory !== 0) {
        searchParams.categoryId = filteringCategory;
      }

      let currentPage = 1;

      if (page && !isNaN(+page)) {
        currentPage = +page;
      }

      let currentLimit = 6;
      if (limit && !isNaN(+currentLimit)) {
        currentLimit = +limit;
      }

      const items = await Pizza.findAndCountAll({
        where: searchParams,
        order: [[sortingProperty, sortingOrder.toUpperCase()]],
        offset: (currentPage - 1) * currentLimit,
        limit: currentLimit,
      });

      return res.status(200).json({ payload: items });
    } catch (error) {
      return next(
        ApiError.internal('Ошибка при работе с БД. Повторите позднее!')
      );
    }
  }

  async postPizza(req: PostPizzaRequest, res: Response, next: NextFunction) {
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
