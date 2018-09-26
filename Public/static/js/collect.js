/**
 *收藏商品.js
 */
$('.user-sidebar a').eq(7).css('color','#c5ad82');
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
    getCollect();//获取收藏商品列表
}

//获取收藏商品列表
function getCollect() {
    var uid = ykp.getLocalStorage("id");
    var postData = {
        userId: uid,
        pageSize: '',
        pageNo: ''
    };
    ykp.list({
        url: 'shop/collectGoodsList',
        method: 'get',
        data: postData,
        loadList: function (res) {
            var data = res.data;
            var item = data.collections;
            if(!item || item.length <= 0){
                $('#collectRender').html('<td colspan="4" style="height:50px;color:#666">暂无数据</td>');
                return;
            }
            var html = [];
            var _html = [];
            var index = 0;
            var pageSize = 3;
            for (var i in item) {
                html.push(
                    '<tr>',
                    '<td>',
                    '<div class="img-wrapper">',
                    '<img src="' + item[i].picture + '" />',
                    '</div>',
                    '</td>',
                    '<td>' + item[i].name + '</td>',
                    '<td>￥' + item[i].price + '</td>',
                    '<td>',
                    '<a href="' +(item[i].type==4? goods_Integraldetail_page : goods_detail_page )+ '?gid=' + item[i].goodsId + '&collect=1&detail='+escape(item[i].name) +'" class="collect-action">查看</a>',
                    '<a href="#" onclick="deleteCollect(' + item[i].userId + ',' + item[i].goodsId + ')" class="collect-action">删除</a>',
                    '</td>',
                    '</tr>'
                );
                _html.push(html.join(''));
                html = [];
            }
            var items = Math.ceil(_html.length/pageSize);
            var html = _html.slice(index*pageSize,(index+1)*pageSize);
            $('#collectRender').append(html.join(''));

            //上一页
            $('#prePage').click(function(){
                if(index == 0){
                    return;
                }
                index--;
                var html = _html.slice(index*pageSize,(index+1)*pageSize);
                $('#collectRender').html(html.join(''));
            });

            //下一页
            $('#nextPage').click(function(){
                if(index == (items-1)){
                    return;
                }
                index++;
                var html = _html.slice(index*pageSize,(index+1)*pageSize);
                $('#collectRender').html(html.join(''));
            });
        }
    });
}

//删除收藏函数
function deleteCollect(uid, goodsid) {
    var postData = {
        userId: uid,
        goodId: goodsid
    };
    ykp.list({
        url: 'shop/removeGoods',
        method: 'get',
        data: postData,
        loadList: function (res) {
            if (res.code !== 200) {
                ykp.alert(res.msg);
                return;
            }
            ykp.showOk(res.msg);
            $('#collectRender').html('');
            getCollect();
        }
    });
}