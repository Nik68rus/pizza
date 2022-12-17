import { Router } from 'express';
import pizzaController from '../controllers/pizzaController';

const router = Router();

router.get('/', pizzaController.getPizzas);
router.post('/', pizzaController.postPizza);

export default router;
