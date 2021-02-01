import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TOKEN_KEY } from '../utils/Api-service';


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => { 
 
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        return (
            <Route { ...rest }>
                { children }
            </Route>
        );  
    } else {
        return <Redirect to={{ pathname: '/login', state: { msg: 'You must be logged in to write a new post' } }} />; // state can be an object
    }
}

interface PrivateRouteProps {
    exact?: boolean;
    path: string;
}

export default PrivateRoute;