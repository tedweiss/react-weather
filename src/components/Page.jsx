import React, { useEffect, useState } from 'react'

import { ipGeoLocationKey, openWeatherMapKey } from '../utils/apiKeys'
import { getPromiseData, matchCity } from '../utils/utils'
import Current from './Current'
import Forecast from './Forecast'

const Page = props => {
  const { page } = props
  const [userLocation, setUserLocation] = useState({})
  const [weatherUrl, setWeatherUrl] = useState('')
  const [weatherData, setWeatherData] = useState({})

  // get the user's location
  useEffect(
    () => {
      let ipUrl = 'https://api.ipgeolocation.io/ipgeo?fields=city,latitude,longitude&apiKey=' + ipGeoLocationKey
      getPromiseData(ipUrl).then(result => {
        console.log('ip:', JSON.parse(result))
        let data = JSON.parse(result)
        setUserLocation({ city: data.city, lat: data.latitude, lon: data.longitude })
      })
    },
    [page]
  )

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
        let dataUrl = ''
        let dataType = page === 'current' ? 'weather' : 'forecast'

        // matched city
        if (matchedCity) {
          // city id
          dataUrl =
            'https://api.openweathermap.org/data/2.5/' +
            dataType +
            '?id=' +
            matchedCity +
            '&units=imperial&appid=' +
            openWeatherMapKey
        } else {
          // city coordinates
          dataUrl =
            'https://api.openweathermap.org/data/2.5/' +
            dataType +
            '?lat=' +
            userLocation.lat +
            '&lon=' +
            userLocation.lon +
            '&units=imperial&appid=' +
            openWeatherMapKey
        }
        // check prevents error in console
        if (userLocation.lat && userLocation.lon) {
          setWeatherUrl(dataUrl)
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

  return (
    <>
      {/* only renders if there is data in weatherData */}
      {(weatherData.cod === 200 || weatherData.cod === '200') && (
        <>
          {page === 'current' && <Current data={weatherData} />}
          {page === 'forecast' && <Forecast data={weatherData} />}
        </>
      )}
    </>
  )
}

export default Page
