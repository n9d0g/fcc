import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import bg from '../../assets/pictures/men_bg.avif'
import introPic from '../../assets/pictures/about_bg.avif'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'

export const Men = () => {
  useDocumentTitle('Men')
  return (
    <>
      <Banner>
        <BannerTitle>MEN-istry</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/ministries" title="ministries" />
        <BreadcrumbItem location="/ministries/men" title="men" last />
      </Breadcrumb>
      <Intro>
        <IntroPicture />
        <IntroDescription>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>Contact: Bro Nathan Lardizabal </p>
          <IntroDescriptionContact>(647) 523-9361</IntroDescriptionContact>
        </IntroDescription>
      </Intro>
    </>
  )
}

const Banner = styled.section`
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0;
  background-image: url(${bg});
`

const BannerTitle = styled.h1`
  text-align: center;
  font-size: 4rem;
  color: var(--main-white);
`

const Intro = styled.section`
  display: flex;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 5rem 0;
`

const IntroPicture = styled.div`
  flex: 1;
  background-image: url(${introPic});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
  width: 500px;
  margin: 0 2rem;
`

const IntroDescription = styled.div`
  flex: 1;
`

const IntroDescriptionContact = styled.a`
  font-style: italic;
`
