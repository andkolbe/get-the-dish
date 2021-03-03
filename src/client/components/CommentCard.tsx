import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '../utils/Api-service';
import { IComments } from '../utils/Types';
import { AiOutlineLike } from 'react-icons/ai'

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {

    const token = localStorage.getItem(TOKEN_KEY)

    return (
        <div className='col-9 my-2'>
            <div className='card shadow'>
                <div className='card-body'>
                    <div className='d-flex'>
                        <img className='h-auto w-25 rounded-circle avatar_img mb-3 mr-2' src={comment.avatar_url} />
                        <h5 className='card-title align-self-center'>{comment.username}</h5>
                    </div>
                    <p className='card-text'>{comment.comment}</p>
                    <small className='card-text text-secondary'>{moment(comment.created_at).format('h:mm a - l')}</small>
                    <div className='d-flex justify-content-between mt-3'>
                        <h3><AiOutlineLike /></h3>
                        {token && <Link className='btn text-primary font-weight-bold' to={`/comments/${comment.id}`}>Edit Comment</Link>}
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