
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?71c04b03593c30afad2972b84931d5d9";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


function TrackWeb(act){

    if(typeof(_hmt)!="undefined"){
        _hmt.push(['_trackEvent', "wapevent", act]);
    }
}
