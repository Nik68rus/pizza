import { Router } from 'express';
import categoryController from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.postCategory);

export default router;
