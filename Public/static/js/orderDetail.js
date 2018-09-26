/**
 *订单详情页.js
 */
$(function () {
    //获取用户id
    var uid = ykp.getLocalStorage("uid");
    //获取订单id
    var orderId = $.getUrlParam('orderId');

    //获取物流信息
    getExpress(orderId)

    //获取订单详情
    getDetails(orderId)

    //去支付，删除订单，前往评价点击事件绑定函数
    click_Older(orderId)
    //获取订单详情
    function getDetails(oId) {
        ykp.doAjax({
            url: 'order/getCompleteOrderDetails',
            method: 'get',
            data: {userId: uid, id: oId},
            success: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var data = res.data;
                //渲染订单信息
                var orderInfo = data.order;
                var dis_state = '';
                var pay_status = '';
                var pay_type = '';
                switch (orderInfo.state) {
                    case 0:
                        pay_status = '去支付'
                        dis_state = '待付款';
                        $('.operations').append('<a href="javascript:void(0)" id="C_order" class="order-detail-action ">取消订单</a>');
                        break;
                    case 1:
                        pay_status = '确认收货'
                        dis_state = '待收货';
                        break;
                    case 2:
                        pay_status = '前往评价'
                        dis_state = '待评价';
                        break;
                    case 3:
                        pay_status = '删除订单'
                        dis_state = '已完成';
                        break;
                    case 5:
                        pay_status = '删除订单'
                        dis_state = '已取消';
                        break;
                    case 6:
                        pay_status = false
                        dis_state = '待发货';
                        break;
                }

                switch (orderInfo.payment) {
                    case 0:
                        pay_type = "余额支付"
                        break;
                    case 1:
                        pay_type = "支付宝支付"
                        break;
                    case 2:
                        pay_type = "微信支付"

                        break;
                }
                var goodmoney = 0;
                if (data.goods){
                    for(i=0;i<data.goods.length;i++){
                        goodmoney = goodmoney + data.goods[i].price;
                    }
                }
                if(pay_status == false){$('.clickActions').remove();}
                $('.clickActions').html(pay_status);
                $('.clickActions').attr('bt_status', orderInfo.state);
                $('.clickActions').attr('gsId',data.goods[0].goodid);
                $('.clickActions').attr('oid',data.goods[0].id);
                $('#orderStatus').html(dis_state);
                $('#orderNo').html(orderInfo.tradeNo ? orderInfo.tradeNo : 0);
                $('#goodsPri').html('￥' +  goodmoney ? goodmoney : 0 );
                $('#transportationPri').html('+￥' + orderInfo.freight ? orderInfo.freight : 0);
                $('#couponPri').html('-￥' + orderInfo.couponMoney ? orderInfo.couponMoney : 0);
                $('#integralPri').html('-￥' + orderInfo.integral ? orderInfo.integral : 0);
                $('#orderPri').html('￥' + orderInfo.amount ? orderInfo.amount : 0);
                $('#expressName').html(orderInfo.expressName ? orderInfo.expressName : '暂无数据');
                $('#expressNo').html(orderInfo.expressNo ? orderInfo.expressNo : '暂无数据');
                $('#pay_way').html(pay_type ? pay_type : '暂无数据');

                //渲染收货人信息
                var addressInfo = data.address;
                if(addressInfo){
                    $('#receiver').html(addressInfo.name ? addressInfo.name : '');
                    $('#recAddress').html(addressInfo.area + addressInfo.detailedAddress);
                    $('#telephone').html(addressInfo.telephone ? addressInfo.telephone : '');
                }

                //渲染商品信息
                var goodsItems = data.goods;
                var isEvaluate = data.order.state;
                var goodsHtml = [];
                for (var i = 0; i < goodsItems.length; i++) {
                    goodsHtml.push(
                        '<div class="items flex-start flex align-center">',
                        '<a href="' +(orderInfo.isIntegral==1? goods_Integraldetail_page : goods_detail_page )+ '?gid=' + goodsItems[i].goodid + '&orDerin=1&detail='+ escape(goodsItems[i].gname) +'" class="img-wrapper">',
                        '<img src="' + goodsItems[i].pic + '" />',
                        '</a>',
                        '<div class="info flex direction-col align-start space-between">',
                        '<h5 class="bold-font dark-font">' + goodsItems[i].gname + '</h5>',
                        '<p class="bold-font">',
                        '<span>颜色：' + goodsItems[i].color + '</span>',
                        '<span>尺寸：' + (goodsItems[i].size?goodsItems[i].size:'个人定制') + '</span>',
                        '<span class="red-font">'+(orderInfo.isIntegral==1? goodsItems[i].price+'积分' : '￥' + goodsItems[i].price)+'<span class="dark-font"> x' + goodsItems[i].quantity + '</span></span>',
                        '</p>',
                        '</div>',
                        isEvaluate == 2?'<div class="shouhou" style="background:#c5ad82;color:#fff;border-radius:5px;padding:5px;font-size: 16px"><a href="'+ afterSaleurl +'?orderId='+ orderId +'&goodid='+ goodsItems[i].goodid +'&oiid='+ goodsItems[i].id +'">申请售后</a></div>':'',
                        '</div>'
                    );
                }
                $('#goodsList').html(goodsHtml.join(''))
                cancelOrd()
            }
        })
    }

    //获取物流信息
    function getExpress(orderId) {
        ykp.doAjax({
            url: 'order/getOrderTrack',
            method: 'get',
            data: {uid: uid, oid: orderId},
            success: function (res) {
                var data = res.data;
                var trace = JSON.parse(data.trace).Traces;
                if(trace.length <= 0){
                    $('.express-table').hide();
                    return;
                }
                var expressHtml = [];
                for (var i = 0; i < trace.length; i++) {
                    expressHtml.push('<tr><td>' + trace[i].AcceptTime + '</td><td>' + trace[i].AcceptStation + '</td></tr>');
                }
                $('#expressInfo').append(expressHtml.join(''))
            }
        });
    }

    //去支付，删除订单，前往评价点击事件绑定函数
    function click_Older() {
        $('.clickActions').click(function () {
            var status = $(this).attr('bt_status');
            var gsId = $(this).attr('gsId');
            var oid = $(this).attr('oid');
            if (status == 0) {
                location.href = oSuccess+'?orderId=' + orderId;
                return;
            }
            if (status == 1) {
                $('#confirmReceiveModal').show();
                $('.submit-confirm-receive').click(function () {
                    var url = 'order/sureGetGoods';
                    oderOperation(url);
                });
                return;
            }
            if (status == 2) {
                location.href = oComment+"?orderId="+orderId+'&gsId='+gsId+'&oid='+oid;
                return;
            }
            if (status == 3) {
                $('#delOrderModal').show();
                $('.submit-del-order').click(function () {
                    var url = 'order/delOrder';
                    oderOperation(url);
                });
                return;
            }
            if (status == 5) {
                $('#delOrderModal').show();
                $('.submit-del-order').click(function () {
                    var url = 'order/delOrder';
                    oderOperation(url);
                });
                return;
            }

        });
    }


    //执行删除订单及确认收货
    function oderOperation(url) {
        ykp.doAjax({
            url: url,
            method: 'get',
            data: {userId: uid, id: orderId},
            success: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                location.href = sOderlist;
            }
        });
    }

    //弹出取消订单功能
    function cancelOrd() {
        $('#C_order').bind('click', function () {
            var This = $(this);
            var orderId = This.attr('rel');
            ykp.doAjax({
                url: 'order/cancelReason',
                method: 'get',
                data: {},
                success: function (res) {
                    if (res.code !== 200) {
                        ykp.alert(res.msg);
                        return;
                    }
                    var data = res.data;
                    var reasonHtml = [];
                    for (var i = 0; i < data.length; i++) {
                        reasonHtml.push(
                            '<div>',
                            '<label class="checkbox-2">',
                            '<input reasonId="' + data[i].id + '" type="checkbox"/>',
                            '<span class="nisen-box-2"></span>',
                            '</label>',
                            '<span class="reason_text">' + data[i].content + '</span>',
                            '</div>'
                        );
                    }

                    $('#c_reason').on('click', 'input', function () {
                        var divss = $(this).parent().parent().siblings();
                        var inputss = '';
                        for (var i = 0; i < 3; i++) {
                            inputss = divss.eq(i).find('input');
                            inputss[0].checked = false;
                        }
                    });
                    $('#c_reason').html(reasonHtml.join(''))
                    $('#cancelOrderModal').show();
                    doCancelOrder();
                }
            });
        });
    }

    //执行取消订单
    function doCancelOrder(orderid) {
        $('.submit-cancel-order').click(function () {
            var reasonid = $('#c_reason :checked').attr('reasonid');
            if (!reasonid) {
                ykp.showOk({text: '请选择取消原因'});
                return;
            }
            ykp.doAjax({
                url: 'order/cancel',
                method: 'get',
                data: {uid: uid, orderid: orderId, reasonid: reasonid},
                success: function (res) {
                    if (res.code !== 200) {
                        ykp.alert(res.msg);
                        return;
                    }
                    ykp.showOk({
                        text: '订单取消成功!',
                        callback: function () {
                            location.href = sOderlist;
                        }
                    });
                }
            });
        });
    }


})