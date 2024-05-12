import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInoutRef = useRef();

	const submitHandler = (events) => {
		events.preventDefault();

		const enteredAmount = +amountInoutRef.current.value;
		if (
			enteredAmount.toString().trim().length === 0 ||
			enteredAmount < 1 ||
			enteredAmount > 5
		) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(enteredAmount);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				label='Amount'
				ref={amountInoutRef}
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button className={classes.button}>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
