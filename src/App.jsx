import React, { useState } from 'react'

import Current from './current/Current'
import Forecast from './forecast/Forecast'

const App = () => {
  const [page, setPage] = useState('current')
  const handleClick = clickedPage => {
    setPage(clickedPage)
  }
  return (
    <>
      <button
        className={'current-button'}
        onClick={() => {
          handleClick('current')
        }}>
        Current
      </button>
      <button
        className={'forecast-button'}
        onClick={() => {
          handleClick('forecast')
        }}>
        Forecast
      </button>
      {page === 'current' && <Current />}
      {page === 'forecast' && <Forecast />}
    </>
  )
}

export default App
