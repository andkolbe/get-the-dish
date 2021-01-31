import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { IDishes } from '../utils/Types';

const DishCard: React.FC<DishCardProps> = ({ dish }) => { 
  
    return (
        <div className="col-md-10">
            <article className="card my-2 shadow">
                <div className="card-body">
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