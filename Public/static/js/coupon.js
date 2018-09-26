/**
 *我的优惠卷.js
 */
$('.user-sidebar a').eq(4).css('color','#c5ad82');

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

    getCoupons(); //获取优惠价列表
    getRecommend(); //精品推荐

}


//获取优惠价列表
function getCoupons() {
    var uid = ykp.getLocalStorage('uid')
    var postData = {
        userId: uid,
        pageSize: '',
        pageNo: ''
    };
    ykp.list({
        url: 'user/couponList',
        method: 'get',
        data: postData,
        loadList: function (res) {
            var data = res.data;
            var item = data.myPage;
            if(!item || item.length<=0){
                $('#coupon-cont').html('<td style="height:50px;color:#666;text-align:center;" colspan="5">暂无数据</td>');
                return;
            }
            var html = [];
            var index = 0;
            var pageSize = 6;
            for (var i = 0; i < item.length; i++) {
                html.push(
                    '<tr>'+
                    '<td>' + item[i].couponDetail.name + '</td>'+
                    '<td>' + item[i].couponDetail.couponCode + '</td>'+
                    '<td> ' + ykp.formatDate(new Date(item[i].couponDetail.begintime), 'Y-M-d') + ' - ' + ykp.formatDate(new Date(item[i].couponDetail.endtime), 'Y-M-d') + ' </td>'+
                    '<td>' + (item[i].isUse == 0 ? '未使用' : '已使用') + '</td>'+
                    '<td style="cursor:pointer"><a onclick="deleteCoupons(' + item[i].cId + ')">删除</a> </td>'+
                    '</tr>'
                );
            }
            var items = Math.ceil(html.length/pageSize);
            var DHtml = html.slice(index*pageSize,(index+1)*pageSize);
            $('#coupon-cont').html(DHtml.join(''));

            //上一页
            $('.prePage').click(function(){
                if(index == 0){
                    return;
                }
                index--;
                var DHtml = html.slice(index*pageSize,(index+1)*pageSize);
                $('#coupon-cont').html(DHtml.join(''));
            });

            //下一页
            $('.nextPage').click(function(){
                if(index == (items-1)){
                    return;
                }
                index++;
                var DHtml = html.slice(index*pageSize,(index+1)*pageSize);
                $('#coupon-cont').html(DHtml.join(''));
            });
        }
    });
}

//删除优惠卷
function deleteCoupons(cId) {
    ykp.doAjax({
        url: 'user/deleteCoupon',
        method: 'get',
        data: {cId: cId},
        success: function (res) {
            if (res.code !== 200) {
                //alert(res.msg);
                ykp.alert(res.msg);
                return;
            }
            ykp.showOk({text: res.msg});
            $('#coupon-cont').html('');
            getCoupons();
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
            var html = [];
            for (var i in item) {
                html.push(
                    '<a href="' + goods_detail_page + '?gid=' + item[i]['id'] + '&boutique=1&detail=' + escape(item[i]['name']) + '" class="goods-list-item">',
                    '<div class="img-wrapper">',
                    '<img src="' + (item[i].picture ? item[i].picture : defaultpic) + '">',
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