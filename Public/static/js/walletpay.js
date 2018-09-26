/**
 * 余额支付
 */
$(function () {
    //获取用户id
    var uid = ykp.getLocalStorage("uid");
    //获取订单id
    var orderId = $.getUrlParam('orderId');
    //只允许密码框输入数字和控制6个input框只能输入一个数字自动往后跳
    $('input[type="password"]').on('keyup', function payPwdcheck() {
        this.value = this.value.replace(/[^0-9]/g, '');
        var pwd1=$('input[name="pwd1"]').val();
        var pwd2=$('input[name="pwd2"]').val();
        var pwd3=$('input[name="pwd3"]').val();
        var pwd4=$('input[name="pwd4"]').val();
        var pwd5=$('input[name="pwd5"]').val();
        var pwd6=$('input[name="pwd6"]').val();
        if(!pwd1){
            $('input[name="pwd1"]').focus();
            return;
        }
        if($(this).val()){
            $(this).next().focus();
        } else if(!$(this).val()){
            $(this).prev().focus();
        }
    });

    $('#confirm_pay').click(function () {
        //判断是否有设置支付密码，如果没有设置跳转到设置页面
        var isSetPay = ykp.getLocalStorage("isSetPay");
        console.log(isSetPay);
        if(isSetPay ==0 ) {
            ykp.showOk({
                text: '您还没有支付密码，请先设置支付密码！',
                callback: function () {
                    location.href = setPaypwd;
                }
            });
            return;
        }
        var pwd1=$('input[name="pwd1"]').val();
        var pwd2=$('input[name="pwd2"]').val();
        var pwd3=$('input[name="pwd3"]').val();
        var pwd4=$('input[name="pwd4"]').val();
        var pwd5=$('input[name="pwd5"]').val();
        var pwd6=$('input[name="pwd6"]').val();
        if(!pwd1 || !pwd2 ||!pwd3||!pwd4||!pwd5||!pwd6){
            ykp.alert('请正确填写支付密码！')
            return
        }
        ykp.doAjax({
            url: 'pay/checkPayPassword',
            method: 'get',
            breakDebug:true,
            data: {uid:uid, oldpaypwd:$.md5(pwd1+pwd2+pwd3+pwd4+pwd5+pwd6)},
            success: function (res) {
                if(res.code == 12){
                    ykp.alert('支付密码错误，请重新输入！');
                }
                if(res.code == 11){
                    ykp.alert(res.msg);
                }
                if(res.code == 200){
                    ykp.doAjax({
                        url: 'order/sureToPay',
                        method: 'get',
                        data: {userId:uid, id:orderId,type:0},
                        success: function (res) {
                            if(res.code == 200){
                                location.href = ''+PySuccess+'?orderId='+ orderId +'';
                            }
                        }
                    });

                }
            },
        });

    })
})