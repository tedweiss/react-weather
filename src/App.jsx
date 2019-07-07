import React, { useState } from 'react'

import Page from './components/Page'

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
      <Page page={page} />
    </>
  )
}

export default App
