import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeDishCard from '../../components/HomeDishCard';
import api, { TOKEN_KEY } from '../../utils/Api-service';
import useDebounce from '../../utils/Debounce';
import { IDishes } from '../../utils/Types';

const Home: React.FC<HomeProps> = props => {

    const location = useLocation<{ msg: string }>();

    const token = localStorage.getItem(TOKEN_KEY)

    const [dishes, setDishes] = useState<IDishes[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedQuery = useDebounce(searchTerm, 500)

    useEffect(() => {
        api('/api/dishes').then(dishes => setDishes(dishes));
    }, [])

    useEffect(() => {
        if (debouncedQuery) {
            api(`/api/dishes/search?term=${debouncedQuery}`).then(dishes => setDishes(dishes))
        } else {
            // if the debouncedQuery.length === 0, rerun /api/dishes to bring them back
            api('/api/dishes/').then(dishes => setDishes(dishes));
        }
    }, [debouncedQuery]);

    return (


        <main className='container'>
            <section className="row justify-content-center mt-3">
                <div className="col-md-4">
                    <form className="form-group">
                        <input placeholder='type your search term here...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-control input-shadow" />
                    </form>
                </div>
            </section>
            {location.state?.msg && <div className='alert alert-success text-center justify-content-center'>{location.state.msg}</div>}
            {!token &&
                <h3 className='text-center my-5'>
                    <Link className='text-decoration-none' to='/login'>Log In</Link> or <Link className='text-decoration-none' to='/register'>Register</Link> to start posting dishes!
                </h3>
            }
            <section className='row'>
                {dishes.map(dish => (
                    <HomeDishCard key={`dish-key-${dish.id}`} dish={dish} />
                ))}
            </section>
        </main>
    );
}

interface HomeProps { }

export default Home;