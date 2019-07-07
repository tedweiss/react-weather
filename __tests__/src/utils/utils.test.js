import {
  matchCity,
  convertDateTime,
  handleHours,
  handleMinutes,
  handleDay,
  handleMonth,
  findIndexValueOfArray,
  sortDays,
  findMinMaxTemp
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

describe('sortDays', () => {
  let hours = [
    {
      dt: 1562522400,
      main: {
        temp: 78.15,
        temp_min: 78.15,
        temp_max: 78.17,
        pressure: 1016.26,
        sea_level: 1016.26,
        grnd_level: 983.91,
        humidity: 61,
        temp_kf: -0.01
      },
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
      clouds: { all: 38 },
      wind: { speed: 10.38, deg: 40.691 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-07 18:00:00'
    },
    {
      dt: 1562533200,
      main: {
        temp: 79.23,
        temp_min: 79.23,
        temp_max: 79.24,
        pressure: 1014.55,
        sea_level: 1014.55,
        grnd_level: 982.03,
        humidity: 55,
        temp_kf: -0.01
      },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
      clouds: { all: 12 },
      wind: { speed: 12.28, deg: 40.009 },
      rain: { '3h': 0.25 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-07 21:00:00'
    },
    {
      dt: 1562544000,
      main: {
        temp: 72.57,
        temp_min: 72.57,
        temp_max: 72.59,
        pressure: 1015.48,
        sea_level: 1015.48,
        grnd_level: 983.02,
        humidity: 59,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 6 },
      wind: { speed: 9.75, deg: 34.004 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-08 00:00:00'
    },
    {
      dt: 1562554800,
      main: {
        temp: 65.5,
        temp_min: 65.5,
        temp_max: 65.51,
        pressure: 1016.65,
        sea_level: 1016.65,
        grnd_level: 984.21,
        humidity: 52,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 7.92, deg: 32.825 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-08 03:00:00'
    },
    {
      dt: 1562565600,
      main: {
        temp: 62.87,
        temp_min: 62.87,
        temp_max: 62.87,
        pressure: 1016.03,
        sea_level: 1016.03,
        grnd_level: 983.55,
        humidity: 61,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 6.08, deg: 34.157 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-08 06:00:00'
    },
    {
      dt: 1562576400,
      main: {
        temp: 60.08,
        temp_min: 60.08,
        temp_max: 60.08,
        pressure: 1016.4,
        sea_level: 1016.4,
        grnd_level: 983.67,
        humidity: 74,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 7.16, deg: 17.851 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-08 09:00:00'
    },
    {
      dt: 1562587200,
      main: {
        temp: 63.23,
        temp_min: 63.23,
        temp_max: 63.23,
        pressure: 1017.24,
        sea_level: 1017.24,
        grnd_level: 984.44,
        humidity: 75,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 7.52, deg: 32.734 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-08 12:00:00'
    },
    {
      dt: 1562598000,
      main: {
        temp: 72.8,
        temp_min: 72.8,
        temp_max: 72.8,
        pressure: 1018.17,
        sea_level: 1018.17,
        grnd_level: 985.42,
        humidity: 50,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 7.61, deg: 47.037 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-08 15:00:00'
    },
    {
      dt: 1562608800,
      main: {
        temp: 78.99,
        temp_min: 78.99,
        temp_max: 78.99,
        pressure: 1017.51,
        sea_level: 1017.51,
        grnd_level: 984.61,
        humidity: 35,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 6.53, deg: 26.486 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-08 18:00:00'
    },
    {
      dt: 1562619600,
      main: {
        temp: 79.3,
        temp_min: 79.3,
        temp_max: 79.3,
        pressure: 1016.68,
        sea_level: 1016.68,
        grnd_level: 983.69,
        humidity: 41,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 8.9, deg: 36.231 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-08 21:00:00'
    },
    {
      dt: 1562630400,
      main: {
        temp: 72.55,
        temp_min: 72.55,
        temp_max: 72.55,
        pressure: 1017.24,
        sea_level: 1017.24,
        grnd_level: 984.58,
        humidity: 53,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 8.93, deg: 40.882 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-09 00:00:00'
    },
    {
      dt: 1562641200,
      main: {
        temp: 66.58,
        temp_min: 66.58,
        temp_max: 66.58,
        pressure: 1017.92,
        sea_level: 1017.92,
        grnd_level: 985.38,
        humidity: 63,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 5.14, deg: 63.836 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-09 03:00:00'
    },
    {
      dt: 1562652000,
      main: {
        temp: 63.95,
        temp_min: 63.95,
        temp_max: 63.95,
        pressure: 1017.82,
        sea_level: 1017.82,
        grnd_level: 985.34,
        humidity: 66,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 3.15, deg: 67.28 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-09 06:00:00'
    },
    {
      dt: 1562662800,
      main: {
        temp: 62.52,
        temp_min: 62.52,
        temp_max: 62.52,
        pressure: 1017.58,
        sea_level: 1017.58,
        grnd_level: 984.8,
        humidity: 69,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 4.43, deg: 53.703 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-09 09:00:00'
    },
    {
      dt: 1562673600,
      main: {
        temp: 66.05,
        temp_min: 66.05,
        temp_max: 66.05,
        pressure: 1019.31,
        sea_level: 1019.31,
        grnd_level: 986.64,
        humidity: 68,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 6 },
      wind: { speed: 5.21, deg: 62.677 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-09 12:00:00'
    },
    {
      dt: 1562684400,
      main: {
        temp: 75.77,
        temp_min: 75.77,
        temp_max: 75.77,
        pressure: 1018.7,
        sea_level: 1018.7,
        grnd_level: 986.38,
        humidity: 39,
        temp_kf: 0
      },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
      clouds: { all: 13 },
      wind: { speed: 5.35, deg: 98.228 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-09 15:00:00'
    },
    {
      dt: 1562695200,
      main: {
        temp: 83.51,
        temp_min: 83.51,
        temp_max: 83.51,
        pressure: 1017.99,
        sea_level: 1017.99,
        grnd_level: 985.33,
        humidity: 29,
        temp_kf: 0
      },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
      clouds: { all: 23 },
      wind: { speed: 2.66, deg: 151.029 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-09 18:00:00'
    },
    {
      dt: 1562706000,
      main: {
        temp: 84.22,
        temp_min: 84.22,
        temp_max: 84.22,
        pressure: 1016.33,
        sea_level: 1016.33,
        grnd_level: 983.67,
        humidity: 40,
        temp_kf: 0
      },
      weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
      clouds: { all: 59 },
      wind: { speed: 4.81, deg: 251.733 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-09 21:00:00'
    },
    {
      dt: 1562716800,
      main: {
        temp: 76.09,
        temp_min: 76.09,
        temp_max: 76.09,
        pressure: 1016.34,
        sea_level: 1016.34,
        grnd_level: 984.21,
        humidity: 63,
        temp_kf: 0
      },
      weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }],
      clouds: { all: 63 },
      wind: { speed: 4.18, deg: 286.308 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-10 00:00:00'
    },
    {
      dt: 1562727600,
      main: {
        temp: 71.54,
        temp_min: 71.54,
        temp_max: 71.54,
        pressure: 1017.03,
        sea_level: 1017.03,
        grnd_level: 985.08,
        humidity: 76,
        temp_kf: 0
      },
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
      clouds: { all: 43 },
      wind: { speed: 3.47, deg: 196.417 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-10 03:00:00'
    },
    {
      dt: 1562738400,
      main: {
        temp: 69.29,
        temp_min: 69.29,
        temp_max: 69.29,
        pressure: 1015.96,
        sea_level: 1015.96,
        grnd_level: 983.95,
        humidity: 83,
        temp_kf: 0
      },
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
      clouds: { all: 47 },
      wind: { speed: 1.48, deg: 152.424 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-10 06:00:00'
    },
    {
      dt: 1562749200,
      main: {
        temp: 68.02,
        temp_min: 68.02,
        temp_max: 68.02,
        pressure: 1015.78,
        sea_level: 1015.78,
        grnd_level: 983.73,
        humidity: 83,
        temp_kf: 0
      },
      weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
      clouds: { all: 100 },
      wind: { speed: 1.41, deg: 58.753 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-10 09:00:00'
    },
    {
      dt: 1562760000,
      main: {
        temp: 71.33,
        temp_min: 71.33,
        temp_max: 71.33,
        pressure: 1015.93,
        sea_level: 1015.93,
        grnd_level: 983.76,
        humidity: 80,
        temp_kf: 0
      },
      weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
      clouds: { all: 100 },
      wind: { speed: 1.25, deg: 64.664 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-10 12:00:00'
    },
    {
      dt: 1562770800,
      main: {
        temp: 79.76,
        temp_min: 79.76,
        temp_max: 79.76,
        pressure: 1015.89,
        sea_level: 1015.89,
        grnd_level: 983.77,
        humidity: 60,
        temp_kf: 0
      },
      weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
      clouds: { all: 96 },
      wind: { speed: 4.38, deg: 235.161 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-10 15:00:00'
    },
    {
      dt: 1562781600,
      main: {
        temp: 84.17,
        temp_min: 84.17,
        temp_max: 84.17,
        pressure: 1014.44,
        sea_level: 1014.44,
        grnd_level: 982.38,
        humidity: 49,
        temp_kf: 0
      },
      weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
      clouds: { all: 65 },
      wind: { speed: 7.16, deg: 236.116 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-10 18:00:00'
    },
    {
      dt: 1562792400,
      main: {
        temp: 84.66,
        temp_min: 84.66,
        temp_max: 84.66,
        pressure: 1012.74,
        sea_level: 1012.74,
        grnd_level: 980.92,
        humidity: 54,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 8.46, deg: 234.455 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-10 21:00:00'
    },
    {
      dt: 1562803200,
      main: {
        temp: 80.69,
        temp_min: 80.69,
        temp_max: 80.69,
        pressure: 1011.19,
        sea_level: 1011.19,
        grnd_level: 979.64,
        humidity: 71,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 7.36, deg: 214.757 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-11 00:00:00'
    },
    {
      dt: 1562814000,
      main: {
        temp: 75.23,
        temp_min: 75.23,
        temp_max: 75.23,
        pressure: 1011,
        sea_level: 1011,
        grnd_level: 979.32,
        humidity: 83,
        temp_kf: 0
      },
      weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
      clouds: { all: 89 },
      wind: { speed: 7.9, deg: 204.249 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-11 03:00:00'
    },
    {
      dt: 1562824800,
      main: {
        temp: 71.76,
        temp_min: 71.76,
        temp_max: 71.76,
        pressure: 1009.65,
        sea_level: 1009.65,
        grnd_level: 977.63,
        humidity: 91,
        temp_kf: 0
      },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10n' }],
      clouds: { all: 71 },
      wind: { speed: 10.04, deg: 262.664 },
      rain: { '3h': 0.563 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-11 06:00:00'
    },
    {
      dt: 1562835600,
      main: {
        temp: 66.29,
        temp_min: 66.29,
        temp_max: 66.29,
        pressure: 1009.55,
        sea_level: 1009.55,
        grnd_level: 977.67,
        humidity: 89,
        temp_kf: 0
      },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' }],
      clouds: { all: 22 },
      wind: { speed: 9.1, deg: 304.256 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-11 09:00:00'
    },
    {
      dt: 1562846400,
      main: {
        temp: 65.57,
        temp_min: 65.57,
        temp_max: 65.57,
        pressure: 1010.61,
        sea_level: 1010.61,
        grnd_level: 978.56,
        humidity: 86,
        temp_kf: 0
      },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
      clouds: { all: 12 },
      wind: { speed: 10.65, deg: 296.376 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-11 12:00:00'
    },
    {
      dt: 1562857200,
      main: {
        temp: 72.78,
        temp_min: 72.78,
        temp_max: 72.78,
        pressure: 1011.62,
        sea_level: 1011.62,
        grnd_level: 979.31,
        humidity: 71,
        temp_kf: 0
      },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
      clouds: { all: 11 },
      wind: { speed: 11.88, deg: 300.706 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-11 15:00:00'
    },
    {
      dt: 1562868000,
      main: {
        temp: 72.26,
        temp_min: 72.26,
        temp_max: 72.26,
        pressure: 1011.48,
        sea_level: 1011.48,
        grnd_level: 979.16,
        humidity: 73,
        temp_kf: 0
      },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
      clouds: { all: 42 },
      wind: { speed: 11.41, deg: 304.298 },
      rain: { '3h': 0.125 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-11 18:00:00'
    },
    {
      dt: 1562878800,
      main: {
        temp: 74.46,
        temp_min: 74.46,
        temp_max: 74.46,
        pressure: 1011.49,
        sea_level: 1011.49,
        grnd_level: 979.27,
        humidity: 67,
        temp_kf: 0
      },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
      clouds: { all: 66 },
      wind: { speed: 12.59, deg: 325.808 },
      rain: { '3h': 0.062 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-11 21:00:00'
    },
    {
      dt: 1562889600,
      main: {
        temp: 72.65,
        temp_min: 72.65,
        temp_max: 72.65,
        pressure: 1011.8,
        sea_level: 1011.8,
        grnd_level: 979.71,
        humidity: 74,
        temp_kf: 0
      },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10n' }],
      clouds: { all: 62 },
      wind: { speed: 7.4, deg: 320.305 },
      rain: { '3h': 0.063 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-12 00:00:00'
    },
    {
      dt: 1562900400,
      main: {
        temp: 67.56,
        temp_min: 67.56,
        temp_max: 67.56,
        pressure: 1013.49,
        sea_level: 1013.49,
        grnd_level: 981.18,
        humidity: 86,
        temp_kf: 0
      },
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
      clouds: { all: 46 },
      wind: { speed: 6.33, deg: 315.359 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-12 03:00:00'
    },
    {
      dt: 1562911200,
      main: {
        temp: 68.13,
        temp_min: 68.13,
        temp_max: 68.13,
        pressure: 1013.36,
        sea_level: 1013.36,
        grnd_level: 981.06,
        humidity: 78,
        temp_kf: 0
      },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10n' }],
      clouds: { all: 74 },
      wind: { speed: 5.57, deg: 27.627 },
      rain: { '3h': 0.126 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-12 06:00:00'
    },
    {
      dt: 1562922000,
      main: {
        temp: 62.69,
        temp_min: 62.69,
        temp_max: 62.69,
        pressure: 1013.85,
        sea_level: 1013.85,
        grnd_level: 981.58,
        humidity: 79,
        temp_kf: 0
      },
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
      clouds: { all: 36 },
      wind: { speed: 6.96, deg: 2.245 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-12 09:00:00'
    },
    {
      dt: 1562932800,
      main: {
        temp: 63.92,
        temp_min: 63.92,
        temp_max: 63.92,
        pressure: 1014.97,
        sea_level: 1014.97,
        grnd_level: 982.62,
        humidity: 74,
        temp_kf: 0
      },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
      clouds: { all: 18 },
      wind: { speed: 4.94, deg: 10.205 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-12 12:00:00'
    },
    {
      dt: 1562943600,
      main: {
        temp: 72.92,
        temp_min: 72.92,
        temp_max: 72.92,
        pressure: 1015.66,
        sea_level: 1015.66,
        grnd_level: 983.06,
        humidity: 53,
        temp_kf: 0
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 4.72, deg: 349.148 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-12 15:00:00'
    }
  ]
  test('should return the hours grouped into future days', () => {
    let currentDay = 0
    let sortedDays = [
      [
        {
          dt: 1562522400,
          main: {
            temp: 78.15,
            temp_min: 78.15,
            temp_max: 78.17,
            pressure: 1016.26,
            sea_level: 1016.26,
            grnd_level: 983.91,
            humidity: 61,
            temp_kf: -0.01
          },
          weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
          clouds: { all: 38 },
          wind: { speed: 10.38, deg: 40.691 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-07 18:00:00'
        },
        {
          dt: 1562533200,
          main: {
            temp: 79.23,
            temp_min: 79.23,
            temp_max: 79.24,
            pressure: 1014.55,
            sea_level: 1014.55,
            grnd_level: 982.03,
            humidity: 55,
            temp_kf: -0.01
          },
          weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
          clouds: { all: 12 },
          wind: { speed: 12.28, deg: 40.009 },
          rain: { '3h': 0.25 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-07 21:00:00'
        },
        {
          dt: 1562544000,
          main: {
            temp: 72.57,
            temp_min: 72.57,
            temp_max: 72.59,
            pressure: 1015.48,
            sea_level: 1015.48,
            grnd_level: 983.02,
            humidity: 59,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 6 },
          wind: { speed: 9.75, deg: 34.004 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-08 00:00:00'
        },
        {
          dt: 1562554800,
          main: {
            temp: 65.5,
            temp_min: 65.5,
            temp_max: 65.51,
            pressure: 1016.65,
            sea_level: 1016.65,
            grnd_level: 984.21,
            humidity: 52,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 7.92, deg: 32.825 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-08 03:00:00'
        }
      ],
      [
        {
          dt: 1562565600,
          main: {
            temp: 62.87,
            temp_min: 62.87,
            temp_max: 62.87,
            pressure: 1016.03,
            sea_level: 1016.03,
            grnd_level: 983.55,
            humidity: 61,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 6.08, deg: 34.157 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-08 06:00:00'
        },
        {
          dt: 1562576400,
          main: {
            temp: 60.08,
            temp_min: 60.08,
            temp_max: 60.08,
            pressure: 1016.4,
            sea_level: 1016.4,
            grnd_level: 983.67,
            humidity: 74,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 7.16, deg: 17.851 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-08 09:00:00'
        },
        {
          dt: 1562587200,
          main: {
            temp: 63.23,
            temp_min: 63.23,
            temp_max: 63.23,
            pressure: 1017.24,
            sea_level: 1017.24,
            grnd_level: 984.44,
            humidity: 75,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          clouds: { all: 0 },
          wind: { speed: 7.52, deg: 32.734 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-08 12:00:00'
        },
        {
          dt: 1562598000,
          main: {
            temp: 72.8,
            temp_min: 72.8,
            temp_max: 72.8,
            pressure: 1018.17,
            sea_level: 1018.17,
            grnd_level: 985.42,
            humidity: 50,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          clouds: { all: 0 },
          wind: { speed: 7.61, deg: 47.037 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-08 15:00:00'
        },
        {
          dt: 1562608800,
          main: {
            temp: 78.99,
            temp_min: 78.99,
            temp_max: 78.99,
            pressure: 1017.51,
            sea_level: 1017.51,
            grnd_level: 984.61,
            humidity: 35,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          clouds: { all: 0 },
          wind: { speed: 6.53, deg: 26.486 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-08 18:00:00'
        },
        {
          dt: 1562619600,
          main: {
            temp: 79.3,
            temp_min: 79.3,
            temp_max: 79.3,
            pressure: 1016.68,
            sea_level: 1016.68,
            grnd_level: 983.69,
            humidity: 41,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          clouds: { all: 0 },
          wind: { speed: 8.9, deg: 36.231 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-08 21:00:00'
        },
        {
          dt: 1562630400,
          main: {
            temp: 72.55,
            temp_min: 72.55,
            temp_max: 72.55,
            pressure: 1017.24,
            sea_level: 1017.24,
            grnd_level: 984.58,
            humidity: 53,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 8.93, deg: 40.882 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-09 00:00:00'
        },
        {
          dt: 1562641200,
          main: {
            temp: 66.58,
            temp_min: 66.58,
            temp_max: 66.58,
            pressure: 1017.92,
            sea_level: 1017.92,
            grnd_level: 985.38,
            humidity: 63,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 5.14, deg: 63.836 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-09 03:00:00'
        }
      ],
      [
        {
          dt: 1562652000,
          main: {
            temp: 63.95,
            temp_min: 63.95,
            temp_max: 63.95,
            pressure: 1017.82,
            sea_level: 1017.82,
            grnd_level: 985.34,
            humidity: 66,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 3.15, deg: 67.28 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-09 06:00:00'
        },
        {
          dt: 1562662800,
          main: {
            temp: 62.52,
            temp_min: 62.52,
            temp_max: 62.52,
            pressure: 1017.58,
            sea_level: 1017.58,
            grnd_level: 984.8,
            humidity: 69,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 4.43, deg: 53.703 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-09 09:00:00'
        },
        {
          dt: 1562673600,
          main: {
            temp: 66.05,
            temp_min: 66.05,
            temp_max: 66.05,
            pressure: 1019.31,
            sea_level: 1019.31,
            grnd_level: 986.64,
            humidity: 68,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          clouds: { all: 6 },
          wind: { speed: 5.21, deg: 62.677 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-09 12:00:00'
        },
        {
          dt: 1562684400,
          main: {
            temp: 75.77,
            temp_min: 75.77,
            temp_max: 75.77,
            pressure: 1018.7,
            sea_level: 1018.7,
            grnd_level: 986.38,
            humidity: 39,
            temp_kf: 0
          },
          weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
          clouds: { all: 13 },
          wind: { speed: 5.35, deg: 98.228 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-09 15:00:00'
        },
        {
          dt: 1562695200,
          main: {
            temp: 83.51,
            temp_min: 83.51,
            temp_max: 83.51,
            pressure: 1017.99,
            sea_level: 1017.99,
            grnd_level: 985.33,
            humidity: 29,
            temp_kf: 0
          },
          weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
          clouds: { all: 23 },
          wind: { speed: 2.66, deg: 151.029 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-09 18:00:00'
        },
        {
          dt: 1562706000,
          main: {
            temp: 84.22,
            temp_min: 84.22,
            temp_max: 84.22,
            pressure: 1016.33,
            sea_level: 1016.33,
            grnd_level: 983.67,
            humidity: 40,
            temp_kf: 0
          },
          weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
          clouds: { all: 59 },
          wind: { speed: 4.81, deg: 251.733 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-09 21:00:00'
        },
        {
          dt: 1562716800,
          main: {
            temp: 76.09,
            temp_min: 76.09,
            temp_max: 76.09,
            pressure: 1016.34,
            sea_level: 1016.34,
            grnd_level: 984.21,
            humidity: 63,
            temp_kf: 0
          },
          weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }],
          clouds: { all: 63 },
          wind: { speed: 4.18, deg: 286.308 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-10 00:00:00'
        },
        {
          dt: 1562727600,
          main: {
            temp: 71.54,
            temp_min: 71.54,
            temp_max: 71.54,
            pressure: 1017.03,
            sea_level: 1017.03,
            grnd_level: 985.08,
            humidity: 76,
            temp_kf: 0
          },
          weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
          clouds: { all: 43 },
          wind: { speed: 3.47, deg: 196.417 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-10 03:00:00'
        }
      ],
      [
        {
          dt: 1562738400,
          main: {
            temp: 69.29,
            temp_min: 69.29,
            temp_max: 69.29,
            pressure: 1015.96,
            sea_level: 1015.96,
            grnd_level: 983.95,
            humidity: 83,
            temp_kf: 0
          },
          weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
          clouds: { all: 47 },
          wind: { speed: 1.48, deg: 152.424 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-10 06:00:00'
        },
        {
          dt: 1562749200,
          main: {
            temp: 68.02,
            temp_min: 68.02,
            temp_max: 68.02,
            pressure: 1015.78,
            sea_level: 1015.78,
            grnd_level: 983.73,
            humidity: 83,
            temp_kf: 0
          },
          weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
          clouds: { all: 100 },
          wind: { speed: 1.41, deg: 58.753 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-10 09:00:00'
        },
        {
          dt: 1562760000,
          main: {
            temp: 71.33,
            temp_min: 71.33,
            temp_max: 71.33,
            pressure: 1015.93,
            sea_level: 1015.93,
            grnd_level: 983.76,
            humidity: 80,
            temp_kf: 0
          },
          weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
          clouds: { all: 100 },
          wind: { speed: 1.25, deg: 64.664 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-10 12:00:00'
        },
        {
          dt: 1562770800,
          main: {
            temp: 79.76,
            temp_min: 79.76,
            temp_max: 79.76,
            pressure: 1015.89,
            sea_level: 1015.89,
            grnd_level: 983.77,
            humidity: 60,
            temp_kf: 0
          },
          weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
          clouds: { all: 96 },
          wind: { speed: 4.38, deg: 235.161 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-10 15:00:00'
        },
        {
          dt: 1562781600,
          main: {
            temp: 84.17,
            temp_min: 84.17,
            temp_max: 84.17,
            pressure: 1014.44,
            sea_level: 1014.44,
            grnd_level: 982.38,
            humidity: 49,
            temp_kf: 0
          },
          weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
          clouds: { all: 65 },
          wind: { speed: 7.16, deg: 236.116 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-10 18:00:00'
        },
        {
          dt: 1562792400,
          main: {
            temp: 84.66,
            temp_min: 84.66,
            temp_max: 84.66,
            pressure: 1012.74,
            sea_level: 1012.74,
            grnd_level: 980.92,
            humidity: 54,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          clouds: { all: 0 },
          wind: { speed: 8.46, deg: 234.455 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-10 21:00:00'
        },
        {
          dt: 1562803200,
          main: {
            temp: 80.69,
            temp_min: 80.69,
            temp_max: 80.69,
            pressure: 1011.19,
            sea_level: 1011.19,
            grnd_level: 979.64,
            humidity: 71,
            temp_kf: 0
          },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
          clouds: { all: 0 },
          wind: { speed: 7.36, deg: 214.757 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-11 00:00:00'
        },
        {
          dt: 1562814000,
          main: {
            temp: 75.23,
            temp_min: 75.23,
            temp_max: 75.23,
            pressure: 1011,
            sea_level: 1011,
            grnd_level: 979.32,
            humidity: 83,
            temp_kf: 0
          },
          weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
          clouds: { all: 89 },
          wind: { speed: 7.9, deg: 204.249 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-11 03:00:00'
        }
      ],
      [
        {
          dt: 1562824800,
          main: {
            temp: 71.76,
            temp_min: 71.76,
            temp_max: 71.76,
            pressure: 1009.65,
            sea_level: 1009.65,
            grnd_level: 977.63,
            humidity: 91,
            temp_kf: 0
          },
          weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10n' }],
          clouds: { all: 71 },
          wind: { speed: 10.04, deg: 262.664 },
          rain: { '3h': 0.563 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-11 06:00:00'
        },
        {
          dt: 1562835600,
          main: {
            temp: 66.29,
            temp_min: 66.29,
            temp_max: 66.29,
            pressure: 1009.55,
            sea_level: 1009.55,
            grnd_level: 977.67,
            humidity: 89,
            temp_kf: 0
          },
          weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02n' }],
          clouds: { all: 22 },
          wind: { speed: 9.1, deg: 304.256 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-11 09:00:00'
        },
        {
          dt: 1562846400,
          main: {
            temp: 65.57,
            temp_min: 65.57,
            temp_max: 65.57,
            pressure: 1010.61,
            sea_level: 1010.61,
            grnd_level: 978.56,
            humidity: 86,
            temp_kf: 0
          },
          weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
          clouds: { all: 12 },
          wind: { speed: 10.65, deg: 296.376 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-11 12:00:00'
        },
        {
          dt: 1562857200,
          main: {
            temp: 72.78,
            temp_min: 72.78,
            temp_max: 72.78,
            pressure: 1011.62,
            sea_level: 1011.62,
            grnd_level: 979.31,
            humidity: 71,
            temp_kf: 0
          },
          weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
          clouds: { all: 11 },
          wind: { speed: 11.88, deg: 300.706 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-11 15:00:00'
        },
        {
          dt: 1562868000,
          main: {
            temp: 72.26,
            temp_min: 72.26,
            temp_max: 72.26,
            pressure: 1011.48,
            sea_level: 1011.48,
            grnd_level: 979.16,
            humidity: 73,
            temp_kf: 0
          },
          weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
          clouds: { all: 42 },
          wind: { speed: 11.41, deg: 304.298 },
          rain: { '3h': 0.125 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-11 18:00:00'
        },
        {
          dt: 1562878800,
          main: {
            temp: 74.46,
            temp_min: 74.46,
            temp_max: 74.46,
            pressure: 1011.49,
            sea_level: 1011.49,
            grnd_level: 979.27,
            humidity: 67,
            temp_kf: 0
          },
          weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
          clouds: { all: 66 },
          wind: { speed: 12.59, deg: 325.808 },
          rain: { '3h': 0.062 },
          sys: { pod: 'd' },
          dt_txt: '2019-07-11 21:00:00'
        },
        {
          dt: 1562889600,
          main: {
            temp: 72.65,
            temp_min: 72.65,
            temp_max: 72.65,
            pressure: 1011.8,
            sea_level: 1011.8,
            grnd_level: 979.71,
            humidity: 74,
            temp_kf: 0
          },
          weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10n' }],
          clouds: { all: 62 },
          wind: { speed: 7.4, deg: 320.305 },
          rain: { '3h': 0.063 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-12 00:00:00'
        },
        {
          dt: 1562900400,
          main: {
            temp: 67.56,
            temp_min: 67.56,
            temp_max: 67.56,
            pressure: 1013.49,
            sea_level: 1013.49,
            grnd_level: 981.18,
            humidity: 86,
            temp_kf: 0
          },
          weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
          clouds: { all: 46 },
          wind: { speed: 6.33, deg: 315.359 },
          sys: { pod: 'n' },
          dt_txt: '2019-07-12 03:00:00'
        }
      ]
    ]
    expect(sortDays(currentDay, hours)).toEqual(sortedDays)
  })
})

describe('findMinMaxTemp', () => {
  let hours = [
    {
      dt: 1562544000,
      main: {
        temp: 72.81,
        temp_min: 71.98,
        temp_max: 72.81,
        pressure: 1015.78,
        sea_level: 1015.78,
        grnd_level: 983.17,
        humidity: 57,
        temp_kf: 0.46
      },
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
      clouds: { all: 25 },
      wind: { speed: 9.84, deg: 22.669 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-08 00:00:00'
    },
    {
      dt: 1562533200,
      main: {
        temp: 78.87,
        temp_min: 77.77,
        temp_max: 78.87,
        pressure: 1014.95,
        sea_level: 1014.95,
        grnd_level: 982.39,
        humidity: 50,
        temp_kf: 0.62
      },
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
      clouds: { all: 50 },
      wind: { speed: 10.49, deg: 43.041 },
      sys: { pod: 'd' },
      dt_txt: '2019-07-07 21:00:00'
    },
    {
      dt: 1562554800,
      main: {
        temp: 64.69,
        temp_min: 64.14,
        temp_max: 64.69,
        pressure: 1016.82,
        sea_level: 1016.82,
        grnd_level: 984.33,
        humidity: 61,
        temp_kf: 0.31
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      clouds: { all: 0 },
      wind: { speed: 7.43, deg: 24.174 },
      sys: { pod: 'n' },
      dt_txt: '2019-07-08 03:00:00'
    }
  ]
  test('should return the lowest minimum value if "min" is undefined proving it has been replaced', () => {
    let newMin = '64'
    expect(findMinMaxTemp(hours).min).toEqual(newMin)
  })
  test('should return the highest maximum value if "max" is undefined proving it has been replaced', () => {
    let newMax = '79'
    expect(findMinMaxTemp(hours).max).toEqual(newMax)
  })
  test('should return the lowest minimum value', () => {
    let newMin = '64'
    expect(findMinMaxTemp(hours).min).toEqual(newMin)
  })
  test('should return the highest maximum value', () => {
    let newMax = '79'
    expect(findMinMaxTemp(hours).max).toEqual(newMax)
  })
})
