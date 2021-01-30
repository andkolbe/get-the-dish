import { Query } from '../';
import { IDishes, CannedResponse } from '../models/';

const all = () => Query<IDishes[]>('SELECT * FROM dishes ORDER BY created_at DESC');
const one = (id: number) => Query<IDishes[]>('SELECT * FROM dishes WHERE id = ?', [id]);
const insert = (newDish: any) => Query<CannedResponse>('INSERT INTO dishes SET ?', newDish);
const update = (id: number, editedDish: any) => Query<CannedResponse>('UPDATE dishes SET ? WHERE id = ?', [editedDish, id]);
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM dishes WHERE id = ?', [id]);

export default {
    all,
    one,
    insert,
    update,
    destroy
}