import { Button } from '../../components/Button'
import styled from 'styled-components'
import joinPic from '../../assets/pictures/men_bg.avif'

export const HomeJoin = () => {
  return (
    <Join>
      <Content>
        <Header>come join us!</Header>
        <Description>
          Due to current COVID-19 restrictions, our services will be online
          through ZOOM until further notice. Come visit us this Sunday at
          10:30am EST!
        </Description>
        <Button
          external
          location="https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U"
          text="join now!"
        />
      </Content>
      <Picture />
    </Join>
  )
}

const Join = styled.section`
  display: flex;
  justify-content: center;
  padding: 12rem 0;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`

const Content = styled.div`
  flex: 1;
`

const Header = styled.h2`
  font-size: 3rem;
  text-align: left;
`

const Description = styled.p`
  font-size: 1.5rem;
  text-align: left;
`

const Picture = styled.div`
  background-image: url(${joinPic});
  background-position: 50% 50%;
  height: 300px;
  width: 300px;
  flex: 1;
`
