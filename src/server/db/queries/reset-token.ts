import { Query } from '../';
import { IToken } from '../models';

// We want to set the used value update token to 1, meaning it cannot be used anymore
const createToken = (email: string, expiration: Date, token: string, used: number) => Query('INSERT INTO reset_token (email, expiration, token, used) VALUE (?, ?, ?, ?) ', [email, expiration, token, used]);
const updateToken = (used: number, updated_at: Date, email: string) => Query('UPDATE reset_token SET used = 1, updated_at = ? WHERE email = ?' , [used, email]);
const destroyToken = (expiration: Date) => Query('DELETE FROM reset_token WHERE expiration = ?', [expiration]);
const findToken = (column: string, value: any) => Query<IToken[]>('SELECT * FROM reset_token WHERE ?? = ?', [column, value]);

export default {
    createToken,
    updateToken,
    destroyToken,
    findToken
}