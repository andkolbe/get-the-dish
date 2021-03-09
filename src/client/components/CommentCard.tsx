import * as moment from 'moment';
import * as React from 'react';
import Like from './icons/Like';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IComments } from '../utils/Types';
import api, { TOKEN_KEY } from '../utils/Api-service';

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {

    const [likes, setLikes] = useState(comment.num_of_comment_likes);  // num_of_comment_likes PROBLEM

    const token = localStorage.getItem(TOKEN_KEY)

    const handleAddLike = async () => {

        if (!token) {
            alert('Log In') // use a toast instead
            return;
        }

        /*
            toggle like on and off

            if(has_liked === 1) {
                remove the like // DELETE request
            } else {
                add the like
            }
        */

        const liked = await api(`/api/comment-likes/${comment.id}`, 'POST');
        if (liked.affectedRows === 1) setLikes(likes + 1); // only display a like change when the affectedRows = 1. State changes mean DOM updates
    }

    return (
        <div className='col-9 my-2'>
            <div className='card shadow'>
                <div className='card-body'>
                    <div className="d-flex justify-content-between">
                        <div className='d-flex'>
                            <img className='h-auto w-50 rounded-circle avatar_img mb-3 mr-2' src={comment.avatar_url} />
                            <h5 className='card-title align-self-center'>{comment.username}</h5>
                        </div>
                        {token && <Link className='btn text-primary font-weight-bold' to={`/comments/${comment.id}`}>Edit Comment</Link>}

                    </div>
                    <p className='card-text'>{comment.comment}</p>
                    <div className="d-flex justify-content-between">
                        <small className='card-text text-secondary'>{moment(comment.created_at).format('h:mm a - l')}</small>
                        <p className='card-text d-flex align-items-center justify-content-end'>
                            <span role='button' onClick={handleAddLike} className=''>
                                <Like className='mr-2' height='35' width='35' fill={`${likes ? '#68C4DE' : 'none'}`} />
                            </span>
                            {likes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface CommentCardProps {
    comment: IComments
}

export default CommentCard;