import { Router } from 'express';
import categoriesRouter from './categories';
import contactRouter from './contact';
import dishCategoriesRouter from './dish-categories';
import dishesRouter from './dishes';
import donateRouter from './donate';
import restaurantsRouter from './restaurants';
import usersRouter from './users';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/contact', contactRouter);
router.use('/dish-categories', dishCategoriesRouter);
router.use('/dishes', dishesRouter);
router.use('/donate', donateRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/users', usersRouter);

export default router;