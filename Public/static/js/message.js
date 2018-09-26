/**
 *我的消息.js
 */
$('.user-sidebar a').eq(5).css('color','#c5ad82');

var uid = ykp.getLocalStorage("uid"); //获取用户id
init(); //页面初始化

function init() {
    if (!uid) {
        ykp.showOk({
            text: '您还没有登录请先登录!',
            callback: function () {
                location.href = _login_page;
            }
        });
        return;
    }
    getMessage();//获取消息列表
}

//获取消息列表
function getMessage() {
    var uid = ykp.getLocalStorage("id");
    var postData = {
        userId: uid,
        pageSize: '',
        pageNo: ''
    };
    ykp.list({
        url: 'message/messageList',
        method: 'get',
        data: postData,
        loadList: function (res) {
            if (res.code !== 200) {
                ykp.alert(res.msg);
                return;
            }
            var data = res.data;
            var item = data.messageList;
            var index = 0;
            var pageSize = 6;
            var html = [];
            for (var i in item) {
                html.push(
                    '<div class = "flex user-message-item space-between align-center">'+
                    '<div class = "main">'+
                    '<p>'+
                    '<span class = "bold-font black-font">' + item[i].title + '</span>'+
                    '<span>&nbsp;&nbsp;&nbsp;&nbsp; ' + ykp.formatDate(new Date(item[i].addtime), 'Y-M-d H:m:s ') + '</span>'+
                    '</p>'+
                    '<p>' + item[i].context + '</p>'+
                    '</div>'+
                    '<a onclick="deleteMessage(' + item[i].id + ')" class = "del-message"> </a>'+
                    '</div>'
                );
            }
            var items = Math.ceil(html.length/pageSize);
            var DHtml = html.slice(index*pageSize,(index+1)*pageSize);
            $('.user-message-render').html(DHtml.join(''));

            //上一页
            $('.prePage').click(function(){
                if(index == 0){
                    return;
                }
                index--;
                var DHtml = html.slice(index*pageSize,(index+1)*pageSize);
                $('.user-message-render').html(DHtml.join(''));
            });

            //下一页
            $('.nextPage').click(function(){
                if(index == (items-1)){
                    return;
                }
                index++;
                var DHtml = html.slice(index*pageSize,(index+1)*pageSize);
                $('.user-message-render').html(DHtml.join(''));
            });
        }
    });
}

//删除消息函数
function deleteMessage(messageId) {
    var postData = {
        messageId: messageId
    };
    ykp.list({
        url: 'message/deleteMessage',
        method: 'get',
        data: postData,
        loadList: function (res) {
            if (res.code !== 200) {
                ykp.alert(res.msg);
                return;
            }
            ykp.showOk({text: res.msg});
            $('.user-message-render').html('');
            getMessage();
        }
    });
}