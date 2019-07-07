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
 * @return {object} {Date}
 * @return {string} {Time}
 */
export const convertDateTime = timestamp => {
  let newDate = new Date(timestamp * 1000)

  // date
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let day = findIndexValueOfArray(newDate.getDay(), days)
  let date = newDate.getDate()
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let month = findIndexValueOfArray(newDate.getMonth(), months)
  let year = newDate.getFullYear()
  let fullDate = { day, date, month, year }

  // time
  const { handledHours, amPm } = handleHours(newDate.getHours())
  let minutes = handleMinutes(newDate.getMinutes())
  let time = handledHours + ':' + minutes + '' + amPm
  return { fullDate, time }
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

/**
 * @function findIndexValueOfArray
 * @param  {number} index {index of what is being looked for in the array}
 * @param  {array} array {the array of what is being searched}
 * @return {any} {the individual indexed data from the array}
 */
export const findIndexValueOfArray = (index, array) => {
  let value = ''
  value = array[index]
  return value
}

/**
 * @function sortDays
 * @param  {number} currentDay {digit value of the day of the week}
 * @param  {array} hours {data in 3 hour increments}
 * @return {array} {grouped hours into each day}
 */
export const sortDays = (currentDay, hours) => {
  let groupedDays = []
  let currentDayHours = []
  hours.map(hour => {
    let newDate = new Date(hour.dt * 1000)
    let day = newDate.getDay()
    if (day === currentDay) {
      currentDayHours.push(hour)
    } else {
      groupedDays.push(currentDayHours)
      currentDayHours = []
      currentDay = currentDay + 1
      currentDayHours.push(hour)
    }
  })
  return groupedDays
}

/**
 * @function findMinMaxTemp
 * @param  {array} hours {range to be looped through to find min and max}
 * @return {object} {min and max numbers}
 */
export const findMinMaxTemp = hours => {
  let min
  let max
  hours.map(hour => {
    if (!min) {
      min = hour.main.temp_min
    } else if (hour.main.temp_min < min) {
      min = hour.main.temp_min
    }
    if (!max) {
      max = hour.main.temp_max
    } else if (hour.main.temp_max > max) {
      max = hour.main.temp_max
    }
  })
  return { min, max }
}
