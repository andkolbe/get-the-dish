import * as React from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/Api-service';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditComment: React.FC<EditCommentProps> = props => {

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    // write logic so only the person who wrote the comment can edit it

    // the text of the individual comment
    const [comment, setComment] = useState('');

    // brings in comment data
    useEffect(() => {
        (async () => {
            const comment = await api(`/api/comments/${id}`);
            setComment(comment.comment)
        })()
    }, [id])

    const editComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api(`/api/comments/${id}`, 'PUT', { comment })
        history.goBack();
    }

    const deleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api(`/api/comments/${id}`, 'DELETE')

    }

    return (
        <Layout>
            <form className='col-10 form-group border shadow bg-white font-weight-bold  p-4 mt-5'>
                <h5>Edit Comment</h5>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={5} className='form-control bg-warning input-shadow my-4'></textarea>
                <div className="d-flex justify-content-between">
                    <button onClick={deleteComment} className='btn text-danger font-weight-bold'>Delete</button>
                    <button onClick={editComment} className='btn btn-primary btn-shadow'>Edit</button>
                </div>

            </form>
        </Layout>
    );
}

interface EditCommentProps { }

export default EditComment;