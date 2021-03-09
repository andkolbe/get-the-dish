import { Query } from '../';
import { IUsers } from '../models/';

const all = () => Query<IUsers[]>('SELECT * FROM users');
const one = (id: number) => Query<IUsers[]>('SELECT * FROM users WHERE id = ?', [id]);
const insert = (newUser: any) => Query('INSERT INTO users SET ?', newUser);
const update = (id: number, editedUser: any) => Query('UPDATE users SET ? WHERE id = ?', [editedUser, id]);
const destroy = (id: number) => Query('DELETE FROM users WHERE id = ?', [id]);
const find = (column: string, value: string | number) => Query<IUsers[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);

// We want to set the used value update token to 1, meaning it cannot be used anymore
const updateToken = (used: number, updated_at: Date, email: string) => Query('UPDATE reset_token SET used = 1, updated_at = ? WHERE email = ?' , [used, email]);
const createToken = (email: string, expiration: Date, token: string, used: number) => Query('INSERT INTO reset_token (email, expiration, token, used) VALUE (?, ?, ?, ?) ', [email, expiration, token, used]);

export default {
    all,
    one,
    insert,
    update,
    destroy,
    find,
    updateToken,
    createToken
}