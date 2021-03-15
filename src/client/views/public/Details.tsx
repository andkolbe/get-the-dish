import * as React from 'react';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import type { ICategories, IComments, IDishes } from '../../utils/Types';
import api, { TOKEN_KEY } from '../../utils/Api-service';
import CommentCard from '../../components/CommentCard';


const Details: React.FC<DetailsProps> = props => {

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
        let dishDetails: any = null;
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

    // // overkill for this but cool to learn
    // // it will poll the comments every 30 seconds and update them without you having to refresh the page
    // // if someone else posts a comment after you navigate to the page, you can see them update in real time
    // useEffect(() => {
    //     const commentPoll = setInterval(async () => {
    //         const comments = await api(`/api/comments/dish/${id}`)
    //     setComments(comments);
    //     }, 10000);

    //     return () => clearInterval(commentPoll);
    // })

    useEffect(() => {
        const socket = socketIOClient();

        socket.on('newComment', () => { // everytime it hears our message from our server rerun our comments
            api(`/api/comments/dish/${id}`).then(comments => setComments(comments));
        })

        return () => {
            socket.disconnect(); // disconnect when we move away from the details page
        }
    })

    const postComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await api(`/api/comments/`, 'POST', { comment, dishid: id })
        const comments = await api(`/api/comments/dish/${id}`)
        setComments(comments);
        setComment('');
    }

    return (
        <main className='container'>
            <section className='row mt-5 justify-content-center'>

                <div className='col-11'>
                    {/* Dish Details */}
                    <div className='card shadow'>
                        <img className='w-100' src={dish?.image_url} alt='image' />
                        <div className='card-body'>
                            <div className='d-flex mt-2 mb-4 justify-content-between'>
                                <div className='d-flex my-2'>
                                    <img className='h-auto w-50 rounded-circle avatar_img mr-2' src={dish?.avatar_url} />
                                    <h5 className='align-self-center' >{dish?.username}</h5>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-center card-title font-weight-bold'>{dish?.name}</h2>
                                {dishCategories?.map(dishCategory => (
                                    <span className='badge badge-success rounded-pill my-2 mx-1' key={`dish-tag-${dishCategory.id}`} >{dishCategory.name}</span>
                                ))}
                                <h5 className='card-text my-4'>{dish?.description}</h5>
                                <h6>{dish?.allergies === '' ? 'Allergies: None' : `Allergies: ${dish?.allergies}`}</h6>
                            </div>
                            <div className='d-flex flex-column justify-content-start align-items-end mt-2'>
                                <h5>{dish?.restaurant_name}</h5>
                                <h6>{dish?.address}</h6>
                                <h6>{dish?.city}, {dish?.state}</h6>
                                <h6>{dish?.phone}</h6>
                                <h6>Price: {dish?.price}</h6>
                            </div>
                            <button onClick={() => history.goBack()} className='btn text-primary mt-2'>Go Back</button>
                        </div>
                    </div>
                </div>


                {/* Add A Comment */}
                <div className='col-9'>
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
                            <textarea placeholder='write your comment...' value={comment} onChange={e => setComment(e.target.value)} rows={5} className='form-control bg-warning input-shadow my-4'></textarea>
                            <button onClick={postComment} className='btn btn-primary btn-shadow font-weight-bold'>Post</button>
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