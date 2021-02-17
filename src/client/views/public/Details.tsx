import * as React from 'react';
import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Link, useHistory, useParams } from 'react-router-dom';
import type { ICategories, IComments, IDishes } from '../../utils/Types';
import api, { TOKEN_KEY } from '../../utils/Api-service';
import CommentCard from '../../components/CommentCard';


const Details: React.FC<DetailsProps> = props => {

    // add ability to like post and comment

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const token = localStorage.getItem(TOKEN_KEY)

    const [dish, setDish] = useState<IDishes>(null)
    const [dishCategories, setDishCategories] = useState<ICategories[]>([]);

    // all of the comments for this individual dish
    const [comments, setComments] = useState<IComments[]>([]);

    // each individual comment
    const [comment, setComment] = useState('');

    useEffect(() => {
        let dishDetails = null;
        api(`/api/dishes/${id}`)
            .then(dish => {
                dishDetails = dish;
                return api(`/api/dish-categories/${id}`)
            })
            .then(dishCategory => {
                setDishCategories(dishCategory)
                return api(`/api/comments/dish/${id}`)
            })
            .then(comments => {
                setComments(comments);
                setDish(dishDetails); // moving setDish down here will batch the dish and comments renders together
                // can we include dishCategories?  
            })
    }, [id])

    // overkill for this but cool to learn
    // it will poll the comments every 30 seconds and update them without you having to refresh the page
    // if someone else posts a comment after you navigate to the page, you can see them update in real time
    useEffect(() => {
        const commentPoll = setInterval(async () => {
            const comments = await api(`/api/comments/dish/${id}`)
        setComments(comments);
        }, 10000);
        return () => clearInterval(commentPoll);
    })

    const postComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await api(`/api/comments/`, 'POST', { comment, dishid: id })
        const comments = await api(`/api/comments/dish/${id}`)
        setComments(comments);
        setComment('');
    }


        // write logic so if there are no allergies, don't display Allergies:. or display none
    return (
        <main className='container'>
            <section className='row mt-5'>

                <div className='col-10'>
                    {/* Dish Details */}
                    <div className='card'>
                        <div className='card-body'>
                            <img className='w-100' src={dish?.image_url} alt='image' />
                            <div className='d-flex my-4'>
                                <img className='h-auto w-25 rounded-circle avatar_img mr-2' src={dish?.avatar_url} />
                                <h3 className='align-self-center' >{dish?.username}</h3>
                            </div>
                            <div>
                                {dishCategories?.map(dishCategory => (
                                    <span className='badge badge-primary my-3 mx-1 p-2' key={`dish-tag-${dishCategory.id}`} >{dishCategory.name}</span>
                                ))}
                            </div>
                            <h6>Allergies: {dish?.allergies}</h6>
                            <h2 className='d-flex card-title justify-content-center align-items-center'>{dish?.name}</h2>
                            <p className='d-flex card-text justify-content-center align-items-center'>{dish?.description}</p>
                            <h6>Restaurant: {dish?.restaurant_name}</h6>
                            <h6>Location: {dish?.location}</h6>
                            <button onClick={() => history.goBack()} className='btn btn-success mr-4'>Go Back</button>
                        </div>
                    </div>
                </div>


                {/* Add A Comment */}
                <div className="col-9">
                    {!token && <>
                        <form className='form-group border shadow bg-white font-weight-bold p-4 mt-5'>
                            <h5>You must be logged in to write a comment</h5>
                            <Link className='mr-4' to={'/login'}>Login</Link>
                            <Link to={'/register'}>Register</Link>
                        </form>
                    </>}
                    {token && <>
                        <form className='form-group border shadow bg-white font-weight-bold  p-4 mt-5'>
                            <h5>Add a Comment</h5>
                            <textarea placeholder='write your comment...' value={comment} onChange={e => setComment(e.target.value)} rows={5} className='form-control bg-warning my-4'></textarea>
                            <button onClick={postComment} className='btn btn-success font-weight-bold'>Post</button>
                        </form>
                    </>}
                </div>


                {/* Display Comments */}
                {comments.map(comment => (
                    <CommentCard key={`comment-key-${comment.id}`} comment={comment} />
                ))}



            </section>
        </main>
    );
}

interface DetailsProps { }

export default Details;