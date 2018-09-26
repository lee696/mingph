/**
 *售后订单详情js
 */

$(function () {
    //获取用户id
    var uid = ykp.getLocalStorage("uid");
    //获取订单id
    var orderId = $.getUrlParam('orderId');
    //获取商品id
    var gsId = $.getUrlParam('gsId');
    //获取订单项id
    var oid = $.getUrlParam('oid');

    //获取订单详情
    getDetails(orderId)

    //获取订单详情
    function getDetails(orderId) {
        ykp.doAjax({
            url: 'order/getAfterSaleInfo',
            method: 'get',
            data: {oid:orderId , uid:uid ,gid:gsId,oiid:oid},
            success: function (res) {
                console.log(res);
                var data = res.data.item;
                //渲染订单信息
                var afterSaleinf = res.data.afterSale;
                var dis_state = '';
                var pay_status = '';
                var pay_type = '';
                switch (data.status) {
                    case 2:
                        pay_status = '撤销申请'
                        dis_state = '售后中';
                        break;
                    case 3:
                        pay_status = '删除订单'
                        dis_state = '已取消售后';
                        break;
                    case 5:
                        pay_status = '删除订单'
                        dis_state = '售后已完成';
                        break;
                    case 7:
                        pay_status = ''
                        dis_state = '商家已确认';
                        break;

                        break;
                    case 8:
                        pay_status = '确认完成'
                        dis_state = '商家已处理完成';
                        break;
                }

                $('.clickActions').html(pay_status);
                $('.clickActions').attr('bt_status', data.status);
                $('.clickActions').attr('gsId',data.goodid);
                $('.clickActions').attr('orderId',data.orderid);
                $('.clickActions').attr('oid',data.id);
                $('#orderStatus').html(dis_state);
                $('#orderNo').html(afterSaleinf.returnNo ? afterSaleinf.returnNo : 0);
                $('#goodsPri').html('￥' + data.price ? data.price : 0);
                /* $('#transportationPri').html('+￥' + orderInfo.freight ? orderInfo.freight : 0);
                 $('#couponPri').html('-￥' + orderInfo.couponMoney ? orderInfo.couponMoney : 0);
                 $('#integralPri').html('-￥' + orderInfo.integral ? orderInfo.integral : 0);
                 $('#orderPri').html('￥' + orderInfo.amount ? orderInfo.amount : 0);
                 $('#expressName').html(orderInfo.expressName ? orderInfo.expressName : '暂无数据');
                 $('#expressNo').html(orderInfo.expressNo ? orderInfo.expressNo : '暂无数据');
                 $('#pay_way').html(pay_type ? pay_type : '暂无数据');*/



                //渲染商品信息
                var goodsHtml = [
                    '<div class="items flex-start flex align-center">',
                    '<a href="' + shop_details + '?gid=' + data.goodid + '&orDerin=1&detail='+ escape(data.gname) +'" class="img-wrapper">',
                    '<img src="' + data.pic + '" />',
                    '</a>',
                    '<div class="info flex direction-col align-start space-between">',
                    '<h5 class="bold-font dark-font">' + data.gname + '</h5>',
                    '<p class="bold-font">',
                    '<span>颜色：' + data.color + '</span>',
                    '<span>尺寸：' + data.size + '</span>',
                    '<span class="red-font">￥' + data.price + ' <span class="dark-font"> x' + data.quantity + '</span></span>',
                    '</p>',
                    '</div>',
                    '</div>'
                ];

                $('#goodsList').html(goodsHtml.join(''))
                aftersaleclick_Older()
            }
        })
    }

    //售后订单点击事件绑定函数
    function aftersaleclick_Older() {
        console.log(111);
        $('.clickActions').click(function () {
            console.log(222);
            var status = $(this).attr('bt_status');
            var orderid = $(this).attr('orderid');
            var gsId = $(this).attr('gsid');
            var oid = $(this).attr('oid');
            if (status == 2) {
                $('#cancelafterOrderModal').show();
                $('#cancelafterOrderModal .submit-confirm-receive').click(function () {
                    var url = 'order/cancelAfterSale';
                    var postdata= {
                        uid:uid,
                        oid:orderid,
                        gid:gsId,
                        oiid:oid
                    }
                    afterSale(url, postdata);
                });
                return;
            }
            if (status == 3) {
                $('#delOrderModal').show();
                $('#delOrderModal .submit-del-order').click(function () {
                    var url = 'order/delAfterSale';
                    var postdata= {
                        uid:uid,
                        oid:orderid,
                        gid:gsId,
                        oiid:oid
                    }
                    afterSale(url, postdata);
                });
                return;
            }
            if (status == 5) {
                $('#delOrderModal').show();
                $('#delOrderModal .submit-del-order').click(function () {
                    var url = 'order/delAfterSale';
                    var postdata= {
                        uid:uid,
                        oid:orderid,
                        gid:gsId,
                        oiid:oid
                    }
                    afterSale(url, postdata);
                });
                return;
            }
            if (status == 8) {
                $('#delOrderModal').show();
                $('#delOrderModal .submit-del-order').click(function () {
                    var url = 'order/completeAfterSale';
                    var postdata= {
                        uid:uid,
                        oid:orderid,
                        gid:gsId,
                        oiid:oid
                    }
                    afterSale(url, postdata);
                });
                return;
            }

        });
    }

    //售后订单执行ajax
    function afterSale(url, postdata) {
        ykp.doAjax({
            url: url,
            method: 'get',
            data: postdata,
            success: function (res) {
                location.href = sorderlist;
            }
        });
    }

})