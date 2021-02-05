import * as React from 'react';
import DishCard from '../components/DishCard';
import api from '../utils/Api-service';
import { IDishes } from '../utils/Types';

const Home: React.FC<HomeProps> = props => { 

    const [dishes, setDishes] = React.useState<IDishes[]>([]);

    React.useEffect(() => {
        api('/api/dishes').then(dishes => setDishes(dishes));
    }, [])

    // click on a card to go to details

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

interface HomeProps {}

export default Home;