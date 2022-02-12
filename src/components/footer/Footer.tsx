import { Link } from 'react-router-dom'
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineYoutube,
} from 'react-icons/ai'
import { smallGroupsDropdownItems } from '../../data/smallGroupsDropdownItems'
import { ministriesDropdownItems } from '../../data/ministriesDropdownItems'
import { sermonsDropdownItems } from '../../data/sermonsDropdownItems'
import { aboutDropdownItems } from '../../data/aboutDropdownItems'
import { giveDropdownItems } from '../../data/giveDropdownItems'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <FooterColumn>
          <Logo
            src={require('../../assets/logo/logo_white_black_bg.png')}
            alt="Freedom in Christ Church Logo"
          />
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to="/about">about</FooterLinkHeader>
          {aboutDropdownItems.map((item: any, index: any) => {
            return (
              <FooterLink to={item.location} key={index}>
                <FooterLinkText key={index}>{item.title}</FooterLinkText>
              </FooterLink>
            )
          })}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to="/sermons">sermons</FooterLinkHeader>
          {sermonsDropdownItems.map((item: any, index: any) => {
            return (
              <FooterLink to={item.location} key={index}>
                <FooterLinkText key={index}>{item.title}</FooterLinkText>
              </FooterLink>
            )
          })}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to="/ministries">ministries</FooterLinkHeader>
          {ministriesDropdownItems.map((item: any, index: any) => {
            return (
              <FooterLink to={item.location} key={index}>
                <FooterLinkText key={index}>{item.title}</FooterLinkText>
              </FooterLink>
            )
          })}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to="/smallgroups">small groups</FooterLinkHeader>
          {smallGroupsDropdownItems.map((item: any, index: any) => {
            return (
              <FooterLink to={item.location}>
                <FooterLinkText key={index}>{item.title}</FooterLinkText>
              </FooterLink>
            )
          })}
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader to="/give">give</FooterLinkHeader>
          {giveDropdownItems.map((item: any, index: any) => {
            return (
              <FooterLink to={item.location}>
                <FooterLinkText key={index}>{item.title}</FooterLinkText>
              </FooterLink>
            )
          })}
        </FooterColumn>
        <SocialColumn>
          <SocialIcon
            aria-describedby="fcc instagram"
            href="https://www.instagram.com/fcc.canada/"
            target="_blank"
            rel="noreferrer">
            <AiOutlineInstagram />
          </SocialIcon>
          <SocialIcon
            aria-describedby="fcc facebook"
            href="https://www.facebook.com/groups/1667915316820460"
            target="_blank"
            rel="noreferrer noopener">
            <AiOutlineFacebook />
          </SocialIcon>
          <SocialIcon
            aria-describedby="fcc youtube"
            href="https://www.youtube.com/channel/UCaB7HWdt8W-ErHqgvhR__rw"
            target="_blank"
            rel="noreferrer noopener">
            <AiOutlineYoutube />
          </SocialIcon>
        </SocialColumn>
      </Container>
      <LineBreak />
      <Copyright>
        &copy; Copyright by Freedom in Christ Church Canada. All Rights
        Reserved.
      </Copyright>
    </FooterSection>
  )
}

const FooterSection = styled.footer`
  color: var(--main-white);
  background-color: var(--main-black);
  padding: 4rem 5rem 10rem 5rem;
`

const Container = styled.div`
  display: flex;
`

const Logo = styled.img`
  display: block;
  max-width: 75%;
  height: auto;
`

const FooterColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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

  &:hover {
    font-size: 1.3rem;
  }
`

const FooterLinkText = styled.span`
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    box-shadow: 0 4px 0 0 var(--secondary-grey);
    color: var(--secondary-grey);
  }
`

const SocialColumn = styled(FooterColumn)`
  flex: 0.2;
`

const SocialIcon = styled.a`
  color: var(--secondary-grey);
  font-size: 1.8rem;
  margin-bottom: 1rem;
  transition: 0.3s;

  &:hover {
    opacity: 0.5;
  }
`

const LineBreak = styled.hr`
  color: var(--secondary-grey);
`

const Copyright = styled.h3`
  color: var(--secondary-grey);
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
`
