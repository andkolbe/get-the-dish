import * as React from 'react';
import api from '../../utils/Api-service';
import ProfileDishCard from '../../components/ProfileDishCard';
import { useState } from 'react';
import { useEffect } from 'react';
import type { IDishes, IUsers } from '../../utils/Types';
import { Link } from 'react-router-dom';
import { errorHandler } from '../../utils/Error-handler';

const Profile: React.FC<ProfileProps> = props => {

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
                    <div className="jumbotron-new">
                        <h2 className='mt-4'>Welcome, {user?.username}!</h2>
                        <img className='avatar_img_lg rounded-circle mb-4' src={user?.avatar_url} />
                    </div>
                    {dishes.length > 0 && <h3 className='my-5 text-center'>Your Dishes</h3>}
                    {!dishes.length && <>
                        <div className="text-center mt-5">
                            <Link to={'/newdish'} className="h1">Start Adding Dishes!</Link>
                        </div>
                    </>}
                </div>
                {dishes.map(dish => (
                    <ProfileDishCard key={`dish-key-${dish.id}`} dish={dish} />
                ))}
            </section>
        </main>
    );
}

interface ProfileProps { }

export default Profile;