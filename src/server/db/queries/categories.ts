import { Query } from '../';
import { ICategories, CannedResponse } from '../models/';

const all = () => Query<ICategories[]>('SELECT * FROM categories');
const insert = (id: number) => Query<CannedResponse>('SELECT * FROM categories WHERE id = ?', [id]);
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM categories WHERE id = ?', [id]);

export default {
    all,
    insert,
    destroy
}