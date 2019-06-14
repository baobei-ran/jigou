/**
 * 使用 html5 提供的 localStorage来缓存数据
 **/
/*
var SPLIT_STR = '@'
var localStorage = window.localStorage

var DATA_PROCESS_MAPPING = {
  'number': {
    save : data => data,
    parse: data => Number.parseFloat(data)
  },
  'object': {
    save : data => JSON.stringify(data),
    parse: data => JSON.parse(data)
  },
  'undefined': {
    save: data => data,
    parse: () => undefined
  },
  'default': {
    save : data => data,
    parse: data => data
  }
}

function getProcess(type) {
  return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING['default']
}

export default {
  get:function (key) {
    var stringData = localStorage.getItem(key)
    if (stringData) {
      var dataArray = stringData.split('@')
      var data
      var now = Date.now()
      if (dataArray.length > 2 && dataArray[2] < now) { // 缓存过期
        localStorage.removeItem(key)
        return null
      } else {
        var value = decodeURIComponent(dataArray[1])
        data = getProcess(dataArray[0]).parse(value)
        return data
      }
    }
    return null
  },
  put: function (key, value, expired) { // expired 过期时间 单位天 默认是100 上线测试没问题替换旧的设值
    var type = typeof value
    var process = getProcess(type)
    if (!expired) { // 默认不传 不过期
      value = type + SPLIT_STR + encodeURIComponent(process.save(value))
    } else {
      var time = expired * 24 * 60 * 60 * 1000 + new Date().getTime()
      value = type + SPLIT_STR + process.save(value) + SPLIT_STR + time
    }
    localStorage.setItem(key, value)
  },
  clear: function () {
    localStorage.clear()
  },
  remove: function (key) {
    localStorage.removeItem(key)
  }
}
   */




/**
 * 使用 html5 提供的 localStorage来缓存数据
 * 
 * function isIE() { //检测是否ie?
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      } else {
        return false;
      }
    }
 **/
var localStorage = window.localStorage;
export default {
  get:function (key) {
    var stringData = localStorage.getItem(key)
    var val = JSON.parse(decodeURIComponent(stringData))
    return val
  },
  put: function (key, value, expired) {
    console.log(expired)
    var val = JSON.stringify(value)
    localStorage.setItem(key, encodeURIComponent(val))
  },
  clear: function () {
    localStorage.clear()
  },
  remove: function (key) {
    localStorage.removeItem(key)
  }
}

