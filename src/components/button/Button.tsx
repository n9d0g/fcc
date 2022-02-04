import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
	location: any,
	text: any,
	documentTitle: any
}

const Button = (props: ButtonProps) => {
	return (
		<Link className='button' to={props.location}>
			<span className='button-text'>{props.text}</span>
		</Link>
	)
}

export default Button;