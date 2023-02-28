import Link from 'next/link'

export default function Hero() {
  return (
    <section className="flex min-h-[40rem] justify-center items-center">
      {/* <video className="absolute z-10 w-screen left-0" autoPlay loop muted>
        <source src="/bg.mp4" type="video/mp4" />
      </video> */}
      <div className="relative flex flex-col h-screen align-center justify-center text-center z-20">
        <h1 className="text-6xl">Welcome to Freedom in Christ Church.</h1>
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
      </div>
    </section>
  )
}
