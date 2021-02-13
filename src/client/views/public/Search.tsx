import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomeDishCard from '../../components/HomeDishCard';
import api from '../../utils/Api-service';
import useDebounce from '../../utils/Debounce';
import { IDishes } from '../../utils/Types';

const Search: React.FC<SearchProps> = props => {

    const location = useLocation<{ msg: string }>();

    const [dishes, setDishes] = useState<IDishes[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedQuery = useDebounce(searchTerm, 500)

    // brings in all posts
    useEffect(() => {
        api('/api/dishes/').then(dishes => setDishes(dishes));
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
                        <input placeholder='type your search term here...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-control" />
                    </form>
                </div>
            </section>
            <section className='row justify-content-center mt-3'>
                {dishes.map(dish => (
                    <HomeDishCard key={`dish-key-${dish.id}`} dish={dish} />
                ))}
            </section>
        </main>
    );
}

interface SearchProps { }

export default Search;