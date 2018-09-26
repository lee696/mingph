/**
 *评论商品.js
 */
//商品评论字数判断
function changeStatu() {
    var commentText = $('#commentText').val().length;
    var result = parseInt(350 - commentText);
    $('#spanNum').html(result)
}

$(function () {
    //获取评价商品
    getCouponsgoods()

    //获取评价商品
    function getCouponsgoods() {
        var orderId = $.getUrlParam('orderId');
        var gsId = $.getUrlParam('gsId');
        var oid = $.getUrlParam('oid');
        ykp.doAjax({
            url: 'order/toEvaluate',
            method: 'get',
            data: {id: orderId, userId: ykp.getLocalStorage('uid'), gid: gsId, oiid: oid},
            success: function (res) {
                var data = res.data;
                $('#com_goods').append('<a class="img-wrapper" href="#"><img src="'+data.pic+'"/><p class="goods-name">'+data.gname+'</p><p class="red-font bold-font">￥'+data.price+'</p></a>')
            }
        });
    }


    //提交
    $('.submit-comment').click(function () {
        if ($('#evaluate_goods .checked').length <= 0) {
            ykp.showOk({
                text: '请给商品打分~'
            });
            return;
        } else if ($('#evaluate_logistics .checked').length <= 0) {
            ykp.showOk({
                text: '请给物流打分~'
            });
            return;
        } else if ($('#evaluate_descriptions .checked').length <= 0) {
            ykp.showOk({
                text: '请给描述相符打分~'
            });
            return;
        }


        var picEval = $('#imgInputbox img');
        console.log(picEval);
        var pics=''
        for(var i=0;i<picEval.length;i++){
            pics += picEval[i].src+",";
        }
        var picsdata = pics.substring(0,pics.length-1);
        var userId = ykp.getLocalStorage('id');
        var oid = $.getUrlParam('oid');
        var postData = {
            oiid:oid,
            uid:userId,
            gevaluate:$('#evaluate_goods .checked').length,
            levaluate:$('#evaluate_logistics .checked').length,
            devaluate:$('#evaluate_descriptions .checked').length,
            edesc:$('#commentText').val(),
            pics:picsdata
        };

        if (!$('#commentText').val().trim()) {
            $('#commentText').val('');
        } else {
            postData['content'] = $('#commentText').val()
        }
        ykp.doAjax({
            url: 'order/evaluateGoods',
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

    //五星好评
    $('.flex-start .level-bar i').click(function () {
        var checked = $(this).hasClass('checked');
        if (checked) {
            var starts = $(this).nextAll();
            for (var i in starts) {
                starts.eq(i).removeClass('checked');
            }
            ;
            $(this).removeClass('checked')
        } else {
            var starts = $(this).prevAll();
            for (var i in starts) {
                starts.eq(i).addClass('checked');
            };
            $(this).addClass('checked')
        }
    })

})
