import Image from 'next/image'

type MinistriesItemProps = {
  href: string
  title: string
  description: string
  img: string
}

const MinistriesItem = (props: MinistriesItemProps) => {
  return (
    <li className="transition hover:opacity-80">
      <a href={props.href}>
        <Image
          className="relative rounded-t-md w-full h-[10rem]"
          src={props.img}
          alt="Ministry Image"
          width={500}
          height={50}
        />
        <button className="flex flex-col w-full h-[8rem] bg-green p-4 text-left rounded-b-md text-white">
          <h3 className="text-2xl">{props.title}</h3>
          <p className="text-sm py-2">{props.description}</p>
        </button>
      </a>
    </li>
  )
}

export default MinistriesItem
