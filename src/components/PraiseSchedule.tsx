import { Fragment } from 'react'
import styled from 'styled-components'
import { InfoModal } from './InfoModal'
import { Temporal } from '@js-temporal/polyfill'

export const PraiseSchedule = (props: any) => {
  // use new temporal API (polyfilled)
  let currentDate = Temporal.Now.plainDateISO().toString()

  // sort and filter schedule by date initially
  const originalPraiseData = props.data
    .filter((praiseData: any) => praiseData.date >= currentDate)
    .sort((a: any, b: any) => (a.date > b.date ? 1 : -1))

  return (
    <ScheduleContainer>
      <ScheduleTitle>Band of God schedule</ScheduleTitle>
      <Legend>
        📅: date; 👑: worship leader; 🎸: guitar; <br />
        🎹: piano; 🐟: bass; 🥁: drums;
        <br /> 🎤: backup; 🔊: sound; 📖: details
      </Legend>
      <WeekContainer>
        <WeekDataHeader>📅</WeekDataHeader>
        <WeekDataHeader>👑</WeekDataHeader>
        <WeekDataHeader>🎸</WeekDataHeader>
        <WeekDataHeader>🎹</WeekDataHeader>
        <WeekDataHeader>🐟</WeekDataHeader>
        <WeekDataHeader>🥁</WeekDataHeader>
        <WeekDataHeader>🎤</WeekDataHeader>
        <WeekDataHeader>🔊</WeekDataHeader>
        <WeekDataHeader>📖</WeekDataHeader>
        {originalPraiseData.map((item: any, index: any) => {
          // make the upcoming week red and bolded
          var first = false
          if (index === 0) first = true

          return (
            <Fragment key={index}>
              <WeekData first={first}>
                {item.date.replace('2022-', '')}
              </WeekData>
              <WeekData first={first}>{item.leader}</WeekData>
              <WeekData first={first}>{item.guitar}</WeekData>
              <WeekData first={first}>{item.piano}</WeekData>
              <WeekData first={first}>{item.bass}</WeekData>
              <WeekData first={first}>{item.drums}</WeekData>
              <WeekData first={first}>{item.backup}</WeekData>
              <WeekData first={first}>{item.av}</WeekData>
              <WeekData first={first}>
                <InfoModal
                  speaker={item.speaker}
                  topic={item.topic}
                  scripture={item.scripture}
                  summary={item.summary}
                />
              </WeekData>
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
  padding: 0 1rem 3rem 1rem;
`

const ScheduleTitle = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
`

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: 1fr;
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
  text-align: center;
  margin: 0;
  border: 1px solid var(--secondary-grey);
  font-weight: bold;
  font-size: 1rem;
  max-height: 2rem;

  @media (max-width: 60em) {
    font-size: 0.75rem;
    max-height: 1.5rem;
  }
`

const Legend = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 60em) {
    font-size: 0.9rem;
  }
`
