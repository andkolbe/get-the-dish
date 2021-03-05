import { Query } from '../';
import { IDishLikes, IUsers } from '../models';

const getWhoLikes = (dishid: number) => Query<(IDishLikes & IUsers)[]>('SELECT users.id, username FROM dish_likes JOIN users ON users.id = dish_likes.user_id WHERE dish_id = ?', [dishid]);
const insert = (dishid: number, userid: number) => Query('INSERT INTO dish_likes (dish_id, user_id) VALUE (?, ?)', [dishid, userid]);
const destroy = (dishid: number, userid: number) => Query('DELETE FROM dish_likes WHERE dish_id = ? AND user_id = ?', [dishid, userid]);


export default {
    getWhoLikes,
    insert,
    destroy
}