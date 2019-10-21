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
  myAmapFun: null,
  orderid: 0,

  data: {
    order: null,
    markers: [],
    polyline: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    showpanel: 2,
    feeobj: null,
    mkname: "",
    mkloc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    if (e.name && e.location) {
      var loc = e.location.split(",");
      var markerendarr = [{
        iconPath: "../../res/icons/mapicon4.png",
        id: 0,
        latitude: loc[1],
        longitude: loc[0],
        width: 69,
        height: 69,
        anchor: {
          x: 0.5,
          y: 0.6
        },
        callout: {
          padding: 10,
          borderRadius: 10,
          content: e.name,
          bgColor: "#ffffff",
          color: "#000000",
          display: "ALWAYS"
        }

      }];


      this.setData({
        mkname: e.name,
        mkloc: e.location,
        markers: markerendarr
      });

    }



    var me = this;
    this.myAmapFun = new amapFile.AMapWX({
      key: app.config.mapkey
    });

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {

              wx.getLocation({
                "type": "gcj02",
                success: function(e) {
                  me.onLocationGet(e);
                },
                fail: function(e) {
                  tools.alert("获取位置信息失败");
                }
              });
            }
          })
        } else {
          wx.getLocation({
            "type": "gcj02",
            success: function(e) {
              me.onLocationGet(e);
            },
            fail: function(e) {
              tools.alert("获取位置信息失败");
            }
          });
        }
      }
    });

    this.setData({
      order: app.globalData.neworder
    });



  },

  onLocationGet: function(e) {
    var me = this;
    var that = this;
    this.setData({
      latitude: e.latitude,
      longitude: e.longitude
    });
    this.getPrice();

    this.myAmapFun.getDrivingRoute({

      origin: e.longitude + "," + e.latitude,
      destination: this.data.mkloc,
      success: function(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });


      },
      fail: function(info) {

      }
    });
  },
  
  getPrice: function() {
    var locarray = this.data.mkloc.split(",");
    if (locarray.length === 2) {
      app.globalData.neworder.shopLongitude = locarray[0];
      app.globalData.neworder.shopLatitude = locarray[1];
    } else {
      app.globalData.neworder.shopLongitude = "";
      app.globalData.neworder.shopLatitude = "";
    }
    app.globalData.neworder.shopAddress = this.data.mkname;
    network.networkpost("/roadapi/order/getOrderPreAmt", {
      userLongitude: this.data.longitude,
      userlatitude: this.data.latitude,
      shopLongitude: locarray[0],
      shoplatitude: locarray[1],
      serviceId: app.globalData.neworder.serviceId
    }, app).then(() => {
      var res = app.netWorkData.result;
      debugger
      if (res.data) {

        res.data.serviceid = app.globalData.neworder.serviceId;
        res.data.servicename = app.globalData.neworder.servicename;
        res.data.currenttime = (new Date().toLocaleString());
        this.setData({
          feeobj: res.data
        });


      }

    });
  },

  bindInput: function(e) {
    var that = this;
    var url = '../inputtips/input';
    if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude;
    }
    wx.redirectTo({
      url: url
    })
  },

  onClickConfirm: function(e) {
    var me = this;
    if (this.data.feeobj === null) {
      tools.alert("请选择目的地");
    } else {

      network.networkpost("/roadapi/order/addOrder", app.globalData.neworder, app).then(() => {
        wx.hideLoading();
        var res = app.netWorkData.result;
        if (parseInt(res.code) === 0) {
          tools.toast("你已下单成功了!");
          me.orderid = res.data.orderInfo.orderid;
          //var orderid=res.data.orderid;
          me.PayProces();

        } else {
          tools.toast(res.msg);
        }
      });




    }


  },

  PayProces: function() {
    var me = this;
    network.networkpost("/roadapi/order/getPayInfo", {
      "orderid": this.orderid
    }, app).then(() => {
      var res = app.netWorkData.result;
      if (res.code === 0) {
        if (res.data.payInfo) {
          var payobj = res.data.payInfo;
          payobj.package = payobj.packageValue;
          payobj.success = function(res) {

            me.onPaySuccess();
          };
          payobj.fail = function(res) {
            tools.alert("支付失败");
          };
          wx.requestPayment(payobj);
        } else {
          tools.alert("支付参数错误");
        }




      } else {
        tools.alert(res.msg);
      }

    });
  },

  onPaySuccess: function() {
    tools.toast("支付成功");
    wx.redirectTo({
      "url": "/pages/orderdetail/index?orderid=" + this.orderid
    });
  }





})