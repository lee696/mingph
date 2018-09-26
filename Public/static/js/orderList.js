/**
 *订单列表.js
 */
$(function () {
    $('.user-sidebar a').eq(0).css('color','#c5ad82');
    var uid = ykp.getLocalStorage("uid"); //获取用户id
    var isShop = ykp.getLocalStorage("isShop"); //获取是否开店
    var jlevel = ykp.getLocalStorage("level"); //获取加盟等级
    init(); //页面初始化

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
        getJoinlevel(); //获取加盟等级
        getUserinfo(); //获取用户名及头像
        switchOrder(); //切换订单
        getAlloders(); //默认获取全部订单
        getEach1() //获取各个订单数量
        getEach2()//获取待付款订单数量
        getEach3()//获取待收货订单数量
        getEach4()//获取评价订单数量
        getEach5()//获取已完成订单数量
        getEach6()//获取售后订单数量
        getRecommend()//精品推荐

    }

    //获取加盟等级
    function getJoinlevel(){
        if(isShop == 1){
            jlevel == 1 ? $('.user-states span').html('普通加盟商') : $('.user-states span').html('高级加盟商');
        }else{
            $('.user-states span').hide();
        }
    }

    //获取用户名及头像
    function getUserinfo() {
        var headpic = ykp.getLocalStorage("photo");
        var uName = ykp.getLocalStorage("name");
        var uPhone = ykp.getLocalStorage("telephone");
        if (headpic !='null' && headpic) {
            $('#headpic').attr('src', headpic);
        }
        if (uName) {
            $('#uName-dis').html(uName);
            return;
        }
        if (uPhone) {
            $('#uName-dis').html(uPhone);
            return;
        }
    }

    //默认获取全部订单
    function getAlloders() {
        var postData = {
            uid: uid,
            pageNo:1,
            pageSize:6,
            type: 0
        }
        getOderList(postData)
    }

    //获取全部订单数量
    function getEach1() {
        url="order/getUserOrders";
        var data = {
            uid: uid,
            type: 0
        }
        getTotal(url,data,0);
    }

    //获取待付款订单数量
    function getEach2() {
        url="order/getUserOrders";
        var data = {
            uid: uid,
            type: 1
        }
        getTotal(url,data,1);
    }
    //获取待收货订单数量
    function getEach3() {
        url="order/getUserOrders";
        var data = {
            uid: uid,
            type: 2
        }
        getTotal(url,data,2);
    }
    //获取评价订单数量
    function getEach4() {
        url="order/getUserOrders";
        var data = {
            uid: uid,
            type: 3
        }
        getTotal(url,data,3);
    }
    //获取已完成订单数量
    function getEach5() {
        url="order/getUserOrders";
        var data = {
            uid: uid,
            type: 4
        }
        getTotal(url,data,4);


    }
    //获取售后订单数量
    function getEach6() {
        var url="order/getAfterSaleList";
        var data = {
            uid: uid,
        }
        getTotal(url,data,5);
    }

    //订单切换
    function switchOrder() {
        $('#list-type>a').click(function () {
            $('#list-type>a').removeClass('active');
            $(this).addClass('active');
            var index = $(this).index() || 0;
            if(index == 5){
                $('#sbuyer').hide();
                $('#orderprice').html('商品金额');
                getafterOderList()
                return;
            }

            $('#sbuyer').show();
            $('#orderprice').html('订单金额');
            var postData = {
                uid: uid,
                pageNo:1,
                pageSize:6,
                type: index
            }
            getOderList(postData);
        });
    }

    //查询各个订单数量ajax函数
    function getTotal(url,data,type) {
        ykp.doAjax({
            url: url,
            method: 'get',
            data: data,
            success: function (res) {
                switch (type) {
                    case 0:
                        $('#allOders span').html(res.totalRecord);
                        break;
                    case 1:
                        $('#wait-pay span').html(res.totalRecord);
                        break;
                    case 2:
                        $('#wait-Receive span').html(res.totalRecord);
                        break;
                    case 3:
                        $('#wait-evaluate span').html(res.data.length);
                        break;
                    case 4:
                        $('#wait-complete span').html(res.totalRecord);
                        break;
                    case 5:
                        $('#wait-afterSale span').html(res.totalRecord);
                        break;
                }
            }
        });
    }

    //弹出取消订单功能
    function cancelOrd() {
        $('#order_list .cancel_order').bind('click', function () {
            var This = $(this);
            var orderId = This.attr('rel');
            ykp.doAjax({
                url: 'order/cancelReason',
                method: 'get',
                data: {},
                success: function (res) {
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
                    doCancelOrder(orderId);
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
                data: {uid: uid, orderid: orderid, reasonid: reasonid},
                success: function (res) {
                    ykp.showOk({
                        text: '订单取消成功!',
                        callback: function () {
                            location.reload();
                        }
                    });
                }
            });
        });
    }


    //去支付，删除订单，前往评价点击事件绑定函数
    function click_Older() {
        $('.clickActions').click(function () {
            var status = $(this).attr('bt_status');
            var orderid = $(this).attr('orderid');
            var gsId = $(this).attr('gsid');
            var oid = $(this).attr('oid');
            if (status == 0) {
                location.href = oSuccess+'?orderId=' + orderid;
                return;
            }
            if (status == 1) {
                $('#confirmReceiveModal').show();
                $('.submit-confirm-receive').click(function () {
                    var url = 'order/sureGetGoods';
                    oderOperation(url, orderid);
                });
                return;
            }
            if (status == 2) {
                location.href = toComment + '?orderId=' + orderid + '&gsId=' + gsId+ '&oid=' + oid;
                return;
            }
            if (status == 3) {
                $('#delOrderModal').show();
                $('.submit-del-order').click(function () {
                    var url = 'order/delOrder';
                    oderOperation(url, orderid);
                });
                return;
            }
            if (status == 5) {
                $('#delOrderModal').show();
                $('.submit-del-order').click(function () {
                    var url = 'order/delOrder';
                    oderOperation(url, orderid);
                });
                return;
            }

        });
    }

    //售后订单点击事件绑定函数
    function aftersaleclick_Older() {
        $('.clickActions').click(function () {
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

    //执行删除订单及确认收货
    function oderOperation(url, oId) {
        ykp.doAjax({
            url: url,
            method: 'get',
            data: {userId: uid, id: oId},
            success: function (res) {
                location.reload();
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
                location.reload();
            }
        });
    }

    //获取订单列表ajax函数
    function getOderList(postData) {
        ykp.list({
            url: 'order/getUserOrders',
            method: 'get',
            data: postData,
            pageBar: {id: '#pageBar'},
            loadList: function (res) {
                var data = res.data;
                if(!data || data.length<=0){
                    $('#order_list').html('<p style="padding:10px;text-align:center">暂无数据</p>').css('color','#666');
                    return;
                }
                var html = [];
                var imgData = [];
                var index = 0;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    var status = pay_status = '';
                    var gsId = '';
                    var oid = '';
                    var buttoms = [];
                    switch (item.state) {
                        case 0:
                            pay_status = '去支付';
                            status = '待付款';
                            bt_status = item.state;
                            var span = '<a href="javascript:void(0)" rel="' + item.id + '" class="cancel_order user-order-actions">取消订单</a>';
                            gsId = item.items[0].goodid;
                            break;
                        case 1:
                            pay_status = '确认收货';
                            status = '待收货';
                            bt_status = item.state;
                            gsId = item.items[0].goodid;
                            break;
                        case 2:
                            pay_status = '前往评价';
                            status = '待评价';
                            bt_status = item.state;
                            gsId = item.items[0].goodid;
                            oid = item.items[0].id;
                            break;
                        case 3:
                            pay_status = '删除订单';
                            status = '已完成';
                            bt_status = item.state;
                            gsId = item.items[0].goodid;
                            break;
                        case 5:
                            pay_status = '删除订单';
                            status = '已取消';
                            bt_status = item.state;
                            gsId = item.items[0].goodid;
                            break;
                        case 6:
                            pay_status = false;
                            status = '待发货';
                            bt_status = 0;
                            gsId = 0;
                            break;
                    }

                    buttoms = [
                        pay_status == false ? "" : ('<a href="javascript:void(0)" oid="'+( oid ?oid:'') +'" gsId="' + gsId + '" orderId="' + item.id + '" bt_status="' + bt_status + '" class="user-order-actions red clickActions">' + pay_status + '</a>'),
                        '<a href="' + orderDetail + '?orderId=' + item.id + '" class="user-order-actions">查看详情</a>',
                    ];
                    item.state == 0 ? buttoms.push(span) : '';
                    var goods = [];
                    var _goods = [];

                    for (var g = 0; g < item.items.length; g++) {
                        var items = item.items[g];
                        goods.push(
                            '<a href="' + shop_details + '?gid=' + items.goodid + '&orDerin=1&detail='+ escape(items.gname) +'" class="img-wrapper"><img src="' + items.pic + '" /></a>'
                        )
                        if (g <= 4) {
                            _goods.push('<a href="' + shop_details + '?gid=' + items.goodid + '&orDerin=1&detail='+ escape(items.gname) +'" class="img-wrapper"><img src="' + items.pic + '" /></a>')
                        }
                    }
                    var dt = goods.join('');
                    var ind = index++;
                    imgData[ind] = dt;
                    html.push(
                        '<div class="user-order-list-item" >',
                        '<h5>订单编号：' + item.tradeNo + '</h5>',
                        '<div class="main clear">',
                        '<div class="cols col-1 clear" index=' + ind + '>',
                        _goods.join(''),
                        goods.length >= 5 ? ('<a class="more-img"><p>...</p><p>更多</p></a>') : '',
                        '</div>',
                        '<div class="cols col-2">' + item.buyer + '</div>',
                        '<div class="cols col-3 red-font bold-font">¥ ' + item.amount + '</div>',
                        '<div class="cols col-4">',
                        '<p>' + ykp.formatDate(new Date(item.addtime), 'Y-M-d') + '</p>',
                        '<p>' + ykp.formatDate(new Date(item.addtime), 'H:m') + '</p>',
                        '</div>',
                        '<div class="cols col-5">' + status + '</div>',
                        '<div class="cols col-6">',
                        buttoms.join(''),
                        '</div>',
                        '</div>',
                        '</div>'
                    );
                }
                $('#order_list').html(html.join(''));
                $('.more-img').click(function () {
                    var indexss = $(this).parent().attr('index');
                    $(this).parent().html(imgData[indexss]);
                })
                cancelOrd();
                click_Older()
            }
        });
    }

    //获取售后订单列表ajax函数
    function getafterOderList() {
        ykp.list({
            url: 'order/getAfterSaleList',
            method: 'get',
            data: {uid:uid,pageNo:1,pageSize:6},
            pageBar: {id: '#pageBar'},
            loadList: function (res) {
                var data = res.data;
                if(!data || data.length<=0){
                    $('#order_list').html('<p style="padding:10px;text-align:center">暂无数据</p>').css('color','#666');
                    return;
                }
                var html = [];
                var imgData = [];
                var index = 0;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    var status = pay_status = '';
                    var gsId = '';
                    var oid = '';
                    var buttoms = [];
                    switch (item.status) {
                        case 2:
                            pay_status = '撤销申请';
                            status = '售后中';
                            bt_status = item.status;
                            gsId = item.goodid;
                            oid = item.id;
                            break;
                        case 3:
                            pay_status = '删除订单';
                            status = '已取消售后';
                            bt_status = item.status;
                            gsId = item.goodid;
                            oid = item.id;
                            break;
                        case 5:
                            pay_status = '删除订单';
                            status = '售后已完成';
                            bt_status = item.status;
                            gsId = item.goodid;
                            oid = item.id;
                            break;
                        case 7:
                            pay_status = '';
                            status = '商家已确认';
                            bt_status = item.status;
                            gsId = item.goodid;
                            oid = item.id;
                            break;
                        case 8:
                            pay_status = '确认完成';
                            status = '商家已处理完成';
                            bt_status = item.status;
                            gsId = item.goodid;
                            oid = item.id;
                            break;
                    }

                    buttoms = [
                        pay_status?'<a href="javascript:void(0)" oid="'+( oid ?oid:'') +'" gsId="' + gsId + '" orderId="' + item.orderid + '" bt_status="' + bt_status + '" class="user-order-actions red clickActions">' + pay_status + '</a>':'',
                        '<a href="' + afterSaleOrderDetail + '?orderId=' + item.orderid + '&gsId=' + gsId + '&oid='+( oid ?oid:'') +'" class="user-order-actions">查看详情</a>',
                    ];
                    item.status == 0 ? buttoms.push(span) : '';
                    html.push(
                        '<div class="user-order-list-item" >',
                        '<h5>订单编号：' + item.returnNo + '</h5>',
                        '<div class="main clear">',
                        '<div class="cols col-1 clear">',
                        '<a href="' + shop_details + '?gid=' + item.goodid + '&orDerin=1&detail='+ escape(item.gname) +'" class="img-wrapper"><img src="' + item.pic + '" /></a>',
                        '</div>',
                        '<div class="cols col-3 red-font bold-font">¥ ' + item.price + '</div>',
                        '<div class="cols col-4">',
                        '<p>' + ykp.formatDate(new Date(item.addtime), 'Y-M-d') + '</p>',
                        '<p>' + ykp.formatDate(new Date(item.addtime), 'H:m') + '</p>',
                        '</div>',
                        '<div class="cols col-5">' + status + '</div>',
                        '<div class="cols col-6">',
                        buttoms.join(''),
                        '</div>',
                        '</div>',
                        '</div>'
                    );
                }
                $('#order_list').html(html.join(''));
                aftersaleclick_Older()
            }
        });
    }

    //精品推荐
    function getRecommend() {
        var postData = {
                pageNo: 1,
                pageSize: 4,
            }
        ykp.list({
            url: 'home/fineRecommend',
            method: 'get',
            data: postData,
            loadList: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var data = res.data;
                var item = data.list;
                var html = [];
                for (var i in item) {
                    html.push(
                        '<a href="' + goods_detail_page + '?gid=' + item[i]['id'] + '&boutique=1&detail=' + escape(item[i]['name']) + '" class="goods-list-item">',
                        '<div class="img-wrapper">',
                        '<img src="'+(item[i].picture? item[i].picture : defualtpic)+'">',
                        '</div>',
                        '<div class="goods-info">',
                        '<p class="goods-title">' + item[i]['name'] + '</p>',
                        '<p class="goods-states flex align-center space-between">',
                        '<span>' + item[i]['saleNum'] + '人喜欢</span>',
                        '<span>' + item[i]['monthlySales'] + '人购买</span>',
                        '</p>',
                        '<p class="goods-price flex align-center space-between">',
                        '<span class="black-font">￥' + item[i]['prevailingPrice'] + '</span>',
                        '<span class="to-buy">购买</span></p>',
                        '</div>',
                        '</a>'
                    );
                }
                $('#recommend').append(html.join(''));
            }
        });
    }
});
