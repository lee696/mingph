/**
 * 普通商品详情页面js
 */
$(function () {
    //检测用户是否登录
    var loged = ykp.getLocalStorage("telephone");
    if (!loged) {
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
        var userId = ykp.getLocalStorage("id");
        var postData = {
            'goodId': goodsId,
            'userId': userId
        };
        var goodsData = {
            'userId': userId,
            'goodsId': goodsId,
        };

        //查看商品信息
        ykp.doAjax({
            url: 'home/goodDetail',
            method: 'get',
            data: postData,
            async: false,
            success: function (res) {
                var data = res.data;
                // var commentList = res.data.commentList;
                // $('.commentNum').html(commentList.length);
                goodsData['brand'] = data['brand'];
                goodsData['pic'] = data['picture'];
                goodsData['isCollection'] = data['isCollection'];
                goodsData['price'] = data['prevailingPrice'];
                var dImgs = data.detailPicture.split(',');
                var gHtml = []
                for (var g = 0; g < dImgs.length; g++) {
                    gHtml.push(
                        '<a href="javascript:void(0)" class="show-in-main">',
                        '<img bimg="' + (dImgs[g]?dImgs[g]:defaultImg) + '" src="' + (dImgs[g]?dImgs[g]:defaultImg) + '" onmousemove="preview(this);"/>',
                        '</a>'
                    )
                }
                $('#goodsThumbImages').html(gHtml.join(''));
                $('.jqzoom').html('<img jqimg="' + (goodsData['pic']?goodsData['pic']:defaultImg) + ' " src="' + (goodsData['pic']?goodsData['pic']:defaultImg) + '"/>');
                $('.goods-name').html(data.name);
                $('.goods-code').prepend('商品编号:' + data.goodCode);
                $('#scollection').css('background',data.isCollection==0?'#fff':'yellow');
                $('.goods-price').html('<p>市场价：<span class="line-through">￥'+ (data.originalPrice || 0) + '</span></p>'+
                    '<p>现价：<span class="red-font bold-font prevailingPrice">￥'+ (data.prevailingPrice || 0) +'</span></p>'+
                    '<p class="goods-states">月销量：' + (data.monthlySales || 0) +'&nbsp;&nbsp;&nbsp;&nbsp'+
                    '累计评论：' + (data.commentNum || 0) + '&nbsp;&nbsp;&nbsp;&nbsp;赠送积分：' + (data.qualit || 0) +'</p>');

                ykp.doAjax({
                    url: 'home/goodsStyles',
                    method: 'get',
                    data: {goodId: goodsData['goodsId']},
                    success: function (res) {
                        if (!res.data) {
                            return;
                        }
                        //商品参数
                        var sku = res.data;
                        var _sku = [];
                        if (sku.colors) {
                            var ttt = [
                                '<dl class="goods-params-item clear">',
                                '<dt>颜色：</dt>',
                                '<dd class="flex">'
                            ];
                            Array.prototype.push.apply(_sku, ttt);
                            for (var i in sku.colors) {
                                _sku.push('<a href="javascript:void(0)" data-id="'+ sku.colors[i]['id']+'" data-type="color" class="spec-action">'+sku.colors[i]['colorName']+'</a>');
                            }
                            _sku.push('</dd></dl>');
                        }
                        if (sku.styles) {
                            var ttt = [
                                '<dl class="goods-params-item clear">',
                                '<dt>款式：</dt>',
                                '<dd class="flex">'
                            ];
                            Array.prototype.push.apply(_sku, ttt);
                            for (var i in sku.styles) {
                                _sku.push('<a href="javascript:void(0)" data-id="'+sku.styles[i]['id']+'" data-type="style" class="spec-action">'+sku.styles[i]['styleName']+'</a>');
                            }
                            _sku.push('</dd></dl>');
                        }
                        if (sku.sizes) {
                            var ttt = [
                                '<dl class="goods-params-item clear">',
                                '<dt>尺码：</dt>',
                                '<dd id="seletCm" class="flex">'
                            ];
                            Array.prototype.push.apply(_sku, ttt);
                            for (var i in sku.sizes) {
                                _sku.push('<a href="javascript:void(0)" data-id="'+sku.sizes[i]['id']+'" data-type="size" class="spec-action">'+sku.sizes[i]['sizeName']+'</a>');
                            }
                            _sku.push('</dd></dl>');
                        }
                        $('.goods-params').html(_sku.join(''));

                        //商品样式选择
                        $('.goods-params a').click(function () {
                            if($(this).attr('data-type') == 'size'){
                                if($('.private')[0].checked==true){
                                    ykp.showOk({
                                        text: '您已选择定制尺码！'
                                    })
                                    return;
                                }
                            }
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


                //商品详情
                $('#goods_detail_inf').html(data.goodsDetail || '暂无数据');

                //规则参数
                $('#goods_inf').html(data.specification || '暂无数据');

                //商品评价
                postData['type'] = 0;
                postData['pageNo'] = 1;
                postData['pageSize'] = 10;
                postData['gid'] = postData['goodId'];
                postData['uid'] = postData['userId'];
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
                ykp.setLocalStorage('brand', data.brand);
                $('.goods-name').html(data.name);
            }
        });

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

        //查看推荐
        ykp.doAjax({
            url: 'home/fineRecommend',
            method: 'get',
            data: {pageNo: 1, pageSize: 4},
            success: function (res) {
                var list = res.data.list || [];
                var _list = ['<h1>精品推荐</h1>'];
                for (var i=0;i<list.length;i++) {
                    _list.push(
                        '<a class="goods-ad" href="/Goods/detail.html?gid='+list[i].id+'&boutique=1&detail='+escape(list[i].name)+'"style="background-image: url('+ (list[i].picture? list[i].picture :defaultImg)+')">',
                        '<div class="price-con">',
                        '<p class="title">'+list[i].name+'</p>',
                        '<p class="price">￥'+list[i].prevailingPrice+'</p>',
                        '</div>',
                        '</a>');
                }

                $('.goods-ad-list').html(_list.join(''));
            }
        });
    }

    //现价随数量改变而改变
    function changePrice(amount){
        $('.prevailingPrice').html('￥'+goodsData['price']*amount);
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
                    return;
                }
            });
        }
        ykp.showOk({
            text: '该商品已收藏~'
        });
    })

    //判断是否可以选择私人定制
    $('.private').click(function(){
        if($('#seletCm .active').length == 1){
            $(this)[0].checked=false;
            ykp.showOk({
                text:'您已选择固定尺码！'
            });
            return;
        }
        if($(this).is(':checked')){
            if(ykp.getLocalStorage('isPrivate') != 1){
                ykp.showOk({
                    text:'请先完善个人信息'
                });
                return false;
            }
        }
    });

    //是否私人定制
    function isPrivate() {
        if (goodsData['isPrivate'] == 0) {
            if (!goodsData['color']) {
                ykp.showMessage('请选择颜色~');
                return false;
            }
            if (!goodsData['style']) {
                ykp.showMessage('请选择款式~');
                return false;
            }
            if (!goodsData['size']) {
                ykp.showMessage('请选择尺寸~');
                return false;
            }
        } else {
            if (!goodsData['color']) {
                ykp.showMessage('请选择颜色~');
                return false;
            }
            if (!goodsData['style']) {
                ykp.showMessage('请选择款式~');
                return false;
            }
        }
        return true;
    }

    //加入购物车
    $('.add-to-cart').click(function () {
        goodsData['goodsCount'] = $('.amount-num').val();
        goodsData['isPrivate'] = $('.goods-self-set input')[0].checked ? '1' : '0';
        if (!isPrivate()) {
            return;
        }
        ykp.doAjax({
            url: 'cart/joinCart',
            method: 'post',
            data: goodsData,
            success: function (res) {
                var acount = $('.cart-num').html();
                $('.cart-num').html(++acount);
                ykp.showOk({
                    text: res.msg
                });
            }
        });
    });

    //立即购买
    $('.to-purchase').click(function () {
        goodsData['goodsCount'] = $('.amount-num').val();
        goodsData['isPrivate'] = $('.goods-self-set input')[0].checked ? '1' : '0';
        if (!isPrivate()) {
            return;
        }
        var goodsInfo = '';
        if (goodsData['isPrivate'] == 0) {
            goodsInfo = goodsData['color'] + ',' + goodsData['style'] + ',' + goodsData['size'];
        } else {
            goodsInfo = goodsData['color'] + ',' + goodsData['style'] + ',' + goodsData['isPrivate'];
        }
        ykp.setLocalStorage('goodsInfo', goodsInfo);
        ykp.doAjax({
            url: 'common/immediatelyToPay',
            method: 'post',
            data: goodsData,
            success: function (res) {
                location.href =_doOder+"?goodsId=" + goodsData['goodsId'] + '&goodsCount=' + goodsData['goodsCount']+'&c_id='+res.data.carts[0].id;
            }
        });
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