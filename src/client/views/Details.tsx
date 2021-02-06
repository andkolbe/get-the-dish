import * as moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import type { ICategories, IComments, IDishes } from '../utils/Types';
import api from '../utils/Api-service';


const Details: React.FC<DetailsProps> = props => {

    // add ability to like post and comment

    const { id } = useParams<{ id: string }>();

    const history = useHistory();


    const [dish, setDish] = useState<IDishes>(null)
    const [dishCategories, setDishCategories] = useState<ICategories[]>([]);

    const [comments, setComments] = useState<IComments[]>([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        (async () => {
            api(`/api/dishes/${id}`).then(dish => setDish(dish));
            api(`/api/dish-categories/${id}`).then(dishCategories => setDishCategories(dishCategories));
            api(`/api/comments/${id}`).then(c => setComments(c))  
        })()
    }, [id])

    const postComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api('/api/comments', 'POST', { name, comment })
    }

    return (
        <main className="container">
            <section className="row justify-content-center mt-3">
                <div className="col-10">
                    <div className="card">
                        <div className="card-body">
                            <img className='w-100' src={dish?.image_url} alt="image"/>
                            <h2>{dish?.username}</h2>
                            <img className="h-auto w-25 rounded-circle avatar_img" src={dish?.avatar_url}/>
                            <div>
                                {dishCategories?.map(dishCategory => (
                                    <span className="badge badge-primary my-3 mx-1 p-2" key={`dish-tag-${dishCategory.id}`} >{dishCategory.name}</span>
                                ))}
                            </div>
                            <h5 className="d-flex card-title justify-content-center align-items-center">{dish?.name}</h5>
                            <p className="card-text">{dish?.description}</p>
                            <button onClick={() => history.goBack()} className="btn btn-success mr-4">Go Back</button>
                        </div>
                    </div>
                    <div>
                        <form className='col-10 form-group border shadow bg-white font-weight-bold  p-4 mt-5'>
                            <h5>Add a Comment</h5>
                            <textarea placeholder='write your comment...' value={comment} onChange={e => setComment(e.target.value)} rows={5} className='form-control bg-warning my-4'></textarea>
                            <button onClick={postComment} className='btn btn-success font-weight-bold'>Post</button>
                        </form>
                        {comments.map(comment => (  
                            <div key={`comment-key-${comment.id}`} className="card my-2 shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{comment.name}</h5>
                                    <p className="card-text">{comment.comment}</p>
                                    <small className="card-text text-secondary">{moment(comment.created_at).format('h:mm a - l')}</small>
                                    <div className="d-flex justify-content-end">
                                        <Link className="btn text-success font-weight-bold" to={`/comments/${comment.id}/admin`}>Edit Comment</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

interface DetailsProps { }

export default Details;