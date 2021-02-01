import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import Admin from './views/Admin';
import Contact from './views/Contact';
import Details from './views/Details';
import Donate from './views/Donate';
import Home from './views/Home';
import Login from './views/Login';
import NewDish from './views/NewDish';
import NotFound from './views/NotFound';
import Register from './views/Register';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51HyS4gIXqaK8Y2qAvhIXEiF3auu4hmNfnyaa6DsaqtvIrokmGdmfa2y4rWgsJEKTz8j52JicFaDUkm0eHmf3WjXi00TDOeQRFM')

const App = (props: AppProps) => {
	
	return (
		<BrowserRouter>
		<NavBar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/contact'>
					<Contact />
				</Route>
				<Route exact path='/details/:id'>
					<Details />
				</Route>
				<PrivateRoute exact path='/details/:id/admin'>
					<Admin />
				</PrivateRoute>
				<Route exact path='/donate'>
					<Elements stripe={stripePromise}>
						<Donate />
					</Elements>
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<PrivateRoute exact path='/newdish'>
					<NewDish />
				</PrivateRoute>
				<Route exact path='/register'>
					<Register />
				</Route>
				<Route exact path='*'>
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
