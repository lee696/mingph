/**
 * 微信支付
 */
$(function () {
    //获取用户id
    var uid = ykp.getLocalStorage("uid");
    //获取订单id
    var orderId = $.getUrlParam('orderId');

    //获取微信二维码地址并生成二维码
    getWechatqr()
    function getWechatqr() {
        ykp.doAjax({
            url: 'order/sureToPay',
            method: 'get',
            data: {userId:uid,id:orderId,type:21},
            success: function (res) {
                $('#wechatQrbox').qrcode({
                    render: 'table',
                    width: 150,
                    height: 150,
                    text: res.data
                });
            },
        });

    }

    $('#scomplete').click(function () {
        ykp.doAjax({
            url: 'order/getCompleteOrderDetails',
            method: 'get',
            data: {userId: uid, id: orderId},
            success: function (res) {
                var data=res.data.order;
                if(data.state==1){
                    location.href=PySuccess+"?orderId="+orderId;
                    return;
                }
                if(data.state!=1){
                    ykp.alert('订单未支付成功！');
                }
            }
        })
        //attr('href',PySuccess+"?orderId="+orderId);
    });
})