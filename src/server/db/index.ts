import * as mysql from 'mysql';
import config from '../config';
import { CannedResponse } from './models';
import categories from './queries/categories'
import commentLikes from './queries/comment-likes';
import comments from './queries/comments';
import dishCategories from './queries/dish-categories'
import dishLikes from './queries/dish-likes';
import dishes from './queries/dishes';
import resetToken from './queries/reset-token'
import restaurants from './queries/restaurants'
import users from './queries/users'

const pool = mysql.createPool(config.mysql);

export const Query = <T = CannedResponse>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        const sql = mysql.format(query, values);
        // console.log(sql);

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
    resetToken,
    restaurants,
    users
}