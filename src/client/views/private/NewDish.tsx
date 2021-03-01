import * as React from 'react';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api, { TOKEN_KEY } from '../../utils/Api-service'
import type { ICategories } from '../../utils/Types';
import { errorHandler } from '../../utils/Error-handler';

const NewDish: React.FC<NewDishProps> = props => {

    const history = useHistory();

    // selection options
    const [name, setName] = useState('');
    const [allergies, setAllergies] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [USstate, setUSstate] = useState('');
    const [phone, setPhone] = useState('');
    const [price, setPrice] = useState('');
    const [yelpTerm, setYelpTerm] = useState('Uchi');
    const [yelpLocation, setYelpLocation] = useState('Austin');

    const [file, setFile] = useState<File>(null);
    const [selectedCategoryid, setSelectedCategoryid] = useState('0');

    const [categories, setCategories] = useState<ICategories[]>([])

    const [show, setShow] = useState(false) // <boolean> is inferred

    useEffect(() => {
        api('/api/categories').then(categories => setCategories(categories)).catch(errorHandler);;
    }, [])

    useEffect(() => {
        // listen is a function that takes a callback that will run when the url bar changes its location 
        // we are 'listening' to the url bar for changes
        const unlisten = history.listen(() => setShow(false))
        // we include the cleanup function here in case we navigate to a page without the navbar. we want the useEffect to stop running in that instance
        // good practice to turn listeners off
        return () => unlisten(); 
    }, [history]) // only rerun if the history object changes


    const searchRestaurant = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const yelp = await api('/api/yelp', 'POST', { term: yelpTerm, location: yelpLocation })
        console.log(yelp[0])
        setRestaurant(yelp[0].name);
        setAddress(yelp[0].location.address1);
        setCity(yelp[0].location.city);
        setUSstate(yelp[0].location.state);
        setPhone(yelp[0].phone);
        setPrice(yelp[0].price)

        setShow(!show);
    }
    
    const submitDish = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newDish = new FormData();
        const token = localStorage.getItem(TOKEN_KEY);
        newDish.append('name', name);
        newDish.append('allergies', allergies);
        newDish.append('description', description);
        newDish.append('image', file);
        if (!name || !description || !file) return alert('Dish name, description, and picture are required');
        try {
            const res = await fetch('/api/dishes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: newDish
            });
            const dishPost = await res.json();
            await api('/api/restaurants', 'POST', { dishid: dishPost.insertId, location: location, name: restaurant });

            if (selectedCategoryid !== '0') {
                await api('/api/dish-categories', 'POST', { dishid: dishPost.insertId, categoryid: selectedCategoryid })
                history.push('/profile');
            } else {
                history.push('/profile');
            }
        } catch (error) {
            errorHandler(error);
        }
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <h4>Add A Dish</h4>
                <input className='form-control bg-warning mt-4' value={name} onChange={e => setName(e.target.value)} placeholder='Name of Dish' type='text' />

                <select className='form-control w-50 mt-3' value={selectedCategoryid} onChange={e => setSelectedCategoryid(e.target.value)}>
                    <option value='0'>Select a Category ...</option>
                    {categories.map(category => (
                        <option key={`category-key-${category.id}`} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <input className='form-control bg-warning mt-3' value={allergies} onChange={e => setAllergies(e.target.value)} placeholder='List all Allergies (if any)' type='text' />

                <textarea className='form-control bg-warning mt-3' value={description} onChange={e => setDescription(e.target.value)} rows={6} placeholder='Description of Dish'></textarea>

                {!show && 
                <div>
                    <h6 className='mt-4'>Search Restaurant</h6>
                    <input className='form-control bg-warning' value={yelpTerm} onChange={e => setYelpTerm(e.target.value)} placeholder='Name of Restaurant, Food Truck, Bar' type='text' />
                    <input className='form-control bg-warning w-50 mt-1' value={yelpLocation} onChange={e => setYelpLocation(e.target.value)} placeholder='Name of City' type='text' />
                    <button onClick={searchRestaurant} className='btn btn-primary mt-2'>Search</button>
                </div>}

                {show && 
                <div className='mt-4'>
                    <input value={restaurant} onChange={e => setRestaurant(e.target.value)} type="text"/>
                    <input value={address} onChange={e => setAddress(e.target.value)} type="text"/>
                    <input value={city} onChange={e => setCity(e.target.value)} type="text"/>
                    <input value={USstate} onChange={e => setUSstate(e.target.value)} type="text"/>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="text"/>
                    <input value={price} onChange={e => setPrice(e.target.value)} type="text"/>
                    <button onClick={() => setShow(!show)} className='btn btn-success mr-4'>Search Again</button>
                </div>}

                <div className='mt-4'>
                    <h6 className='mt-4'>Add a Photo</h6>
                    <input onChange={e => setFile(e.target.files[0])} className='form-control-file' type='file' />
                    <img className='img-preview img-thumbnail mt-3' src={file ? URL.createObjectURL(file) : 'https://get-the-dish.s3.amazonaws.com/unnamed.jpg'} alt='picture' />
                </div>

                <button onClick={submitDish} className="btn btn-primary mt-4">Post</button>
            </form>
        </Layout>
    );
}

// URL.createObjectURL(file) turns your file into an html string and stores it as that

interface NewDishProps { }

export default NewDish;
