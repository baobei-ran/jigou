import axios from "axios";
// var baseURL="https://www.yunyikang.cn"; // 正式
var baseURL = "http://test99.yunyikang.cn"; // 测试
// var baseURL="http://192.168.8.107"//


axios.defaults.retry = 3;           //  发起请求次数
axios.defaults.retryDelay = 2000;   //  每次请求时间

// import { Loading } from 'element-ui';
// var loadingInstance;
axios.defaults.withCredentials = true;
var http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  transformRequest: [
    function(data) {    // 处理，转换成字符串
      if (typeof data === 'object') {
        var newData = "";
        for (var k in data) {
          if (data.hasOwnProperty(k) === true) {
            newData += encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
          }
        }
        newData = newData.substr(0, newData.length - 1)
        // console.log(newData)
        return newData;
      }
      return data;
    }
  ]
});

http.interceptors.request.use(function (config) {
  // loadingInstance = Loading.service({ fullscreen: true });
  // console.log(config)
  return config;
}, function (error) {
  return Promise.reject(error);
});


http.interceptors.response.use(function(res) {
  //全局拦截处理未登录
  // console.log(res)
    // loadingInstance.close();
  if (res.data.code == 406) {
    localStorage.clear();
    window.location.href = "/shanghu/#/login";
  }
  return res;
}, function (error) {
  var config = error.config;
  if(!config || !config.retry) return Promise.reject(error);
  config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry) {
        return Promise.reject(error);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function() {
      return http(config);
    })
    /*
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 401:
        console.log('未授权，请重新登录')
        break;
      case 403:
        console.log( '拒绝访问')
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        break;
      case 405:
        console.log('请求方法未允许')
        break;
      case 408:
        console.log('请求超时')
        break;
      case 500:
        console.log('服务器端出错')
        break;
      case 501:
        console.log('网络未实现')
        break;
      case 502:
        console.log('网络错误')
        break;
      case 503:
        console.log('服务不可用')
        break;
      case 504:
        console.log('网络超时')
        break;
      case 505:
        console.log('http版本不支持该请求')
        break;
      default:
        console.log(`连接错误${error.response.status}`)
    }
  }
  return Promise.reject(error);  */
});

function apiAxios(method, url, params, response, error) {
  http({
    method: method,
    url: url,
    data: method === "post" || method === "put" ? params : null,
    params: method === "GET" || method === "delete" ? params : null
  })
    .then(function(res) {
      response(res.data);
    })
    .catch(function(err) {
      error(err);
    });
}
function $upload(Url, data, handle) {
  var instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  instance
    .post(Url, data)
    .then(res => {
      handle(res.data);
    })
    .catch(error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            console.log('错误请求')
            break;
          case 401:
            console.log('未授权，请重新登录')
            break;
          case 403:
            console.log( '拒绝访问')
            break;
          case 404:
            console.log('请求错误,未找到该资源')
            break;
          case 405:
            console.log('请求方法未允许')
            break;
          case 408:
            console.log('请求超时')
            break;
          case 500:
            console.log('服务器端出错')
            break;
          case 501:
            console.log('网络未实现')
            break;
          case 502:
            console.log('网络错误')
            break;
          case 503:
            console.log('服务不可用')
            break;
          case 504:
            console.log('网络超时')
            break;
          case 505:
            console.log('http版本不支持该请求')
            break;
          default:
            console.log(`连接错误${error.response.status}`)
        }
      }
      return Promise.reject(error);
    });
}

function Axios(method, url, params) {
  return new Promise((resolve, reject) => {
    http({
      method: method,
      url: url,
      data: method === "post" || method === "put" ? params : null,
      params: method === "GET" || method === "delelte" ? params : null
    })
      .then(function(res) {
        resolve(res.data);
      })
      .catch(function(err) {
         reject(err);
      });
  })
}


export default {
  get: function(url, params, response, err) {
    return apiAxios("GET", url, params, response, err);
  },
  post: function(url, params, response, err) {
    return apiAxios("post", url, params, response, err);
  },
  put: function(url, params, response, err) {
    return apiAxios("put", url, params, response, err);
  },
  delete: function(url, params, response, err) {
    return apiAxios("delete", url, params, response, err);
  },
  all: function(arr, response) {
    axios.all(arr).then(
      axios.spread(function(acct, perms) {
        return response(acct, perms);
      })
    );
  },
  $post:function (url, params, response, error) {
    return axios.post(url, params).then(res => {
      response(res.data)
    }).catch(err => { error(err)})
  },
  upload: function(url, params, response) {
    return $upload(url, params, response);
  },
  $post: async function (url, data) {           // 用 then 接收
    return await Axios('POST', url, data)
  },
  baseURL: baseURL  // 导出前缀路径
};
