import { createContext } from 'react'

const SermonContext = createContext<any>({
  title: 'Unconditional Love',
  speaker: 'Pastor Ed Bolante',
  scripture: 'Mark 12:28-34',
  date: 'February 6, 2022',
  youtube: 'LFw-gNIdLaY',
})

export default SermonContext
