/**
 *登录页.
 */
$(function () {

    //生成图片验证码
    makePicVcode();

    //获取图片验证码
    getPicVcode();

    //获取短信验证码
    getVcode();

    //提交登录
    login();

    //获取图片验证码
    function getPicVcode() {
        $('#gCode').click(function () {
            var gCode = new GVerify('gCode');
            $('#verifyCanvas').remove();
            gCode.refresh();
        });
    }

    //生成图片验证码
    function makePicVcode() {
        var gCode = new GVerify('gCode');
        $('#gCode').on('input', function () {
            gCodeCheck = gCode.validate($(this).val())
        });
        return gCodeCheck;
    }

    //获取短信验证码
    function getVcode() {
        $('.l-get-code').click(function () {
            var phone = $('.l-phone').val();
            var val = $('#msgLoginCaptcha').val().toLowerCase();
            var GetCode = localStorage.getItem("picVcode").toLowerCase();
            $('.loginForm input').removeClass('border_red');
            $('.warning').hide();
            if (phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
                $('.l-phone').addClass('border_red');
                $('.warning').text($(phone).attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
                return;
            } else if (val !== GetCode) {
                $('#msgLoginCaptcha').addClass('border_red');
                $('.warning').text($('#msgLoginCaptcha').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
                return;
            }
            $('.l-phone').removeClass('border_red');
            ykp.doAjax({
                url: 'user/fastLoginCode',
                method: 'get',
                data: {phone: phone},
                success: function (res) {
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

    //提交登录
    function login() {
        $('#login_bt').click(function () {
            if ($('.accForm').css('display') == 'block') {
                var postData = ykp.getFormData('.accForm', false);
                if (!postData.status) {
                    $('.warning').text(postData.msg).stop(true, true).fadeOut('fast').fadeIn();
                    return;
                }
                ;
                $('.warning').text('').fadeOut();
                ykp.doAjax({
                    url: 'user/login',
                    method: 'post',
                    data: postData,
                    success: function (res) {
                        if (res.code !== 200) {
                            $('.warning').text(res.msg).stop(true, true).fadeOut('fast').fadeIn();
                            return;
                        }
                        //返回成功后的逻辑
                        var uid = res.data;
                        ykp.doAjax({
                            url: 'user/getUserInfo',
                            method: 'get',
                            data: {userId: uid},
                            success: function (rs) {
                                var user_info = rs.data;
                                if ($('#autoLogin')[0].checked) {
                                    var loginInfo = user_info.telephone + ',' + $('#accLoginPwd').val();
                                    ykp.setCookie('loginInfo', loginInfo, 1);
                                }
                                user_info.uid = user_info.id;
                                ykp.doAjax({
                                    url: 'user/getUserDetail',
                                    method: 'get',
                                    data: {userId:user_info.uid},
                                    success:function(res){
                                        var isoverLoginTime = $.now();
                                        user_info.isPrivate = res.data.isPrivate;
                                        ykp.setLocalStorage_mul(user_info);
                                        ykp.setLocalStorage('isoverLoginTime',isoverLoginTime);
                                        ykp.showOk({
                                            text: '登录成功!',
                                            callback: function () {
                                                var url = document.referrer;
                                                if(url.match('findPwd') || url.match('login') || url.match('register') || url.match('pwd')){
                                                    location.href = _index_page;
                                                    return;
                                                }
                                                location.href = document.referrer;
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }
                });
            } else {
                var inVcode = $('#msgLoginCaptcha').val().toLowerCase();
                var GetCode = localStorage.getItem("picVcode").toLowerCase();
                var postData = ykp.getFormData('.msgForm', false);
                if (postData.status == false) {
                    $('.warning').text(postData.msg).stop(true, true).fadeOut('fast').fadeIn();
                    return;
                } else if (inVcode !== GetCode) {
                    $('#msgLoginCaptcha').addClass('border_red');
                    $('.warning').text($('#msgLoginCaptcha').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
                    return;
                }
                $('.warning').text('').fadeOut();
                ykp.doAjax({
                    url: 'user/fastLogin',
                    method: 'get',
                    data: postData,
                    success: function (res) {
                        if (res.code !== 200) {
                            $('#msgLoginPhoneCaptcha').addClass('border_red');
                            $('.warning').text(res.msg).stop(true, true).fadeOut('fast').fadeIn();
                            return;
                        }
                        //返回成功后的逻辑
                        var uid = res.data;
                        ykp.doAjax({
                            url: 'user/getUserInfo',
                            method: 'get',
                            data: {userId: uid},
                            success: function (rs) {
                                var user_info = rs.data;
                                user_info.uid = user_info.id;
                                ykp.doAjax({
                                    url: 'user/getUserDetail',
                                    method: 'get',
                                    data: {userId:user_info.uid},
                                    success:function(res){
                                        var isoverLoginTime = $.now();
                                        user_info.isPrivate = res.data.isPrivate;
                                        ykp.setLocalStorage_mul(user_info);
                                        ykp.setLocalStorage('isoverLoginTime',isoverLoginTime);
                                        ykp.showOk({
                                            text: '登录成功!',
                                            callback: function () {
                                                var url = document.referrer;
                                                if(url.match('findPwd') || url.match('login') || url.match('register') || url.match('pwd')){
                                                    location.href = _index_page;
                                                    return;
                                                }
                                                location.href = document.referrer;
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    },
                });
            }

        });
    }

    //登录方式切换
    $("#msgForm").click(function () {
        $(".accForm,.msg-log,.forget-entrance").hide();
        $(".msgForm,.acc-log").show();
        $('.warning').hide();
    });
    $("#accForm").click(function () {
        $(".accForm,.msg-log,.forget-entrance").show('fast', function () {
            var loginInfo = ykp.getCookie('loginInfo');
            if (loginInfo) {
                loginInfo = loginInfo.split(',');
                $('#accLoginPhone').val(loginInfo[0]);
                $('#accLoginPwd').val(loginInfo[1]);
            }
            $('#accLoginPhone');
        });
        $(".msgForm,.acc-log").hide();
        $('.warning').hide();
    });


});