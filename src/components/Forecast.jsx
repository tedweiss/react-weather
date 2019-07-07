import React, { Fragment } from 'react'

import { convertDateTime } from '../utils/utils'

const Forecast = props => {
  const { data } = props
  console.log('Forecast Data', data)

  return (
    <>
      {/* only renders if there is data */}
      {data.list && (
        <>
          <div className={'forecast-page'}>Forecast Weather</div>
          <div className={'city'}>{data.city.name}</div>
          {data.list.map((item, idx) => {
            let temperature = item.main.temp.toFixed()
            const { fullDate, time } = convertDateTime(item.dt)
            const { day, date, month, year } = fullDate

            let weatherIcon = item.main ? (item.weather[0] ? item.weather[0].icon : '') : ''
            return (
              <Fragment key={idx}>
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
              </Fragment>
            )
          })}
        </>
      )}
    </>
  )
}

export default Forecast
