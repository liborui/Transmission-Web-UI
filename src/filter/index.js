import Vue from 'vue'

Vue.filter('amountFormat', function (amount) {

  if (amount === null || amount === undefined) {

    return ''
  }

  let number = (Number(amount) * 100).toFixed(0).toString()

  if (number === '0') {

    return '0.00'
  }

  let left = number.substr(0, number.length - 2)
  let right = number.substr(number.length - 2, 2)

  return left + '.' + right

})

Vue.filter('timestampFormat', function (value) {

  if (value === undefined || value <= 0) {
    return '-'
  }
  let date = new Date()
  if (value.toString().length === 10) {
    date = new Date(value * 1000)
  }
  if (value.toString().length === 13) {
    date = new Date(Number.parseInt(value, 0))
  }
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
})

Vue.filter('unitFormat', function (value) {

  if (value === undefined || value === 0) {
    return ''
  }
  if (value < 1024) {
    return value + ' B'
  }
  let a = value / 1024
  let unit
  if (a < 1024) {
    unit = ' KB'
  } else if (a < 1024 * 1024) {
    a = a / 1024
    unit = ' MB'
  } else if (a < 1024 * 1024 * 1024){
    a = a / 1024 / 1024
    unit = ' GB'
  } else {
    a = a / 1024 / 1024 / 1024
    unit = ' TB'
  }
  let v = a.toString().split('.', 2)
  if (v.length >= 2 && v[1].length >= 2) {
    return v[0] + '.' + v[1].substring(0, 2) + unit
  }
  return a + unit
})

Vue.filter('timeInterval', function (value) {
  if (value < 0 ) {
    return '∞'
  }
  let days = Math.floor(value / 86400),
    hours = Math.floor((value % 86400) / 3600),
    minutes = Math.floor((value % 3600) / 60),
    seconds = Math.floor(value % 60),
    d = days + ' ' + 'd',
    h = hours + ' ' + 'h',
    m = minutes + ' ' + 'm',
    s = seconds + ' ' + 's';

  if (days) {
    if (days >= 4 || !hours) {
      return d;
    }
    return d + ', ' + h;
  }
  if (hours) {
    if (hours >= 4 || !minutes) {
      return h;
    }
    return h + ', ' + m;
  }
  if (minutes) {
    if (minutes >= 4 || !seconds) {
      return m;
    }
    return m + ', ' + s;
  }
  return s;
})

Vue.filter('timeFormatText', function (value) {

  if (value === undefined || value <= 0) {
    return '-'
  }
  let timestamp = value
  let now = Math.round(new Date().getTime() / 1000)
  if (value.toString().length === 13) {
    timestamp = Number.parseInt(value.toString().substr(0, 10))
  }
  let diff = now - timestamp
  let postfix = diff > 0 ? '前' : '后'
  diff = Math.abs(diff)
  let arrDay = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  let arrSecond = [31536000, 2592000, 6404800, 86400, 3600, 60, 1]
  for (let i = 0; i < 7; i++) {
    let inm = Math.floor(diff / arrSecond[i])
    if (inm !== 0) {
      return inm + arrDay[i] + postfix
    }
  }
})
