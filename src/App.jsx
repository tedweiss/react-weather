import React, { useState } from 'react'

import Page from './components/Page'
import { StyledApp } from './styles/styles'

const App = () => {
  const [page, setPage] = useState('current')
  const handleClick = clickedPage => {
    setPage(clickedPage)
  }
  return (
    <StyledApp className={'app'}>
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
    </StyledApp>
  )
}

export default App
