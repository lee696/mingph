/**
 * 积分商品详情js
 */
$(function () {
    var loged = ykp.getLocalStorage("telephone");
    if (!loged) {
        //检测用户是否登录
        console.log(111);
        ykp.showOk({
            text: '您还没有登录请先登录!',
            callback: function () {
                location.href = _login_page;
            }
        });
        return;
    } else {
        //获取产品id和userid
        var goodsId = $.getUrlParam('gid');
        ykp.setLocalStorage('goodsId', goodsId);
        var userId = ykp.getLocalStorage("id");
        var postData = {
            'gid': goodsId,
            'uid': userId
        };
        var goodsData = {
            'userId': userId,
            'goodsId': goodsId,
        };
        ykp.doAjax({
            url: 'integral/getIntegralGoodInfo',
            method: 'get',
            data: postData,
            async: false,
            success: function (res) {
                var data = res.data.good;
                goodsData['brand'] = data['brand'];
                goodsData['isCollection'] = data['isCollection'];
                goodsData['price'] = data['prevailingPrice'];
                var dImgs = data.detailPicture.split(',');
                if (dImgs) {
                    $('#fullImage span img').attr({'src': dImgs[0], 'jqimg': dImgs[0]})
                }
                var gHtml = [];
                for (var g = 0; g < dImgs.length; g++) {
                    gHtml.push(
                        '<a href="javascript:void(0)" class="show-in-main">',
                        '<img bimg="' + dImgs[g] + '" src="' + dImgs[g] + '" onmousemove="preview(this);"/>',
                        '</a>'
                    )
                }
                $('#goodsThumbImages').html(gHtml.join(''));
                ykp.setLocalStorage('brand', data.brand);
                $('.add-collection').data('isCollection', data.isCollection);
                $('.goods-name').html(data.name);
                $('.goods-code').prepend('商品编号:' + data.goodCode);
                $('.originalPrice').html('￥' + data.originalPrice);
                $('.prevailingPrice').html(data.prevailingPrice + '积分');
                $('#scollection').css('background',data.isCollection==0?'#fff':'yellow');
                $('.goods-states').html('月销量：' + data.monthlySales + '&nbsp;&nbsp;&nbsp;&nbsp;累计评论：' + (data.commentNum ? data.commentNum : 0));
                ykp.doAjax({
                    url: 'home/goodsStyles',
                    method: 'get',
                    data: {goodId: goodsData['goodsId']},
                    success: function (res) {
                        if (res.data) {
                            var colors = res.data.colors;
                            for (i in colors) {
                                $('.color').append('<a href="javascript:void(0)" data-id="' + colors[i]['id'] + '" data-type=color class="spec-action">' + colors[i].colorName + '</a>');
                            }
                            var styles = res.data.styles;
                            for (i in styles) {
                                $('.style').append('<a href="javascript:void(0)" data-id="' + styles[i]['id'] + '" data-type=style class="spec-action">' + styles[i].styleName + '</a>');
                            }
                            var sizes = res.data.sizes;
                            for (i in sizes) {
                                $('.size').append('<a href="javascript:void(0)" data-id="' + sizes[i]['id'] + '" data-type=size class="spec-action">' + sizes[i].sizeName + '</a>');
                            }
                        }

                        //商品样式选择
                        $('.goods-params a').click(function () {
                            if($(this).hasClass('active')){
                                $(this).removeClass('active');
                                goodsData[$(this).attr('data-type')] = '';
                                return;
                            }
                            $(this).addClass('active').siblings().removeClass('active');
                            goodsData[$(this).attr('data-type')] = $(this).text();
                        });
                    }
                });

                //商品评价
                postData['type'] = 0;
                postData['pageNo'] = 1;
                postData['pageSize'] = 10;
                ykp.list({
                    url:'integral/getGoodEvaluate',
                    method:'get',
                    data:postData,
                    pageBar: {id: '#pageBar'},
                    loadList:function(res){
                        if(!res.data || res.data.evaluates.length <= 0){
                            $('#goods_comment_inf').html('暂无评价').css('color','#666');
                            return;
                        }
                        $('.commentNum').html(res.totalRecord || '');
                        var commentList = res.data.evaluates;
                        var _list = [];
                        var pictures = '';
                        var time = '';
                        for (var i in commentList) {
                            time = ykp.formatDate(new Date(commentList[i].createtime),'Y-M-d H:m:s ');
                            _list.push('<div class="goods-comment-item">'+
                                '<p class="clear goods-comment-info userName">'+commentList[i].userName+'<span class="gray-font time">'+time+'</span></p>'+
                                '<p class="goods-comment-content commContent">'+commentList[i].edesc+'</p>');
                            if(commentList[i].pics){
                                pictures = commentList[i].pics.split(',');
                                _list.push('<div class="comment-pics clear">');
                                for(var i=0;i<pictures.length;i++){
                                    _list.push('<a class="comment-pic-action">'+
                                        '<img src='+pictures[i]+'></a>');
                                }
                                _list.push('</div>');
                            }
                            _list.push('</div>');
                        }
                        $('#goods_comment_inf .commentBox').html(_list.join(''));
                        $("#goods_comment_inf img").click(function () {
                            $("#big_pic div img").attr('src',$(this).attr('src'));
                            $("#big_pic").show();

                        })
                        $("#big_pic").click(function () {
                            $("#big_pic").hide();
                        });
                    }
                });

                //商品详情
                $('#goods_detail_inf').html(data.goodsDetail || '暂无数据');

                //规则参数
                $('#goods_inf').html(data.specification || '暂无数据');
            }
        });
    }

    //详情，规格，评价table切换
    $('#goods_doc_Box li').click(function () {
        $(this).addClass('act').siblings().removeClass('act');
        var index = $(this).index();
        $('#goods_doc_cont>div').eq(index).show().siblings().hide();
    })

    //轮播图切换效果
    $('#goodsThumbImages a').mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    //立即兑换
    $('.to-exchange').click(function () {
        var integralnum = ykp.getLocalStorage('integralnum');
        var _integralnum = $('.prevailingPrice').html();
        var index =_integralnum.indexOf('积');
        _integralnum = _integralnum.substring(0,index);
        if((integralnum - _integralnum) < 0){
            ykp.showOk({
                text: '您的积分不足，暂无法兑换此商品'
            });
            return;
        }
        if (!goodsData['color']) {
            ykp.showOk({
                text: '请选择颜色~'
            });
            return;
        }
        if (!goodsData['style']) {
            ykp.showOk({
                text: '请选择款式~'
            });
            return;
        }
        if (!goodsData['size']) {
            ykp.showOk({
                text: '请选择尺寸~'
            });
            return;
        }
        goodsData['goodsCount'] = $('.amount-num').val();
        var integralGoodsInfo = goodsData['color'] + ',' + goodsData['style'] + ',' + goodsData['size'] + ',' + goodsData['goodsCount'];
        ykp.setLocalStorage('integralGoodsInfo', integralGoodsInfo);
        ykp.doAjax({
            url: 'common/immediatelyToPay',
            method: 'post',
            data: goodsData,
            success: function (res) {
                location.href = _doOder+'?integralGoodsId=' + goodsData['goodsId']+'&c_id='+res.data.carts[0].id;
            }
        });
    });

    //收藏备选
    $('.add-collection').click(function () {
        if (goodsData['isCollection'] == 0) {
            goodsData['isCollection'] = 1;
            ykp.doAjax({
                url: 'shop/collectionGoods',
                method: 'get',
                data: {userId: ykp.getLocalStorage('id'), goodId: goodsId},
                success: function (res) {
                    $('#scollection').css('background','yellow');
                    ykp.showOk({
                        text: res.msg
                    });
                }
            });
        } else {
            ykp.showOk({
                text: '该商品已收藏~'
            });
        }
    });

    //现价随数量改变而改变
    function changePrice(amount){
        $('.prevailingPrice').html(goodsData['price']*amount+'积分');
    }

    //按钮操作商品数量
    $('.amount-group a').click(function () {
        var inputss = $(this).siblings('input');//显示商品数量的input木匡
        var amount = inputss.val();
        if ($(this).html() === '-') {
            if (inputss.val() === '1') {
                return;
            }
            inputss.val(--amount);
            changePrice(inputss.val());
            return;
        }
        inputss.val(++amount);
        changePrice(inputss.val());
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

    //查看推荐
    ykp.doAjax({
        url: 'home/fineRecommend',
        method: 'get',
        data: {pageNo: 1, pageSize: 4},
        success: function (res) {
            if (res.code !== 200) {
                ykp.alert(res.msg);
                return;
            }
            var list = res.data.list || [];
            var _list = ['<h1>精品推荐</h1>'];
            for (var i=0;i<list.length;i++) {
                _list.push(
                    '<a class="goods-ad" href="/Goods/detail.html?gid='+list[i].id+'"style="background-image: url('+(list[i].picture ? list[i].picture : defaultImg)+')">'+
                    '<div class="price-con">'+
                    '<p class="title">'+list[i].name+'</p>'+
                    '<p class="price">￥'+list[i].prevailingPrice+'</p>'+
                    '</div>'+
                    '</a>');
            }
            $('.goods-ad-list').html(_list.join(''));
        }
    });

    //咨询客服
    getcustomerService()
    function getcustomerService() {
        $('#custmerclick').click(function () {
            var newTab=window.open('about:blank');
            //获取客服QQ号
            ykp.doAjax({
                url: 'default/getCustomerService',
                method: 'get',
                data: {},
                success: function (res) {
                    var qqnum = res.data;
                    newTab.location.href='http://wpa.qq.com/msgrd?V=1&uin='+ qqnum +'&Site=pageadmin&Menu=yes';
                }
            });
        })

    }



});