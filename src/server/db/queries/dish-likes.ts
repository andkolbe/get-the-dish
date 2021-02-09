import { Query } from '../';
import { CannedResponse } from '../models';

const oneDishLike = (userid: number) => Query('SELECT dishes.id, dishes.name, dishes.description FROM dish_likes JOIN dishes ON dishes.id = dish_likes.dish_id WHERE user_id = ?', [userid]);
const insert = (dishid: number, userid: number) => Query<CannedResponse>('INSERT INTO dish_likes (user_id, dish_id VALUES (?, ?)', [userid, dishid]);
const update = (newDishID: number, oldDishID: number, userid: number) => Query<CannedResponse>('UPDATE dish_likes SET dish_id WHERE user_id = ? and comment_id = ?', [newDishID, userid, oldDishID]);
const destroy = (userid: number) => Query<CannedResponse>('DELETE FROM dish_likes WHERE user_id = ?', [userid]);


export default {
    oneDishLike,
    insert,
    update,
    destroy
}