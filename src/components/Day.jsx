import React from 'react'

import { convertDateTime, findMinMaxTemp } from '../utils/utils'
import Result from './Result'

const Day = props => {
  const { data } = props
  const { min, max } = findMinMaxTemp(data)
  let displayDate = convertDateTime(data[0].dt).fullDate
  return (
    <>
      <div className={'day-date'}>
        {displayDate.day}, {displayDate.month} {displayDate.date}, {displayDate.year}
      </div>
      <div className={'high'}>
        high {max}
        <span>&deg;F</span>
      </div>
      <div className={'low'}>
        low {min}
        <span>&deg;F</span>
      </div>
      {data.map((item, idx) => {
        let temperature = item.main.temp.toFixed()
        const { fullDate, time } = convertDateTime(item.dt)

        let weatherIcon = item.main ? (item.weather[0] ? item.weather[0].icon : '') : ''
        let weatherDescription = item.main ? (item.weather[0] ? item.weather[0].description : '') : ''
        return (
          <Result
            key={idx}
            temperature={temperature}
            weatherDescription={weatherDescription}
            weatherIcon={weatherIcon}
            fullDate={fullDate}
            time={time}
          />
        )
      })}
    </>
  )
}

export default Day
