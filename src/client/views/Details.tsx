import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import type { ICategories, IDishes } from '../utils/Types';
import api from '../utils/Api-service';

const Details: React.FC<DetailsProps> = props => {

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const [dish, setDish] = useState<IDishes>(null)
    const [dishCategories, setDishCategories] = useState<ICategories[]>([]);

    useEffect(() => {
        (async () => {
            api(`/api/dishes/${id}`).then(dish => setDish(dish));
            api(`/api/dish-categories/${id}`).then(dishCategories => setDishCategories(dishCategories));  
        })()
    }, [id])

    return (
        <main className="container">
            <section className="row justify-content-center mt-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <img className='w-100' src={dish?.image_url} alt="image"/>
                            <h5 className="d-flex card-title justify-content-center align-items-center">{dish?.name}</h5>
                            <div>
                                {dishCategories?.map(dishCategory => (
                                    <span className="badge badge-primary mb-3 mx-1 p-2" key={`dish-tag-${dishCategory.id}`} >{dishCategory.name}</span>
                                ))}
                            </div>
                            <p className="card-text">{dish?.description}</p>
                            <button onClick={() => history.goBack()} className="btn btn-success mr-4">Go Back</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

interface DetailsProps { }

export default Details;