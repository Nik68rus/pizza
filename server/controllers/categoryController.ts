import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/error';
import { Category } from '../models';

interface CategoryRequest extends Request {
  body: {
    title: string;
  };
}

class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.findAll();
      return res.status(200).json({ payload: categories });
    } catch (error) {
      return next(
        ApiError.internal('Ошибка при работе с БД. Повторите позднее!')
      );
    }
  }

  async postCategory(req: CategoryRequest, res: Response, next: NextFunction) {
    const { title } = req.body;

    if (!title || title.trim().length < 3) {
      return next(
        ApiError.validation(
          'Название категории должно быть не короче трех символов!'
        )
      );
    }
    try {
      const existingCategory = await Category.findOne({ where: { title } });

      if (existingCategory) {
        return next(ApiError.badRequest('Введенная категория уже существует'));
      }

      const category = await Category.create({ title });

      return res.status(200).json({ payload: category });
    } catch (err) {
      return next(
        ApiError.internal('Ошибка при работе с БД. Повторите позднее!')
      );
    }
  }
}

export default new CategoryController();
