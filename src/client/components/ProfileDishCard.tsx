import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IDishes } from '../utils/Types';

const UserDishCard: React.FC<UserDishCardProps> = ({ dish }) => {

    const history = useHistory();

    return (
        <div className='col-md-4 my-3'>
            <article className='card shadow'>
                <img onClick={() => history.push(`/details/${dish.id}`)} className='w-100' role='button' src={dish.image_url} alt='image' />
                <div className='card-body'>
                    <h4 className='card-title'>{dish.name}</h4>
                    <p className='card-text'>{dish.description.substring(0, 125)}</p>
                    <div className='d-flex flex-column'>
                        <Link className='align-items-start text-decoration-none' to={`/details/${dish.id}`}>More Info</Link>
                        <Link className='btn btn-primary btn-shadow align-items-end mt-3' to={`/admin/${dish.id}`}>Edit/Delete</Link>
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