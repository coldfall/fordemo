// pages/main/index.js
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');
const amapFile = require('../../libs/amap-wx.js');



Page({

  /**
   * 页面的初始数据
   */
  orderid:0,
  myAmapFun:null,
  timer:0,
  data: {
      markers: [],
      waitdata:null,
      polyline: [],
      latitude: '',
      longitude: '',
      orderStatus:-1,
      showcomment:false,
      createtimesec:0,
      times:["","","","",""],
      order:null,
      du:null,
      driverCar:null,
      commenttext:"",
      star:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this;
      if(options.orderid){
        this.orderid=parseInt(options.orderid);
        console.log(this.orderid);
        this.getOrderStatus();
      }
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

  onLocationGet:function(e){
    var me=this;
    this.setData({
      latitude:e.latitude,
      longitude:e.longitude
    });
    

  },

  getOrderStatus(){
    var me=this;
    network.networkpost("/roadapi/order/getUserOrderInfo",{"orderid":this.orderid},app).then(()=>{
      var res=app.netWorkData.result;
      var ttime=[];

      if(res.data){

        var order=res.data.orderInfo;
        var du=res.data.du;
        var driverCar=res.data.driverCar;
        if(du){
          du.headimg="http://www.xingzheyunbest.com/roadapi/img/"+du.headimgurl;
        }
       // 

        this.setData({
          order:order,
          du:du,
          driverCar:driverCar
        });

        ttime[0]=me.formatTime(order.createtime);
        if(order.receive_time) {ttime[1]=me.formatTime(order.receive_time)};
        if(order.reach_time) {ttime[2]=me.formatTime(order.reach_time)};
        this.data.createtimesec=new Date(order.createtime.replace(/-/g, '/')).getTime();
        if(order.test_time) {ttime[3]=me.formatTime(order.test_time)};
        if(order.sign_time) {ttime[4]=me.formatTime(order.sign_time)};

        this.setData({
          orderStatus:order.order_status,
          times:ttime
        });

        if(parseInt(order.order_status)==0){
          console.log("add pop");
            this.data.waitdata=[
              {
             
                id: 1,
                latitude: order.user_latitude+0.001,
                longitude: order.user_longitude,

                callout: {
                  padding: 10,
                  borderRadius:10,
                  content: "已等待 00:00  等待司机接单中...",
                  bgColor: "#ffffff",
                  color: "#000000",
                  display: "ALWAYS"
                }
              }
            ];
            this.setData({
              markers:this.data.waitdata
            });
            this.refreshWaitTime();
            this.timer=setInterval(this.refreshWaitTime,10000);
        }else{
            clearInterval(this.timer);
            this.refreshDriver();
                
            this.timer=setInterval(this.refreshDriver,10000);
        }
        
      }else{
        tools.alert(res.msg);
      }
    });
  },

  formatTime(timevalue){
    var cdate=new Date(timevalue.replace(/-/g, '/'));

    return cdate.getHours().toString().padStart(2,"0")+":"+cdate.getMinutes().toString().padStart(2,"0");
  },


  refreshWaitTime(){
    console.log("refresh");
    network.networkpost("/roadapi/order/getUserOrderInfo",{"orderid":this.orderid},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.data){

          var order=res.data.orderInfo;
          var du=res.data.du;
          var driverCar=res.data.driverCar;
          if(du){
            du.headimg="http://www.xingzheyunbest.com/roadapi/img/"+du.headimgurl;
          }
         // du.headimg="http://www.xingzheyunbest.com/roadapi/img/"+du.headimgurl;

          this.setData({
            order:order,
            du:du,
            driverCar:driverCar
          }); 
          console.log("ss:"+this.data.order.order_status);
          if(this.data.order.order_status==0){
            var nowsec=new Date().getTime();
            var ctime=new Date(this.data.order.createtime.replace(/-/g, '/'));
            var minu=Math.round((nowsec-ctime.getTime())/1000);

            var minu1=Math.floor(minu/60);
            if(minu<0){
              minu=0;
            }
            if(minu1<0){
              minu1=0;
            }
            minu1=minu1<10?("0"+minu1):minu1;
            var minu2=minu%60;
            minu2=minu2<10?("0"+minu2):minu2;
            var minushow=minu1+":"+minu2;
            this.data.waitdata[0].callout.content="已等待 "+minushow+"  等待司机接单中...";
            this.setData({
              markers:this.data.waitdata
            });
          }else{
            clearInterval(this.timer);
            this.refreshDriver();
                
            this.timer=setInterval(this.refreshDriver,10000);
          }          
        }     
    });


  },

  onCancelOrder:function(e){

    if(this.orderid.order_status>0){
      tools.alert("无法取消订单");
    }else{

      var me=this;
       wx.showModal({
        content:"你确定要取消订单吗？",
        success:function(res){
          if(res.confirm){
            network.networkpost("/roadapi/order/cancleOrder",{"orderid":me.orderid},app).then(()=>{
              var res=app.netWorkData.result;
              if(res.code===0){
                tools.toast("取消成功");
                wx.redirectTo({"url":"/pages/orders/index"});
              }else{
                tools.toast(res.msg);
              }
            });

          }

        }


       });
    }

  },


  onPushOrder:function(e){
    // var me=this;
    //  network.networkpost("/roadapi/order/pushOrder",{"orderid":me.orderid},app).then(()=>{
    //   var res=app.netWorkData.result;
    //   if(res.code===0){
    //     tools.toast("催促成功，请耐心等待");
    //     wx.redirectTo({"url":"/pages/orders/index"});
    //   }else{
    //     tools.toast(res.msg);
    //   }
    // });
  },

  onClickComment:function(e){
    this.setData({
      showcomment:true
    })
  },

  onCall:function(e){
    var phone=e.target.dataset.phone;
    wx.makePhoneCall({
      "phoneNumber":phone
    });
  },

  onClickStar:function(e){

    var commentarray=[
      "有待改进",
      "服务普通",
      "服务质量不错",
      "服务很好",
      "非常完美，无可挑剔"
    ];

    var star=parseInt(e.target.dataset.star);
      this.setData({
        star:star,
        commenttext:commentarray[star-1]
      });


  },

  onSubmitStar:function(e){
    if(this.data.star>0){
      network.networkpost("/roadapi/order/orderStar",{orderid:this.orderid,star:this.data.star},app).then(()=>{
        var res=app.netWorkData.result;
        if(res.code===0){
          tools.toast("评价成功");
          wx.redirectTo({"url":"/pages/main/index"});
          
        }else{
          tools.alert(res.msg);
        }
      });
    }else{
      tools.alert("请选择星星数");
    }


  },
  onClickClose:function(e){
    this.setData({
      showcomment:false
    });
  },

  onUnload:function(e){
    if(this.timer>0){
      clearInterval(this.timer);
    }
  },

  refreshDriver:function(){
      console.log("refreshdriver");

      network.networkpost("/roadapi/order/getUserOrderInfo",{"orderid":this.orderid},app).then(()=>{
      var res=app.netWorkData.result;
      var that=this;
      var me=this;
      var order=res.data.orderInfo;
      var du=res.data.du;
      var driverCar=res.data.driverCar;
      du.headimg="http://www.xingzheyunbest.com/roadapi/img/"+du.headimgurl;

      var ttime=[];

      ttime[0]=me.formatTime(order.createtime);
      if(order.receive_time) {ttime[1]=me.formatTime(order.receive_time)};
      if(order.reach_time) {ttime[2]=me.formatTime(order.reach_time)};
      this.data.createtimesec=new Date(order.createtime.replace(/-/g, '/')).getTime();
        if(order.test_time) {ttime[3]=me.formatTime(order.test_time)};
        if(order.sign_time) {ttime[4]=me.formatTime(order.sign_time)};
        
      this.setData({
        du:du,
        orderStatus:order.order_status,
        times:ttime
      });
      var driverdata=[
        {
       
          id: 1,
          latitude: order.driver_latitude,
          longitude: order.driver_longitude,
          iconPath:"/res/icons/mapicon2.png",
          width:35,
          height:35
          
        }
      ];
      this.setData({
        markers:driverdata
      });

      this.myAmapFun.getDrivingRoute({

          origin: order.user_longitude+","+order.user_latitude,
          destination: order.driver_longitude+","+order.driver_latitude,
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

      });
  }

})