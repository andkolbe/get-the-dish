import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IComments } from '../utils/Types';
import { AiOutlineLike } from 'react-icons/ai'

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {

    return (
        <div className="col-10">
            <div className='card my-2 shadow'>
                <div className='card-body'>
                    <img className='h-auto w-25 rounded-circle avatar_img mb-3' src={comment.avatar_url} />
                    <h5 className='card-title'>{comment.username}</h5>
                    <p className='card-text'>{comment.comment}</p>
                    <small className='card-text text-secondary'>{moment(comment.created_at).format('h:mm a - l')}</small>
                    <div className='d-flex justify-content-between mt-3'>
                        <h3><AiOutlineLike /></h3>
                        <Link className='btn text-success font-weight-bold' to={`/comments/${comment.id}`}>Edit Comment</Link>
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