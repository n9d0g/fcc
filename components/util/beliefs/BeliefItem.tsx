const Beliefs = (props: any) => {
  return (
    <article className="flex flex-col gap-5 self-start py-10 border-b-2 w-full">
      <h3 className="text-2xl font-semibold">{props.title}</h3>
      <p>{props.text}</p>
    </article>
  )
}

export default Beliefs
