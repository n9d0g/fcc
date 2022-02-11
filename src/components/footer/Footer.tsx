import React from 'react'
import './Footer.css'
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

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-column">
          <img
            className="footer-logo"
            src={require('../../assets/logo/logo_white_black_bg.png')}
            alt="Freedom in Christ Church Logo"
          />
        </div>
        <div className="footer-column">
          <Link className="footer-link footer-header" to="/about">
            about
          </Link>
          {aboutDropdownItems.map((item: any, index: any) => {
            return (
              <Link className="footer-link" to={item.location} key={index}>
                <span className="text-link">{item.title}</span>
              </Link>
            )
          })}
        </div>
        <div className="footer-column">
          <Link className="footer-link footer-header" to="/sermons">
            sermons
          </Link>
          {sermonsDropdownItems.map((item: any, index: any) => {
            return (
              <Link className="footer-link" to={item.location} key={index}>
                <span className="text-link">{item.title}</span>
              </Link>
            )
          })}
        </div>
        <div className="footer-column">
          <Link className="footer-link footer-header" to="/ministries">
            ministries
          </Link>
          {ministriesDropdownItems.map((item: any, index: any) => {
            return (
              <Link className="footer-link" to={item.location} key={index}>
                <span className="text-link">{item.title}</span>
              </Link>
            )
          })}
        </div>
        <div className="footer-column">
          <Link className="footer-link footer-header" to="/smallgroups">
            small groups
          </Link>
          {smallGroupsDropdownItems.map((item: any, index: any) => {
            return (
            <Link className="footer-link" to={item.location}>
              <span className="text-link" key={index}>{item.title}</span>
            </Link>
            )
          })}
        </div>
        <div className="footer-column">
          <Link className="footer-link footer-header" to="/give">
            give
          </Link>
          {giveDropdownItems.map((item: any, index: any) => {
            return (
              <Link className="footer-link" to={item.location}>
                <span className="text-link" key={index}>{item.title}</span>
              </Link>
            )
          })}
        </div>
        <div className="footer-column socials">
          <a
            className="social-link"
            aria-describedby='fcc instagram'
            href="https://www.instagram.com/fcc.canada/"
            target="_blank"
            rel="noreferrer">
            <AiOutlineInstagram />
          </a>
          <a
            className="social-link"
            aria-describedby='fcc facebook'
            href="https://www.facebook.com/groups/1667915316820460"
            target="_blank"
            rel="noreferrer">
            <AiOutlineFacebook />
          </a>
          <a
            className="social-link"
            aria-describedby='fcc youtube'
            href="https://www.youtube.com/channel/UCaB7HWdt8W-ErHqgvhR__rw"
            target="_blank"
            rel="noreferrer">
            <AiOutlineYoutube />
          </a>
        </div>
      </div>
      <hr className="footer-hr" />
      <h3 className="copyright">
        &copy; Copyright by Freedom in Christ Church Canada. All Rights
        Reserved.
      </h3>
    </footer>
  )
}