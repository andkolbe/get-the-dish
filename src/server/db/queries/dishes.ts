import { Query } from '../';
import { IDishes } from '../models/';

const all = () => Query<IDishes[]>('CALL spAllDishes()');
const one = (id: number) => Query<IDishes[][]>('CALL spOneDish(?)', [id]); // destructure IDishes down one more time because of the SP
const insert = (newDish: any) => Query('INSERT INTO dishes SET ?', newDish);
const update = (id: number, userid: number , editedDish: any) => Query('UPDATE dishes SET ? WHERE id = ? AND userid = ?', [editedDish, id, userid]);

// refactor this so only the user who is logged in with their token can delete their own posts
const destroy = (id: number, userid: number) => Query('DELETE FROM dishes WHERE id = ? AND userid = ?', [id, userid]);

// select all of the dishes that a user has posted
const forUser = (userid: number) => Query('SELECT dishes.*, users.username FROM dishes JOIN users ON users.id = dishes.userid WHERE userid = ?', [userid]);

// search for dishes by using a search term
// join the users table to be consistant with our all and one queries
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



