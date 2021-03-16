import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// BrowserRouter generates its own router history. 
// Here we want to replace it with an unopinionated router that we can provide with our own history object
import { loadStripe } from '@stripe/stripe-js';
import history from './utils/History';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import Admin from './views/private/Admin';
import Contact from './views/public/Contact';
import Details from './views/public/Details';
import Donate from './views/public/Donate';
import EditComment from './views/private/EditComment';
import Home from './views/public/Home';
import Login from './views/public/Login';
import NewDish from './views/private/NewDish';
import NotFound from './views/public/NotFound';
import Profile from './views/private/Profile';
import Register from './views/public/Register';

import { Elements } from '@stripe/react-stripe-js';
import ForgotPassword from './views/public/ForgotPassword';
import ResetPassword from './views/public/ResetPassword';

const stripePromise = loadStripe('pk_test_51HyS4gIXqaK8Y2qAvhIXEiF3auu4hmNfnyaa6DsaqtvIrokmGdmfa2y4rWgsJEKTz8j52JicFaDUkm0eHmf3WjXi00TDOeQRFM')

const App = (props: AppProps) => {
    
    return (
        <Router history={history}>
        <NavBar />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <PrivateRoute exact path='/admin/:id/'>
                    <Admin />
                </PrivateRoute>
                <PrivateRoute exact path='/comments/:id'>
                    <EditComment />
                </PrivateRoute>
                <Route exact path='/contact'>
                    <Contact />
                </Route>
                <Route exact path='/details/:id'>
                    <Details />
                </Route>
                <Route exact path='/donate'>
                    <Elements stripe={stripePromise}>
                        <Donate />
                    </Elements>
                </Route>
                <Route exact path='/forgot'>
                    <ForgotPassword />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <PrivateRoute exact path='/newdish'>
                    <NewDish />
                </PrivateRoute>
                <PrivateRoute exact path='/profile'>
                    <Profile />
                </PrivateRoute>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route exact path='/reset'>
                    <ResetPassword />
                </Route>
                <Route exact path='*'>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

interface AppProps {}

export default App;
