// pages/main/index.js
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');
const amapFile = require('../../libs/amap-wx.js');
import BnNavigator from "../templates/navigator.js"



Page({

  /**
   * 页面的初始数据
   */


   myAmapFun:null,
  data: {
      showpanel:1,
      showsuccess:false,
      markers: [],
      polyline: [],
      latitude: '',
      longitude: '',
      address:"",
      services:[],
      imgurl:"",
      ordersinline:[],
      mycars:[],
      carsel:{"carId":0,"carInfo":"选择您的爱车"}
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
    var me = this;
    this.myAmapFun = new amapFile.AMapWX({key:app.config.mapkey});

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success () {

              wx.getLocation({"type":"gcj02",
                success:function(e){
                  me.onLocationGet(e);
                },
               fail:function(e){
                tools.alert("获取位置信息失败");
               }
              });
            }
          })
        }else{
          wx.getLocation({"type":"gcj02",
            success:function(e){
              me.onLocationGet(e);
            },
           fail:function(e){
            tools.alert("获取位置信息失败");
           }
          });
        }
      }
    });




  },



  checkService:function(){
    network.networkpost("/roadapi/order/getUserOrderList",{"orderStatus":1},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.data){
        this.setData({
          ordersinline:res.data.concat()
        })
      }
    });

  },



  onReady: function () {
   
    if(app.globalData.showsuccess){
        this.setData({
          showsuccess:true
        });
        app.globalData.showsuccess=false;
    }
  },

  onShow:function(){
    this.setData({
      showpanel:1
    });

    network.networkpost("/roadapi/info/getService",{},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.data){
        this.setData({
          services:res.data,
          imgurl:res.config.imgurl
        });
        this.checkService();
      }
    });    
  },


  onClickConfirmSuc:function(e){
     this.setData({
       showsuccess:false
    });
  },

  onLocationGet:function(e){
    var me=this;
    this.setData({
      latitude:e.latitude,
      longitude:e.longitude
    });
    this.myAmapFun.getRegeo({
      success:function(res){
        
        if(res[0]){
          var obj=res[0];
          console.log(obj.name);
          me.setData({
            address:obj.name
          });
        }
      }
      
    })

  },



  onClickService:function(e){
    app.globalData.neworder={};
    app.globalData.neworder.serviceId=e.currentTarget.dataset.id;
    app.globalData.neworder.servicename=e.currentTarget.dataset.name;
    app.globalData.neworder.longitude=this.data.longitude;
    app.globalData.neworder.latitude=this.data.latitude;
    app.globalData.neworder.myaddress=this.data.address;
    app.globalData.neworder.userAddress=this.data.address;
    this.setData({
      showpanel:2

    });
    this.onInitCarList();
    //wx.redirectTo({"url":"/pages/orderdetail/index?orderid=1"});
  },

  onInitCarList:function(){
    wx.showLoading();
    network.networkpost("/roadapi/user/getCarList",{},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.data){
        var cars=[];
        for(let car of res.data){
          cars.push({
            "carId":car.car_id,
            "carInfo":car.name+" "+car.car_no
          });
        }
        this.setData({
          mycars:cars,
          carsel:{"carId":0,"carInfo":"选择您的爱车"}
        })
      }
      wx.hideLoading();

    });

  },


  onCarChange:function(e){
    var i=e.detail.value;
    this.setData({
      carsel:this.data.mycars[i]
    });
    app.globalData.neworder.carId=this.data.carsel.carId;
  },

  onClickCall:function(e){
    if(this.data.carsel.carId==0){
      tools.alert("请选择出险车辆");

    }else{
      wx.navigateTo({"url":"/pages/call/index"});
    }


  },

  onClickOrderList:function(){
      wx.navigateTo({"url":"/pages/orders/index"});
  }



})