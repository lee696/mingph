/**
 *充值支付页.js
 */
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
    //获取充值金额
    var Dmoney = $.getUrlParam('money')
    //显示充值金额
    $('#dismoney').html('￥'+Dmoney)


    $('#pay-sub').click(function () {
        var payType = $('#payTypebox .checkedPayWay')
        if (payType.length == 0) {
            ykp.alert('请选择支付方式！')
        }
        if (payType.attr('pay-way') == 11) {
            ykp.doAjax1({
                url: 'pay/alipageTopup',
                method: 'get',
                data: {uid: uid, price: Dmoney, type: 11},
                success: function (res) {
                    $('.tips').html(res.result.substring(0,res.result.indexOf('<script>')));
                    $('.tips input[type=submit]').click();
                }
            });
        }
        if (payType.attr('pay-way') == 21) {
            location.href = typeOfwxPay+'?money='+Dmoney;
        }
        if (payType.attr('pay-way') == 31) {
            ykp.doAjax1({
                url: 'pay/cardB2CTopup',
                method: 'get',
                async:false,
                data: {uid: uid, price: Dmoney, type: 31},
                success: function (res) {
                    $("body").html(res.result);
                }
            });
        }
    })

})