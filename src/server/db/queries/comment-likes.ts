import { Query } from '../';
import { CannedResponse } from '../models';

const oneCommentLike = (userid: number) => Query('SELECT comments.id, comments.comment FROM comment_likes JOIN comments ON comments.id = comment_likes.comment_id WHERE user_id = ?', [userid]);
const insert = (userid: number, commentid: number) => Query<CannedResponse>('INSERT INTO comment_likes (user_id, comment_id VALUES (?, ?)', [userid, commentid]);
const update = (newCommentID: number, oldCommentID: number, userid: number) => Query<CannedResponse>('UPDATE comment_likes SET comment_id WHERE user_id = ? and comment_id = ?', [newCommentID, userid, oldCommentID]);
const destroy = (userid: number) => Query<CannedResponse>('DELETE FROM comment_likes WHERE user_id = ?', [userid]);


export default {
    oneCommentLike,
    insert,
    update,
    destroy
}