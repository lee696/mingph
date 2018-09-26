function isContact(str){
	return isPhone(str)||isTel(str);
}
function isIMEI(str){
	var reg = /^(\d{15}|\d{17})$/;
	return reg.test(str);
}
function isPhone(str){
	var reg = /^1[3,4,5,7,8]\d{9}$/;
	return reg.test(str);
}
function isTel(inpurStr){
	partten = /^(\d{3,4}\-)?\d{7,8}$/i;    //带横线 电话号码
	if(partten.test(inpurStr)){
		return true;
	}
	partten = /^0(([1-9]\d)|([3-9]\d{2}))\d{8}$/;    //不带横向电话号码
	if(partten.test(inpurStr)){
		return true;
	}
	return false;    //如果都不是 返回  false
}
function isIDCard(str) {
	var pattern = /\d{17}[\d|x]|\d{15}/;
	return pattern.test(str);
}
function isALiPay(str){
	var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	var newReg=/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
	if(newReg.test(str) || reg.test(str)){
		return true;
	}
}
function isWeixin(wx){
	var reg=/^[a-zA-Z\d_]{5,}$/;
	if(reg.test(wx)){
		return true;
	}
}
function BankCard(bCard){
	var reg=/^\d{19}|\d{16}$/;
	if(reg.test(bCard)){
		return true;
	}
}
function isEmail(str){
	var pattern =/^[a-zA-Z0-9_\-.]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
	if(pattern.test(str)){
		return true;
	}
	return false;
}
function isNumber(value) {
	var pattern = /^(-)?\d+(\.\d+)?$/;
	if(pattern.exec(value) === null || value === "") {
		return false
	}else{
		return true
	}
}