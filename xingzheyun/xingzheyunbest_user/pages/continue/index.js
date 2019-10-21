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
  orderid:0,

  data: {
      order:null,
      markers: [],
      polyline:[],
      latitude: '',
      longitude: '',
      textData: {},
      city: '',      
      showpanel:2,
      feeobj:null,
      mkname:"",
      mkloc:""    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var me=this;
    if(e.orderid){
        this.orderid=e.orderid;
        network.networkpost("/roadapi/order/getUserOrderInfo",{"orderid":e.orderid},app).then(()=>{
          var res=app.netWorkData.result;
          if(res.data){
            me.setData({
              order:res.data.orderInfo,
              mkloc:res.data.orderInfo.shop_longitude+","+res.data.orderInfo.shop_latitude
            });
            app.globalData.neworder=res.data.orderInfo;


          var markerendarr=[
            {
              iconPath: "../../res/icons/mapicon4.png",
              id: 0,
              latitude: this.data.order.shop_latitude,
              longitude: this.data.order.shop_longitude,
              width: 69,
              height: 69,
              anchor:{x:0.5,y:0.6},
              callout: {
                padding: 10,
                borderRadius:10,
                content:this.data.order.shop_address,
                bgColor: "#ffffff",
                color: "#000000",
                display: "ALWAYS"
              }
              
            }
          ];

          me.myAmapFun = new amapFile.AMapWX({key:app.config.mapkey});

          me.setData({
            latitude:this.data.order.user_latitude,
            longitude:this.data.order.user_longitude,
            markers:markerendarr
          });

          me.onLocationGet();


          }else{
            tools.alert(res.msg);
          }


        });





    }else{
      tools.toast("参数错误");
    }







  },

  onLocationGet:function(e){
    var me=this;
    var that=this;

    this.getPrice();

    this.myAmapFun.getDrivingRoute({

        origin: this.data.order.user_longitude+","+this.data.order.user_latitude,
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


  getPrice:function(){
   
    var me=this;
    network.networkpost("/roadapi/order/getOrderPreAmt",{
      userLongitude:this.data.order.user_longitude,
      userlatitude:this.data.order.user_latitude,
      shopLongitude:this.data.order.shop_longitude,
      shoplatitude:this.data.order.shop_latitude,
      serviceId:this.data.order.service_id
    },app).then(()=>{
      console.log(me.data.order);
      var res=app.netWorkData.result;
      if(res.data){
        res.data.serviceid=me.data.order.service_id;
        res.data.servicename=me.data.order.name;
        res.data.currenttime=(new Date().toLocaleString());
        me.setData({
          feeobj:res.data
        });
        

      }

    });
  },



  onClickConfirm:function(e){   //支付流程
    //tools.toast("支付成功");
    //this.onPaySuccess();
    var me=this;
    network.networkpost("/roadapi/order/getPayInfo",{"orderid":this.orderid},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code===0){
        if(res.data.payInfo){
          var payobj=res.data.payInfo;
          payobj.package=payobj.packageValue;
          payobj.success=function(res){
            
            me.onPaySuccess();
          };
          payobj.fail=function(res){
            tools.alert("支付失败");
          };
          wx.requestPayment(payobj);
        }else{
          tools.alert("支付参数错误");
        }
        



      }else{
        tools.alert(res.msg);
      }

    });


  },



  onClickView:function(e){   //查看进度

    wx.redirectTo({"url":"/pages/orderdetail/index?orderid="+this.orderid});


  },  

  onPaySuccess:function(){
    tools.toast("支付成功");
    wx.redirectTo({"url":"/pages/orderdetail/index?orderid="+this.orderid});
  }





})