import React from 'react'

import Temperature from './Temperature'

const Result = props => {
  const { temperature, weatherDescription, weatherIcon, fullDate, time } = props
  const { day, date, month, year } = fullDate
  return (
    <>
      <div>
        <Temperature temperature={temperature} />
      </div>
      <img
        className={'weather-icon'}
        src={'http://openweathermap.org/img/w/' + weatherIcon + '.png'}
        alt={'weather icon'}
      />
      <div className={'weather-description'}>{weatherDescription}</div>
      <div className={'date'}>
        <div>{day}</div>
        {month} {date}, {year}
      </div>
      <div className={'time'}>{time}</div>
    </>
  )
}

export default Result
