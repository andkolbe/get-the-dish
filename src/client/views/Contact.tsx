import * as React from 'react';
import Layout from '../components/Layout';
import api from '../utils/Api-service';
import { useState } from 'react';

const Contact = (props: ContactProps) => {   

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await api('/api/login', 'POST', {email, title, content});
        setEmail('');
        setTitle('');
        setContent('');
    }

    return (
        <Layout>
            <form className="form-group border p-4 shadow bg-white font-weight-bold">
                <div className="mb-4">
                    <label htmlFor="emailaddress" className="form-label">Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className ="mb-4">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} />
                </div>
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </form>
        </Layout>
    );
}

interface ContactProps {}

export default Contact;