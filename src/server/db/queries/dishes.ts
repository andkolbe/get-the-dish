import { Query } from '../';
import { IDishes } from '../models/';

const all = () => Query<IDishes[]>('CALL spAllDishes()');
const one = (id: number) => Query<IDishes[]>('SELECT dishes.*, users.username, users.avatar_url, restaurants.name AS restaurant_name, restaurants.address, restaurants.city, restaurants.state, restaurants.phone, restaurants.price, COUNT(comments.id) AS num_of_comments, COALESCE(lc.likes_count, 0) AS num_of_dish_likes FROM dishes JOIN users ON users.id = dishes.userid JOIN restaurants ON restaurants.dishid = dishes.id LEFT JOIN comments ON comments.dishid = dishes.id LEFT JOIN (SELECT dish_id, COUNT(*) AS likes_count FROM dish_likes GROUP BY dish_likes.dish_id) lc ON lc.dish_id = dishes.id WHERE dishes.id = dish_id;', [id]);
const insert = (newDish: any) => Query('INSERT INTO dishes SET ?', newDish);
const update = (id: number, userid: number , editedDish: any) => Query('UPDATE dishes SET ? WHERE id = ? AND userid = ?', [editedDish, id, userid]);

// refactor this so only the user who is logged in with their token can delete their own posts
const destroy = (id: number, userid: number) => Query('DELETE FROM dishes WHERE id = ? AND userid = ?', [id, userid]);

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



