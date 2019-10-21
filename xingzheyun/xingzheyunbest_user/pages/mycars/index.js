// pages/mycars/index.js
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
    cardata:[]
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
    console.log("mycars");
  },

  onShow: function () {
    this.refreshData();
  },

  refreshData:function(){
    wx.showLoading();
    network.networkpost("/roadapi/user/getCarList",{},app).then(()=>{
        var res=app.netWorkData.result;
        if(res.data){
            this.setData({
              cardata:res.data
            });
        }
        wx.hideLoading();

    });
  },

  onClickAdd:function(){

    wx.navigateTo({url:"/pages/addcar/index"});

  },

  onClickEdit:function(e){
      var carid=e.currentTarget.dataset.id;
      wx.navigateTo({url:"/pages/addcar/index?carid="+carid});
  },

  onClickDelete:function(e){
    var me=this;
      wx.showModal({
        "content":"确定删除吗",
        success:function(res){
          if(res.confirm){
            wx.showLoading();
            var user={};
            user.carId=e.currentTarget.dataset.id;
            user.userid=app.globalData.user.userid;
            user.idDel=1;
            network.networkpostjson("/roadapi/user/delCar",JSON.stringify(user),app).then(()=>{
              wx.hideLoading();
              var res=app.netWorkData.result;
              if(res.code==0){
                tools.toast("删除成功");
                me.refreshData();
              }else{
                tools.toast(res.msg);
              }
            });

          }


        }
      });
  },
  onPullDownRefresh :function(e){
    this.refreshData();
  }



})