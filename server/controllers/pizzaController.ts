import { Request, Response, NextFunction } from 'express';

class PizzaController {
  async getPizzas(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'Тут будут все пиццы' });
  }

  async postPizza(req: Request, res: Response, next: NextFunction) {}
}

export default new PizzaController();
