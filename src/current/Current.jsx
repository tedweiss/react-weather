import React, { useEffect, useState } from 'react'

import { ipGeoLocationKey } from '../utils/apiKeys'
import { getPromiseData } from '../utils/utils'

const Current = () => {
  const [userLocation, setUserLocation] = useState({})

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
        '&units=imperial&appid=6bf2d3a0044954f9aa03113e2c443ab3'
      getPromiseData(findUrl).then(result => {
        console.log('find:', JSON.parse(result))
      })
    },
    [userLocation]
  )
  return (
    <>
      <div className={'current-page'}>Current Weather</div>
      <div>{userLocation.city}</div>
      <div>{userLocation.lat}</div>
      <div>{userLocation.lon}</div>
    </>
  )
}

export default Current
