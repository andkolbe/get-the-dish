import { Query } from '../';
import { IDishes, CannedResponse } from '../models/';

const all = () => Query<IDishes[]>('SELECT dishes.*, users.username, users.avatar_url FROM dishes JOIN users ON users.id = dishes.userid ORDER BY dishes.created_at DESC');
const one = (id: number) => Query<IDishes[]>('SELECT dishes.*, users.username, users.avatar_url FROM dishes JOIN users ON users.id = dishes.userid WHERE dishes.id = ?', [id]);
const insert = (newDish: any) => Query<CannedResponse>('INSERT INTO dishes SET ?', newDish);
const update = (id: number, editedDish: any) => Query<CannedResponse>('UPDATE dishes SET ? WHERE id = ?', [editedDish, id]);
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM dishes WHERE id = ?', [id]);
const forUser = (userid: number) => Query('SELECT dishes.*, users.username FROM dishes JOIN users ON users.id = dishes.userid WHERE userid = ?', [userid]);

export default {
    all,
    one,
    insert,
    update,
    destroy,
    forUser
}
