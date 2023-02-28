import { SliceSimulator } from '@prismicio/slice-simulator-react'
import { SliceZone } from '@prismicio/react'

// import { components } from '../slices'

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={({ slices }) => <SliceZone slices={slices} />}
    state={{}}
  />
)

export default SliceSimulatorPage
