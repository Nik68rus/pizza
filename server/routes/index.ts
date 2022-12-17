import { Router } from 'express';
import pizzaRouter from './pizzaRouter';

const router = Router();

router.use('/pizza', pizzaRouter);

export default router;
