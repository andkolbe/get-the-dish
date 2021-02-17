import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeDishCard from '../../components/HomeDishCard';
import api, { TOKEN_KEY } from '../../utils/Api-service';
import { IDishes } from '../../utils/Types';

const Home: React.FC<HomeProps> = props => { 

    const location = useLocation<{ msg: string }>();

    const token = localStorage.getItem(TOKEN_KEY)

    const [dishes, setDishes] = React.useState<IDishes[]>([]);

    React.useEffect(() => {
        api('/api/dishes').then(dishes => setDishes(dishes));
    }, [])

    return (
    

        <main className='container'>
            {location.state?.msg && <div className='alert alert-success text-center justify-content-center'>{location.state.msg}</div>}
            {!token && 
                <h3 className='text-center my-5'>
                    <Link className='text-decoration-none' to='/login'>Log In</Link> or <Link className='text-decoration-none' to='/register'>Register</Link> to start posting dishes!
                </h3>
            }
            <section className='row'>
                {dishes.map(dish => (
                    <HomeDishCard key={`dish-key-${dish.id}`} dish={dish}/>
                ))}
            </section>
        </main>
    );
}

interface HomeProps {}

export default Home;