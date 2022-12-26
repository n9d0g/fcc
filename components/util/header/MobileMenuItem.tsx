type MobileMenuItemProps = {
  title: string
  href: string
}

const MobileMenuItem = (props: MobileMenuItemProps) => {
  return (
    <a
      href={props.href}
      className="text-base font-medium text-gray-900 hover:text-gray-700">
      {props.title}
    </a>
  )
}

export default MobileMenuItem
