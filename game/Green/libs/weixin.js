var sharetitle="奔跑吧！小润洁！";
var sharedesc ="奔跑吧！小润洁！";
var shareimg="http://runjie.com/games/MLHgame/green/share.jpg";
var sharelink="http://runjie.com/games/MLHgame/green/index.html";

var mytoken;

function SetWeixin(appid,timestamp,noncestr,sign){
    wx.config({
        debug: false,
        appId: appid, // 必填，公众号的唯一标识
        timestamp:timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: sign,// 必填，签名，见附录1
        jsApiList: ['checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice'

        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.error(function(res){

        console.log("wxerror:"+res.errMsg);
        $("#loadword").empty().append("初始化失败");
    });


    wx.ready(function(){
        $("#loadword").empty().append("初始化完成");

        SetShare();

    });
   // LoadComplete();

}



function SetShare(){

    //alert(navigator.userAgent);

    wx.onMenuShareTimeline({
        title: sharetitle, // 分享标题
        link: sharelink, // 分享链接
        imgUrl: shareimg, // 分享图标
        success: function () {
           TrackWeb("sharetimeline");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });


    wx.onMenuShareAppMessage({
        title: sharedesc, // 分享标题
        desc: sharetitle, // 分享描述
        link: sharelink, // 分享链接
        imgUrl: shareimg, // 分享图标
        type:"link", // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
           
            TrackWeb("sharefriend");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}


function CheckWxVersion(){
    var s=navigator.userAgent.toLowerCase();
    var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
    var w=a ? a[1] :"";
   // alert("wx version:"+w);
    return "6.0.2"<=w;


}


$(function(){
	
    
    $.get("getwx.php",{siteurl:location.href},function(json){

        if(json.result==1){
            mytoken=json.token;
            SetWeixin(json.appid,json.timestamp,json.noncestr,json.signature);
            

        }else{
            alert("微信授权错误");
        }

    },"json");
    

});

function SetShareWord(score,ch,per){

    sharetitle = "奔跑吧！小润洁 ！凭着小润洁的聪明才智，成功躲避了“屏幕怪兽”的攻击，赢得了" + ch + "称号，超越" + per +"的人，你也赶快来挑战吧！";
	SetShare();
}