/**
 * Created by ErgoSphere on 2017/7/9.
 */
var getCodeAllow = true

function getVerifyCode(type, phone) {
    var o = {};
    var api = ''
    var xhrType = 'post';
    switch (type) {
        case 'login':
            api += 'user/fastLoginCode';
            o.phone = phone;
            xhrType = 'get';
            break;
        case 'register':
            api += 'user/sendcode';
            o.phone = phone;
            o.type = 1;
            break;
    }
    if (getCodeAllow) {
        getCodeAllow = false
        xhr({
            type: xhrType,
            async: false,
            url: api,
            data: o,
        }, function (res) {
            if (res.code !== 200) {
                getCodeAllow = true;
                alert(res.msg);
            }
        })
    }
}

function codeCountDown(button_dom) {
    var cd = 10;
    $(button_dom).text(cd + '秒');
    $('.l-get-code').attr('disabled', 'disabled');
    var t = setInterval(function () {
        if (cd === 1 || getCodeAllow) {
            clearInterval(t);
            $(button_dom).text('重新发送');
            $('.l-get-code').removeAttr('disabled');
            getCodeAllow = true;
        } else if (!getCodeAllow) {
            cd--;
            $(button_dom).text(cd + '秒');
        }
    }, 1000)
}

function autoLogin(token, isAutoLogin) {
    if (isAutoLogin) {
        setCookie('token', token, 7)
        getUserInfo(function (res) {
            setCookie('acc', res.account, 7)
            location.href = (document.referrer === '') ? _index_page : document.referrer

        })
    } else {
        setCookie('token', token)
        getUserInfo(function (res) {
            setCookie('acc', res.account)
            location.href = (document.referrer === '') ? _index_page : document.referrer
        })
    }
}



function doRegister(type) {
    var result = registerCheck()
    if (result.status) {
        xhr({
            type: 'POST',
            url: 'user/regist',
            data: {
                phone: $('#rPhone').val(),
                password: $('#rPwd').val(),
                vCode: $('#phoneCaptcha').val(),
                type: type
            }
        }, function (res) {
            if (res.code === 200) {
                $warning_dom.text(res.msg + ',3秒后跳转至登录页')
                if ($warning_dom.is(':hidden')) {
                    $warning_dom.slideDown()
                }
                setTimeout(function () {
                    location.href = _login_page
                }, 3000)
            }
        })
    } else {
        $warning_dom.text(result.alert)
        if ($warning_dom.is(':hidden')) {
            $warning_dom.slideDown()
        }
    }
}
function registerCheck() {
    var o = new Object()
    o.status = true
    $('.l-ele').each(function () {
        var _this = $(this)
        var val = _this.val()
        switch ($(this).attr('id')) {
            case 'rUserName':
                if (val === '') {
                    o.status = false
                    o.alert = '您未输入用户名'
                }
                break
            case 'rPhone':
                if (val === '') {
                    o.status = false
                    o.alert = '您未输入手机号'
                } else if (!isPhone(val)) {
                    o.status = false
                    o.alert = '您所填写的手机号不符合格式'
                }
                break
            case 'captcha':
                if (!gCodeCheck) {
                    o.status = false
                    o.alert = '图形验证码错误'
                }
                break
            case 'phoneCaptcha':
                if (val === '') {
                    o.status = false
                    o.alert = '您未输入手机验证码'
                }
                break
            case 'rPwd':
                if (val === '') {
                    o.status = false
                    o.alert = '您未输入密码'
                }
                break
            case 'rPwdR':
                if (val !== $('#rPwd').val()) {
                    o.status = false
                    o.alert = '两次输入的密码不一致'
                }
                break
            case 'acceptProtocol':
                if (!$(this).is(':checked')) {
                    o.status = false
                    o.alert = '您尚未同意用户协议'
                }
        }
        if (!o.status) {
            return false
        }
    })
    return o
}

function loginCheck(type) {
    var o = new Object();
    o.status = true;
    $('.l-ele').each(function () {
        var _this = $(this)
        var val = _this.val();
        switch ($(this).attr('id')) {
            case 'msgLoginPhone':
                if (val === '') {
                    o.status = false;
                    o.alert = '您未输入手机号'
                } else if (!isPhone(val)) {
                    o.status = false;
                    o.alert = '您所填写的手机号不符合格式'
                }
                break;
            case 'msgLoginCaptcha':
                if (!gCodeCheck) {
                    o.status = false;
                    o.alert = '图形验证码错误'
                }
                break;
            case 'msgLoginPhoneCaptcha':
                if (val === '') {
                    o.status = false;
                    o.alert = '您未输入手机验证码'
                }
                break;
        }
        if (!o.status) {
            return false;
        }
    });
    return o
}
function doLogin(warning_dom) {
    var result = loginCheck();
    if (result.status) {
        xhr({
            type: 'GET',
            url: 'user/fastLogin',
            data: {
                phone: $('#msgLoginPhone').val(),
                vcode: $('#msgLoginPhoneCaptcha').val()
            }
        }, function (res) {
            if (parseInt(res.code) === 200) {
                // location.href = (document.referrer === '') ? _index_page : document.referrer
                location.href = _index_page;
            } else {
                warning_dom.text(res.msg)
                if (warning_dom.is(':hidden')) {
                    warning_dom.slideDown()
                }
            }
        })
    } else {
        warning_dom.text(result.alert)
        if (warning_dom.is(':hidden')) {
            warning_dom.slideDown()
        }
    }
}