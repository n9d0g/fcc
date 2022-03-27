import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Temporal } from '@js-temporal/polyfill'

export const SetupPackup = (props: any) => {
  // use new temporal API (polyfilled)
  let currentDate = Temporal.Now.plainDateISO().toString()

  const [fullSchedule, setFullSchedule] = useState(true)

  // sort and filter schedule by date initially
  const originalPraiseData = props.data
    .filter((praiseData: any) => praiseData.date >= currentDate)
    .sort((a: any, b: any) => (a.date > b.date ? 1 : -1))

  const slicedOriginalPraiseData = originalPraiseData.slice(0, 3)

  return (
    <ScheduleContainer>
      <ScheduleTitle>setup/packup schedule</ScheduleTitle>
      <WeekContainer>
        <WeekDataHeader>📅</WeekDataHeader>
        <WeekDataHeader>setup</WeekDataHeader>
        <WeekDataHeader>packup</WeekDataHeader>
        {fullSchedule
          ? slicedOriginalPraiseData.map((item: any, index: any) => {
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
            })
          : originalPraiseData.map((item: any, index: any) => {
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
      <ButtonContainer>
        <SeeMoreButton onClick={() => setFullSchedule(!fullSchedule)}>
          see {fullSchedule ? 'more' : 'less'}
        </SeeMoreButton>
      </ButtonContainer>
    </ScheduleContainer>
  )
}

const ScheduleContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1rem 3rem 1rem;
`

const ScheduleTitle = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
`

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr;
  grid-template-rows: 1fr;
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

const WeekDataHeader = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  border: 1px solid var(--secondary-grey);
  font-weight: bold;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`

const SeeMoreButton = styled.button`
  padding: 1rem;
  border: 1px solid var(--main-blue);
  border-radius: 0.5rem;
  box-shadow: inset 0 56px 0 0 var(--main-blue);
  text-decoration: none;
  background-color: transparent;
  color: var(--white);
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: inset 0 0 0 0 var(--main-blue);
    outline: 0;
    color: var(--main-blue);
  }
`
