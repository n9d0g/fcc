import { createContext } from 'react'
import { SermonLinks } from '../../data/SermonLinks'

const HomeSermonContext = createContext<any>(SermonLinks[0])

export default HomeSermonContext
