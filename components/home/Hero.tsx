import Link from 'next/link'

export default function Hero() {
  return (
    <section className="flex flex-col min-h-[40rem] align-center justify-center">
      <h1 className="text-5xl">Welcome to Freedom in Christ Church.</h1>
      <div className="flex justify-center align-middle gap-2 my-10 text-white">
        <Link
          className="px-6 py-3 bg-blue rounded-md ease-in hover:opacity-90"
          href="/about">
          I'm new
        </Link>
        <Link
          className="px-6 py-3 bg-blue rounded-md ease-in hover:opacity-90"
          href="sermons">
          Sermons
        </Link>
      </div>
    </section>
  )
}
