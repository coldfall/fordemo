
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    driver:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.networkpost("/roadapi/driverUser/getDriverInfo",{},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code===0){
        var data=res.data.driver;
        data.icongender=data.gender==1?"iconmale.png":"iconfemale.png";
        var agecode=parseInt(data.idno.substr(6,4));
        data.age=(new Date().getFullYear())-agecode;
        data.headimg=res.config.server+data.headimgurl;
        data.star=res.data.driver.star;
        data.orderCount=res.data.orderCount;
        data.service=res.data.service;
        this.setData({
          driver:data
        });
      }else{
        tools.alert(res.msg);
      }

    });
  },

  onClickCars:function(){
    wx.navigateTo({"url":"/pages/mycars/index"});


  }
})