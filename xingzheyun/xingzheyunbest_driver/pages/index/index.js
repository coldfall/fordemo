//index.js
//获取应用实例
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');



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
    network.networkpost("/roadapi/info/driverLogin",{"code":app.globalData.code},app).then(()=>{
      wx.hideLoading();
        let res=app.netWorkData.result;
     
        if (res.code==0) {
          var status=res.data.user.status;
          console.log("status:"+status);
          if(status==2){
            tools.alert("您的资料正在审核中，请耐心等待");
          }else if(status==3){
            tools.alert("您的申请资料被拒绝");
          }else{
            if(res.config){
              app.globalData.imgserver=res.config.server;

            }
            if(res.data){
              
              app.globalData.token=res.data.token;
              app.globalData.headers.token=res.data.token;
              app.globalData.headersjson.token=res.data.token;
              app.globalData.user=res.data.user;
              if(res.data.user.truename&&res.data.user.headimgurl){
                network.networkpost("/roadapi/driverUser/getDriverOrderList",{orderStatus:1},app).then(()=>{
                  var res=app.netWorkData.result;
                  if(res.code==0&&res.data&&res.data.length>0){
                    var order=res.data[0];
                    if(order.order_status==1||order.order_status==2||order.order_status==3){
                      wx.redirectTo({"url":"/pages/orderdetail/index?orderid="+order.orderid});
                    }else{
                      wx.redirectTo({url:"/pages/orderlist/index"});
                    }
                    
                  }else{
                    wx.redirectTo({url:"/pages/orderlist/index"});
                  }
                });
                //
              }else{
                wx.redirectTo({url:"/pages/userinfo/index"});
              }
            }
          }
          
        }else if(res.code===1){
          wx.redirectTo({url:"/pages/reg/index"});
        }
    });
  }
})
