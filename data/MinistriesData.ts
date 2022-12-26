import {
  MusicalNoteIcon,
  UserIcon,
  AcademicCapIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline'

const MinistriesData = [
  {
    name: 'Men',
    description: "Men's Ministry.",
    href: '/ministries/men',
    icon: UserIcon,
  },
  {
    name: 'Women',
    description: "Women's Ministry.",
    href: '/ministries/women',
    icon: UserIcon,
  },
  {
    name: 'Pre-Teens',
    description: "Pre-teen's Ministry.",
    href: '/ministries/preteens',
    icon: AcademicCapIcon,
  },
  {
    name: 'Youth',
    description: 'Youth Ministry.',
    href: '/ministries/youth',
    icon: AcademicCapIcon,
  },
  {
    name: 'Young Adults',
    description: 'YA Ministry.',
    href: '/ministries/young-adults',
    icon: PuzzlePieceIcon,
  },
  {
    name: 'Praise & Worship',
    description: 'Praise and Worship Ministry.',
    href: '/ministries/praise',
    icon: MusicalNoteIcon,
  },
]

export default MinistriesData
