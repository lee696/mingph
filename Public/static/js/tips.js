/**
 * Created by ErgoSphere on 2017/07/09
 */
var tips = new Object();

function getName(){
	var str = 'base';
	var timestamp = new Date().getTime();
	str += String(timestamp);
	str += String(parseInt(10000*Math.random()));
	if($('.'+str).length > 0){
		str = getName();
	}
	return str;
}

tips.alert = function(str){
	var className = getName();
	var zIndex = new Date().getTime();
	var html = '<div class="tips-alert '+className+'" style="z-index:'+zIndex+';">'+str+'</div>';
	$('body').append(html);
	var dom = $('.'+className);
	dom.css({'left': ($(window).width() - dom.outerWidth())/2 + 'px','margin-top':- dom.outerHeight()/2 + 'px'}).removeClass(className);
	setTimeout(function(){
		dom.fadeOut(3000,function(){
			dom.remove();
		});
	},200);
};