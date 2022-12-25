import { FC, ReactNode } from 'react'
import FccFooter from './FccFooter'
import FccHead from './FccHead'
import FccHeader from './FccHeader'

type LayoutProps = {
  children: ReactNode
  title: string
}

export const Layout = (props: LayoutProps) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <FccHead title={props.title} />
      <FccHeader />
      <main className="flex flex-col container justify-center items-center mx-auto">
        {props.children}
      </main>
      <FccFooter />
    </div>
  )
}
