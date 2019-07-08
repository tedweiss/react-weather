import React from 'react'

const Temperature = props => {
  const { temperature } = props
  return (
    <span className={'temperature'}>
      {temperature}
      {temperature && <span>&deg;F</span>}
    </span>
  )
}

export default Temperature
