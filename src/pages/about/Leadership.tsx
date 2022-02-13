import { Elder } from '../../components/Elder'
import { Elders } from '../../data/Elders'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import banner from '../../assets/pictures/leadership_bg.avif'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'

export const Leadership = () => {
  useDocumentTitle('Leadership')
  return (
    <>
      <Banner>
        <BannerTitle>our team</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/about" title="about" />
        <BreadcrumbItem location="/about/leadership" title="leadership" last />
      </Breadcrumb>
      <Intro>
        <Text>
          We believe God’s plan is that each local church be led by a team of
          qualified, spiritually mature men and women whose proven leadership in
          their home and community demonstrates their ability to lead God’s
          church.
        </Text>
      </Intro>
      <Elder data={Elders} />
    </>
  )
}

const BannerTitle = styled.h1`
  font-size: 4rem;
  color: var(--main-white);
`

const Banner = styled.section`
  text-align: center;
  background-image: url(${banner});
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0 7rem 0;
`

const Intro = styled.section`
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin-right: auto;
  margin-left: auto;
  max-width: 1400px;
`

const Text = styled.p`
  text-align: center;
  font-size: 1.3rem;
  max-width: 800px;
`
