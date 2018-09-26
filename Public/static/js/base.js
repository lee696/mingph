/**
 * Created by Alruna on 2017/7/9.
 */
var server = 'http://120.25.237.198:8180/api/';

function setCookie(c_name,value,expiredays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = c_name+ "=" +encodeURI(value)+((expiredays===null) ? "" : ";expires="+exdate.toGMTString()) + ";path=/"
}
function getCookie(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!==-1){
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end===-1){
                c_end=document.cookie.length;
            }
            return decodeURI(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
function delCookie(c_name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(c_name);
    if(cval !== null){
        document.cookie= c_name + "="+cval+";expires="+exp.toGMTString() + ";path=/" ;
    }
}

function xhr(options, callback) {
	if(options.type == 'POST'){
		postXhr(options,callback);
	}else{
		getXhr(options.url, options.data, callback);
	}
}

function postXhr(options, callback) {
	options.data.request_url = server + options.url;
	$.ajax({
		async: (options.async === undefined) ? true : options.async,
		type: 'POST',
		url: '/Api/proxy',
		// data: JSON.stringify(options.data),
		data: options.data,
		dataType: 'json',
		// contentType: 'application/json',
		// processData: false,
		success: function (res) {
			callback(res)
		}
	});
}
function getXhr(api, data, callback) {
	$.getJSON(server + api, data, function (res) {
		callback(res)
	})
}

function getTreasureBoxMenu(dom) {
    var list = '<a href="'+ goods_list_page +'?id=${id}" class="treasure-item">${name}</a>'
    $.template('list_mod', list)
    
   noValidXhr('GET', 'home/treasureTypeList', {}, function (res) {
       if(parseInt(res.code) === 200){
           $.tmpl('list_mod', res.data).appendTo(dom)
       }
   })
}

function getUserInfo(callback) {
	getXhr('user/getUserInfo',  {userId: 1}, function (res) {
		callback(res)
	})
}
function showModal(dom, callback) {
	dom.fadeIn('normal', function () {
		if($.isFunction(callback)){
			callback()
		}
	})
}
function closeModal(dom) {
	dom.closest('.modal').fadeOut('normal')
}

function globalInit() {
	var _body = $('body')
	_body.delegate('.close-modal', 'click', function () {
		closeModal($(this))
	})
	_body.delegate('.modal', 'click', function () {
		$(this).find('.close-modal').trigger('click')
	})
	_body.delegate('.modal .main', 'click', function (e) {
		e.stopPropagation()
	})

}