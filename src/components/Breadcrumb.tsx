import React from 'react'
import styled from 'styled-components'

export const Breadcrumb = (props: any) => {
  return (
    <BreadcrumbContainer id="breadcrumb">{props.children}</BreadcrumbContainer>
  )
}

const BreadcrumbContainer = styled.article`
  padding-top: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  justify-content: right;
  text-align: right;
`
