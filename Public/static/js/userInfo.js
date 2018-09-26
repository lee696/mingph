function getUserDetailInfo() {
	getXhr('user/getUserDetail', {
		userId : getCookie('uid')
	}, function (res) {
		
	})
}
function saveUserData(dataJson) {
	postXhr({
		url: 'user/updateUser',
		data: dataJson
	}, function (res) {
		
	})
}