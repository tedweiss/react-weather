import React from 'react'

import { sortDays } from '../utils/utils'
import Day from './Day'

const Forecast = props => {
  const { data } = props
  console.log('Forecast Data', data)
  let days = data.list ? sortDays(new Date().getDay(), data.list) : []

  return (
    <>
      {/* only renders if there is data */}
      {data.list && (
        <>
          <div className={'forecast-page'}>Forecast Weather</div>
          <div className={'city'}>{data.city.name}</div>
          {days.map((day, idx) => {
            return <Day key={idx} data={day} />
          })}
        </>
      )}
    </>
  )
}

export default Forecast
