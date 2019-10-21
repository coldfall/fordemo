const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    accident:-1,
    loc:-1,
    locarray:[],
    ftype:-1,
    ftypearray:[],
    textcnt:0,
    enablesubmit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.neworder);
    network.networkpost("/roadapi/info/getDicList",{"dicType":"car_loc"},app).then(()=>{
        var res=app.netWorkData.result;
        if(res.data){
          this.setData({
            locarray:res.data
          })
        }
    });

    network.networkpost("/roadapi/info/getDicList",{"dicType":"fault_type"},app).then(()=>{
        var res=app.netWorkData.result;
        if(res.data){
          this.setData({
            ftypearray:res.data
          })
        }
    });

  },

  onClickAcc:function(e){
    this.setData({
      accident:e.currentTarget.dataset.acc
    });
    app.globalData.neworder.accident=parseInt(this.data.accident);

    this.checkEnable();

  },


  onClickLoc:function(e){
    this.setData({
      loc:e.currentTarget.dataset.id
    });
    app.globalData.neworder.loc=parseInt(this.data.loc);

    this.checkEnable();

  },


  onClickFtype:function(e){
    this.setData({
      ftype:e.currentTarget.dataset.id
    });
    app.globalData.neworder.faultType=parseInt(this.data.ftype);
  
    this.checkEnable();

  },

  onInputDesc:function(e){
    this.setData({
      textcnt:e.detail.value.length
    });
    app.globalData.neworder.orderDesc=e.detail.value;
  } ,

  onConfirmDesc:function(e){
    app.globalData.neworder.orderDesc=e.detail.value;
    
  },

  checkEnable:function(e){
    this.setData({
      enablesubmit:this.data.accident>=0&&this.data.loc>=0&&this.data.ftype>=0
    })

  },

  onSubmit:function(e){
    var me=this;
    if(this.data.enablesubmit){
      wx.redirectTo({"url":"/pages/confirm/index"});
      // network.networkpost("/roadapi/order/addOrder",app.globalData.neworder,app).then(()=>{
      //   wx.hideLoading();
      //   var res=app.netWorkData.result;
      //   if(parseInt(res.code)===0){
      //     tools.toast("你已下单成功了!");
      //     var orderid=res.data.orderid;
      //     me.data.enablesubmit=false;
      //     setTimeout(function(){
      //       wx.redirectTo({"url":"/pages/confirm/index?orderid="+orderid});
      //     },1000);
      //   }else{
      //     tools.toast(res.msg);
      //   }
      // });

    }

  },








})