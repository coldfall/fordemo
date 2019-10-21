// pages/userinfo/index.js

const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');

Page({

  /**
   * 页面的初始数据
   */

  data: {
      headurl:"/res/icons/defaulthead.png",
      nickname:"",
      realname:"",
      mobile:"",
      gender:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var user=app.globalData.user;
      this.setData({
        mobile:user.phone
      });
  },

  onGetUserInfo:function(e){
    
      var res = e.detail;
      this.setData({
        headurl:res.userInfo.avatarUrl,
        nickname:res.userInfo.nickName,
        gender:res.userInfo.gender
      });

      return false;
  },

  onInputRealName:function(e){
    this.setData({
      realname:e.detail.value
    });


  },

  onChangeGender:function(e){
    this.setData({
      gender:e.currentTarget.dataset.gender
    });
  },

  onClickSubmit:function(e){
      if(this.data.nickname==""||this.data.headurl==""){
        tools.alert("请先点击头像获取微信信息");
      }else if(this.data.realname==""){
        tools.alert("请输入您的真实姓名");
      }else{
        network.networkpost("/roadapi/user/addUserInfo",{
          nickname:this.data.nickname,
          truename:this.data.realname,
          headimgurl:this.data.headurl,
          gender:this.data.gender
        },app).then(()=>{
          var res=app.netWorkData.result;
          if(parseInt(res.code)==0){
            app.globalData.showsuccess=true;
            wx.redirectTo({url:"/pages/main/index"});
          }else{
            tools.toast(res.msg);


          }


        });


      }

  }


})