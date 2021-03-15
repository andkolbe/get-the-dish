import { Query } from '../';
import { IToken } from '../models';

// We want to set the used value update token to 1, meaning it cannot be used anymore
const createToken = (userid: number, email: string, expiration: Date, token: string, used: number) => Query('INSERT INTO reset_token (user_id, email, expiration, token, used) VALUE (?, ?, ?, ?) ', [userid, email, expiration, token, used]);
const updateToken = (email: string) => Query('UPDATE reset_token SET used = 1, updated_at = CURTIME() WHERE email = ?' , [email]);
const destroyToken = () => Query('DELETE FROM reset_token WHERE expiration < CURTIME()'); // this will delete all expired tokens
const findToken = (column: string, value: any) => Query<IToken[]>('SELECT * FROM reset_token WHERE ?? = ?', [column, value]); 
const validateToken = (token: string, email: string) => Query<IToken[]>('SELECT * FROM reset_token WHERE token = ? AND email = ?', [token, email])

export default {
    createToken,
    updateToken,
    destroyToken,
    findToken,
    validateToken
}