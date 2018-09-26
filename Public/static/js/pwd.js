/**
 *修改密码页.js
 */
//只允许密码框输入数字
$('input[name="phone"]').on('keyup', function payPwdcheck() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

$('.user-sidebar a').eq(10).css('color','#c5ad82');

var uid = ykp.getLocalStorage("uid"); //获取用户id
var gphone = ykp.getLocalStorage("telephone"); //获取手机号码

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
    getPhone();//获取手机号码
    getVcode();//获取短信验证码
    subModification();//提交修改
}


function getPhone(){
    $(".user-pwd-form input[name='phone']").val(gphone);
}

//获取短信验证码
function getVcode() {
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
        ykp.doAjax({
            url: 'user/sendcode',
            method: 'post',
            data: {phone: phone, type: 2},
            success: function (res) {
                $('.phone-warn div').show().addClass('ok');
                ykp.showOk({
                    text: '验证码已发送成功!'
                });
                var time = 60;
                $('.getVcode').attr('disabled', 'disabled');
                var fun = function () {
                    if (time > 0) {
                        $('.getVcode').text(time-- + '秒');
                        setTimeout(fun, 1000);
                    } else {
                        $('.getVcode').removeAttr('disabled');
                        $('.getVcode').text('重新发送');
                    }
                };
                setTimeout(fun, 1000);
            }
        });
    });
}

//提交修改
function subModification() {
    console.log(111);
    $('#subMod').click(function () {
        console.log(666);
        var phone_dom = $(".user-pwd-form input[name='phone']");
        var phone = phone_dom.val();
        $('.user-pwd-form input').removeClass('border_red');
        if (!phone || phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
            phone_dom.addClass('border_red');
            $('.phone-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
            return;
        } else if (!$('#phoneVcode').val() || $('#phoneVcode').val().match(/^[0-9]{6}$/) == null) {
            $('#phoneVcode').addClass('border_red');
            $('.phone-warn div').show().addClass('ok')
            $('.vcode-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
            return;
        } else if (!$('#pwd-inp1').val() || $('#pwd-inp1').val().match(/^[\w\@-]{8,18}$/) == null) {
            $('#pwd-inp1').addClass('border_red');
            $('.phone-warn div').show().addClass('ok')
            $('.vcode-warn div').hide();
            $('.password-warn div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
            return;
        } else if ($('#pwd-inp1').val() !== $('#pwd-inp2').val()) {
            $('#pwd-inp2').addClass('border_red');
            $('.phone-warn div').show().addClass('ok')
            $('.vcode-warn div').hide();
            $('.password-warn div').show().addClass('ok')
            $('.password-warn2 div').show().removeClass('ok').stop(true, true).fadeOut('fast').fadeIn();
            return;
        } else {
            $('.warning div').show().addClass('ok');
            $('.vcode-warn div').hide();
            var postData = {'phone': phone, 'password': $('#pwd-inp2').val(), 'vCode': $('#phoneVcode').val()};
            ykp.doAjax({
                url: 'user/forgetPwd',
                method: 'get',
                data: postData,
                success: function (res) {
                    console.log(222);
                    ykp.showOk({
                        text: '密码修改成功，请重新登录!',
                        callback: function () {
                            console.log(333);
                            ykp.clearLocalStorage();
                            location.href = _login_page;
                        }
                    });
                },
            });
        }
    });
}