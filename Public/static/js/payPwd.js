/**
 * 支付密码页面。js
 */
$(function () {
    //判断是否有设置支付密码，如果没有设置跳转到设置页面
    var isSetPay = ykp.getLocalStorage("isSetPay");

    //判断是从设置密码点进来的还是从忘记密码或修改密码点进来的。
    var payPwdchange = $.getUrlParam('payPwdch');
    var payPwdforget = $.getUrlParam('payPwdfo');

    //获取手机号码
    var gphone = ykp.getLocalStorage("telephone");


    //调用判断方法
    payPwdset();
    function payPwdset() {
        if (payPwdchange) {
            //判断是否有设置支付密码，如果没有设置跳转到设置页面
            if(!isSetPay){
                ykp.showOk({
                    text: '您还没有支付密码，请先设置支付密码！',
                    callback: function () {
                        location.href = uPaypwd;
                    }
                });

                return
            }
            $('#pwdtit').html('修改支付密码');
            $('#phone-box').hide();
            $('#vCode-box').hide();
            return;
        } else if (payPwdforget) {
            //判断是否有设置支付密码，如果没有设置跳转到设置页面
            if(!isSetPay){
                ykp.showOk({
                    text: '您还没有支付密码，请先设置支付密码！',
                    callback: function () {
                        location.href = uPaypwd;
                    }
                });

                return
            }

            $(".user-pwd-form input[name='phone']").val(gphone);
            $('#pwdtit').html('忘记支付密码');
            $('#oldPwd-box').hide();
            return;
        } else {
            $('#pwdtit').html('设置支付密码');
            $('#phone-box').hide();
            $('#vCode-box').hide();
            $('#oldPwd-box').hide();
        }
    }


    //只允许密码框输入数字
    $('input[type="password"]').on('keyup', function payPwdcheck() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    //获取短信验证码
    var data = {};
    $('.getVcode').click(function () {
        var phone_dom = $(".user-pwd-form input[name='phone']");
        var phone = phone_dom.val();
        $('.regForm input').removeClass('border_red');
        $('.warning div').hide();
        if (!phone || phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
            phone_dom.addClass('border_red');
            $('.phone-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
            return;
        }
        phone_dom.removeClass('border_red');
        $('.phone-warn div').show().addClass('ok');
        ykp.doAjax({
            url: 'user/sendcode',
            method: 'post',
            data: {phone: phone, type: 3},
            success: function (res) {
                ykp.showOk({text: '验证码已发送成功!'});
                var time = 60;
                $('.getVcode').attr('disabled', 'disabled');
                var fun = function () {
                    if (time > 0) {
                        time--;
                        $('.getVcode').text(time + '秒');
                        setTimeout(fun, 1000);
                    } else {
                        $('.getVcode').removeAttr('disabled');
                        $('.getVcode').text('重新发送');
                    }
                };
                setTimeout(fun, 1000);
            },
        });
    });

    //失焦验证原密码是否正确
    $('#old-pwd').blur(function () {
        var postData = {uid: ykp.getLocalStorage("uid"), oldpaypwd: $.md5($('#old-pwd').val())}
        checkOldpwd(postData)
    })

    //提交密码
    $('#subMod').click(function () {
        console.log(111);
        if (payPwdchange) {
            if (!$('#old-pwd').val() || $('#old-pwd').val().match(/^[\w\@-]{6,30}$/) == null) {
                $('#old-pwd').addClass('border_red');
                $('.old-pwd-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
            } else if (!$('#pwd-inp1').val() || $('#pwd-inp1').val().match(/^[\w\@-]{6,30}$/) == null) {
                $('#old-pwd').removeClass('border_red');
                $('#pwd-inp1').addClass('border_red');
                $('.phone-warn div').show().addClass('ok');
                $('.vcode-warn div').hide();
                $('.password-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if ($('#pwd-inp1').val() !== $('#pwd-inp2').val()) {
                ykp.alert('两次支付密码不一致')
                $('#old-pwd').removeClass('border_red');
                $('#pwd-inp1').removeClass('border_red');
                $('#pwd-inp2').addClass('border_red');
                $('.phone-warn div').show().addClass('ok');
                $('.vcode-warn div').hide();
                $('.password-warn div').show().addClass('ok');
                $('.password-warn2 div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else {
                $('#old-pwd,#pwd-inp1,#pwd-inp2').removeClass('border_red');
                $('.warning div').show().addClass('ok');
                var url = 'pay/updatePayPassword';
                var paypwd = $.md5($('#pwd-inp2').val());
                var uid = ykp.getLocalStorage("uid");
                var pwddata = {'uid': uid, 'paypwd': paypwd};
                pwdSubmit(url, pwddata)

            }
        } else if (payPwdforget) {
            var phone_dom = $(".user-pwd-form input[name='phone']");
            var phone = phone_dom.val();
            $('.user-pwd-form input').removeClass('border_red');
            if (!phone || phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
                phone_dom.addClass('border_red');
                $('.phone-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if (!$('#phoneVcode').val() || $('#phoneVcode').val().match(/^\d{6}$/) == null) {
                $('#phoneVcode').addClass('border_red');
                $('.phone-warn div').show().addClass('ok');
                $('.vcode-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if (!$('#pwd-inp1').val() || $('#pwd-inp1').val().match(/^[\w\@-]{6,30}$/) == null) {
                $('#pwd-inp1').addClass('border_red');
                $('.phone-warn div').show().addClass('ok');
                $('.vcode-warn div').hide();
                $('.password-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if ($('#pwd-inp1').val() !== $('#pwd-inp2').val()) {
                $('#pwd-inp2').addClass('border_red');
                $('.phone-warn div').show().addClass('ok');
                $('.vcode-warn div').hide();
                $('.password-warn div').show().addClass('ok');
                $('.password-warn2 div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else {
                $('.warning div').show().addClass('ok');
                $('.vcode-warn div').hide();

                var url = 'pay/forgetPayPassword';
                var paypwd = $.md5($('#pwd-inp2').val());
                var uid = ykp.getLocalStorage("uid");
                var vcode = $('#phoneVcode').val();
                var pwddata = {'uid': uid, 'paypwd': paypwd, 'vcode': vcode};
                pwdSubmit(url, pwddata);
            }

        } else {
            if (!$('#pwd-inp1').val() || $('#pwd-inp1').val().match(/^[\w\@-]{6,30}$/) == null) {
                $('#pwd-inp1').addClass('border_red');
                $('.password-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if ($('#pwd-inp1').val() !== $('#pwd-inp2').val()) {
                $('#pwd-inp1').removeClass('border_red');
                $('#pwd-inp2').addClass('border_red');
                $('.password-warn div').show().addClass('ok');
                $('.password-warn2 div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else {
                $('#pwd-inp1,#pwd-inp2').removeClass('border_red');
                $('.warning div').show().addClass('ok');
                var url = 'pay/setPayPassword';
                var paypwd = $.md5($('#pwd-inp2').val());
                var uid = ykp.getLocalStorage("uid");
                var pwddata = {'uid': uid, 'paypwd': paypwd};
                pwdSubmit(url, pwddata);

            }
        }
    })
})


//修改密码验证用户密码
function checkOldpwd(postData) {
    ykp.doAjax({
        url: 'pay/checkPayPassword',
        method: 'get',
        breakDebug:true,
        data: postData,
        success: function (res) {
            if (res.code !== 200) {
                ykp.alert(res.msg);
                $('#subMod').attr('disabled', true);
                return;
            }
            $('.old-pwd-warn div').show().addClass('ok')
            $('#subMod').attr('disabled', false);
        },
    });

}

//ajax提交函数
function pwdSubmit(url, postData) {
    ykp.doAjax({
        url: url,
        method: 'get',
        data: postData,
        success: function (res) {
            ykp.showOk({
                text: "操作成功！",
                callback: function () {
                    location.href = document.referrer;
                    ykp.setLocalStorage('isSetPay',1);
                }
            });
        },
    });
}
