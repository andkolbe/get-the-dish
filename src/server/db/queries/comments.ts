import { Query } from '../';
import { IComments } from '../models';

const all = () => Query<IComments[]>('SELECT comments.*, users.username, COUNT(comment_likes.comment_id) AS num_of_comment_likes FROM comments JOIN users ON users.id = comments.userid LEFT JOIN comment_likes ON comment_likes.comment_id = comments.id GROUP BY comments.id');
const one = (id: number) => Query<IComments[]>('SELECT comments.*, users.username, COUNT(comment_likes.comment_id) AS num_of_comment_likes FROM comments JOIN users ON users.id = comments.userid LEFT JOIN comment_likes ON comment_likes.comment_id = comments.id WHERE comments.id = ?', [id]);

// all of the comments for a single dish
const allForDish = (dishid: number) => Query('SELECT comments.*, users.username, users.avatar_url, COUNT(comment_likes.comment_id) AS num_of_comment_likes FROM comments JOIN users ON users.id = comments.userid LEFT JOIN comment_likes ON comment_likes.comment_id = comments.id WHERE dishid = ? ORDER BY comments.created_at ASC', [dishid])

// only someone who is logged in should be able to write a comment
const insert = (newComment: any) => Query('INSERT INTO comments SET ?', newComment);
const update = (id: number, userid: number , editedComment: any) => Query('UPDATE comments SET ? WHERE id = ? AND userid = ?', [editedComment, id, userid]);

const destroy = (id: number, userid: number) => Query('DELETE FROM comments WHERE id = ? AND userid = ?', [id, userid]);


export default {
    all,
    one,
    allForDish,
    insert,
    update,
    destroy
}