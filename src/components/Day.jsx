import React, { useState } from 'react'

import { convertDateTime, findMinMaxTemp } from '../utils/utils'
import Result from './Result'
import Temperature from './Temperature'

const Day = props => {
  const { data } = props
  const [displayResults, setDisplayResults] = useState(false)
  const { min, max } = findMinMaxTemp(data)
  let displayDate = convertDateTime(data[0].dt).fullDate
  const handleClick = () => {
    setDisplayResults(!displayResults)
  }
  return (
    <div className={'day'}>
      <div className={'day-date'}>
        {displayDate.day}, {displayDate.month} {displayDate.date}, {displayDate.year}
      </div>
      <div className={'high'}>
        high <Temperature temperature={max} />
      </div>
      <div className={'low'}>
        low <Temperature temperature={min} />
      </div>
      <button onClick={handleClick}>Hourly</button>
      {displayResults && (
        <>
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
      )}
    </div>
  )
}

export default Day
