import * as React from 'react';
import Layout from '../components/Layout';
import api from '../utils/Api-service';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditComment: React.FC<EditCommentProps> = props => {

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    // the text of the individual comment
    const [comment, setComment] = useState('');

    // brings in comment data
    useEffect(() => {
        (async () => {
            const comment = await api(`/api/comments/${id}`);
            console.log(comment);
        })()
    }, [id])

    const editComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api(`/api/comments/${id}`, 'PUT', { comment })
        history.goBack();
    }

    return (
        <Layout>
            <form className='col-10 form-group border shadow bg-white font-weight-bold  p-4 mt-5'>
                <h5>Edit Comment</h5>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={5} className='form-control bg-warning my-4'></textarea>
                <button onClick={editComment} className='btn btn-success font-weight-bold'>Post</button>
            </form>
        </Layout>
    );
}

interface EditCommentProps { }

export default EditComment;