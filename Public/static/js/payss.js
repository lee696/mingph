/**
 *支付
 */

var yueMoey = 0;
var oderMoey = 0;

//选择支付方式
$(".pay-option-box").click(function () {
    if ($(this).hasClass('checkedPayWay')) {
        return;
    }
    $(this).addClass('checkedPayWay').siblings().removeClass('checkedPayWay');
});

$(function () {
    //获取用户id
    var uid = ykp.getLocalStorage("uid");
    //获取订单id
    var orderId = $.getUrlParam('orderId');

    //获取订单信息
    getOderinfor()
    function getOderinfor() {
        ykp.doAjax({
            url: 'order/beforeToPay',
            method: 'get',
            data: {uid: uid, oid: orderId},
            success: function (res) {
                var orderData = res.data.order;
                var walletData = res.data.wallet;
                $("#orderNo").html(orderData.tradeNo)
                $("#payMy").html('￥' + orderData.amount)
                $("#lastTime").html(ykp.formatDate(new Date(orderData.addtime + 86400000), 'Y-M-d H:m:s'))
                $('#seeDorder').append('<a href="' + orderDetail + '?orderId=' + orderData.id + '" class="gold-font" id="seeDorder">查看订单</a>')
                yueMoey = walletData.money;
                oderMoey = orderData.amount;
            }
        });
    }

    $('#immediatelyTopay').click(function () {
        var payType = $('#payTypebox .checkedPayWay')
        if (payType.length == 0) {
            ykp.alert('请选择支付方式！')
        }
        if (payType.attr('pay-way') == 0) {
            //判断是否有设置支付密码，如果没有设置跳转到设置页面
            var isSetPay = ykp.getLocalStorage("isSetPay");
            if(isSetPay ==0 ) {
                ykp.showOk({
                    text: '您还没有支付密码，请先设置支付密码！',
                    callback: function () {
                        location.href = setPaypwd;
                    }
                });
                return;
            }

            //判断余额是否大于应付款金额
            if(yueMoey < oderMoey) {
                ykp.showOk({
                    text: '余额不足请充值！',
                   /* callback: function () {
                        location.href = setPaypwd;
                    }*/
                });
                return;
            }
            location.href = typeOfwalletPay + '?orderId=' + orderId + '&payType=' + payType.attr('pay-way');
        }
        if (payType.attr('pay-way') == 11) {
            ykp.doAjax1({
                url: 'order/aliPagePay',
                method: 'get',
                data: {userId: uid, id: orderId, type: 11},
                success: function (res) {
                    $('.tips').html(res.result.substring(0,res.result.indexOf('<script>')));
                    $('.tips input[type=submit]').click();
                }
            });
        }
        if (payType.attr('pay-way') == 21) {
            location.href = typeOfwxPay + '?orderId=' + orderId + '&payType=' + payType.attr('pay-way');
            ;
        }
        if (payType.attr('pay-way') == 31) {
            ykp.doAjax1({
                url: 'order/cardB2CPay',
                method: 'get',
                async:false,
                data: {userId: uid, id: orderId, type: 31},
                success: function (res) {
                    $("body").html(res.result);
                }

            });
        }
    })

})