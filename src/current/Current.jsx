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
