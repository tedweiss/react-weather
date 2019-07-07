import React, { useEffect, useState } from 'react'

import { ipGeoLocationKey, openWeatherMapKey } from '../utils/apiKeys'
import { getPromiseData, matchCity, convertDateTime } from '../utils/utils'

const Current = () => {
  const [userLocation, setUserLocation] = useState({})
  const [weatherUrl, setWeatherUrl] = useState('')
  const [weatherData, setWeatherData] = useState({})

  // get the user's location
  useEffect(() => {
    let ipUrl = 'https://api.ipgeolocation.io/ipgeo?fields=city,latitude,longitude&apiKey=' + ipGeoLocationKey
    getPromiseData(ipUrl).then(result => {
      console.log('ip:', JSON.parse(result))
      let data = JSON.parse(result)
      setUserLocation({ city: data.city, lat: data.latitude, lon: data.longitude })
    })
  }, [])

  // find all the cities with that name
  useEffect(
    () => {
      let findUrl =
        'https://api.openweathermap.org/data/2.5/find?q=' +
        userLocation.city +
        '&units=imperial&appid=' +
        openWeatherMapKey
      getPromiseData(findUrl).then(result => {
        let matchedCity = matchCity(userLocation, JSON.parse(result).list)
        let currentUrl = ''

        // matched city
        if (matchedCity) {
          // city id
          currentUrl =
            'https://api.openweathermap.org/data/2.5/weather?id=' +
            matchedCity +
            '&units=imperial&appid=' +
            openWeatherMapKey
        } else {
          // city coordinates
          currentUrl =
            'https://api.openweathermap.org/data/2.5/weather?lat=' +
            userLocation.lat +
            '&lon=' +
            userLocation.lon +
            '&units=imperial&appid=' +
            openWeatherMapKey
        }
        // check prevents error in console
        if (userLocation.lat && userLocation.lon) {
          setWeatherUrl(currentUrl)
        }
      })
    },
    [userLocation]
  )
  useEffect(
    () => {
      // check prevents parsing error
      if (weatherUrl) {
        getPromiseData(weatherUrl).then(result => {
          setWeatherData(JSON.parse(result))
        })
      }
    },
    [weatherUrl]
  )
  console.log('weatherData', weatherData)

  let temperature = weatherData.main ? weatherData.main.temp.toFixed() : ''
  const { fullDate } = convertDateTime(weatherData.dt)
  const { day, date, month, year } = fullDate

  return (
    <>
      {/* only renders if there is data in weatherData */}
      {weatherData.main && (
        <>
          <div className={'current-page'}>Current Weather</div>
          <div>{weatherData.name}</div>
          <div className={'temperature'}>
            {temperature}
            {temperature && <span>&deg;F</span>}
          </div>
          <div className={'date'}>
            <div>{day}</div>
            {month} {date}, {year}
          </div>
        </>
      )}
    </>
  )
}

export default Current
