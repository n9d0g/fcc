import { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import styled from 'styled-components'

export const InfoModal = (props: any) => {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <InfoModalButton onClick={toggleModal}>
      <p>view info</p>
      {modal && (
        <Overlay>
          <ModalInfo>
            <CloseButton>
              <CloseButtonIcon>
                <CloseIcon />
              </CloseButtonIcon>
            </CloseButton>
            <p>
              <h4>speaker:</h4>
              {props.speaker}
            </p>
            <p>
              <h4>topic:</h4>
              {props.topic}
            </p>
            <p>
              <h4>scripture:</h4>
              {props.scripture}
            </p>
            <p>
              <h4>summary:</h4>
              {props.summary}
            </p>
          </ModalInfo>
        </Overlay>
      )}
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
  cursor: pointer;

  > p {
    color: var(--main-black);
    font-size: 1rem;
    text-decoration: underline;
    margin: 0;
    padding: 0;

    @media (max-width: 60em) {
      font-size: 0.75rem;
    }
  }

  &:hover,
  &:focus {
    cursor: pointer;
  }
`

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay);
  cursor: default;
`

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--main-white);
  border-radius: 0.25rem;
  padding: 1rem;
  max-width: 60rem;

  @media (max-width: 60em) {
    top: 60%;
    width: 70vw;
  }

  > p {
    font-size: 1rem;

    @media (max-width: 60em) {
      font-size: 0.7rem;
    }
  }
`

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CloseButtonIcon = styled.span`
  cursor: pointer;
`

const CloseIcon = styled(AiFillCloseCircle)`
  width: 1.5rem;
  height: 1.5rem;
`
