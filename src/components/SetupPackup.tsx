import { Fragment } from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'

export const SetupPackup = (props: any) => {
  // use new temporal API (polyfilled)
  let currentDate = Temporal.Now.plainDateISO().toString()

  // sort and filter schedule by date initially
  const originalPraiseData = props.data
    .filter((praiseData: any) => praiseData.date >= currentDate)
    .sort((a: any, b: any) => (a.date > b.date ? 1 : -1))

  return (
    <ScheduleContainer>
      <ScheduleTitle>setup/packup schedule</ScheduleTitle>
      <WeekContainer>
        <WeekDataHeaderContainer>
          <WeekDataHeader>📅</WeekDataHeader>
          <WeekDataHeader>setup</WeekDataHeader>
          <WeekDataHeader>packup</WeekDataHeader>
        </WeekDataHeaderContainer>
        {originalPraiseData.map((item: any, index: any) => {
          var first = false
          if (index === 0) first = true
          return (
            <Fragment key={index}>
              <WeekData first={first}>
                {item.date.replace('2022-', '')}
              </WeekData>
              <WeekData first={first}>{item.setup}</WeekData>
              <WeekData first={first}>{item.packup}</WeekData>
            </Fragment>
          )
        })}
      </WeekContainer>
    </ScheduleContainer>
  )
}

const ScheduleContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 70rem;
  margin: 0 auto;
  padding-bottom: 3rem;
`

const ScheduleTitle = styled.h2`
  display: flex;
  justify-content: center;
`

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr;
  overflow: auto;
`

interface WeekDataProps {
  first: boolean
}

const WeekData = styled.p<WeekDataProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0;
  border: 1px solid var(--secondary-grey);
  color: ${props => (props.first ? `red` : `var(--main-black)`)};
  font-weight: ${props => (props.first ? `bold` : `normal`)};
  font-size: 1rem;

  @media (max-width: 60em) {
    font-size: 0.75rem;
  }
`

const WeekDataHeaderContainer = styled.div`
  display: contents;
  position: sticky;
  align-self: flex-start;
  top: 200px;
`

const WeekDataHeader = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  border: 1px solid var(--secondary-grey);
  font-weight: bold;
`
