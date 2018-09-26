/**
 *购物车.
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
    }else {
        var postData = {
            userId:ykp.getLocalStorage('id')
        };
        //加载购物车数据
        ykp.doAjax({
            url: 'cart/getCartGoods',
            method: 'get',
            data: {uid: postData['userId']},
            success: function (res) {
                if(!res.data || res.data.length <= 0){
                    $('#cartBox').html('还没有添加商品~').css('line-height','50px').css('color','#666');
                    return;
                }
                var data = res.data[0].list;
                var html = [];
                for (var i in data) {
                    html.push('<ul data-id=1 class="cart-item" cartGoodsId=' + data[i].id + '>',
                        '<li class="cols col-1">',
                        '<label class="checkbox">',
                        '<input type="checkbox"  />',
                        '<span class="nisen-box"></span>',
                        '</label>',
                        '</li>',
                        '<li class="cols col-2">',
                        '<a href="'+ goods_detail_page +'?gid='+data[i].id+'&cartInf=1&detail='+escape(data[i].gname)+'" class="img-wrapper">',
                        '<img src=' + data[i].pic + ' />',
                        '</a>',
                        '<div class="cart-info">',
                        '<a class="title">' + data[i].gname + '</a>',
                        (data[i].isPrivate ? '<span>个人定制</span>' : ''),
                        '</div>',
                        '</li>',
                        '<li class="cols col-3">',
                        '<p>颜色：' + data[i].color + '</p>',
                        '<p class="style">款式：' + data[i].style + '</p>',
                        data[i].isPrivate ? '':('<p>尺寸：' + data[i].size + '</p>'),
                        '</li>',
                        '<li class="cols col-4">',
                        '<p class="cart-old-price">￥' + data[i].originalPrice + '</p>',
                        '<p class="cart-price">' + data[i].price + '</p>',
                        '<p class="gold-font">本店价</p>',
                        '</li>',
                        '<li class="cols col-5">',
                        '<div class="cart-counter">',
                        '<a class="cart-counter-op minus">-</a>',
                        '<input type="number" class="counter-num" value=' + data[i].goodsCount + ' />',
                        '<a class="cart-counter-op plus">+</a>',
                        '</div>',
                        '</li>',
                        '<li class="red-font cols col-6 bold-font">' + data[i].goodsCount * data[i].price + '</li>',
                        '<li  class="cols col-7">',
                        '<a class="del-cart">删除</a>',
                        '</li>',
                        '</ul>')
                }
                $('#cartBox').append(html.join(''));

                //删除商品
                $('.del-cart').click(function () {
                    var ulss = $(this).parent().parent();
                    $('#delOrderModal').show();
                    $('.submit-del-order').click(function () {
                        var cartGoodsId = ulss.attr('cartGoodsId');
                        ykp.doAjax({
                            url: 'cart/delCartGood',
                            method: 'get',
                            data: {uid: ykp.getLocalStorage('id'), cartids: cartGoodsId},
                            success: function (res) {
                                var acount = $('.cart-num').html();
                                $('.cart-num').html(--acount);
                                ulss.remove();
                                calculateTotalPrice();
                                $('#delOrderModal').hide();
                            }
                        });
                    });
                });


                //按钮操作商品数量
                $('.cart-counter a').click(function(){
                    var countInput = $(this).siblings('input');
                    var controlInput = $(this).parent().parent().siblings().find('input');
                    var amount = countInput.val();
                    if($(this).html() === '-'){
                        if(amount == 1){
                            return;
                        }
                        countInput.val(--amount);
                        ykp.doAjax({
                            url:'cart/updateCartGood',
                            method:'post',
                            data:{userId:postData['userId'],
                                list:[
                                    {"id":$(this).parent().parent().parent().attr('cartGoodsId'),"num":countInput.val()}
                                ]},
                            success:function(res){
                            }
                        });
                        smallTotal(countInput);
                        if(controlInput[0].checked){
                            calculateTotalPrice();
                        }
                        return;
                    }
                    countInput.val(++amount);
                    ykp.doAjax({
                        url:'cart/updateCartGood',
                        method:'post',
                        data:{userId:postData['userId'],
                            list:[
                                {"id":$(this).parent().parent().parent().attr('cartGoodsId'),"num":countInput.val()}
                            ]},
                        success:function(res){
                        }
                    });
                    smallTotal(countInput);
                    if(controlInput[0].checked){
                        calculateTotalPrice();
                    }
                });

                //单个商品小计
                function smallTotal(countInput) {
                    var amount = countInput.val();
                    var price = countInput.parent().parent().prev().find('p').eq(1).html();
                    countInput.parent().parent().next().html(amount * price);
                }
                //手动调整商品数量
                $('.counter-num').blur(function () {
                    var reg = /^[0-9]+$/;
                    var amount = parseInt($(this).val());
                    var controlInput = $(this).parent().parent().siblings().find('input');
                    if (!(reg.test(amount)) || amount === 0) {
                        $(this).val(1);

                        ykp.doAjax({
                            url:'cart/updateCartGood',
                            method:'post',
                            data:{userId:postData['userId'],
                                list:[{"id":$(this).parent().parent().parent().attr('cartGoodsId'),"num":countInput.val()}]
                            },
                            success:function(res){
                            }
                        });
                        smallTotal($(this));
                        if(controlInput[0].checked){
                            calculateTotalPrice();
                        }
                        return;
                    }
                    ykp.doAjax({
                        url:'cart/updateCartGood',
                        method:'post',
                        data:{userId:postData['userId'],
                            list:[
                                {"id":$(this).parent().parent().parent().attr('cartGoodsId'),"num":$(this).val()}
                            ]},
                        success:function(res){
                        }
                    });
                    smallTotal($(this));
                    if(controlInput[0].checked){
                        calculateTotalPrice();
                    }
                });

                //点击单个选中按钮调整购物金额小计
                $('#cartBox input[type=checkbox]').click(function () {
                    $('.cart-operation-bar input')[0].checked = false;
                    calculateTotalPrice();
                });

                //计算总价
                function calculateTotalPrice() {
                    var total = '0';
                    var selectedGoods = $('#cartBox :checked');
                    selectedGoods.each(function () {
                        total = eval($(this).parent().parent().siblings().eq(4).html() + '+' + total);
                    });
                    $('.purchase-price').html(total);
                }

                //全选与反选
                $('.cart-operation-bar input').click(function () {
                    if (this.checked) {
                        $('#cartBox input[type=checkbox]').each(function () {
                            this.checked = true;
                        });
                        calculateTotalPrice();
                    } else {
                        $('#cartBox input[type=checkbox]').each(function () {
                            this.checked = false;
                        });
                        calculateTotalPrice();
                    }
                });

                $("#cartBox input").click(function () {
                    var inuts = $("#cartBox input[type=checkbox]").length;
                    var cchecked = $('#cartBox input[type=checkbox]:checked').length;
                    if(inuts == cchecked ){
                        $('.cart-operation-bar input')[0].checked = true;
                    }
                })

                //查看推荐
                ykp.doAjax({
                    url: 'home/fineRecommend',
                    method: 'get',
                    data: {pageNo: 1, pageSize: 5},
                    success: function (res) {
                        var list = res.data.list || [];
                        var _list = [];
                        for (var item=0;item<list.length;item++) {
                            _list.push(
                                '<a href="' + goods_detail_page + '?gid=' + list[item].id + '&boutique=1&detail=' + escape(escape(list[item].name)) + '" class="goods-list-item">',
                                '<div class="img-wrapper">',
                                '<img src="' + (list[item].picture ? list[item].picture : defaultImg) + '">',
                                '</div>',
                                '<div class="goods-info">',
                                '<p class="goods-title">' + list[item].name + '</p>',
                                '<p class="goods-price flex align-center space-between">',
                                '<span class="black-font">￥' + list[item].prevailingPrice + '</span>',
                                '</div>',
                                '</a>'
                            );
                        }
                        $('#recommendItems').html(_list.join(''));
                    }
                });
            }
        });
    }

    //支付
    $('.purchase-entrance').click(function () {
        var cartGoodsIds = '';
        var amount = '';
        var ulss = '';
        if ($('#cartBox :checked').length === 0) {
            ykp.showMessage('请至少选择一件商品哟~');
            return false;
        }
        $('#cartBox :checked').each(function () {
            ulss = $(this).parent().parent().parent()
            cartGoodsIds = cartGoodsIds + ',' + ulss.attr('cartGoodsId');
            amount = amount + ',' + ulss.find('input').eq(1).val();
        });
        $(this).attr('href', _doOder+'?cartGoodsIds=' + cartGoodsIds.substring(1) + '&' + 'amount=' + amount.substring(1));
    });
});