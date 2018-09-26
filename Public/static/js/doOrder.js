/**
 *odOder.
 */

var data = {};//订单提交数据

//新的收获地址 显示与隐藏
$('.show-address-editor').click(function () {
    $('.address-form').toggle();
});

//添加地址
$('#saveAddress').click(function () {
    var formdata = ykp.getFormData('.address-form', true);
    if (!formdata.status) {
        return;
    }
    var postData = {
        userId: ykp.getLocalStorage('id'),
        name: formdata.receiver,
        telephone: formdata.phone,
        area: formdata.provincePicker + ' ' + formdata.cityPicker + ' ' + formdata.regionPicker,
        postalAddress: formdata.areaCode,
        detailedAddress: formdata.fullAddress,
        isdefault: 1,
        sex: 1
    }
    addAddress(postData);
})

//添加收获地址
function addAddress(postData) {
    console.log(postData);
    ykp.doAjax({
        url: 'address/editAddress',
        method: 'post',
        data: postData,
        success: function (res) {
            ykp.showOk({text: res.msg});
            $('.address-form')[0].reset();
            $('.address-form').hide();
            getAddressList();
        }
    });
}

//地址列表
function getAddressList() {
    var postData = {
        userId: data.userId,
    };
    ykp.doAjax({
        url: 'address/addressList',
        method: 'get',
        async: false,
        data: postData,
        success: function (res) {
            var data = res.data;
            var list = [];
            for (var i=0;i<data.list.length;i++) {
                var item=data.list[i];
                list.push(
                    '<a href="javascript:void(0)" data-id="'+item.id+'" class="address-item '+(item.isdefault == 1 ? 'active' : '')+'">'+
                    '<h4 class="receiver">'+item.name+'</h4>'+
                    '<div class="mainAddress">'+
                    '<p id="nAddress">'+item.detailedAddress+'</p>'+
                    '<p>'+item.area+ (item.postalAddress || '')+'</p>'+
                    '<p>'+item.telephone+'</p>'+
                    '</div>'+
                    '</a>');
            }
            $('#addressList').html(list.join(''));
        }
    });
}

$(function(){
    data.userId =  ykp.getLocalStorage('id');
    data.cartids = $.getUrlParam('cartGoodsIds') || $.getUrlParam('c_id');

    //判断从哪个页面跳转过来，从订单提交成功页面跳转过来
    //则回到来源页面
    if(ykp.getLocalStorage('cartids') == data.cartids){
        location.href = document.referrer;
    }

    //判断是否为积分商品
    if($.getUrlParam('integralGoodsId')){
        $('#backToShoppingCart').remove();
        $('.order-discount').remove();
        $('.discounted-box').remove();
        $('.count-info p').eq(2).remove();
    }

    //加载地址列表数据
    getAddressList();

    //修改地址获取运费
    $('#addressList .address-item').click(function () {
        getFreight($(this));
    });

    //商品数据加载
    ykp.doAjax({
        url:'cart/toSettlement',
        method:'get',
        data:{uid: data.userId,cartids: data.cartids},
        success:function(res){
            var goods = res.data.carts;
            var myCoupons = res.data.coupons;
            data.freight = res.data.freight;
            var integral = res.data.integral;
            var scale = res.data.freightToManey;

            //加载商品数据
            getGoodsData(goods,data.freight);

            //加载优惠券数据
            getCouponsData(myCoupons);

            //选择优惠券
            $('#doUseCoupon').click(function () {
                chooseCoupon(myCoupons);
            });

            //使用优惠券
            $('.useCoupon').click(function () {
                return useCoupon($(this));
            });

            //使用积分抵扣
            $('.usePoint').click(function () {
                return usePoint($(this),integral,scale);
            });

            //点击提交订单
            $('#submitOrder').click(function () {
                data.orderDetails = data.cartids;
                data.addressId = $('#addressList .active').attr('data-id');
                data.amount = $("#oderAmount").text();
                data.leaveWord = $('#userMessage').val();
                ykp.setLocalStorage('cartids',data.cartids);
                submitOrder(data);
            });
        }
    });
});

