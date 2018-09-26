/**
 * 找回密码页
 */
$(function () {
    // getBanners('bannerCon', 'banners')
    // getRecommendGoods(1, 14, '.recommend-goods');

    //生成图片验证码
    makePicVcode();
    function makePicVcode() {
        var gCode = new GVerify('gCode');
        var gCodeCheck = '';
        $('#gCode').on('input', function () {
            gCodeCheck = gCode.validate($(this).val())
        });
        return gCodeCheck;
    }

    //获取图片验证码
    $('#gCode').click(function () {
        var gCode = new GVerify('gCode');
        $('#verifyCanvas').remove();
        gCode.refresh();
    });


    getVcode();
    //获取短信验证码
    function getVcode() {
        $('.l-get-code').click(function () {
            var phone = $('.f-phone').val();
            var val = $('.f-g-code').val().toLowerCase();
            $('.warning').hide();
            var GetCode = localStorage.getItem("picVcode").toLowerCase();
            if (phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
                $('.telephone .warning').html('<i></i>'+$('.f-phone').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
                $('.telephone .warning').show();
                return;
            }  else if (val !== GetCode) {
                $('.picVcode .warning').html('<i></i>'+$('.f-g-code').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
                return;
            }
            ykp.doAjax({
                url: 'user/sendcode',
                method: 'post',
                data: {phone: phone, type: 2},
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
                }
            });
        })
    }

    //验证数据
    var postData = {};
    function validateData() {
        $('.warning').hide();
        var phone = $('.f-phone').val();
        var picVcode = $('.f-g-code').val().toLowerCase();
        var GetCode = localStorage.getItem("picVcode").toLowerCase();
        var messageVcode = $('.f-code').val();
        var password = $('.f-pw').val();
        var surePassword = $('.f-pwr').val();
        if (phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
            $('.telephone .warning').html('<i></i>'+$('.f-phone').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
            $('.telephone .warning').show();
            return false;
        }  else if (picVcode !== GetCode) {
            $('.picVcode .warning').html('<i></i>'+$('.f-g-code').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
            $('.picVcode .warning').show();
            return false;
        } else if(!messageVcode || messageVcode.match(/^\d{6}$/) == null){
            $('.messageVcode .warning').html('<i></i>'+$('.f-code').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
            $('.messageVcode .warning').show();
            return false;
        } else if(!password || password.length<8){
            $('.password .warning').html('<i></i>'+$('.f-pw').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
            $('.password .warning').show();
            return false;
        } else if(password != surePassword){
            $('.surePassword .warning').html('<i></i>'+$('.f-pwr').attr('msg')).stop(true, true).fadeOut('fast').fadeIn();
            $('.surePassword .warning').show();
            return false;
        }
        postData['phone'] = phone;
        postData['password'] = password;
        postData['vCode'] = messageVcode;
        return true;
    }

    //确认修改
    $('.pwd-reset-btn').click(function () {
        if(!validateData()){
            return;
        }
        console.log(postData);
        ykp.doAjax({
            url:'user/forgetPwd',
            method:'get',
            data:postData,
            success:function(res){
                ykp.showOk({
                    text: res.msg,
                    callback:function(){
                        location.href = document.referrer;
                    }
                });
            }
        });
    })
})