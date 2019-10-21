
const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');



Page({

  /**
   * 页面的初始数据
   */
  orderid:0,
   refreshtimer:0,
   uploadindex:0,
   

  data: {
    uploadfilearray:[],
    rname:"",
    idcode:"",
    gender:0,
    age:0,
    longitude:0,
    latitude:0,
    serviceid:0,
    photoneed:0,
    isfinished:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.orderid){
      this.orderid=options.orderid;
      var pn=0;
      if(options.serviceid==1||options.serviceid==2||options.serviceid==7){
        pn=8;
      }else{
        pn=5;
      }
      var fn=false;
      if(options.finish&&parseInt(options.finish)===1){
        fn=true;
      }

      this.setData({
        serviceid:options.serviceid,
        photoneed:pn,
        isfinished:fn
      });

      


      this.data.longitude=options.longitude;
      this.data.latitude=options.latitude;

      if(fn){
        network.networkpost("/roadapi/driverUser/getOrderImgs",{orderid:this.orderid},app).then(()=>{
          var res=app.netWorkData.result;
          if(res.code==0){
            var server=res.config.server;
            var pics=res.data.split(",");
            pics.forEach((item,index)=>{
              pics[index]=server+item
            });
            this.setData({
              uploadfilearray:pics
            });
          }else{
            tools.alert(res.msg);
          }
        });
      }


    }else{
      tools.alert("参数错误");
    }
    
  },

  onClickUpload:function(){
    var me=this;
    wx.chooseImage({
      count:9,
      sizeType: ['compressed'],
      sourceType:['album', 'camera'],
      success: function(res) {
        console.log(res.tempFilePaths);
        if(res.tempFilePaths.length+me.data.uploadfilearray.length>me.data.photoneed){
          tools.alert("请按照要求提供照片");
        }else{
          var tt=me.data.uploadfilearray.concat(res.tempFilePaths);

          me.setData({
            uploadfilearray:tt
          });
          me.uploadindex=0;
        }


      },
      fail:function(res){
        wx.showModal({
          title: '错误',
          content: '选择文件失败'
        });
      }
    });
  },

  onClickConfirm:function(e){
    if(this.data.uploadfilearray.length==this.data.photoneed){
      wx.showLoading();
      this.upLoadFiles();
    }else{
      tools.alert("请按照要求上传照片");
    }


  },
  
  
  upLoadFiles:function(){
  
    var me=this;
    
    if(this.uploadindex>=this.data.uploadfilearray.length){
      wx.hideLoading();
      this.onUploadSuc();
    }else{
      me.upLoadOne(this.data.uploadfilearray[me.uploadindex]);
      me.uploadindex++;
    }
    
  },
  upLoadOne(filepath){
    var me=this;
    wx.uploadFile({
      "url":app.globalData.host+"/roadapi/order/reachOrderUploadFile",
      "filePath":filepath,
      "name":"file",
      "header":{
        "content-type":"multipart/form-data","token":app.globalData.token
      },
      success:function(res){
        console.log("upload res");
        console.log(res);
        me.upLoadFiles();
      }
    });
  },




  onUploadSuc:function(){
    network.networkpost("/roadapi/order/signOrder",{},app).then(()=>{
      var res=app.netWorkData.result;
      if(res.code===0){
        tools.toast("提交成功");
        
        wx.redirectTo({"url":"/pages/orderlist/index"});
      }else{
        tools.alert(res.msg);
      }
    });
  },

  previewImg:function(e){

    wx.previewImage({"urls":this.data.uploadfilearray,"current":e.target.dataset.src});
  },


  onDelPic:function(e){
    var picsrc=e.target.dataset.src;
    let picarray=[...this.data.uploadfilearray];
    for(let i of picarray.keys()){
      if(picarray[i]===picsrc){
        picarray.splice(i,1);
      }
    }
    this.setData({
      uploadfilearray:picarray
    });
  },











})