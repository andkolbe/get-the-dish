import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import type { ICategories, IDishes } from '../../utils/Types';
import api from '../../utils/Api-service';
import { errorHandler } from '../../utils/Error-handler';

let oldid: number = null;

const Admin: React.FC<AdminProps> = props => {

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    // needed for dish image
    const [dish, setDish] = useState<IDishes>(null)

    // needed for dish data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategoryid, setSelectedCategoryid] = useState('0');

    // needed for category data
    const [categories, setCategories] = useState<ICategories[]>([])

    // brings in image
    useEffect(() => {
        api(`/api/dishes/${id}`).then(dish => setDish(dish));
    }, [id])

    // brings in dish data
    useEffect(() => {
        (async () => {
            try {
                const dish = await api(`/api/dishes/${id}`);
                const dishCategories = await api(`/api/dish-categories/${id}`)
                oldid = dishCategories[0].id;
                setName(dish.name);
                setDescription(dish.description);
                setSelectedCategoryid(dishCategories[0].id);
            } catch (error) {
                errorHandler(error);
            }
        })()
    }, [id])

    // brings in dish category data
    useEffect(() => {
        api('/api/categories').then(categories => setCategories(categories));
    }, [])

    const editDish = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api(`/api/dishes/${id}`, 'PUT', { name, description });
        if (oldid !== Number(selectedCategoryid)) {
            api(`/api/dish-categories/${id}`, 'PUT', { oldid, newid: Number(selectedCategoryid) })
            history.push('/profile');
        } else {
            history.push('/profile');
        }
    }

    const deleteDish = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api(`/api/dish-categories/${id}`, 'DELETE')
            .then(() => {
                api(`/api/dishes/${id}`, 'DELETE');
            })
    }

    return (
        <Layout>
            <form className='form-group border shadow bg-white font-weight-bold p-4'>
                <img className='w-100' src={dish?.image_url} alt="image" />
                <label className='mt-3' htmlFor='name'>Name of Dish</label>
                <input className='form-control bg-warning' value={name} onChange={e => setName(e.target.value)} type='text' />
                <label className='mt-3' htmlFor='category'>Categories</label>
                <select className='form-control bg-warning w-50' value={selectedCategoryid} onChange={e => setSelectedCategoryid(e.target.value)}>
                    <option value='0'>Select A Category ...</option>
                    {categories.map(category => (
                        <option key={`category-key-${category.id}`} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <label className='mt-3' htmlFor='description'>Description</label>
                <textarea className='form-control my-1 bg-warning' value={description} onChange={e => setDescription(e.target.value)} rows={6}></textarea>
                <div className="d-flex justify-content-between mt-4">
                    <button onClick={() => history.push('/profile')} className='btn btn-success'>Go Back</button>
                    <button onClick={editDish} className="btn btn-primary">Edit</button>
                    <button onClick={deleteDish} className="btn btn-danger">Delete</button>
                </div>
            </form>
        </Layout>
    );
}

interface AdminProps { }

export default Admin;