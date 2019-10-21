//post请求 url：请求路径，请求header，params请求参数，app全局变量
function networkpost(url, params, app) {
  let headers=app.globalData.headers;
  url=app.globalData.host+url;
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headers,
      data: params,
      method: 'POST',
      success: function (res) {
        //自行处理返回结果
        console.log('返回结果：')
        console.log(res.data)
        app.netWorkData.result = res.data
        resolve();
      }

    
    })
  });
  return promise;
}
//post请求 url：请求路径，请求header，params请求参数，app全局变量
function networkpostjson(url, params, app) {
  let headers=app.globalData.headersjson;
  url=app.globalData.host+url;
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headers,
      data: params,
      method: 'POST',
      success: function (res) {
        //自行处理返回结果
        console.log('返回结果：')
        console.log(res.data)
        app.netWorkData.result = res.data
        resolve();
      }

    
    })
  });
  return promise;
}

//get请求
function networkget(url, params, app) {
  let headers=app.globalData.headers;
  url=app.globalData.host+url;
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headers,
      data: params,
      method: 'GET',
      success: function (res) {
        //返回结果自行处理
        console.log('返回结果：')
        console.log(res.data)
        app.netWorkData.result = res.data
        resolve();

      }
    })
  });
  return promise;
}    

module.exports = {
    networkget:networkget,
    networkpost:networkpost,
    networkpostjson:networkpostjson
}