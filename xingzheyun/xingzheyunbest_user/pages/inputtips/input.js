const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');
const amapFile = require('../../libs/amap-wx.js');

var lonlat;
var city;
Page({
  data: {
    poisdata:[]
  },
  onLoad: function(e){
    lonlat = e.lonlat;
    city = e.city;
  },
  bindInput: function(e){
    var that = this;
    var keywords = e.detail.value; 
    var key = app.config.mapkey;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getPoiAround({
      querykeywords: keywords,
      location: lonlat,
      querytypes:"010000",
      success: function(data){

        if(data && data.poisData){
          that.setData({
            poisdata: data.poisData
          });
        }
      }
    })
  },
  bindSearch: function(e){
    var keywords = e.target.dataset.name;
    var location = e.target.dataset.loc;
    var url = '../confirm/index?name=' + keywords+"&location="+location;
    wx.redirectTo({
      url: url
    })
  }
})