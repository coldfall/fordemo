//app.js
App({
  onLaunch: function () {
  },
  globalData: {
   
    user: null,
    imgserver:"",
    host:"https://www.xingzheyunbest.com",
    headers:{'content-type':'application/x-www-form-urlencoded',token:""},
    headersjson:{token:""},
    code:null,
    showsuccess:false,
    orderinfo:null,
    neworder:null,
    statustext:[
      {"statusId":0,"text":"等待接单"},
      {"statusId":1,"text":"司机接单"},
      {"statusId":2,"text":"司机到达"},
      {"statusId":3,"text":"司机检测"},
      {"statusId":4,"text":"用户签收"},
      {"statusId":5,"text":"订单完成"},
      {"statusId":10,"text":"待付款"},
      {"statusId":9,"text":"订单取消"}
    ]
  },
  netWorkData:{
    result:null
  },
  config:{
    mapkey:"a021b695bf4ea385130a6e787986c41c"
  },

  getStatusText:function(statusid){

    for(let obj of this.globalData.statustext){
      if(obj.statusId===statusid){
        return obj.text;
      }
    }
  }

})