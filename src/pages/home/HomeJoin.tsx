import { Button } from '../../components/Button'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import constants from '../../data/constants'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: 43.659809,
  lng: -79.604424,
}

export const HomeJoin = (props: any) => {
  let apiKey: string = process.env.REACT_APP_GOOGLE_MAP_API!

  return (
    <Join>
      <Content>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}>
          <Header>{props.title}</Header>
          <Description>{props.description}</Description>
          <Button
            external
            location={constants.links.zoom}
            text="join zoom here!"
          />
        </motion.div>
      </Content>
      <MapContainer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}>
        {apiKey && (
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={17}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        )}
      </MapContainer>
    </Join>
  )
}

const Join = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 5rem 1rem;
  @media (max-width: 60em) {
    flex-direction: column;
  }
`

const MapContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
  width: 50vw;
  height: 25vw;

  @media (max-width: 60em) {
    width: 85vw;
    max-height: 57vh;
    padding: 2rem;
    margin-top: 2rem;
  }
`

const Content = styled.div`
  flex: 1;
`

const Header = styled.h2`
  text-align: left;
`

const Description = styled.p`
  font-size: 1.5rem;
  text-align: left;
`
