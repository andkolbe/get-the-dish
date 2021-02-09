import * as React from 'react';
import { Link } from 'react-router-dom';
import { IDishes } from '../utils/Types';

const UserDishCard: React.FC<UserDishCardProps> = ({ dish }) => {

    return (
        <div className='col-md-4 my-3'>
            <article className='card shadow'>
                <img className='w-100' src={dish.image_url} alt='image' />
                <div className='card-body'>
                    <h2>{dish.username}</h2>
                    <h4 className='card-title'>{dish.name}</h4>
                    <p className='card-text'>{dish.description.substring(0, 125)}</p>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/details/${dish.id}`}>More Info</Link>
                        <Link className='btn btn-primary' to={`/admin/${dish.id}`}>Edit/Delete</Link>
                    </div>
                </div>
            </article>
        </div>
    );
}

interface UserDishCardProps {
    dish: IDishes
}

export default UserDishCard;