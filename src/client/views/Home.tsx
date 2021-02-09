import * as React from 'react';
import { useLocation } from 'react-router-dom';
import DishCard from '../components/DishCard';
import api from '../utils/Api-service';
import { IDishes } from '../utils/Types';

const Home: React.FC<HomeProps> = props => { 

    const location = useLocation<{ msg: string }>();

    const [dishes, setDishes] = React.useState<IDishes[]>([]);

    React.useEffect(() => {
        api('/api/dishes').then(dishes => setDishes(dishes));
    }, [])

    // click on card to go to details

    return (
        <main className='container'>
            {location.state?.msg && <div className='alert alert-success text-center justify-content-center'>{location.state.msg}</div>}
            <section className='row'>
                {dishes.map(dish => (
                    <DishCard key={`dish-key-${dish.id}`} dish={dish}/>
                ))}
            </section>
        </main>
    );
}

interface HomeProps {}

export default Home;