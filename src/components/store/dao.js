export function setCookie (key, value) {
  let exp = new Date()
  let time = 1 * 24 * 60 * 60 * 1000
  exp.setTime(exp.getTime() + time)
  document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

export function getCookie (key) {
  let value = null
  let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    value = unescape(arr[2])
  }
  return value
}

export function delCookie (key) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let value = getItem(key)
  document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

export function getItem (key) {
  let value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    console.log('dao.getItem error:' + error)
    return null
  }
}
