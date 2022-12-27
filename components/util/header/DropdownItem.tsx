type DropdownItemProps = {
  name: string
  href: string
  icon: any
  description: string
}

const DropdownItem = (props: DropdownItemProps) => {
  return (
    <a
      key={props.name}
      href={props.href}
      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
      <props.icon
        className="h-6 w-6 flex-shrink-0 text-blue"
        aria-hidden="true"
      />
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">{props.name}</p>
        <p className="mt-1 text-sm text-gray-500">{props.description}</p>
      </div>
    </a>
  )
}

export default DropdownItem
