import { Query } from '../';
import { ICategories } from '../models/';

const all = () => Query<ICategories[]>('SELECT * FROM categories');
const insert = (id: number) => Query('SELECT * FROM categories WHERE id = ?', [id]);
const destroy = (id: number) => Query('DELETE FROM categories WHERE id = ?', [id]);

export default {
    all,
    insert,
    destroy
}