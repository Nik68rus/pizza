import { Router } from 'express';
import pizzaRouter from './pizzaRouter';
import categoryRouter from './categoryRouter';

const router = Router();

router.use('/pizza', pizzaRouter);
router.use('/categories', categoryRouter);

export default router;
