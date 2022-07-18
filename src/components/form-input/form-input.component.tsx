import { FC, InputHTMLAttributes } from 'react';
import { Group, InputLabel, Input } from './form-input.styles';

export type FormInputProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />

			{label && (
				<InputLabel
					shrink={Boolean(
						otherProps.value &&
							typeof otherProps.value === 'string' &&
							otherProps.value.length
					)}>
					{label}
				</InputLabel>
			)}
		</Group>
	);
};

export default FormInput;
