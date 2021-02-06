import * as React from 'react';
import api from '../utils/Api-service';
import UserDishCard from '../components/UserDishCard';
import { useState } from 'react';
import { useEffect } from 'react';
import type { IDishes, IUsers } from '../utils/Types';

// display details of an individual user 
// map through and display dishes only that user has posted
// give that user the ability to edit or delete posts
// might need to make a UserCard component

const Profile: React.FC<ProfileProps> = props => {


    const [user, setUser] = useState<IUsers>(null);
    const [dishes, setDishes] = useState<IDishes[]>([]);

    useEffect(() => {
        api(`/api/users/profile`).then(user => setUser(user));
    }, [])

    useEffect(() => {
        api(`/api/dishes/user`).then(dishes => setDishes(dishes));
    }, [])

    return (
        <main className="container">
            <section className="row">
                <div className="col-md-10">
                    <h2 className='mt-4'>Welcome, {user?.username}!</h2>
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