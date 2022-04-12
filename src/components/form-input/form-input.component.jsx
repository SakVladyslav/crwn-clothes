import { Group, InputLabel, Input } from './form-input.styles.jsx';

const FormInput = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />

			{label && (
				<InputLabel shrink={otherProps.value.length}>{label}</InputLabel>
			)}
		</Group>
	);
};

export default FormInput;
