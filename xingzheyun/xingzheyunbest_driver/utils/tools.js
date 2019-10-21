function checkmobile(mb){
	

	return (/^1(3|4|5|6|7|8|9)\d{9}$/.test(mb));


}


function alert(str){
	wx.showModal({content:str,showCancel:false});
}


function toast(str){
	wx.showToast({title:str});
}

function validId(str){
	return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str);
}


module.exports = {
    checkmobile:checkmobile,
    alert:alert,
    toast:toast,
    validId:validId
}