function checkmobile(mb){
	

	return (/^1(3|4|5|6|7|8|9)\d{9}$/.test(mb));


}


function alert(str){
	wx.showModal({content:str,showCancel:false});
}


function toast(str){
	wx.showToast({title:str,icon:"none"});
}



module.exports = {
    checkmobile:checkmobile,
    alert:alert,
    toast:toast
}