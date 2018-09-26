/**
 *个人资料.js
 */
$(function () {
    $('.user-sidebar a').eq(1).css('color','#c5ad82');
    var uid = ykp.getLocalStorage("uid"); //获取用户id
    var uploadedImgAddr = '';
    //页面初始化
    init()
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
        getCoupons()  //获用户信息
    }


    //读取图片
    $('#avatarUploader').change(function(){
        var filereader = new FileReader();
        var file = $('#avatarUploader')[0].files[0];
        filereader.readAsDataURL(file);
        filereader.onloadend = function(e){
            $.post('/Home/Api/uploadImg',{imgBase64:e.target.result},function(res){
                res = res.replace(/\\/g,'').replace(/\"/g,'');
                $('.avatar-wrapper img').attr('src',res);
                uploadedImgAddr = res;
            });
        }
    });

    //生日日期插件
    $('#singleDateRange').DatePicker({
        startDate: moment()
    });

    //手机验证修改
    $('.show-edit-phone-modal').click(function () {
        showModal($('#editPhoneModal'))
    })


    //获取用户信息
    function getCoupons() {
        var uid = ykp.getLocalStorage('uid')
        var postData = {
            userId: uid,
        };
        ykp.list({
            url: 'user/getUserDetail',
            method: 'get',
            data: postData,
            loadList: function (res) {
                var data = res.data;
                if (data.name) {
                    $('.profile-name').val(data.name);
                }
                if (data.sex == 0) {
                    $('#man').prop("checked", true);
                }
                if (data.sex == 1) {
                    $('#woman').prop("checked", true);
                }
                if (data.headPortrait) {
                    $('.avatar-wrapper img').attr('src', data.headPortrait)
                }
                $('#singleDateRange').val(data.birthday ? ykp.formatDate(new Date(data.birthday), 'Y.M.d'):'');

                if (data.height) {
                    $('.height').val(data.height);
                }
                if (data.hipline) {
                    $('.hipline').val(data.hipline);
                }
                if (data.shoulder) {
                    $('.shoulder').val(data.shoulder);
                }
                if (data.rung) {
                    $('.rung').val(data.rung);
                }
                if (data.clothesLength) {
                    $('.clothesLength').val(data.clothesLength);
                }
                if (data.filing) {
                    $('.filing').val(data.filing);
                }
                if (data.sleeveLength) {
                    $('.sleeveLength').val(data.sleeveLength);
                }
                if (data.pantsLength) {
                    $('.pantsLength').val(data.pantsLength);
                }
                if (data.chest) {
                    $('.chest').val(data.chest);
                }
                if (data.footBreadth) {
                    $('.footBreadth').val(data.footBreadth);
                }
                if (data.waistline) {
                    $('.waistline').val(data.waistline);
                }
                if (data.telephone) {
                    $('.user-data-phone').html(data.telephone);
                }

            }
        });
    }

    //提交更改用户信息
    $('.save-user-data').click(function () {
        var bdate = new Date($('.profile-birthday').val());
        var birthday = bdate.getTime()
        var data = {
            id: ykp.getLocalStorage("id"),
            headPortrait: uploadedImgAddr,
            name: $('.profile-name').val(),
            sex: $('.profile-sex:checked').val(),
            birthday: birthday,
        }
        if(!birthday){
            ykp.alert("请填写生日!")
            return;
        }
        upDateuserInfo(data);
    })


    //提交更改定制信息
    $('.save-user-size').click(function () {
        var data = {
            id: ykp.getLocalStorage("id"),
            height: $('.user-size-form .height').val(),
            hipline: $('.user-size-form .hipline').val(),
            shoulder: $('.user-size-form .shoulder').val(),
            rung: $('.user-size-form .rung').val(),
            clothesLength: $('.clothesLength').val(),
            filing: $('.user-size-form .filing').val(),
            sleeveLength: $('.user-size-form .sleeveLength').val(),
            pantsLength: $('.user-size-form .pantsLength').val(),
            chest: $('.user-size-form .chest').val(),
            footBreadth: $('.user-size-form .footBreadth').val(),
            waistline: $('.user-size-form .waistline').val()
        }
        upDateuserInfo(data);
    })

    //更新用户信息
    function upDateuserInfo(postData) {
        ykp.doAjax({
            url: 'user/updateUser',
            method: 'post',
            data: postData,
            success: function (res) {
                var newName = res.data.name;
                var photo = res.data.headPortrait;
                ykp.showOk({
                    text: '保存成功！' ,
                    callback:function(){
                        $('#logCheck-tit a').eq(0).html(newName);
                        ykp.setLocalStorage('name',newName);
                        ykp.setLocalStorage('photo',photo);
                        ykp.setLocalStorage_mul({isPrivate:res.data.isPrivate});
                    }
                });
            }
        });
    }

    //绑定手机号发送验证码
    $('#sendCpCode').click(function () {
        var phone = $('#editPhone').val();
        if (phone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
            $('#editPhone').addClass('border_red').focus();
            ykp.showOk({text: $('#editPhone').attr('msg')});
            return;
        }
        $('#editPhone').removeClass('border_red');
        ykp.doAjax({
            url: 'user/bindPhoneCode',
            method: 'get',
            data: {phone: phone},
            success: function (res) {
                ykp.showOk({text: '验证码发送成功！'});
            }
        });
    });

    //绑定手机号
    $('#submit-bin-phone').click(function () {
        var postData = ykp.getFormData('.content', false);
        if (postData.status == false) {
            ykp.showOk({text: postData.msg});
            return;
        }
        ykp.doAjax({
            url: 'user/bindPhone',
            method: 'get',
            data: {phone: postData.editPhone, vCode: postData.editPhoneCode, userId: ykp.getLocalStorage("uid")},
            success: function (res) {
                ykp.showOk({text:res.msg});
            }
        });
    });
});