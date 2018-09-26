/**
 *提交加盟申请页.js
 */
$(function () {
    //获取短信验证码
    $('.r_side.v_code div').click(function () {
        if ($(this).html().match(/秒/) != null) {
            return;
        }
        var phone = $('.phone').val();
        $('#subForm input').removeClass('border_red');
        if (phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
            ykp.showOk({
                text: '请正确输入手机号码'
            });
            $('.phone').addClass('border_red');
            return;
        }
        ykp.doAjax({
            url: 'user/fastLoginCode',
            method: 'get',
            data: {phone: phone},
            success: function (res) {
                ykp.showOk({
                    text: '验证码已发送成功!'
                });
                var time = 60;
                var fun = function () {
                    if (time > 0) {
                        time--;
                        $('.r_side.v_code div').text(time + '秒');
                        setTimeout(fun, 1000);
                    } else {
                        $('.r_side.v_code div').removeAttr('disabled');
                        $('.r_side.v_code div').text('重新发送');
                    }
                };
                setTimeout(fun, 1000);
            },
        });
    });
    //验证验证码格式
    $('.msgVcode').blur(function () {
        $('#subForm input').removeClass('border_red');
        $('.msgVcode').removeClass('border_red');
        if ($('.msgVcode').val().match(/^\d{6}$/) == null) {
            ykp.showOk({
                text: '请正确输入验证码'
            });
            $(this).addClass('border_red');
            return;
        }
    });


    //提交申请
    $('.submit_bt').click(function () {
        var postData = ykp.getFormData('#subForm', false);
        var uid = ykp.getLocalStorage('id');
        if (postData.status == false) {
            ykp.showOk({
                text: postData.msg
            });
            return;
        }
        var addr_detail = $('#addr_detail').val();
        if (!addr_detail.trim()) {
            $('#addr_detail').addClass('border_red').focus();
            ykp.showOk({
                text: '请填写详细地址信息！'
            });
            return;
        }
        if(!$('#dispic img').attr('src')){
            $('#addr_detail').removeClass('border_red');
            ykp.showOk({
                text: '请上传商城logo图'
            });
            return;
        }
      /*  if(!$('#yypic img').attr('src')){
            $('#addr_detail').removeClass('border_red');
            ykp.showOk({
                text: '请上传营业执照图'
            });
            return;
        }*/
        if($('#identadbox').children().length!=2){
            $('#addr_detail').removeClass('border_red');
            ykp.showOk({
                text: '请上证件正面照、反面照'
            });
            return;
        }
        $('#addr_detail').removeClass('border_red');
        var data={
            userId: uid,
            merchantName: postData.merchantName,
            name: postData.name,
            businessLicenseNum: postData.businessLicenseNum,
            cause: postData.cause,
            yearIncome: postData.yearIncome,
            yearProfit: postData.yearProfit,
            idCard: postData.idCard,
            telephone: postData.telephone,
            bankName: postData.bankName,
            bankAccountName: postData.bankAccountName,
            cardid: postData.cardid,
            leagueLevel: postData.leagueLevel,
            area: postData.provincePicker +','+ postData.cityPicker +','+ postData.regionPicker,
            detailedAddress: addr_detail,
            logo:$('#dispic img').attr('src') ,
            businessLicensePicture:$('#yypic img').attr('src'),
            bankCardPicture: $('#identadbox img')[0].src +','+ $('#identadbox img')[1].src,
            vCode:postData.vCode
        }
        ykp.doAjax({
            url: 'shop/joinChantApplication',
            method: 'post',
            data: data,
            success: function (res) {
                ykp.showOk({
                    text: res.msg,
                    callback: function () {
                        location.href = _join;
                    }
                });
            }
        });
    });
});

//上传图片
//上传logo
$('#upLogo').change(function () {
    var filereader = new FileReader();
    var file = $('#upLogo')[0].files[0];
    filereader.readAsDataURL(file);
    filereader.onloadend = function(e){
        $.post('/Home/Api/uploadImg',{imgBase64:e.target.result},function(res){
            res = res.replace(/\\/g,'').replace(/\"/g,'');
            if(res){
                $('#addlogo').hide();
                $('#dispic').show();
                $('#dispic img').attr('src',res);
            }
        });
        $('#dispic').click(function () {
            $('#dispic img').attr('src','');
            $('#addlogo').show();
            $('#dispic').hide();
        })
    }

});

//上传营业执照
$('#upLicense').change(function () {
    var filereader = new FileReader();
    var file = $('#upLicense')[0].files[0];
    filereader.readAsDataURL(file);
    filereader.onloadend = function(e){
        $.post('/Home/Api/uploadImg',{imgBase64:e.target.result},function(res){
            res = res.replace(/\\/g,'').replace(/\"/g,'');
            if(res){
                $('#addZpic').hide();
                $('#yypic').show();
                $('#yypic img').attr('src',res);
            }
        });
        $('#yypic').click(function () {
            $('#yypic img').attr('src','');
            $('#addZpic').show();
            $('#yypic').hide();
        })
    }
});

//上传证件照片
$('#upIdcard').change(function () {
    var filereader = new FileReader();
    var file = $('#upIdcard')[0].files[0];
    filereader.readAsDataURL(file);
    filereader.onloadend = function(e){
        $.post('/Home/Api/uploadImg',{imgBase64:e.target.result},function(res){
            res = res.replace(/\\/g,'').replace(/\"/g,'');
            if(res){
                var addimge=' <div style="float: left;margin-right: 10px" class="addpic">'+
                    '<a title="点击更换图片"><img style="width: 100%;height:100%;margin-top: 0" src="'+ res +'"/></a>'+
                    '</div>';
                $('#identadbox').append(addimge);
                if($('#identadbox').children().length==2){
                    $('#identadd').hide();
                }
            }

            $('#identadbox>div').off().on('click',function () {
                var it=$(this);
                var index = it.index();
                $('#identadbox>div').eq(index).remove();
                if($('#identadbox').children().length<2){
                    $('#identadd').show();
                }

            })
        });

    }

});