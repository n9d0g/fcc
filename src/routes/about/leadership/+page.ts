import type { PageLoad } from './$types'

export const load = (({ params }) => {
  return {
    leaders: [
      {
        name: 'Roland Yumul',
        title: 'Elder',
        img: 'https://media.licdn.com/dms/image/C4E03AQEuwd6hM-eB5g/profile-displayphoto-shrink_800_800/0/1645071488158?e=1684972800&v=beta&t=SmZVICeppvChJG8QrWH8SiCiRSF0lzctWeoeZsB_8Aw',
      },
      {
        name: 'Errol Rasco',
        title: 'Elder',
        img: 'https://media.licdn.com/dms/image/C4E03AQFMUkKwE7wlhQ/profile-displayphoto-shrink_800_800/0/1605494638297?e=1684972800&v=beta&t=nKkWGcSleg24HL1qglE1AtJGWAZUcZqg0e7dB6-UMXY',
      },
      {
        name: 'Lolita Irong',
        title: 'Church Advisor',
        img: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.6435-9/65182990_2959573534085247_7142814347377508352_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=l6uYBTxSB_cAX8tIg1O&_nc_ht=scontent.fyto1-1.fna&oh=00_AfAhqQExbIuUBof7puMyGuWp3IowxY-MOABTewqvmi-TJQ&oe=64461878',
      },
      {
        name: 'Cherry Macasaquit',
        title: 'Church Secretary',
        img: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.18169-9/16113914_1534764989889169_4973299190117740899_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=L_YeMA2B4EMAX888v3y&_nc_ht=scontent.fyto1-1.fna&oh=00_AfAuQgU5KV7Ud78CSNC869AHt7fqyO9wnGHFezylYkZqow&oe=64460941',
      },
      {
        name: 'James Quiambao',
        title: 'Deacon - Church Administration',
        img: 'https://media.licdn.com/dms/image/D5603AQF0R4D9bDJe9Q/profile-displayphoto-shrink_800_800/0/1675285452098?e=1684972800&v=beta&t=qHYgAp9P5hLQ5W1-vFg5FOtzBZ_RokTH_CAtrLB1CIM',
      },
      {
        name: 'John Benologa',
        title: 'Deacon - Church Programming',
        img: 'https://media.licdn.com/dms/image/C5603AQEpnWR9SEvz7g/profile-displayphoto-shrink_800_800/0/1589062001481?e=1684972800&v=beta&t=wtl4hCSWznwgWotO-cdkdTYgneJ0nvOhg6WswbYAu-E',
      },
      {
        name: 'Ian Irong',
        title: 'Deacon - Church Outreach',
        img: 'https://scontent.fyto1-2.fna.fbcdn.net/v/t1.15752-9/337080317_774354094255285_2196328331222131331_n.jpg?stp=dst-jpg_p1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=O621cIix7RAAX8UZwtS&_nc_ht=scontent.fyto1-2.fna&oh=03_AdSayUSYIstPsekFKocP1Jx9DA8wyhFb20CL6MuQPmg8JQ&oe=64461F6B',
      },
      {
        name: 'Didymuz Cruz',
        title: 'Deacon - Church Edification',
        img: 'https://cdn.discordapp.com/avatars/337151082566254592/a6596db63639c9eb5ea5f554dc9806de.webp?size=128',
      },
    ],
  }
}) satisfies PageLoad
