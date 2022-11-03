import Head from 'next/head'

interface Props {
  title: string
}

const FccHead: React.FC<Props> = props => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="Freedom in Christ Church" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
  )
}

export default FccHead
