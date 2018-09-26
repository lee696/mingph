/**
 * 微信支付
 */
$(function () {
    //获取用户id
    var uid = ykp.getLocalStorage("uid");
    var price = $.getUrlParam('money');

    //获取微信二维码地址并生成二维码
    getWechatqr()
    function getWechatqr() {
        ykp.doAjax({
            url: 'pay/topup',
            method: 'get',
            data: {price:price,uid:uid,type:21},
            success: function (res) {
                console.log(res);
                $('#wechatQrbox').qrcode({
                    render: 'table',
                    width: 150,
                    height: 150,
                    text: res.data
                });
            },
        });

    }
})