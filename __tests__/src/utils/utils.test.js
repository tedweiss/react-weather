import {
  matchCity,
  convertDateTime,
  handleHours,
  handleMinutes,
  handleDay,
  handleMonth,
  findIndexValueOfArray
} from '../../../src/utils/utils'

describe('matchCity', () => {
  test('should return a string id of the city', () => {
    let userLocation = { city: 'Troy', lat: '42.7284', lon: '-73.6918' }
    let matchedCities = [
      {
        id: 5141502,
        name: 'Troy',
        coord: { lat: 42.7284, lon: -73.6918 },
        main: { temp: 79.02, pressure: 1017, humidity: 94, temp_min: 72, temp_max: 84.2 },
        dt: 1562375367,
        wind: { speed: 3.36, deg: 170 },
        sys: { country: 'US' },
        rain: null,
        snow: null,
        clouds: { all: 40 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }]
      }
    ]
    expect(matchCity(userLocation, matchedCities)).toEqual('5141502')
  })
  test('should return an empty string if there is no match', () => {
    let userLocation = { city: 'Troy', lat: '42.54680', lon: '-83.13530' }
    let matchedCities = [
      {
        id: 5141,
        name: 'Troy',
        coord: { lat: 42.7284, lon: -73.6918 },
        main: { temp: 79.02, pressure: 1017, humidity: 94, temp_min: 72, temp_max: 84.2 },
        dt: 1562375367,
        wind: { speed: 3.36, deg: 170 },
        sys: { country: 'US' },
        rain: null,
        snow: null,
        clouds: { all: 40 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }]
      },
      {
        id: 5141502,
        name: 'Troy',
        coord: { lat: 58.7284, lon: -92.6918 },
        main: { temp: 79.02, pressure: 1017, humidity: 94, temp_min: 72, temp_max: 84.2 },
        dt: 1562375367,
        wind: { speed: 3.36, deg: 170 },
        sys: { country: 'US' },
        rain: null,
        snow: null,
        clouds: { all: 40 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }]
      }
    ]
    expect(matchCity(userLocation, matchedCities)).toEqual('')
  })
  test('should return the city id when latitude and longitude match whole number', () => {
    let userLocation = { city: 'Troy', lat: '61.54680', lon: '-118.13530' }
    let matchedCities = [
      {
        id: 5141,
        name: 'Troy',
        coord: { lat: 42.7284, lon: -73.6918 },
        main: { temp: 79.02, pressure: 1017, humidity: 94, temp_min: 72, temp_max: 84.2 },
        dt: 1562375367,
        wind: { speed: 3.36, deg: 170 },
        sys: { country: 'US' },
        rain: null,
        snow: null,
        clouds: { all: 40 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }]
      },
      {
        id: 5141502,
        name: 'Troy',
        coord: { lat: 58.7284, lon: -92.6918 },
        main: { temp: 79.02, pressure: 1017, humidity: 94, temp_min: 72, temp_max: 84.2 },
        dt: 1562375367,
        wind: { speed: 3.36, deg: 170 },
        sys: { country: 'US' },
        rain: null,
        snow: null,
        clouds: { all: 40 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }]
      },
      {
        id: 512,
        name: 'Troy',
        coord: { lat: 61.7284, lon: -118.6918 },
        main: { temp: 79.02, pressure: 1017, humidity: 94, temp_min: 72, temp_max: 84.2 },
        dt: 1562375367,
        wind: { speed: 3.36, deg: 170 },
        sys: { country: 'US' },
        rain: null,
        snow: null,
        clouds: { all: 40 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }]
      }
    ]
    expect(matchCity(userLocation, matchedCities)).toEqual('512')
  })
})

describe('convertDateTime', () => {
  test('should return a readable time', () => {
    let timestamp = 1562421146
    let readableTime = '9:52am'
    expect(convertDateTime(timestamp).time).toEqual(readableTime)
  })
  test('should return a useable date object', () => {
    let timestamp = 1562421146
    let useableDateObj = { date: 6, day: 'Saturday', month: 'July', year: 2019 }
    expect(convertDateTime(timestamp).fullDate).toEqual(useableDateObj)
  })
})

describe('handleHours', () => {
  test('should return the correct hours', () => {
    let hours = 9
    expect(handleHours(hours).handledHours).toEqual(9)
  })
  test('should return the correct hours when hours are greater than 12', () => {
    let hours = 15
    expect(handleHours(hours).handledHours).toEqual(3)
  })
  test("should return '12' if the hours is '0'", () => {
    let hours = 0
    expect(handleHours(hours).handledHours).toEqual(12)
  })
  test("should return 'am' if the hours is '12' or less going into the function", () => {
    let hours = 6
    expect(handleHours(hours).amPm).toEqual('am')
  })
  test("should return 'pm' if the hours is greater than '12' going into the function", () => {
    let hours = 18
    expect(handleHours(hours).amPm).toEqual('pm')
  })
})

describe('handleMinutes', () => {
  test('should return the correct minutes if 2 digits are passed in', () => {
    let minutes = 34
    expect(handleMinutes(minutes)).toEqual('34')
  })
  test('should return the correct minutes in 2 digits format if 1 digit is passed in', () => {
    let minutes = 7
    expect(handleMinutes(minutes)).toEqual('07')
  })
})

describe('findIndexValueOfArray', () => {
  test('should return the index text value of the day of the week', () => {
    let index = 6
    let array = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    expect(findIndexValueOfArray(index, array)).toEqual('Saturday')
  })
  test('should return the index text value of the month', () => {
    let index = 11
    let array = [
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
    expect(findIndexValueOfArray(index, array)).toEqual('December')
  })
})
