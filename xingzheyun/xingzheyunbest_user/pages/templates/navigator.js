const app = getApp();

var BnNavigator={
  
  clickOrders: function () {
    var urls=getCurrentPages();
   
    var curpage="/"+urls[urls.length-1].route;

    if(curpage!="/pages/orders/index"){
      wx.redirectTo({ url: "/pages/orders/index" });
    }
    
  },
  clickHotLine: function () {
    //wx.navigateTo({ url: "/pages/orders/index" });
  },

  clickMain: function () {
    var urls=getCurrentPages();
    var curpage="/"+urls[urls.length-1].route;
    if(curpage!="/pages/main/index"){
      wx.redirectTo({ url: "/pages/main/index" });
    }      
    
  },  
  clickMe: function () {
    var urls=getCurrentPages();
    var curpage="/"+urls[urls.length-1].route;
    if(curpage!="/pages/myinfo/index"){
      wx.redirectTo({ url: "/pages/myinfo/index" });
    }       
    
  },
  clickMyCars: function () {
    var urls=getCurrentPages();
    var curpage="/"+urls[urls.length-1].route;
    if(curpage!="/pages/mycars/index"){
      wx.redirectTo({ url: "/pages/mycars/index" });
    } 
    
  }  
}

export default BnNavigator;