import styled from 'styled-components'

export const StyledApp = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  button {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
  }

  .app {
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: underline;
    text-align: center;
  }

  .city {
    font-size: 18px;
    font-weight: bold;
  }

  .high,
  .low {
    text-transform: capitalize;
    margin-left: 20px;
  }

  .result {
    padding-bottom: 10px;
  }

  .forecast-page ~ div .result {
    border-bottom: 1px solid black;
  }

  .current-page ~ .result .temperature {
    font-size: 16px;
    font-weight: bold;
  }

  .result .temperature,
  .weather-description {
    display: inline-block;
    vertical-align: top;
    margin-top: 15px;
    text-transform: capitalize;
  }

  .day {
    display: inline-block;
    vertical-align: top;
    width: 200px;
    margin: 0 10px;
  }

  .day-date {
    font-size: 18px;
    text-decoration: underline;
  }
`
