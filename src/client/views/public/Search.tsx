import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomeDishCard from '../../components/HomeDishCard';
import api from '../../utils/Api-service';
import { IDishes } from '../../utils/Types';

const Search: React.FC<SearchProps> = props => { 

    const location = useLocation<{ msg: string }>();

    const [dishes, setDishes] = useState<IDishes[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // brings in all posts
    useEffect(() => {
        api('/api/dishes/').then(dishes => setDishes(dishes));
    }, [])

    // incorporate deboucning
    useEffect(() => {
        if(!searchTerm.length) return;
        api(`/api/dishes/search?term=${searchTerm}`).then(dishes => setDishes(dishes))
    }, [searchTerm]);

    return (
        <main className='container'>
            <section className="row justify-content-center mt-3">
                <div className="col-md-4">
                    <form className="form-group">
                        <input placeholder='type your search term here...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-control"/>
                    </form>
                </div>
            </section>
            <section className='row justify-content-center mt-3'>
                {dishes.map( dish => (
                    <HomeDishCard key={`dish-key-${dish.id}`} dish={dish}/>
                ))}
            </section>
        </main>
    );
}

interface SearchProps {}

export default Search;