//提交订单
function submitOrder(data) {
    if(!data.addressId){
        ykp.alert('请选择收货人信息！');
        return;
    };
    ykp.doAjax({
        url: 'order/submitOrder',
        method: 'post',
        data: data,
        success: function (res) {
            ykp.showOk({
                text: '提交订单成功',
                callback: function(){
                    location.href = success_page+'?orderId=' + res.data.order.id;
                }
            });
        }
    });
}

//使用积分抵扣
function usePoint(point,integral,scale){
    if (point.is(':checked')) {
        //判断用户积分是否足够
        var integralnum = ykp.getLocalStorage('integralnum');
        if(integral > integralnum){
            ykp.showOk({
                text: '积分不足，无法使用'
            });
            return false;
        }

        data.integral = integral;

        $('.discount-write-in').append('<span class="use_point"><span class="point_record">' + ($('.discount-write-in>span').length + 1) + '</span>.积分抵扣金额</span>');

        var pay = $('.pay').html();
        var integralDiscount = integral * scale;

        pay = eval(pay + '-' + integralDiscount).toFixed(2);
        $('.itg').html(integralDiscount.toFixed(2));
        $('.pay').html(pay);
    } else {
        data.integral = '';

        $('.use_point').remove();
        if ($('.use_coupon').length == 1 && $('.coupon_record').html() == 2) {
            $('.coupon_record').html(1);
        }

        var pay = $('.pay').html();
        pay = eval(pay + '+' + $('.itg').html()).toFixed(2);
        $('.pay').html(pay);
        $('.itg').html(0);
    }
}

//删除优惠卷
function deleteCoupons() {
    $('.cou').remove();

    if ($('.useCoupon').is(':checked')) {
        $('.use_coupon').remove();

        $('.useCoupon').prop('checked', false);
        if ($('.use_point').length == 1 && $('.point_record').html() == 2) {
            $('.point_record').html(1);
        }
    }
    $('#coupons')[0].selectedIndex = 0;
}

//使用优惠券
function useCoupon(coupon){
    if (coupon.is(':checked')) {
        if ($('.cou').length < 1) {
            ykp.showOk({
                text: '请先选择优惠券'
            });
            return false;
        }
        if ($('.cou td').eq(2).html() != '是') {
            ykp.showOk({
                text: '该优惠券不适用本订单'
            });
            return false;
        }
        data.couponId = $('.cou').attr('data-id');

        $('.cdis').html(data.couponDiscount);
        var pay = eval($('.pay').html() + '-' + data.couponDiscount)
        $('.pay').html(pay.toFixed(2));

        $('.discount-write-in').append('<span class="use_coupon"><span class="coupon_record">' + ($(this).find('span').length + 1) + '</span>.<span class="coupon_name">' + $('.cou td').eq(1).html() + '</span></span>');
    } else {
        data.couponId = '';

        var pay  = eval($('.pay').html() + '+'+ data.couponDiscount);
        $('.pay').html(pay.toFixed(2));
        $('.cdis').html(0);
        $('.use_coupon').remove();
        if ($('.use_point').length == 1 && $('.point_record').html() == 2) {
            $('.point_record').html(1);
        }
    }
}

