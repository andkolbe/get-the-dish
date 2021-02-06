import * as React from 'react';
import { Link } from 'react-router-dom';
import { IDishes } from '../utils/Types';

const DishCard: React.FC<DishCardProps> = ({ dish }) => {

    return (
        <div className="col-md-6 my-3">
            <article className="card shadow">
                <img className='w-100' src={dish.image_url} alt="image" />
                <div className="card-body">
                    <h2>{dish.username}</h2>
                    <h4 className="card-title">{dish.name}</h4>
                    <p className="card-text">{dish.description.substring(0, 125)}</p>
                    <Link to={`/details/${dish.id}`}>More Info</Link>
                </div>
            </article>
        </div>
    );
}

interface DishCardProps {
    dish: IDishes
}

export default DishCard;