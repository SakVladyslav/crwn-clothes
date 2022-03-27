import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.util';

import './sign-up-form.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSumbit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('passwords do not match');

			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });

			resetFormFields();
		} catch (error) {
			console.log(error);

			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else if (error.code === 'auth/weak-password') {
				alert('Password should be at least 6 characters');
			} else {
				console.error('user creation encountered an error', error.message);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Don`t have an account?</h2>
			<span>Sign up with your email and password</span>

			<form onSubmit={handleSumbit}>
				<FormInput
					label='Display name'
					type='text'
					name='displayName'
					onChange={handleChange}
					value={displayName}
					required
				/>

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

				<FormInput
					label='Confirm password'
					type='password'
					name='confirmPassword'
					onChange={handleChange}
					value={confirmPassword}
					required
				/>

				<Button type='sumbit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
