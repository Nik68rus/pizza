import { Router } from 'express';
import pizzaController from '../controllers/pizzaController';

const router = Router();

router.get('/', pizzaController.getPizzas);
router.get('/:pizzaId', pizzaController.getPizzaById);
router.post('/', pizzaController.postPizza);

export default router;
