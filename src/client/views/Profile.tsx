import * as React from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DishCard from '../components/DishCard';
import Layout from '../components/Layout';
import { ICategories, IDishes } from '../utils/Types';
import api from '../utils/Api-service';

// display details of an individual user
// map through and display dishes only that user has posted
// give that user the ability to edit or delete posts
// might need to make a UserCard component

const Profile: React.FC<ProfileProps> = props => { 

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const [dish, setDish] = useState<IDishes>(null)
    const [dishCategories, setDishCategories] = useState<ICategories[]>([]);

    const [dishes, setDishes] = React.useState<IDishes[]>([]);

    React.useEffect(() => {
        api('/api/dishes').then(dishes => setDishes(dishes));
    }, [])
  
    return ( 
        <main className="container"> 
            <section className="row">
                {dishes.map(dish => (
                    <DishCard key={`dish-key-${dish.id}`} dish={dish}/>
                ))}
            </section>
        </main>
    );
}

interface ProfileProps {}

export default Profile;