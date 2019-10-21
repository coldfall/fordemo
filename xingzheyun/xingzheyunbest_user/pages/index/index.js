//index.js
//获取应用实例
const app = getApp()
const network = require('../../utils/network.js');
Page({
  data: {
   
  },
  
  onLoad: function () {
    var me=this;
    wx.showLoading();
  	wx.login({
      success: (res) => {
        console.log("app code:"+res.code);
        app.globalData.code=res.code;
        me.appLogin();
      },
      fail: (res) => {
        wx.showToast({
          "title":"登录失败"
        })
      }
    })

  },
  appLogin: function(e) {
    network.networkpost("/roadapi/info/login",{"code":app.globalData.code},app).then(()=>{
    	wx.hideLoading();
      	let res=app.netWorkData.result;
      	if(res.code==0){

      		if(res.config){
            app.globalData.imgserver=res.config.server;

          }
          if(res.data){
            app.globalData.headers.token=res.data.token;
            app.globalData.headersjson.token=res.data.token;
            app.globalData.user=res.data.user;
            if(res.data.user.truename&&res.data.user.nickname&&res.data.user.headimgurl){
              wx.redirectTo({url:"/pages/main/index"});
            }else{
              wx.redirectTo({url:"/pages/userinfo/index"});
            }
          }
      	}else{
          wx.redirectTo({url:"/pages/reg/index"});
        }
    });
  }
})
