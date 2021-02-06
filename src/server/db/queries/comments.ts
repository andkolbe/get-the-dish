import { Query } from '../';

const all = () => Query('SELECT * FROM comments ORDER BY created_at DESC');
const one = (id: number) => Query('SELECT * FROM comments WHERE id = ? ORDER BY created_at DESC', [id]);
const allForDish = (dishid: number) => Query('SELECT * FROM comments WHERE dishid = ?', [dishid])
const insert = (newComment: any) => Query('INSERT INTO comments SET ?', newComment);
const update = (id: number, editedComment: any) => Query('UPDATE comments SET ? WHERE id = ?', [editedComment, id]);
const destroy = (id: number) => Query('DELETE FROM comments WHERE id = ?', [id]);

export default {
    all,
    one,
    allForDish,
    insert,
    update,
    destroy
}