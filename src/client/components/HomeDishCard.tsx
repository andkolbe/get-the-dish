import * as moment from 'moment';
import * as React from 'react';
import Like from './icons/Like';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IDishes } from '../utils/Types';
import api, { TOKEN_KEY } from '../utils/Api-service';

const DishCard: React.FC<DishCardProps> = ({ dish }) => {

    const history = useHistory();

    const [likes, setLikes] = useState(dish.num_of_dish_likes);

    const handleAddLike = async () => {

        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            alert('Log In') // use a toast instead
            return;
        }

        /*
            toggle like on and off

            if(has_liked === 1) {
                remove the like // DELETE request
            } else {
                add the like
            }
        */

        const liked = await api(`/api/dish-likes/${dish.id}`, 'POST');
        if (liked.affectedRows === 1) setLikes(likes + 1); // only display a like change when the affectedRows = 1. State changes mean DOM updates
    }

    return (
        <div className=' col-md-10 my-3'>
            <article className='card shadow'>
                <div className='d-flex pl-3 py-3'>
                    <img className='h-auto w-25 rounded-circle avatar_img mr-2' src={dish.avatar_url} />
                    <h5 className='align-self-center'>{dish.username}</h5>
                </div>
                <img onClick={() => history.push(`/details/${dish.id}`)} className='w-100' role='button' src={dish.image_url} alt='image' />
                <div className='card-body'>
                    <h3 className='card-title font-weight-bold'>{dish.name}</h3>
                    <h5 className='card-text mb-4'>{dish.description.substring(0, 125)}</h5>
                    <div className='d-flex justify-content-between'>
                        <p className='card-text'>{dish.num_of_comments} comment{dish.num_of_comments === 1 ? '' : 's'}</p>
                        <p className='card-text d-flex align-items-center justify-content-end'>
                            <span role='button' onClick={handleAddLike} className=''>
                                <Like className='mr-2' height='35' width='35' fill={`${likes ? '#68C4DE' : 'none'}`} />
                            </span>
                            {likes}
                        </p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <small className='card-text text-secondary'>{moment(dish.created_at).format('ll')}</small>
                        <Link className='text-decoration-none h4' to={`/details/${dish.id}`}>More Info</Link>
                    </div>
                </div>
            </article>
        </div>
    );
}

interface DishCardProps {
    dish: IDishes
}

export default DishCard;