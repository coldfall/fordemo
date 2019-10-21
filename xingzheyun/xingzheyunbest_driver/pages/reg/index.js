// pages/reg/index.js

const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');

Page({

  /**
   * 页面的初始数据
   */

   enablegetvalid:true,
   validcountdown:60,
   countdowntimer:0,
  data: {
      nationcodes:[
        "+86"
      ],
      nationindex:0,
      myMobile:"",
      valid:"",
      validtext:"获取验证码",
      rulechecked:false
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  onNationChange: function (e) {
    this.setData({
      nationindex:parseInt(e.detail.value)
    })
 
  },

  onInputMobile:function(e){
      this.setData({
        myMobile:e.detail.value
      })
  },

  onGetValid:function(){
    if(this.enablegetvalid){
        console.log();
        if(!tools.checkmobile(this.data.myMobile)){ 
           tools.alert("手机号码格式错误");
       
        }else{
           network.networkpost("/roadapi/info/getMsgCode",{"phone":this.data.myMobile},app).then(()=>{
                  
              if(parseInt(app.netWorkData.result.code)==0){
                this.validcountdown=60;
                this.enablegetvalid=false;
                this.setCountDown();
                this.countdowntimer=setInterval(this.setCountDown,1000);
              }else{
                tools.toast("发送验证码失败，请稍后重试");
              }


          });
          

        }

    }
  },

  setCountDown:function(){
    if(this.validcountdown>0){
      this.validcountdown--;
      this.setData({
        validtext:"请等待"+this.validcountdown+"s"
      });

    }else{
      this.enablegetvalid=true;
      this.setData({
        validtext:"获取验证码"
      });
    }
  },

  onInputValid:function(e){
      this.setData({
        valid:e.detail.value
      })
  },

  onClickRuleCheck:function(e){
    this.setData({
      rulechecked:!this.data.rulechecked
    })
  
  },

  onSubmit:function(e){
    if(!tools.checkmobile(this.data.myMobile)){
      tools.alert("手机号码错误");
    }else if(this.data.valid==""){
      tools.alert("请输入验证码");
    }else if(this.data.rulechecked==false){
      tools.alert("请先阅读并同意使用条款");
    }else{
      wx.login({
        success: (res) => {
          console.log("app code:"+res.code);
          app.globalData.code=res.code;
          network.networkpost("/roadapi/info/regDriver",{
            "code":res.code,
            "msgCode":this.data.valid,
            "phone":this.data.myMobile
          },app).then(()=>{
            var res=app.netWorkData.result;
            if(parseInt(res.code)==0){
              wx.redirectTo({"url":"/pages/index/index"});
            }else{
              tools.toast("手机提交失败");
            }

          });
        }
      });
      
    }



  }


})