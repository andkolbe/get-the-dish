import { Query } from '../';
import { IDishes, CannedResponse } from '../models/';

const all = () => Query<IDishes[]>('SELECT dishes.*, users.username, users.avatar_url, COUNT(comments.id) AS num_of_comments FROM dishes JOIN users ON users.id = dishes.userid LEFT JOIN comments ON comments.dishid = dishes.id GROUP BY dishes.id ORDER BY dishes.created_at DESC;');
const one = (id: number) => Query<IDishes[]>('SELECT dishes.*, users.username, users.avatar_url FROM dishes JOIN users ON users.id = dishes.userid WHERE dishes.id = ?', [id]);
const insert = (newDish: any) => Query<CannedResponse>('INSERT INTO dishes SET ?', newDish);
const update = (id: number, userid: number , editedDish: any) => Query<CannedResponse>('UPDATE dishes SET ? WHERE id = ? AND userid = ?', [editedDish, id, userid]);

// refactor this so only the user who is logged in with their token can delete their own posts
const destroy = (id: number, userid: number) => Query<CannedResponse>('DELETE FROM dishes WHERE id = ? AND userid = ?', [id, userid]);

// select all of the dishes that a user has posted
const forUser = (userid: number) => Query('SELECT dishes.*, users.username FROM dishes JOIN users ON users.id = dishes.userid WHERE userid = ?', [userid]);

// search for dishes by using a search term
const search = (term: string) => Query('SELECT dishes.*, users.username, users.avatar_url FROM dishes JOIN users ON users.id = dishes.userid WHERE dishes.name LIKE ?', [`%${term}%`])

export default {
    all,
    one,
    insert,
    update,
    destroy,
    forUser,
    search
}



