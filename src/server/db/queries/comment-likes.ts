import { Query } from '../';
import { ICommentLikes, IUsers } from '../models';

const getWhoLikes = (commentid: number) => Query<(ICommentLikes & IUsers)[]>('SELECT users.id, username FROM comment_likes JOIN users ON users.id = comment_likes.user_id WHERE comment_id = ?;', [commentid]);
const insert = (commentid: number, userid: number) => Query('INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)', [commentid, userid]);
const destroy = (commentid: number, userid: number) => Query('DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?', [commentid, userid]);

export default {
    getWhoLikes,
    insert,
    destroy
}