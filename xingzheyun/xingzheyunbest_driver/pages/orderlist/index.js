const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');
const amapFile = require('../../libs/amap-wx.js');

Page({

  /**
   * 页面的初始数据
   */


   weekname:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
   refreshtimer:0,
   hasneworder:false,
  data: {
    orders:[],
    latitude:0,
    longitude:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me=this;
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



  initOrders:function(orders){
    var me=this;
    for(let order of orders){
      var inittime=new Date(order.updatetime.replace(/-/g, '/'));
      order.datepart=inittime.getDate().toString().padStart(2,"0");
      order.monthpart=inittime.getFullYear()+"-"+(inittime.getMonth()+1).toString().padStart(2,"0");
      order.weekpart=this.weekname[inittime.getDay()];
      order.timepart=inittime.getHours().toString().padStart(2,"0")+":"+inittime.getMinutes().toString().padStart(2,"0")+":"+inittime.getSeconds().toString().padStart(2,"0");
      order.statustext=app.getStatusText(order.order_status);
 

    }
    return orders;
  },


  onLocationGet:function(e){
    var me=this;
    this.setData({
      latitude:e.latitude,
      longitude:e.longitude
    });
    this.refreshOrders();
    this.refreshtimer=setInterval(this.refreshOrders,10000);

  },  

  refreshOrders:function(){
    

    network.networkpost("/roadapi/driverUser/getDriverOrderList",{"orderStatus":0},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code==0){
        var orderdata=this.initOrders(res.data);
        this.setData({
          orders:orderdata
        });
        this.hasneworder=false;
        for(let order of orderdata){
          if(order.order_status===0&&this.hasneworder==false){
            this.hasneworder=true;
          }
        }
        if(this.hasneworder){
          tools.toast("您有待处理订单");
        }
      }else{
        //tools.toast(res.msg);
      }
      
    });
  },


  getDistance(me,dest){

    this.myAmapFun.getDrivingRoute({
      origin:me,
      destination:dest,
      success:function(res){
        if(res.route.paths){
          var path=res.route.paths[0];
          var dist=path.distance/1000+"km";
          return dist;
        }
      },
      fail:function(res){
        return "无法计算";
      }
    });

  },


  onReceive:function(e){
    var orderid=e.target.dataset.orderid;
    network.networkpost("/roadapi/order/receiveOrder",{
      orderid:orderid,
      longitude:this.data.longitude,
      latitude:this.data.latitude
    },app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code==0){
        clearInterval(this.refreshtimer);
        wx.redirectTo({"url":"/pages/orderdetail/index?orderid="+orderid});
      }
    });
  },


  onEmpty:function(e){
    var orderid=e.target.dataset.orderid;
  },

  onDetail:function(e){
    var orderid=e.target.dataset.orderid;
    clearInterval(this.refreshtimer);
    wx.navigateTo({"url":"/pages/orderdetail/index?orderid="+orderid});
  },


  onRedirect:function(e){
    var orderid=e.target.dataset.orderid;
    clearInterval(this.refreshtimer);
    network.networkpost("/roadapi/driverUser/driverCannel",{"orderid":orderid},app).then(()=>{
      if(res.code===0){
        tools.toast("改派成功");
      }else{
        tools.alert(res.msg);
      }
    });
  },

  onTesting:function(e){
    var me=this;
    network.networkpost("/roadapi/order/testOrder",{},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code==0){
        clearInterval(this.refreshtimer);
        wx.reLaunch({"url":"/pages/orderlist/index"});
      }else{
        tools.alert(res.msg);
      }
    });
  }, 

  onUnload:function(e){
    clearInterval(this.refreshtimer);
  }


  
})