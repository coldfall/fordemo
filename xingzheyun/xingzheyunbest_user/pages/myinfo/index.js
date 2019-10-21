const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');
import BnNavigator from "../templates/navigator.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headurl:"",
    realname:"",
    gendericon:"",
    mobile:""
  },
  clickOrders: BnNavigator.clickOrders,
  clickHotLine: BnNavigator.clickHotLine,
  clickMain: BnNavigator.clickMain,
  clickMe: BnNavigator.clickMe,
  clickMyCars: BnNavigator.clickMyCars,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        headurl:app.globalData.imgserver+app.globalData.user.headimgurl,
        realname:app.globalData.user.truename,
        gendericon:app.globalData.user.gender==1?"/res/icons/iconmale.png":"/res/icons/iconfemale.png",
        mobile:app.globalData.user.phone
      });
  },


})