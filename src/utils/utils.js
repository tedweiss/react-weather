/**
 * @function getPromiseData
 * @param  {string} url {the url used for the xhr call}
 * @return {object} {Promise object}
 */
export const getPromiseData = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}

/**
 * @function matchCity
 * @param  {object} userLocation  {city, lat, lon}
 * @param  {array} matchedCities {list of cities with same name as userLocation city}
 * @return {string} {city id of the matched city}
 */
export const matchCity = (userLocation, matchedCities) => {
  let cityId = ''
  matchedCities.map(city => {
    if (city.name === userLocation.city) {
      // check exact matches
      if (city.coord.lat.toString() === userLocation.lat && city.coord.lon.toString() === userLocation.lon) {
        cityId = city.id.toString()
      } else if (
        // match just whole number
        city.coord.lat.toString().split('.')[0] === userLocation.lat.split('.')[0] &&
        city.coord.lon.toString().split('.')[0] === userLocation.lon.split('.')[0]
      ) {
        cityId = city.id.toString()
      }
    }
  })
  return cityId
}

/**
 * @function convertDateTime
 * @param  {number} timestamp {unix time stamp}
 * @return {string} {Date}
 * @return {string} {Time}
 */
export const convertDateTime = timestamp => {
  let date = new Date(timestamp * 1000)
  return date.toString()
}

/**
 * @function handleHours
 * @param  {number} hours {hours in the day in military time}
 * @return {number} {non military time hours}
 * @return {string} {am pm}
 */
export const handleHours = hours => {
  let handledHours = hours
  let amPm = 'am'
  if (hours > 12) {
    handledHours = hours - 12
    amPm = 'pm'
  } else if (hours === 0) {
    handledHours = 12
  }
  return { handledHours, amPm }
}

/**
 * @function handleMinutes
 * @param  {number} minutes {minutes in the hour}
 * @return {string} {minutes in 2 digit format}
 */
export const handleMinutes = minutes => {
  let handledMinutes = minutes.toString()
  if (handledMinutes.split('').length === 1) {
    handledMinutes = '0' + handledMinutes
  }
  return handledMinutes
}
