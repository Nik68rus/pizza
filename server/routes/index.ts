import { Router } from 'express';
import pizzaRouter from './pizzaRouter';
import categoryRouter from './categoryRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/pizza', pizzaRouter);
router.use('/categories', categoryRouter);
router.use('/user', userRouter);

export default router;
