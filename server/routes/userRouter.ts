import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/signup', userController.postSignup);
router.post('/login', userController.postLogin);
router.post('/logout', userController.postLogout);
router.get('/activate/:link', userController.getActivate);
router.get('/refresh', userController.getRefresh);
router.get('/list', userController.getUsers);

export default router;
