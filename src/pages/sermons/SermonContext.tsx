import { createContext } from 'react'
import { SermonLinks } from '../../data/SermonLinks'

const SermonContext = createContext<any>(SermonLinks[0])

export default SermonContext
