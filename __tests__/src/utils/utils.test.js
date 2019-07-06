import { matchCity } from '../../../src/utils/utils'

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
