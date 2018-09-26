/**
 *我的钱包.js
 */
$('.user-sidebar a').eq(6).css('color','#c5ad82');

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
    getCoupons(); //钱包信息
    getCouponsDetails();//获取钱包明细
}

//钱包信息
function getCoupons() {
    var uid = ykp.getLocalStorage("id");
    var isSetPay = ykp.getLocalStorage("isSetPay");
    if (isSetPay==1) {
        $('.changePassword').removeClass('hidden');
        $('.forgetPassword').removeClass('hidden');
    } else {
        $('.setPassword').removeClass('hidden');
    }


    var postData = {
        uid: uid,
    };
    ykp.list({
        url: 'common/getWalletInfo',
        method: 'get',
        data: postData,
        loadList: function (res) {
            if (res.code !== 200) {
                alert(res.msg);
                ykp.alert(res.msg);
                return;
            }
            var data = res.data;
            var item = data.wallet;
            var cards = data.carts.length;
            $('#balance').html('￥' + (item.money ? item.money : 0));
            $('#recharge').html('累计充值额：￥' + (item.recharge ? item.recharge : 0));
            $('#share').html('累计分润额：￥' + (item.share ? item.share : 0));
            $('#cardSum span').html(data.carts ? cards : 0)
        }
    });
}


//获取钱包明细
function getCouponsDetails() {
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
        url: 'common/getAllBillRecord',
        method: 'get',
        data: postData,
        loadList: function (res) {
            var data = res.data;
            if(!data || data.length<=0){
                $('#userWalletRecords').html('<td colspan="3" style="height:50px;color:#666">暂无数据</td>');
                return;
            }
            var dHtml = [];
            var index = 0;
            var pageSize = 6;
            for (var i = 0; i < data.length; i++) {
                var item = data[i].list;
                for (v = 0; v < item.length; v++) {
                    dHtml.push(
                        '<tr>'+
                        '<td>'+ ykp.formatDate(new Date(item[v].addtime), 'Y-M-d H:m') +'</td>'+
                        '<td>'+ item[v].typeTwo +'</td>'+
                        '<td>'+ (item[v].typeTwo.match("消费") ? "-" : "+" ) +' '+ item[v].money +'</td>'+
                        '</tr>'
                    )
                }
            }
            var items = Math.ceil(dHtml.length/pageSize);
            var DHtml = dHtml.slice(index*pageSize,(index+1)*pageSize);
            $('#userWalletRecords').html(DHtml.join(''));

            //上一页
            $('.prePage').click(function(){
                if(index == 0){
                    return;
                }
                index--;
                var DHtml = dHtml.slice(index*pageSize,(index+1)*pageSize);
                $('#userWalletRecords').html(DHtml.join(''));
            });

            //下一页
            $('.nextPage').click(function(){
                if(index == (items-1)){
                    return;
                }
                index++;
                var DHtml = dHtml.slice(index*pageSize,(index+1)*pageSize);
                $('#userWalletRecords').html(DHtml.join(''));
            });
        }
    });
}
