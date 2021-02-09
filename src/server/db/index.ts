import * as mysql from 'mysql';
import config from '../config';
import categories from './queries/categories'
import commentLikes from './queries/comment-likes';
import comments from './queries/comments';
import dishCategories from './queries/dish-categories'
import dishLikes from './queries/dish-likes';
import dishes from './queries/dishes'
import restaurants from './queries/restaurants'
import users from './queries/users'

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        const sql = mysql.format(query, values);
        console.log(sql);

        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

export default {
    categories,
    commentLikes,
    comments,
    dishCategories,
    dishLikes,
    dishes,
    restaurants,
    users
}