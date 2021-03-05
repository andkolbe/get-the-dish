import { Router } from 'express';
import categoriesRouter from './categories';
import commentsRouter from './comments';
import contactRouter from './contact';
import dishCategoriesRouter from './dish-categories';
import dishesRouter from './dishes';
import dishLikes from './dish-likes';
import donateRouter from './donate';
import restaurantsRouter from './restaurants';
import usersRouter from './users';
import yelpRouter from './yelp';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/comments', commentsRouter);
router.use('/contact', contactRouter);
router.use('/dish-categories', dishCategoriesRouter);
router.use('/dishes', dishesRouter);
router.use('/dish-likes', dishLikes);
router.use('/donate', donateRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/users', usersRouter);
router.use('/yelp', yelpRouter);

export default router;