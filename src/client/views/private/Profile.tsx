import * as React from 'react';
import api from '../../utils/Api-service';
import UserDishCard from '../../components/ProfileDishCard';
import { useState } from 'react';
import { useEffect } from 'react';
import type { IDishes, IUsers } from '../../utils/Types';

// display details of an individual user 
// map through and display dishes only that user has posted
// give that user the ability to edit or delete posts
// might need to make a UserCard component

const Profile: React.FC<ProfileProps> = props => {


    const [user, setUser] = useState<IUsers>(null);
    const [dishes, setDishes] = useState<IDishes[]>([]);

    useEffect(() => {
        // brings in all of the user data off of the token
        api(`/api/users/profile`).then(user => setUser(user));

        // brings in all of the dishes that one user has posted
        api(`/api/dishes/user`).then(dishes => setDishes(dishes));
    }, [])

   

    return (
        <main className='container'>
            <section className='row'>
                <div className='col-md-10'>
                    <h2 className='mt-4'>Welcome, {user?.username}!</h2>
                    <img className='h-auto w-25 rounded-circle mb-4' src={user?.avatar_url}/>
                    <h5>Your Dishes</h5>
                </div>
                {dishes.map(dish => (
                    <UserDishCard key={`dish-key-${dish.id}`} dish={dish} />
                ))}
            </section>
        </main>
    );
}

interface ProfileProps { }

export default Profile;