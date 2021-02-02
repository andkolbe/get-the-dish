import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { ICategories, IDishes } from '../utils/Types';
import api from '../utils/Api-service';

let oldid: number = null;

const Admin: React.FC<AdminProps> = props => {

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategoryid, setSelectedCategoryid] = useState('0');

    const [categories, setCategories] = useState<ICategories[]>([])

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/dishes/${id}`);
            const dish = await res.json();
            const res2 = await fetch(`/api/dish-categories/${id}`)
            const dishCategories = await res2.json();
            oldid = dishCategories[0].id;
            setName(dish.name);
            setDescription(dish.description);
            setSelectedCategoryid(dishCategories[0].id);
        })()
    }, [id])

    useEffect(() => {
        api('/api/categories').then(categories => setCategories(categories));
    }, [])

    const editDish = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api('/api/dishes', 'POST', { name, description })
            .then(() => {
                if (oldid !== Number(selectedCategoryid)) {
                    api(`/api/dish-categories/${id}`, 'PUT', { oldid, newid: Number(selectedCategoryid) })
                        .then(() => setSelectedCategoryid('0'));
                }
            })
        history.push(`/details/${id}`);
    }

    const deleteDish = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api(`/api/dish-categories/${id}`, 'DELETE')
            .then(() => {
                api(`/api/dishes/${id}`, 'DELETE');
                history.push('/');
            })
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <label className='font-weight-bold' htmlFor='name'>Name of Dish</label>
                <input className='form-control bg-warning' value={name} onChange={e => setName(e.target.value)} type='text' />
                <label className='font-weight-bold' htmlFor='category'>Categories</label>
                <select className='form-control bg-warning' value={selectedCategoryid} onChange={e => setSelectedCategoryid(e.target.value)}>
                    <option value='0'>Select A Category ...</option>
                    {categories.map(category => (
                        <option key={`category-key-${category.id}`} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <label htmlFor='description'>Description</label>
                <textarea className='form-control my-1 bg-warning' value={description} onChange={e => setDescription(e.target.value)} rows={12}></textarea>
                <div className="d-flex justify-content-between mt-4">
                    <button onClick={() => history.push(`/details/${id}`)} className='btn btn-success'>Go Back</button>
                    <button onClick={editDish} className="btn btn-primary">Edit</button>
                    <button onClick={deleteDish} className="btn btn-danger">Delete</button>
                </div>
            </form>
        </Layout>
    );
}

interface AdminProps { }

export default Admin;