import * as moment from 'moment';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IDishes } from '../utils/Types';
import { AiOutlineLike } from 'react-icons/ai'

const DishCard: React.FC<DishCardProps> = ({ dish }) => {

    const history = useHistory();

    return (
        <div className='col-md-6 my-3'>
            <article className='card shadow'>
                <img onClick={() => history.push(`/details/${dish.id}`)} className='w-100' role='button' src={dish.image_url} alt='image' />
                <div className='card-body'>
                    <div className='d-flex mb-4'>
                        <img className='h-auto w-25 rounded-circle avatar_img mr-2' src={dish.avatar_url} />
                        <h5 className='align-self-center'>{dish.username}</h5>
                    </div>
                    <h4 className='card-title'>{dish.name}</h4>
                    <p className='card-text'>{dish.description.substring(0, 125)}</p>
                    <p className="card-text">{dish.num_of_comments} comment{dish.num_of_comments === 1 ? '' : 's'}</p>
                    <small className='card-text text-secondary'>{moment(dish.created_at).format('ll')}</small>
                    <div className='d-flex justify-content-between mt-3'>
                        <h3><AiOutlineLike /></h3>
                        <Link to={`/details/${dish.id}`}>More Info</Link>
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