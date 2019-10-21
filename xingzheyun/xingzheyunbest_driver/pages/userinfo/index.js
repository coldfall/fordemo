
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    photourl:"",
    rname:"",
    idcode:"",
    gender:0,
    age:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      photourl:app.globalData.selfilePath==''?'/res/icons/defaulthead.png':app.globalData.selfilePath
    })
  },

  onClickSelect:function(){
    this.selectPhoto();
  },
  
  selectPhoto:function(src){
    wx.chooseImage({
      count:1,
      sizeType: ['compressed'],
      sourceType:['album', 'camera'],
      success: function(res) {
        app.globalData.selfilePath = res.tempFilePaths;
        wx.navigateTo({
          url: '/pages/addcrop/index'
        });


      },
      fail:function(res){
        wx.showModal({
          title: '错误',
          content: '选择文件失败'
        });
      }
    })
  },

  onInputName:function(e){
    this.data.rname=e.detail.value;
  },

  onInputCode:function(e){
 
    this.data.idcode=e.detail.value;
    if(tools.validId(this.data.idcode)==true){
        var gendercode=this.data.idcode.charAt(16);
        var gender=parseInt(gendercode)%2==1?1:2;
        var agecode=parseInt(this.data.idcode.substr(6,4));
        var age=(new Date().getFullYear())-agecode;

        this.setData({
          age:age,
          gender:gender
        });
    }
  },
  onInputAge:function(e){
    if(isNaN(parseInt(e.detail.value))){
      tools.alert("年龄格式错误");
    }else{
      this.setData({
        age:parseInt(e.detail.value)
      });

    }

  },
  onSubmitInfo:function(){
    if(this.data.photourl==""){
      tools.alert("请上传您的头像");
    }else if(this.data.rname==""){
      tools.alert("请填写您的真实姓名");
    }else if(this.data.idcode==""||tools.validId(this.data.idcode)==false){
      tools.alert("请填写您的身份证信息");
    }else if(isNaN(parseInt(this.data.age))){
      tools.alert("请填写您的年龄");
    }else{
      network.networkpost("/roadapi/driverUser/addDriverInfo",{
        "truename":this.data.rname,
        "gender":this.data.gender,
        "idno":this.data.idcode
      },app).then(()=>{
        var res=app.netWorkData.result;
        if(res.code===0){
          tools.toast("提交成功");
          wx.redirectTo({"url":"/pages/submitsuc/index"});
        }else{
          tools.alert(res.msg);
        }

      });
    }

  }









})