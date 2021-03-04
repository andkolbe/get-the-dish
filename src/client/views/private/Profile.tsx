import * as React from 'react';
import api from '../../utils/Api-service';
import UserDishCard from '../../components/ProfileDishCard';
import { useState } from 'react';
import { useEffect } from 'react';
import type { IDishes, IUsers } from '../../utils/Types';
import { useHistory } from 'react-router-dom';
import { errorHandler } from '../../utils/Error-handler';

const Profile: React.FC<ProfileProps> = props => {

    const history = useHistory();

    const [user, setUser] = useState<IUsers>(null);
    const [dishes, setDishes] = useState<IDishes[]>([]);

    useEffect(() => {
        // brings in all of the user data off of the token
        api(`/api/users/profile`).then(user => setUser(user)).catch(errorHandler); // the error from the Api Service will be thrown here

        // brings in all of the dishes that one user has posted
        api(`/api/dishes/user`).then(dishes => setDishes(dishes));
    }, [])

    return (
        <main className='container'>
            <section className='row'>
                <div className='col-md-12'>
                    
                        <h2 className='mt-4 text-center'>Welcome, {user?.username}!</h2>
                        <img className='avatar_img_lg rounded-circle mb-4' src={user?.avatar_url} />
                    
                    {dishes.length > 0 && <h5 className='mt-5'>Your Dishes</h5>}
                </div>
                {!dishes.length && <>
                    <h1 className=''>Start Adding Dishes</h1>
                    <button className='btn btn-primary ml-4' onClick={() => history.push('/newdish')}>Add A Dish!</button>
                </>}
                {dishes.map(dish => (
                    <UserDishCard key={`dish-key-${dish.id}`} dish={dish} />
                ))}
            </section>
        </main>
    );
}

interface ProfileProps { }

export default Profile;