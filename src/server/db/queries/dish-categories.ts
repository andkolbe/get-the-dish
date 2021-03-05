import { Query } from '../';

const oneDishCategory = (dishid: number) => Query('SELECT categories.id, categories.name FROM dish_categories JOIN categories ON categories.id = dish_categories.category_id WHERE dish_id = ?', [dishid]);
const insert = (dishid: number, categoryid: number) => Query('INSERT INTO dish_categories (dish_id, category_id) VALUES (?, ?)', [dishid, categoryid]);

// we only want to update the category. not the dish the category is attached to
const update = (newCategoryID: number, oldCategoryID: number, dishid: number) => Query('UPDATE dish_categories SET category_id = ? WHERE dish_id = ? AND category_id = ?', [newCategoryID, dishid, oldCategoryID]);

const destroy = (dishid: number) => Query('DELETE FROM dish_categories WHERE dish_id = ?', [dishid]);

export default {
    oneDishCategory,
    insert,
    update,
    destroy
}