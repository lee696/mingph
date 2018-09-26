/**
 *我的积分页.js.
 */
$(function () {
    $('.user-sidebar a').eq(3).css('color','#c5ad82');
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

        getIntegral();//获取用户积分
        getRecord();//获取积分记录
        getRecommend(); //精品推荐
    }

    //获取用户积分
    function getIntegral() {
        var uid = ykp.getLocalStorage("id");
        var postData = {
            uid: uid
        }
        ykp.list({
            url: 'integral/getIntegral',
            method: 'get',
            data: postData,
            loadList: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var data = res.data;
                var integral = data.integral;
                $('#integral-cont').html(integral);
            }
        });
    }

    //获取积分记录
    function getRecord() {
        var uid = ykp.getLocalStorage("id");
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var nowDate = '' + year + '/' + month + '';
        var postData = {
            uid: uid,
            mark: nowDate
        };
        ykp.list({
            url: 'integral/getAllIntegralRecord',
            method: 'get',
            data: postData,
            loadList: function (res) {
                var data = res.data;
                if(!data || data.length<=0){
                    $('.user-point-render').html('<p style="text-align:center;">暂无数据</p>');
                    return;
                }
                var html = [];
                var _html =[];
                for (var i in data) {
                    var inhtml = [];
                    var item = data[i].list;
                    for (var v = 0; v < item.length; v++) {
                        inhtml.push('<div class="flex space-between align-center"><div class="left"><span>' + item[v].typeTwo + '</span><span class="line"></span><span>' + ykp.formatDate(new Date(item[v].addtime), 'M-d H:m') + '</span></div><div class="right"><span class="red-font">+' + item[v].money + '</span><span>积分</span></div></div>')
                    }
                    html.push(
                        '<div class="point-record-item">',
                        '<p>' + data[i].mark + '</p>',
                        '<div class="point-table">',
                        inhtml.join(''),
                        '</div>',
                        '</div>'
                    );
                    _html.push(html.join(''))
                    html=[];
                }
                $('.user-point-render').html(_html[0]);
                //索引
                var index = 1;
                console.log(_html);
                //上一页
                $('#previous_page').click(function(){
                    if(index == 1){
                        return;
                    }
                    var _index = --index;
                    $('.user-point-render').html(_html[--_index]);
                    console.log(_html[--_index]);
                });
                //下一页
                $('#next_page').click(function(){
                    if(index == _html.length){
                        return;
                    }
                    var _index = ++index;
                    $('.user-point-render').html(_html[--_index]);
                    console.log(_html[--_index]);
                });
            }
        });
    }

    //精品推荐
    function getRecommend() {
        var postData = {
            pageNo: 1,
            pageSize: 4,
        };
        ykp.list({
            url: 'home/fineRecommend',
            method: 'get',
            data: postData,
            loadList: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var data = res.data;
                var item = data.list;
                var html=[];
                for (var i in item) {
                    html.push(
                        '<a href="' + goods_detail_page + '?gid=' + item[i]['id'] + '&boutique=1&detail=' + escape(item[i]['name']) + '" class="goods-list-item">',
                        '<div class="img-wrapper">',
                        '<img src="'+(item[i].picture? item[i].picture : defualtpic)+'">',
                        '</div>',
                        '<div class="goods-info">',
                        '<p class="goods-title">' + item[i]['name'] + '</p>',
                        '<p class="goods-states flex align-center space-between">',
                        '<span>' + item[i]['saleNum'] + '人喜欢</span>',
                        '<span>' + item[i]['monthlySales'] + '人购买</span>',
                        '</p>',
                        '<p class="goods-price flex align-center space-between">',
                        '<span class="black-font">￥' + item[i]['prevailingPrice'] + '</span>',
                        '<span class="to-buy">购买</span></p>',
                        '</div>',
                        '</a>'
                    );
                }
                $('#recommend-goods').append(html.join(''));
            }
        });
    }
})
