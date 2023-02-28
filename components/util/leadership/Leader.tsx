const Leader = (props: any) => {
  return (
    <article className="flex flex-col justify-center p-5">
      <img className="w-full h-[10-rem]" src={props.img} alt={props.name} />
      <div className="pt-10 pb-5">
        <h3 className="text-xl font-semibold">{props.name}</h3>
        <p className="my-2 text-lg">{props.description}</p>
      </div>
    </article>
  )
}

export default Leader
