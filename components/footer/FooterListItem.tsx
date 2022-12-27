type FooterListItemProps = {
  href: string
  title: string
}

const FooterListItem = (props: FooterListItemProps) => {
  return (
    <li className="mb-4">
      <a href={props.href} className="hover:underline">
        {props.title}
      </a>
    </li>
  )
}

export default FooterListItem
