import * as React from 'react';

import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api, { TOKEN_KEY } from '../../utils/Api-service'
import type { ICategories } from '../../utils/Types';

const NewDish: React.FC<NewDishProps> = props => {

    const history = useHistory();

    // selection options
    const [name, setName] = useState('');
    const [allergies, setAllergies] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [restaurant, setRestaurant] = useState('');

    const [file, setFile] = useState<File>(null);
    const [selectedCategoryid, setSelectedCategoryid] = useState('0');

    const [categories, setCategories] = useState<ICategories[]>([])

    useEffect(() => {
        api('/api/categories').then(categories => setCategories(categories));
    }, [])

    const submitDish = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newDish = new FormData();
        const token = localStorage.getItem(TOKEN_KEY);
        newDish.append('name', name);
        newDish.append('allergies', allergies);
        newDish.append('description', description);
        newDish.append('image', file);
        if (!name || !description || !file) return alert('Dish name, description, and picture are required');
        const res = await fetch('/api/dishes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: newDish
        });
        await api('/api/restaurants', 'POST', { city: city, restaurant: restaurant });
        const dishPost = await res.json();

        if (selectedCategoryid !== '0') {
            await api('/api/dish-categories', 'POST', { dishid: dishPost.insertId, categoryid: selectedCategoryid })
            history.push('/');
        } else {
            history.push('/');
        }
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <h4>Add A Dish</h4>
                <input className='form-control bg-warning mt-3' value={name} onChange={e => setName(e.target.value)} placeholder='Name of Dish' type='text' />

                <select className='form-control w-50 mt-4' value={selectedCategoryid} onChange={e => setSelectedCategoryid(e.target.value)}>
                    <option value='0'>Select a Category ...</option>
                    {categories.map(category => (
                        <option key={`category-key-${category.id}`} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <input className='form-control bg-warning mt-4' value={allergies} onChange={e => setAllergies(e.target.value)} placeholder='List all Allergies (if any)' type='text' />

                <textarea className='form-control bg-warning mt-4' value={description} onChange={e => setDescription(e.target.value)} rows={6} placeholder='Description of Dish'></textarea>

                <div className='d-flex mt-2'>
                    <input className='form-control bg-warning w-50 mt-3 mr-2' value={city} onChange={e => setCity(e.target.value)} placeholder='City, Statemn' type='text' />
                </div>

                <input className='form-control bg-warning mt-3' value={restaurant} onChange={e => setRestaurant(e.target.value)} placeholder='Name of Restaurant, Food Truck, Bar' type='text' />

                <div className='mt-4'>
                    <input onChange={e => setFile(e.target.files[0])} className='form-control-file' type='file' />
                    <img className='img-thumbnail mt-3' style={{ width: '500px', height: 'auto' }} src={file ? URL.createObjectURL(file) : 'https://get-the-dish.s3.amazonaws.com/unnamed.jpg'} alt='picture' />
                </div>

                <button onClick={submitDish} className="btn btn-primary mt-4">Post</button>
            </form>
        </Layout>
    );
}

// URL.createObjectURL(file) turns your file into an html string and stores it as that

interface NewDishProps { }

export default NewDish;
