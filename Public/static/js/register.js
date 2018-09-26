/**
 *登录页.
 */

function getPicVcode() {
    var code = localStorage.getItem("picVcode").toLowerCase();
    console.log(code);
    return code;
}
$(function () {
    //生成图片验证码
    makePicVcode();

    //获取短信验证码
    getVcode();

    //提交注册
    subReg();

    //getPicVcode();

    //将图片验证码付给equal做进一步验证
    definePicVcode();

    function definePicVcode() {
        var code = localStorage.getItem("picVcode").toLowerCase();
        $('#msgRegCaptcha').attr('equal', code);
    }

    function definePhoneVcode() {
        var val = localStorage.getItem("phoneVcode");
        if (!val) {
            $('#phoneVcode').attr('equal', "fdsfsdf5615");
            return;
        } else {
            var code = localStorage.getItem("phoneVcode").toLowerCase();
            $('#phoneVcode').attr('equal', code);
        }
    }


    //生成图片验证码
    function makePicVcode() {
        var gCode = new GVerify('gCode')
        $('#gCode').on('input', function () {
            gCodeCheck = gCode.validate($(this).val());
        })
    }

    //获取短信验证码
    function getVcode() {
        $('.l-get-code').click(function () {
            var phone_dom = $(".regForm input[name='phone']");
            var phone = phone_dom.val();
            var val = $('#msgRegCaptcha').val().toLowerCase();
            var GetCode = localStorage.getItem("picVcode").toLowerCase();
            $('.regForm input').removeClass('border_red');
            $('.warning').hide();
            if (!phone || phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
                phone_dom.addClass('border_red');
                $('.warning').text(phone_dom.attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if (val !== GetCode) {
                $('#msgRegCaptcha').addClass('border_red');
                $('.warning').text($('#msgRegCaptcha').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
                return;
            }
            phone_dom.removeClass('border_red');
            ykp.doAjax({
                url: 'user/sendcode',
                method: 'post',
                data: {phone: phone, type: 1},
                success: function (res) {
                    if (res.code !== 200) {
                        $('.warning').text(res.msg).stop(true, true).fadeOut('fast').fadeIn();
                        return;
                    }
                    ykp.showOk({text: '验证码已发送成功!'});
                    var time = 60;
                    $('.l-get-code').attr('disabled', 'disabled');
                    var fun = function () {
                        if (time > 0) {
                            time--;
                            $('.l-get-code').text(time + '秒');
                            setTimeout(fun, 1000);
                        } else {
                            $('.l-get-code').removeAttr('disabled');
                            $('.l-get-code').text('重新发送');
                        }
                    };
                    setTimeout(fun, 1000);
                },
            });
        });
    }

    //提交注册
    function subReg() {
        $('#reg-btn').click(function () {
            definePicVcode();
            definePhoneVcode();
            var data = ykp.getFormData('.regForm', false);
            if (data.status == false || data.password !== data.password2) {
                $('.warning').text(data.msg).stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if (data.password.length < 8) {
                $('.warning').text("密码长度最少为8位,最多18位").stop(true, true).fadeOut('fast').fadeIn();
                return;
            }else if (!$('#acceptProtocol').is(':checked')) {
                $('.warning').text('请仔细阅读《名品汇用户协议》！').stop(true, true).fadeOut('fast').fadeIn();
            } else {
                $('.warning').text('').fadeOut();
                var postData = {'phone': data.phone, 'password': data.password, 'vCode': data.vCode, 'type': 1};
                ykp.doAjax({
                    url: 'user/regist',
                    method: 'post',
                    data: postData,
                    success: function (res) {
                        if (res.code !== 200) {
                            $('.warning').text(res.msg).stop(true, true).fadeOut('fast').fadeIn();
                            return;
                        }
                        ykp.showOk({
                            text: '注册成功!',
                            callback: function () {
                                location.href = _login_page;
                                ;
                            }
                        });

                    },
                });
            }
        });
    }
})