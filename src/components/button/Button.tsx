import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
	location: any,
	text: any,
	documentTitle?: any,
	margin?: boolean
	external?: boolean
}

const Button = (props: ButtonProps) => {
	return (
		<>
			{props.external ? (
				<a className="button" href={props.location} target="_blank" rel="nnoopener noreferrer">
					<span className='button-text'>{props.text}</span>
				</a>
			) : (
			<Link className='button' to={props.location}>
				<span className='button-text'>{props.text}</span>
			</Link>
			)}
		</>
	)
}

export default Button;