import { Query } from '../';
import { IDishCategories, CannedResponse } from '../models/';

const all = () => Query<IDishCategories[]>('SELECT * from dish-categories');
const one = (id: number) => Query<IDishCategories[]>('SELECT * from dish-categories WHERE id =?', [id]);
const insert = (newDishCategory: any) => Query<CannedResponse>('INSERT INTO dish-categoires SET ?', newDishCategory);
const update = (id: number, editedDishCategory: any) => Query<CannedResponse>('UPDATE dish-categories SET ? WHERE id = ?', [editedDishCategory, id]);
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM dish-categories WHERE id = ?', [id]);

export default {
    all,
    one,
    insert,
    update,
    destroy
}