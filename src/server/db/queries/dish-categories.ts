import { Query } from '../';
import { CannedResponse } from '../models/';

const oneDishCategory = (dishid: number) => Query('CALL spDishCategories(?)', [dishid]);
const insert = (dishid: number, categoryid: number) => Query<CannedResponse>('INSERT INTO dish_categories (dish_id, category_id) VALUES (?, ?)', [dishid, categoryid]);
const update = (newCategoryid: number, oldCategoryid: number, dishid: number) => Query<CannedResponse>('UPDATE dish_categories SET category_id = ? WHERE dish_id = ? AND category_id = ?', [newCategoryid, dishid, oldCategoryid]);
const destroy = (dishid: number) => Query<CannedResponse>('DELETE FROM dish_categories WHERE dish_id = ?', [dishid]);

export default {
    oneDishCategory,
    insert,
    update,
    destroy
}