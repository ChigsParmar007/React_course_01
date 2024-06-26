import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD_ITEM') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedTotalAmount = state.totalAmount;
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
			updatedTotalAmount = state.totalAmount + action.item.price;
		} else {
			updatedItems = state.items.concat(action.item);
			updatedTotalAmount = state.totalAmount + action.item.price;
		}

		return { items: updatedItems, totalAmount: updatedTotalAmount };
	}
	if (action.type === 'REMOVE_ITEM') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedTotalAmount = state.totalAmount - existingCartItem.price;
		let updatedItems;

		if (existingCartItem) {
			if (existingCartItem.amount === 1) {
				updatedItems = state.items.filter((item) => item.id !== action.id);
			} else {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount - 1,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			}
		} else {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount <= 0 ? 0 : updatedTotalAmount,
		};
	}

	return { items: [], totalAmount: 0 };
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({
			type: 'ADD_ITEM',
			item,
		});
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({
			type: 'REMOVE_ITEM',
			id,
		});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
