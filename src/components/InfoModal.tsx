import styled from 'styled-components'

export const InfoModal = (props: any) => {
	const showModal = () => {
		alert(
			'topic: ' + props.topic +
			'\nscripture: ' + props.scripture +	
			'\nsummary: ' + props.summary
		)
	}

	return (
		<InfoModalButton onClick={showModal}>
			<p>click here</p>	
		</InfoModalButton>
	)
}

const InfoModalButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
  text-decoration: none;
  color: var(--blue);
  background-color: transparent;
	border: none;
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	
	> p {
		font-size: 1rem;
		text-decoration: underline;
		margin: 0;
	}

  &:hover,
  &:focus {
		cursor: pointer;
	}
`