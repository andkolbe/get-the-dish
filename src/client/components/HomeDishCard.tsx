import * as moment from 'moment';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IDishes } from '../utils/Types';
import { AiOutlineLike } from 'react-icons/ai'

const DishCard: React.FC<DishCardProps> = ({ dish }) => {

    const history = useHistory();

    return (
        <div className='col-md-10 my-3'>
            <article className='card shadow'>
                <div className='d-flex pl-3 py-3'>
                    <img className='h-auto w-25 rounded-circle avatar_img mr-2' src={dish.avatar_url} />
                    <h5 className='align-self-center'>{dish.username}</h5>
                </div>
                <img onClick={() => history.push(`/details/${dish.id}`)} className='w-100' role='button' src={dish.image_url} alt='image' />
                <div className='card-body'>
                    <h3 className='mb-4'><AiOutlineLike /></h3>
                    <h5 className='card-title'>{dish.name}</h5>
                    <h6 className='card-text mb-4'>{dish.description.substring(0, 125)}</h6>
                    <p className="card-text">{dish.num_of_comments} comment{dish.num_of_comments === 1 ? '' : 's'}</p>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <small className='card-text text-secondary'>{moment(dish.created_at).format('ll')}</small>
                        <Link className='text-decoration-none' to={`/details/${dish.id}`}>More Info</Link>
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