//选择优惠券
function chooseCoupon(myCoupons){
    var cid = $('#coupons').val();
    if (cid && myCoupons) {
        for (var i in myCoupons) {
            if (cid == myCoupons[i].cId) {
                if ($('.cou').length == 1 && $('.cou').attr('data-id') == cid) {
                    return;
                }
                $('.cou').remove();

                var pay = $('.pay').html(); //pay 应付金额
                var coudis = myCoupons[i].couponDetail.money; //coudis 优惠券抵扣金额
                var coucon = myCoupons[i].couponDetail.conditions; //coucon 优惠券使用条件
                if (pay > coucon) {
                    data.couponDiscount = coudis;
                }

                $('.coupons-table tbody').append(
                    '<tr class="cou" data-id="'+cid+'">' +
                    '<td>' + myCoupons[i].couponDetail.couponCode + '</td>' +
                    '<td>' + myCoupons[i].couponDetail.name + '</td>' +
                    '<td>' + (pay > coucon ? '是' : '否') + '</td>' +
                    '<td><a class="remove-coupon" onclick="deleteCoupons()"></a></td>' +
                    '</tr>');

                //选中使用优惠券时，做额外处理
                if ($('.useCoupon').is(':checked')) {
                    if (pay <= coucon) {
                        ykp.showOk({
                            text: '该优惠券不适用本订单'
                        });
                        $('.use_coupon').remove();

                        $('.useCoupon').prop('checked', false);
                        if ($('.use_point').length == 1 && $('.point_record').html() == 2) {
                            $('.point_record').html(1);
                        }

                        pay = eval($('.pay').html() + '+' + $('.cdis').html());
                        $('.pay').html(pay.toFixed(2));
                        $('.cdis').html(0);
                        return;
                    }
                    $('.cdis').html(data.couponDiscount);
                    pay = eval($('.pri').html() + '+'+ $('.fre').html() + '-' + $('.cdis').html() + '-' + $('.itg').html());
                    $('.pay').html(pay.toFixed(2));

                    $('.coupon_name').html($('.cou td').eq(1).html());
                }
                break;
            }
        }
    }
}

//修改地址获取运费
function getFreight(address){
    if(address.hasClass('active')){
        return;
    }
    address.addClass('active').siblings().removeClass('active');
    var addressid = address.attr('data-id');
    ykp.doAjax({
        url: 'cart/getPreight',
        method: 'get',
        data:{uid:data.userId,cartids:data.cartids,addressid:addressid},
        success: function(res){
            data.freight = res.data;
            var freight = $('.fre').html(res.data);
            var price = $('.pri').html();
            price = eval(price + '+' + data.freight).toFixed(2);
            $('.pay').html(price);
        }
    });
}

//加载商品数据
function getGoodsData(goods,freight){
    var list = [];
    for (var i in goods) {
        list.push('<tr class = "buylist-items">',
            '<td >',
            '<a href = "'+goods_detail_page+'?gid=' + goods[i].id + '" class = "img-wrapper"><img src ="' + goods[i].pic + '"/></a>',
            '<div class = "buy-list-info">',
            '<h5 class = "buy-goods-name text-overflow" >' + goods[i].gname + '</h5>',
            '<p class = "buy-goods-params" >颜色: ' + goods[i].color + ' &nbsp;&nbsp;款式: ' + goods[i].style + (goods[i].isPrivate ? '' : ( '&nbsp;&nbsp;尺寸: ' + goods[i].size)) + '</p>',
            (goods[i].isPrivate ? '<span class = "red-font"> 个人定制 </span>' : ''),
            '</div>',
            '</td>',
            '<td class = "line-through">￥' + (goods[i].originalPrice || 0) + '</td>',
            '<td class = "bold-font" >' + goods[i].price + '</td>',
            '<td>' + goods[i].goodsCount + '</td>',
            '<td class = "red-font bold-font subtotal">' + goods[i].goodsCount * goods[i].price + '</td>',
            '</tr>');
    }
    $('#buyList').append(list.join(''));

    var price  = '0';
    $('.subtotal').each(function () {
        price = eval(price + '+' + $(this).html());
    });

    $('.pri').html(price);
    $('.fre').html(freight);

    if($.getUrlParam('integralGoodsId')){
        $('.itg').html(price);
        $('.pay').html(freight);
    } else {
        price = eval(price + '+' + freight).toFixed(2);
        $('.pay').html(price);
    }
}

//优惠券数据
function getCouponsData (myCoupons) {
    if(myCoupons && myCoupons.length > 0){
        for (var i=0;i<myCoupons.length;i++) {
            var item = myCoupons[i]
            $('#coupons').append('<option data-id='+item.couponDetail.id+' value="'+item.couponDetail.id+'">'+item.couponDetail.name+'</option>');
        }
    }
}