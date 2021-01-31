import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';

import Admin from './views/Admin';
import Contact from './views/Contact';
import Details from './views/Details';
import Donate from './views/Donate';
import Home from './views/Home';
import Login from './views/Login';
import NewDish from './views/NewDish';
import NotFound from './views/NotFound';
import Register from './views/Register';

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
				<Route exact path='/details/:id/admin'>
					<Admin />
				</Route>
				<Route exact path='/donate'>
					<Donate />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<Route exact path='/newdish'>
					<NewDish />
				</Route>
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
