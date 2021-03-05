import { Query } from '../';
import { IRestaurants } from '../models/';

const all = () => Query<IRestaurants[]>('SELECT * FROM restaurants');
const one = (id: number) => Query<IRestaurants[]>('SELECT * FROM restaurants WHERE id = ?', [id]);
const insert = (newRestaurant: any) => Query('INSERT INTO restaurants SET ?', newRestaurant);
const update = (id: number, editedRestaurant: any) => Query('UPDATE restaurants SET ? WHERE id = ?', [editedRestaurant, id]);
const destroy = (id: number) => Query('DELETE FROM restaurants WHERE id = ?', [id]);

export default {
    all,
    one,
    insert,
    update,
    destroy
}