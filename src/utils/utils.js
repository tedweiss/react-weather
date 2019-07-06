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
    if (city.name === userLocation.city && city.coord.lat.toString() === userLocation.lat && city.coord.lon.toString() === userLocation.lon) {
      cityId = city.id.toString()
    }
  })
  return cityId
}
