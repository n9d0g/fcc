type MenuItemProps = {
  href: string
  title: string
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <a
      href={props.href}
      className="text-base font-medium text-gray-500 hover:text-gray-900">
      {props.title}
    </a>
  )
}

export default MenuItem
