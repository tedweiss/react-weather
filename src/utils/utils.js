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
