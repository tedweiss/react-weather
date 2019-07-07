import React from 'react'

import { convertDateTime } from '../utils/utils'

const Current = props => {
  const { data } = props
  console.log('Current Data', data)

  let temperature = data.main ? data.main.temp.toFixed() : ''
  const { fullDate, time } = convertDateTime(data.dt)
  const { day, date, month, year } = fullDate

  let weatherIcon = data.main ? (data.weather[0] ? data.weather[0].icon : '') : ''
  return (
    <>
      {/* only renders if there is data */}
      {/* prevents NaN from flashing on screen */}
      {data.main && (
        <>
          <div className={'current-page'}>Current Weather</div>
          <div className={'city'}>{data.name}</div>
          <div className={'temperature'}>
            {temperature}
            {temperature && <span>&deg;F</span>}
          </div>
          <img
            className={'weather-icon'}
            src={'http://openweathermap.org/img/w/' + weatherIcon + '.png'}
            alt={'weather icon'}
          />
          <div className={'date'}>
            <div>{day}</div>
            {month} {date}, {year}
          </div>
          <div className={'time'}>{time}</div>
        </>
      )}
    </>
  )
}

export default Current
