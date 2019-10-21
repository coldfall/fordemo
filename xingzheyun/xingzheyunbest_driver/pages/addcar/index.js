const app = getApp()
const network = require('../../utils/network.js');
const tools = require('../../utils/tools.js');


Page({

  /**
   * 页面的初始数据
   */

   carlist:[],
   carid:0,

  data: {
      scodes:[
        ['选择','京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏','浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼','川', '贵', '云', '陕', '甘', '青', '蒙', '贵', '宁', '新','藏', '使', '领', '警', '学', '港', '澳'],
        [' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      ],
      scodeindex:[0,0],
      cartype:[
        ["选择"],[]
      ],
      cartypeindex:[0,0],
      carbrandname:"选择",
      carcolor:["选择","红色","白色","黑色","银灰色","蓝色","金色","咖啡色"],
      colorindex:0,
      carnum:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.networkpost("/roadapi/info/getCarBrand",{},app).then(()=>{
      var res=app.netWorkData.result;
      if(parseInt(res.code)==0){
          this.carlist=res.data;
          this.initCarList();

      }


      if(options.carid){
        this.carid=options.carid;
        this.initEdit();
      }


    });




  },


  initCarList:function(){
    //console.log(this.carlist);
    var lastletter="";
    this.data.cartype=[[],[]];
    var firstarray=[["选择"],["选择"]];
    for(let car of this.carlist){
      if(lastletter!=car.bfirstletter){
        firstarray[0].push(car.bfirstletter);
        lastletter=car.bfirstletter;
      }
    }
    this.setData({
      cartype:firstarray
    });
  },


  initEdit:function(){
    console.log(this.carid);
    network.networkpost("/roadapi/user/getCarList",{carId:this.carid},app).then(()=>{
        var res=app.netWorkData.result;
        if(res.data){
            let car=res.data[0];
            this.initCarNum(car.carNo);
            this.initCarType(car.brandName);
            this.initCarColor(car.color);
        }
        

    });
  },

  initCarNum(carnum){
    var p=carnum.substr(0,1);
    var c=carnum.substr(1,1);
    var n=carnum.substr(3);
    var tscode=[];
    for(let i in this.data.scodes[0]){
      if(p==this.data.scodes[0][i]){
        tscode[0]=i;
        break;
      }
    }
    for(let i in this.data.scodes[1]){
      if(c==this.data.scodes[1][i]){
        tscode[1]=i;
        break;
      }
    }
    this.setData({
      scodeindex:tscode,
      carnum:n
    });

  },

  initCarType(brandname){
    this.setData({
      carbrandname:brandname
    });
  },


  initCarColor(color){
    var tindex=0;
    for(let i in this.data.carcolor){
      if(color==this.data.carcolor[i]){
        tindex=i;
        break;
      }
    }
    this.setData({
      colorindex:tindex
    });
  },


  onCarColChange:function(e){
    if(e.detail.column==0){

      if(e.detail.value==0){
        var sarray=[];
        sarray[0]=this.data.cartype[0];
        sarray[1]=["选择"];
        this.setData({
          cartype:sarray,
          cartypeindex:[e.detail.value,0]
        });
      }else{
        var fl=this.data.cartype[0][parseInt(e.detail.value)];

        var secarray=[];
        for(let car of this.carlist){
          if(car.bfirstletter==fl){
            secarray.push(car.name);
          }
        }
        var sarray=[];
        sarray[0]=this.data.cartype[0];
        sarray[1]=secarray;
        //console.log(sarray[1]);
        this.setData({
          cartype:sarray,
          cartypeindex:[e.detail.value,0]
        });
      }


    }

  },

  onCarListChange:function(e){
    console.log(e.detail.value);
    this.data.cartypeindex=e.detail.value;
    this.setData({
      carbrandname:this.data.cartype[1][this.data.cartypeindex[1]],
    });
  },


  onScodeChange: function (e) {
    this.setData({
      scodeindex:e.detail.value.concat()
    })
  },

  onColorChange:function(e){
    this.setData({
      colorindex:e.detail.value
    })
  },

  onInputNum:function(e){
    this.setData({
      carnum:e.detail.value
    });
  },

  onSubmitCar:function(e){
    if(this.data.scodeindex[0]==0||this.data.scodeindex[1]==0){
      tools.alert("请选择车牌号");
    }else if(this.data.carnum==""||this.data.carnum.length!=5){
      tools.alert("请输入您的车牌号");
    }else if(this.data.carbrandname==""||this.data.carbrandname=="选择"){
      tools.alert("请选择车型品牌");
    
    }else if(this.data.colorindex==0){
      tools.alert("请选择车辆颜色");
    
    }else{
      var user={};
      user.userid=app.globalData.user.userid;
      user.isDel=0;
      var s1=this.data.scodeindex[0];
      var s2=this.data.scodeindex[1];

      user.carNo=this.data.scodes[0][s1]+this.data.scodes[1][s2]+"-"+this.data.carnum;
      user.color=this.data.carcolor[this.data.colorindex];
      var typename=this.data.carbrandname;
      user.brandName=typename;
      for(let car of this.carlist){
        if(car.name==typename){
          user.carBrand=car.brandid;
          break;
        }
      }
      wx.showLoading("提交信息中");
      var posturl="/roadapi/user/addCar";
      if(this.carid>0){
        user.carId=this.carid;
        posturl="/roadapi/user/editCar"
      }
      network.networkpostjson(posturl,JSON.stringify(user),app).then(()=>{
        wx.hideLoading();
        var res=app.netWorkData.result;
        if(res.code==0){
          tools.toast("提交成功");
          wx.navigateTo({url:"/pages/mycars/index"});
        }else{
          tools.toast(res.msg);
        }
      });


    }
  }

})