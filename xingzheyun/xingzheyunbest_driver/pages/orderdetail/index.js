const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');
const amapFile = require('../../libs/amap-wx.js');



Page({

  /**
   * 页面的初始数据
   */

   myAmapFun:null,
   orderid:0,
   refreshtimer:0,
   uploadindex:0,
   uploadfilearray:[],
   showhint:false,
   data: {
      latitude: '',
      longitude: '',
      user:null,
      order:null,
      markers: [],
      polyline:[],
      mkloc:"",
      car:null
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this;
    if(options.orderid){
      this.orderid=options.orderid;
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
    }else{
      tools.alert("参数错误");
    }


    
  },


  onLocationGet:function(e){
    var me=this;
    this.setData({
      latitude:e.latitude,
      longitude:e.longitude
    });

    network.networkpost("/roadapi/driverUser/getDriverOrderInfo",{"orderid":this.orderid},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code===0){
        var orderdata=res.data.orderInfo;
        if(orderdata.loc==0){
          orderdata.loctext="小区";
        }else if(orderdata.loc==1){
          orderdata.loctext="地库";
        }else if(orderdata.loc==2){
          orderdata.loctext="路面";
        }else{
          orderdata.loctext="未知";
        }


        var cardata=res.data.carInfo;
        var userdata=res.data.user;
        userdata.headurl=res.config.server+userdata.headimgurl;

        var ttime=[];
        ttime[0]=me.formatTime(orderdata.receive_time);
        if(orderdata.reach_time){
          ttime[1]=me.formatTime(orderdata.reach_time);
        }
        if(orderdata.test_time){
          ttime[2]=me.formatTime(orderdata.test_time);
        }
        if(orderdata.sign_time){
          ttime[3]=me.formatTime(orderdata.sign_time);
        }
       
        this.setData({
          orderStatus:res.data.order_status,
          times:ttime
        });


        this.setData({
          order:orderdata,
          car:cardata,
          user:userdata,
          mkloc:orderdata.user_longitude+","+orderdata.user_latitude
        });

        if(this.data.order.order_status===4){
          this.refreshPos();
        }else{
          this.refreshtimer=setInterval(this.refreshPos,10000);
          this.refreshRoute();
        }        

      }else{
        tools.alert(res.msg);
      }

    });


    


  },


  refreshPos:function(){
    if(this.data.order){
      if(this.data.order.order_status==1||this.data.order.order_status==2){
        var me=this;
        wx.getLocation({"type":"gcj02",
          success:function(e){
            var latitude=e.latitude;
            var longitude=e.longitude;
            me.setData({
              latitude:latitude,
              longitude:longitude
            });
            network.networkpost("/roadapi/location/uploadLoaction",{longitude:longitude,latitude:latitude},app).then(()=>{

            });
          }
        });
        this.refreshRoute();
      }else if(this.data.order.order_status==4){
        var that=this;
        this.myAmapFun.getDrivingRoute({

            origin: this.data.order.user_longitude+","+this.data.order.user_latitude,
            destination: this.data.order.shop_longitude+","+this.data.order.shop_latitude,
            success: function(data){
              var points = [];
              if(data.paths && data.paths[0] && data.paths[0].steps){
                var steps = data.paths[0].steps;
                for(var i = 0; i < steps.length; i++){
                  var poLen = steps[i].polyline.split(';');
                  for(var j = 0;j < poLen.length; j++){
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
            fail: function(info){

            }
          });
      }

    }


  },

  refreshRoute:function(){
    var that=this;
    this.myAmapFun.getDrivingRoute({

        origin: this.data.longitude+","+this.data.latitude,
        destination: this.data.mkloc,
        success: function(data){
          var points = [];
          if(data.paths && data.paths[0] && data.paths[0].steps){
            var steps = data.paths[0].steps;
            for(var i = 0; i < steps.length; i++){
              var poLen = steps[i].polyline.split(';');
              for(var j = 0;j < poLen.length; j++){
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
        fail: function(info){

        }
      });
  },

  onClickCall:function(e){
    var phone=e.target.dataset.phone;
    wx.makePhoneCall({"phoneNumber":phone});


  },

  onFinishView:function(e){
    
    clearInterval(this.refreshtimer);
    wx.navigateTo({"url":"/pages/uploads/index?finish=1&orderid="+this.orderid+"&serviceid="+this.data.order.service_id+"&longitude="+this.data.longitude+"&latitude="+this.data.latitude});
    
  

  },

  formatTime(timevalue){
    var cdate=new Date(timevalue.replace(/-/g, '/'));

    return cdate.getHours()+":"+cdate.getMinutes();
  },


  onReach:function(e){
    var me=this;
    //
    // wx.showModal({
    //  "title":"温馨提示",
    //  "content":"您需要在服务中准备以下照片",
    //  showCancel:false,
    //  success:function(res){
    //     network.networkpost("/roadapi/order/reachOrder",{longitude:me.data.longitude,latitude:me.data.latitude},app).then(()=>{
    //       var res=app.netWorkData.result;
    //       if(res.code===0){
    //         tools.toast("提交成功");
    //         clearInterval(me.refreshtimer);
    //         wx.reLaunch({"url":"/pages/orderdetail/index?orderid="+me.orderid});
    //       }else{
    //         tools.alert(res.msg);
    //       }
    //     });
    //  }
    // });
    this.setData({
      showhint:true
    })


  },

  onConfirmHint:function(e){
    this.setData({
          showhint:false
    });
    network.networkpost("/roadapi/order/reachOrder",{longitude:this.data.longitude,latitude:this.data.latitude},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code===0){
        tools.toast("提交成功");
        clearInterval(this.refreshtimer);
        wx.reLaunch({"url":"/pages/orderdetail/index?orderid="+this.orderid});
      }else{
        tools.alert(res.msg);
      }
    });
  },

  onTest:function(){
    clearInterval(this.refreshtimer);
    //弹出提示
    network.networkpost("/roadapi/order/testOrder",{longitude:this.data.longitude,latitude:this.data.latitude},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code===0){
        tools.toast("提交检测成功");
        wx.reLaunch({"url":"/pages/orderdetail/index?orderid="+this.orderid});
      }else{
        tools.alert(res.msg);
      }
    });
    
  },

  onRedirect:function(){
    tools.alert("改派");
  },


  onFinish:function(){
    clearInterval(this.refreshtimer);
    wx.navigateTo({"url":"/pages/uploads/index?orderid="+this.orderid+"&serviceid="+this.data.order.service_id+"&longitude="+this.data.longitude+"&latitude="+this.data.latitude});
    
  },


  onUnload: function () {
    clearInterval(this.refreshtimer);
  },

 
})