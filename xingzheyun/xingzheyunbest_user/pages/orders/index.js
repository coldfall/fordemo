// pages/main/index.js
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');
import BnNavigator from "../templates/navigator.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[]
  },
  clickOrders: BnNavigator.clickOrders,
  clickHotLine: BnNavigator.clickHotLine,
  clickMain: BnNavigator.clickMain,
  clickMe: BnNavigator.clickMe,
  clickMyCars: BnNavigator.clickMyCars,
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    network.networkpost("/roadapi/order/getUserOrderList",{"orderStatus":0},app).then(()=>{
      let res=app.netWorkData.result;
      if(res.data){

        res.data.forEach(function(ele,index){

          res.data[index].statusText=app.getStatusText(ele.order_status);
          res.data[index].createdate=ele.createtime.substr(0,10);
          console.log(app.getStatusText(ele.order_status));
        });

   
        this.setData({
          orders:res.data
        });
        
      }


    });
  },


  onClickView:function(e){
    var orderid=e.target.dataset.orderid;
    wx.navigateTo({
      "url":"/pages/orderdetail/index?orderid="+orderid
    })
  },


  onClickPay:function(e){
    var orderid=e.target.dataset.orderid;
    wx.navigateTo({
      "url":"/pages/continue/index?orderid="+orderid
    })
  }




})