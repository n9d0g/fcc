import { useState } from 'react';
import './Accordion.css';
import { FiPlus, FiMinus } from 'react-icons/fi';



export const Accordion = (props: any) => {
	const [clicked, setClicked] = useState<any>(false);

	const toggle = (index: any) => {
		if (clicked === index) {
			// if clicked item is already active, then close it
			return setClicked(null);
		}

		setClicked(index);
	}

	return (
		<div className="accordion-container">
			{props.data.map((item: any, index: any) => {
				return (
					<div className="accordion-item">
						<div className="accordion-closed-container" onClick={() => toggle(index)} key={index}>
							<h4 className="accordion-title">{item.title}</h4>
							<span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
						</div>
						{clicked === index ? (
							<p className="accordion-description">{item.description}</p>
						) : null}
					</div>
				)
			})}
		</div>
	) 
}