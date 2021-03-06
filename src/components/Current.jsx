import React from 'react'

import Result from './Result'
import Temperature from './Temperature'
import { convertDateTime, findMinMaxTemp } from '../utils/utils'

const Current = props => {
  const { data } = props
  console.log('Current Data', data)

  let temperature = data.main ? data.main.temp.toFixed() : ''
  const { fullDate, time } = convertDateTime(data.dt)

  let weatherIcon = data.main ? (data.weather[0] ? data.weather[0].icon : '') : ''
  let weatherDescription = data.main ? (data.weather[0] ? data.weather[0].description : '') : ''
  const { min, max } = findMinMaxTemp([data])
  return (
    <>
      {/* only renders if there is data */}
      {/* prevents NaN from flashing on screen */}
      {data.main && (
        <>
          <div className={'current-page title'}>Current Weather</div>
          <div className={'city'}>{data.name}</div>
          <div className={'high'}>
            high <Temperature temperature={max} />
          </div>
          <div className={'low'}>
            low <Temperature temperature={min} />
          </div>
          <Result
            temperature={temperature}
            weatherDescription={weatherDescription}
            weatherIcon={weatherIcon}
            fullDate={fullDate}
            time={time}
          />
        </>
      )}
    </>
  )
}

export default Current
