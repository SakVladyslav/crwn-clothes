import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
	googleSignInStart,
	emailSignInStart,
} from '../../store/user/user.action';

import './sign-in-form.styles.tsx';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			resetFormFields();
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSumbit}>
				<FormInput
					label='Email'
					type='email'
					name='email'
					onChange={handleChange}
					value={email}
					required
				/>

				<FormInput
					label='Password'
					type='password'
					name='password'
					onChange={handleChange}
					value={password}
					required
				/>

				<ButtonsContainer>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						onClick={signInWithGoogle}
						buttonType={BUTTON_TYPE_CLASSES.google}>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
