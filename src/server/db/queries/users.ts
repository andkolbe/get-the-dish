import { Query } from '../';
import { IUsers, CannedResponse } from '../models/';

const all = () => Query<IUsers[]>('SELECT * FROM users');
const one = (id: number) => Query<IUsers[]>('SELECT * FROM users WHERE id = ?', [id]);
const insert = (newUser: any) => Query<CannedResponse>('INSERT INTO users SET ?', newUser);
const update = (id: number, editedUser: any) => Query<CannedResponse>('UPDATE users SET ? WHERE id = ?', [editedUser, id]);
const destroy = (id: number) => Query<CannedResponse>('DELETE FROM users WHERE id = ?', [id]);
const find = (column: string, value: string | number) => Query<IUsers[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);

export default {
    all,
    one,
    insert,
    update,
    destroy,
    find
}