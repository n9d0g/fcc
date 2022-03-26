import { Link } from 'react-router-dom'
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineYoutube,
} from 'react-icons/ai'
import styled from 'styled-components'
import { Logo } from './Logo'
import constants from '../data/constants'

interface DropdownItemProps {
  title: string
  location: string
}

export const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <FooterColumn>
          <Logo />
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to={constants.links.about.location}>
            {constants.links.about.text}
          </FooterLinkHeader>
          {constants.dropdowns.about.map(
            (item: DropdownItemProps, index: number) => {
              return (
                <FooterLink to={item.location} key={index}>
                  <FooterLinkText key={index}>{item.title}</FooterLinkText>
                </FooterLink>
              )
            }
          )}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to={constants.links.sermons.location}>
            {constants.links.sermons.text}
          </FooterLinkHeader>
          {constants.dropdowns.sermons.map(
            (item: DropdownItemProps, index: number) => {
              return (
                <FooterLink to={item.location} key={index}>
                  <FooterLinkText key={index}>{item.title}</FooterLinkText>
                </FooterLink>
              )
            }
          )}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to={constants.links.ministries.location}>
            {constants.links.ministries.text}
          </FooterLinkHeader>
          {constants.dropdowns.ministries.map(
            (item: DropdownItemProps, index: number) => {
              return (
                <FooterLink to={item.location} key={index}>
                  <FooterLinkText key={index}>{item.title}</FooterLinkText>
                </FooterLink>
              )
            }
          )}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to={constants.links.smallGroups.location}>
            {constants.links.smallGroups.text}
          </FooterLinkHeader>
          {constants.dropdowns.smallGroups.map(
            (item: DropdownItemProps, index: number) => {
              return (
                <FooterLink key={index} to={item.location}>
                  <FooterLinkText key={index}>{item.title}</FooterLinkText>
                </FooterLink>
              )
            }
          )}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to={constants.links.give.location}>
            {constants.links.give.text}
          </FooterLinkHeader>
          {constants.dropdowns.give.map(
            (item: DropdownItemProps, index: number) => {
              return (
                <FooterLink key={index} to={item.location}>
                  <FooterLinkText key={index}>{item.title}</FooterLinkText>
                </FooterLink>
              )
            }
          )}
        </FooterColumn>
        <SocialColumn>
          <SocialIcon
            aria-describedby={constants.aria.ig}
            aria-label={constants.aria.ig}
            href={constants.links.ig}
            target={constants.target}
            rel={constants.rel}>
            <AiOutlineInstagram />
          </SocialIcon>
          <SocialIcon
            aria-describedby={constants.aria.fb}
            aria-label={constants.aria.fb}
            href={constants.links.fb}
            target={constants.target}
            rel={constants.rel}>
            <AiOutlineFacebook />
          </SocialIcon>
          <SocialIcon
            aria-describedby={constants.aria.yt}
            aria-label={constants.aria.yt}
            href={constants.links.yt}
            target={constants.target}
            rel={constants.rel}>
            <AiOutlineYoutube />
          </SocialIcon>
        </SocialColumn>
      </Container>
      <LineBreak />
      <Copyright>&copy; {constants.copyright}</Copyright>
    </FooterSection>
  )
}

const FooterSection = styled.footer`
  color: var(--white);
  background-color: var(--black);
  padding: 4rem 5rem 10rem 5rem;
  transition: var(--transition-delay);
  box-shadow: 0px 24px 3px -24px var(--white);

  @media (max-width: 60em) {
    padding: 3rem 1rem;
  }
`

const Container = styled.div`
  display: flex;

  @media (max-width: 60em) {
    flex-direction: column;
  }
`

const FooterColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (max-width: 60em) {
    justify-content: center;
    padding: 0.5rem 1rem;
  }
`

const FooterLink = styled(Link)`
  color: var(--secondary-grey);
  text-decoration: none;
  margin-bottom: 1rem;
  line-height: 1.2;
`

const FooterLinkHeader = styled(FooterLink)`
  font-size: 1.2rem;
  text-decoration: underline;
  transition: 0.3s;

  &:hover,
  &:focus {
    font-size: 1.3rem;
  }
`

const FooterLinkText = styled.span`
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover,
  &:focus {
    box-shadow: 0 4px 0 0 var(--secondary-grey);
    color: var(--secondary-grey);
  }
`

const SocialColumn = styled(FooterColumn)`
  display: flex;
  flex: 0.2;

  @media (max-width: 60em) {
    flex-direction: row;
    gap: 3rem;
  }
`

const SocialIcon = styled.a`
  color: var(--secondary-grey);
  font-size: 1.8rem;
  margin-bottom: 1rem;
  transition: 0.3s;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`

const LineBreak = styled.hr`
  color: var(--secondary-grey);
`

const Copyright = styled.p`
  color: var(--secondary-grey);
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
`
