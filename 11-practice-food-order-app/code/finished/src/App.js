import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

const App = () => {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(!cartIsShown);
	};

	// const hideCartHandler = () => {
	// 	setCartIsShown(false);
	// };

	return (
		<>
			{cartIsShown && <Cart onHideCart={showCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</>
	);
};

export default App;
