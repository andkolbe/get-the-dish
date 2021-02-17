import { Query } from '../';
import { CannedResponse } from '../models';

const all = () => Query('SELECT comments.*, users.username FROM comments JOIN users ON users.id = comments.userid');
const one = (id: number) => Query('SELECT comments.*, users.username FROM comments JOIN users ON users.id = comments.userid WHERE comments.id = ?', [id]);

// all of the comments for a single dish
const allForDish = (dishid: number) => Query('SELECT comments.*, users.username, users.avatar_url FROM comments JOIN users ON users.id = comments.userid WHERE dishid = ? ORDER BY comments.created_at ASC', [dishid])

// only someone who is logged in should be able to write a comment
const insert = (newComment: any) => Query<CannedResponse>('INSERT INTO comments SET ?', newComment);
const update = (id: number, userid: number , editedComment: any) => Query<CannedResponse>('UPDATE comments SET ? WHERE id = ? AND userid = ?', [editedComment, id, userid]);

const destroy = (id: number, userid: number) => Query<CannedResponse>('DELETE FROM comments WHERE id = ? AND userid = ?', [id, userid]);


export default {
    all,
    one,
    allForDish,
    insert,
    update,
    destroy
}