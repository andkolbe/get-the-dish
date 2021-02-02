import * as React from 'react';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/Api-service'
import { ICategories } from '../utils/Types';

const NewDish: React.FC<NewDishProps> = props => { 

    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategoryid, setSelectedCategoryid] = useState('0');

    const [categories, setCategories] = useState<ICategories[]>([])

    useEffect(() => {
        api('/api/categories').then(categories => setCategories(categories));
    }, [])

    const submitDish = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api('/api/dishes', 'POST', { name, description })
            .then(dishPost => {
                if (selectedCategoryid !== '0') {
                    api('/api/dish-categories', 'POST', { dishid: dishPost.insertId, categoryid: selectedCategoryid })
                        .then(() => setSelectedCategoryid('0'));
                }
            })
        history.push('/');
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <label htmlFor='name'>Name of Dish</label>
                <input className='form-control bg-warning' value={name} onChange={e => setName(e.target.value)} type='text'/>
                <label className='mt-4' htmlFor='category'>Categories</label>
                <select className='form-control' value={selectedCategoryid} onChange={e => setSelectedCategoryid(e.target.value)}>
                    <option value='0'>Select A Category ...</option>
                    {categories.map(category => (
                        <option key={`category-key-${category.id}`} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <label className='mt-4' htmlFor='description'>Description</label>
                <textarea className='form-control my-1 bg-warning' value={description} onChange={e => setDescription(e.target.value)} rows={12}></textarea>
                <button onClick={submitDish} className="btn btn-primary mt-4">Submit</button>
            </form>
        </Layout>
    );
}

interface NewDishProps {}

export default NewDish;