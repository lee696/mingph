/**
 *申请售后.
 */
//问题描述字数判断
function changeStatu() {
    var commentText = $('#commentText').val().length;
    var result = parseInt(500 - commentText);
    $('#spanNum').html(result);
}

$(function () {
    var userId = ykp.getLocalStorage('id');//获取用户ID
    var goodsId = $.getUrlParam('goodid'); //获取商品ID
    var orderId = $.getUrlParam('orderId');//获取订单ID
    var oiid = $.getUrlParam('oiid');//获取订单项ID

    $('#afterType').on('click','input',function(){
        if($(this).is(':checked')){
            var inputss = $(this).parent().siblings('label').children('input');
            inputss.prop('checked',false);
        }
    });

    //获取售后商品
    getafterSale()

    //获取售后商品
    function getafterSale() {
        ykp.doAjax({
            url: 'order/beforeAfterSale',
            method: 'get',
            data: {oid: orderId, uid:userId, gid: goodsId, oiid: oiid},
            success: function (res) {
                var data = res.data.item;
                $('#com_goods').append('<a class="img-wrapper" href="#"><img src="'+data.pic+'"/><p class="goods-name">'+data.gname+'</p><p class="red-font bold-font">￥'+data.price+'</p></a>')
                var dataReason = res.data.reasons;
                var rHtml=[]
                for(var i=0;i<dataReason.length;i++){
                    rHtml.push('<option value ="'+ dataReason[i].id +'">'+ dataReason[i].content+'</option>')
                }

                $('#SReason').append(rHtml.join(''))
                $('#gQuantity').attr('data-num',data.quantity);

            }
        });
    }

    //提交
    $('.submit-comment').click(function () {
        console.log();
        if (!$('#afterType input:checkbox ').is(":checked")) {
            ykp.showOk({
                text: '请选择服务类型'
            });
            return;
        }
        if(!$('#gQuantity').val()){
            ykp.showOk({
                text: '请选正确填写申请数量'
            });
            return;
        }
        if(!$('#SReason').val()){
            ykp.showOk({
                text: '请选择退换货原因'
            });
            return;
        }
        var picEval = $('#imgInputbox img');
        var pics=''
        for(var i=0;i<picEval.length;i++){
            pics += picEval[i].src+",";
        }
        var picsdata = pics.substring(0,pics.length-1);
        var postData = {
            oid:orderId,
            uid:userId,
            gid:goodsId,
            oiid:oiid,
            gnum:$('#gQuantity').val(),
            type:$('#afterType input:checkbox:checked').attr('typData'),
            reasonid:$('#SReason').val(),
            questiondesc:$('#commentText').val(),
            pic:picsdata
        };

        ykp.doAjax({
            url: 'order/applyAfterSale',
            method: 'POST',
            data: postData,
            success: function (res) {
                ykp.showOk({
                    text: res.msg,
                    callback: function () {
                        location.href = sorderList;
                    }
                });
            }
        });

    });


    //添加上传照片
    var data = {};
    $('#fileUpload').change(function () {
        var reader = new FileReader();
        var file = $('#fileUpload')[0].files[0];
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            $.post('/Home/Api/uploadImg', {imgBase64: e.target.result}, function (res) {
                res = res.replace(/\\/g, '').replace(/\"/g, '');
                if (res) {
                    var image = '<div class="img-wrapper">' +
                        ' <img src="' + res + '"/>' +
                        '<a href="javascript:void(0)" class="remove-comment-images"></a>' +
                        '</div>';
                    $('#imgInputbox').append(image);
                    var addimg = $('#upimgBox .img-wrapper').length;
                    $('#upingNo').html(addimg);
                    if (addimg == 5) {
                        $('#addpicBt').hide();
                        $('#addimgnoInf').hide();
                    }
                    $('#leftNo').html(5 - addimg);
                    var obj = this;
                }
                //删除上传图片
                $('#imgInputbox .img-wrapper').off().on('click', function () {
                    var index = $(this).index();
                    $('#upimgBox .img-wrapper').eq(index).remove();
                    var addimg = $('#upimgBox .img-wrapper').length;
                    $('#upingNo').html(addimg);
                    $('#leftNo').html(5 - addimg);
                    var addimg = $('#upimgBox .img-wrapper').length;

                    if (addimg < 5) {
                        $('#addpicBt').show();
                        $('#addimgnoInf').show();
                    }
                });

            });
        }
    })

    //按钮操作商品数量
    $('.amount-group a').click(function () {
        var inputss = $(this).siblings('input');//显示商品数量的input木匡
        var amount = inputss.val();
        var quan =  $('#gQuantity').attr('data-num');
        if ($(this).html() === '-') {
            if (inputss.val() === '1') {
                return;
            }
            inputss.val(--amount);
            return;
        }
        if(inputss.val() == quan ){
            return;
        }
        inputss.val(++amount);
    });

    //手动操作商品数量
    $('.amount-num').blur(function () {
        var reg = /^[0-9]+$/;
        var amount = parseInt($(this).val());
        if (!(reg.test(amount)) || amount === 0) {
            $(this).val(1);
        }
        changePrice($(this).val());
    });


})