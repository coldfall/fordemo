// pages/addcrop/index.js
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ratio: 200 / 200,
    originUrl: '',
    cropperResult: '',
    tempurl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.selfilePath);
    this.setData({
      originUrl: app.globalData.selfilePath,
      cropperResult: ''
    })
  },
  getCropperImg:function(e) {
    var thispage=this;
    var cpicurl = e.detail.url;
    console.log(cpicurl);
    var ctx = wx.createCanvasContext("canvasresize");
    var res = wx.getSystemInfoSync();
    var r = res.windowWidth / 750;
    
    ctx.drawImage(cpicurl, 0, 0, r * 200, r * 200);
    ctx.draw(false,function(){
      wx.canvasToTempFilePath({
        canvasId: 'canvasresize',
        success: function (res2) {
          wx.showLoading({"title":"上传中"});
          wx.uploadFile({
            "url":app.globalData.host+"/roadapi/driverUser/uploadHeadImg",
            "filePath":res2.tempFilePath,
            "name":"file",
            "header":{
              "content-type":"multipart/form-data","token":app.globalData.token
            },
            success:function(res){
              res=JSON.parse(res.data);
              if(res.code===0){
                app.globalData.selfilePath=res.config.server+res.data;
                wx.redirectTo({"url":"/pages/userinfo/index"});
              }else{
                tools.toast(res.msg);
              }
            },
            fail:function(res){
            
              tools.alert("提交失败");
            },
            complete:function(res){
              wx.hideLoading();
            }
          })
        }
      }, this);
    });


    
  }
})