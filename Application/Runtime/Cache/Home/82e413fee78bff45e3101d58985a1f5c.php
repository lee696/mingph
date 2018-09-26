<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="keywords" content="keywords">
        <meta name="description" content="description">
        <title>名品汇</title>
    <script type="text/javascript" src="/static/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/static/js/jquery.qrcode.min.js"></script>
    <script type="text/javascript" src="/static/js/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="/static/js/tips.js"></script>
    <script type="text/javascript" src="/static/js/public.js"></script>
    <script type="text/javascript" src="/static/js/base.js"></script>
    <script type="text/javascript" src="/static/js/ykp.js"></script>
    <script type="text/javascript" src="/static/js/JQuery.md5.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/css/global.css" />
    <link rel="stylesheet" type="text/css" href="/static/css/global-fix.css" />
    
    <link href="/static/css/modal.css" rel="stylesheet" type="text/css"/>
    <link href="/static/css/user.css" rel="stylesheet" type="text/css"/>
    <link href="/static/css/user-order.css" rel="stylesheet" type="text/css"/>
    <link href="/static/css/goods.css" rel="stylesheet" type="text/css"/>

</head>
<body>
<nav class="navigator">
    <div class="sub-nav">
        <div id="logCheck-tit" class="main-width text-right">
        </div>
    </div>
    <div class="main-nav main-width margin-top">
        <div class="flex center-nav space-between align-center">
            <a href="<?php echo U('Index/index');?>" class="logo"><img src="/static/images/logo.png" alt="名品汇" /></a>
            <form class="search-form flex flex-start align-center">
                <input type="text" id="searchKeywords" placeholder="输入商品名" />
                <button type="button" id="searchBtn"></button>
            </form>
            <a href="<?php echo U('Order/cart');?>" class="flex cart-entrance justify-center align-center">
                <i class="icon icon-cart"></i>
                我的购物车(<span class="red-font cart-num">0</span>)
            </a>
        </div>
        <div class="menu flex flex-start align-center">
            <span><a href="<?php echo U('Index/index');?>" class="index">首页</a></span>
            <span class="has-expand">
                <a class="dress">服饰商城</a>
                <div class="menu-expand-list direction-col">
                    <div>
                        <a href="<?php echo U('Goods/list');?>?position=1">男人帮</a>
                        <a href="<?php echo U('Goods/list');?>?position=2">女人帮</a>
                    </div>
                </div>
            </span>
            <span class="has-expand">
                <a class="jewelBox">百宝箱</a>
                <div class="menu-expand-list flex-wrap" id="treasureBoxList">
                    <div class="clear">
                        
                    </div>
                </div>
            </span>
            <span class="has-expand">
                <a href="<?php echo U('Goods/pointList');?>" class="integralMall">积分商城</a>
            </span>
        </div>
    </div>
</nav>

    <div class="main-width user-center clear">
        <div class="r-sidebar">
    <div class="r-sidebarBox">
        <div class="inBox">
            <a href="/Index/index.html">
                <div class="home_page">首页</div>
            </a>
            <a href="/User/orderlist.html">
                <div class="j-order"></div>
            </a>
            <a href="/Order/cart.html">
                <div class="j-cart"></div>
            </a>
            <a href="/User/message.html">
                <div class="msg"></div>
            </a>
            <a href="http://wpa.qq.com/msgrd?V=1&amp;uin=413103613&amp;Site=pageadmin&amp;Menu=yes">
                <div class="serve"></div>
            </a>
            <a>
                <div id="mTop_bt" class="move_top"></div>
            </a>
        </div>
    </div>
</div>
        <nav class="user-sidebar">
  <div class="module">
    <h3 class="dark-font">订单中心</h3>
    <a href="<?php echo U('User/orderList');?>">我的订单</a>
  </div>
  <div class="module">
    <h3 class="dark-font">个人中心</h3>
    <a href="<?php echo U('User/info');?>">个人资料</a>
    <a href="<?php echo U('User/address');?>">收货地址</a>
    <a href="<?php echo U('User/point');?>">我的积分</a>
    <a href="<?php echo U('User/coupon');?>">我的优惠券</a>
    <a href="<?php echo U('User/message');?>">我的消息</a>
    <a href="<?php echo U('User/wallet');?>">我的钱包</a>
    <a href="<?php echo U('User/collect');?>">我的收藏</a>
    <a href="<?php echo U('User/join');?>">我要加盟</a>
    <a id="my_store_share" href="<?php echo U('User/store');?>?uid=">我的店铺</a>
    <a href="<?php echo U('User/pwd');?>">修改密码</a>
    <a href="<?php echo U('Help/index');?>">帮助中心</a>
  </div>
</nav>

  <script>
   userid = ykp.getLocalStorage("id");
   var stor="<?php echo U('User/store');?>";
   var hrefm= ''+ stor +'?uid='+ userid +'';
   $('#my_store_share').attr('href',hrefm);
  </script>

        <div class="user-main user-order-list">
            <div class="user-info flex flex-start align-center">
                <img id="headpic" src="/static/images/avatar.png"/>
                <div class="user-states">
                    <h1 id="uName-dis">用户</h1>
                    <span>普通加盟商</span>
                </div>

            </div>
            <div class="user-order-filter clear">
                <h4 class="bold-font">我的订单</h4>
                <div id="list-type">
                    <a href="javascript:void(0)" id="allOders"
                       class="user-order-filter-option active">全部订单(<span>0</span>)</a>
                    <a href="javascript:void(0)" id="wait-pay"
                       class="user-order-filter-option">待付款订单(<span>0</span>)</a>
                    <a href="javascript:void(0)" id="wait-Receive" class="user-order-filter-option">待收货订单(<span>0</span>)</a>
                    <a href="javascript:void(0)" id="wait-evaluate"
                       class="user-order-filter-option">待评价订单(<span>0</span>)</a>
                    <a href="javascript:void(0)" id="wait-complete"
                       class="user-order-filter-option">已完成订单(<span>0</span>)</a>
                </div>
            </div>
            <div class="user-order-list-main">
                <div class="title-bar">
                    <span class="cols col-1">订单商品</span>
                    <span class="cols col-2">收货人</span>
                    <span class="cols col-3">订单金额</span>
                    <span class="cols col-4">下单时间</span>
                    <span class="cols col-5">订单状态</span>
                    <span class="cols col-6">操作</span>
                </div>
                <div id="order_list" class="user-order-list-render">
                </div>
                <div id="pageBar" class="pagination"></div>
            </div>
            <div class="recommend-goods goods-ad-list">
                <h1>精品推荐</h1>

                <div id="recommend">

                </div>
            </div>
        </div>
    </div>
    <div class="modal cancel-order-modal" id="cancelOrderModal">
    <div class="main">
        <div class="header">
            <h4>确定取消订单？</h4>
            <a href="javascript:void(0)" class="close-modal"></a>
        </div>
        <div class="content">
            <p class="cancel-tit">取消订单后，本单享有的优惠券会一并取消是否继续？</p>
            <p class="cancel-reason gray-font">请选择取消订单的原因（必选）：</p>
            <div id="c_reason">
            </div>
            <button type="button" class="submit-cancel-order">提交</button>
        </div>
    </div>
</div>
    <div class="modal del-order-modal" id="delOrderModal">
    <div class="main">
        <div class="header">
            <a href="javascript:void(0)" class="close-modal"></a>
        </div>
        <div class="content">
            <h2>是否确定删除？</h2>
            <div class="operations clear">
                <button type="button" class="close-modal">取消</button>
                <button type="button" class="submit-del-order">确定</button>
            </div>
        </div>
    </div>
</div>
    <div class="modal confirm-receive-modal" id="confirmReceiveModal">
  <div class="main">
    <div class="header">
      <a href="javascript:void(0)" class="close-modal"></a>
    </div>
    <div class="content">
      <h2>是否确认收到货物？</h2>
      <div class="operations clear">
        <button type="button" class="close-modal">取消</button>
        <button type="button" class="submit-confirm-receive">确定</button>
      </div>
    </div>
  </div>
</div>

<div class="foot">
    <nav class="bottom-nav">
        <a href="javascript:">关于名品汇</a>
        <a href="javascript:">隐私保护</a>
        <a href="<?php echo U('Help/index');?>">帮助中心</a>
        <a href="javascript:">加入我们</a>
    </nav>
    <p class="margin-top-10">copyright<a href="http://www.miitbeian.gov.cn" class="gray-font">备案号</a></p>
    <p class="margin-top-10"><a href="javascript:">公网安备</a></p>
</div>
<script>
    var goods_list_page = "<?php echo U('Goods/list');?>"
    var goods_detail_page = "<?php echo U('Goods/detail');?>"

    var _index_page = "<?php echo U('Index/index');?>"
    var _login_page = "<?php echo U('Member/login');?>"
    var _register_page = "<?php echo U('Member/register');?>"
</script>
<script src="/static/js/search.js?v=0.01"></script>

    <script>

        $(function () {
            $('.user-sidebar a').eq(0).css('color','#c5ad82');

            var uid = ykp.getLocalStorage("uid"); //获取用户id
            var orderDetail = "<?php echo U('User/orderDetail');?>";
            init(); //页面初始化

            function init() {
                if (!uid) {
                    ykp.showOk({
                        text: '您还没有登录请先登录!',
                        callback: function () {
                            location.href = "<?php echo U('Member/login');?>";
                        }
                    });
                    return;
                }
                getUserinfo(); //获取用户名及头像
                switchOrder(); //切换订单
                getAlloders(); //默认获取全部订单
                getEach(); //获取各个订单数量
                getPingj()//获取评价单数量
                getRecommend()//精品推荐

            }

            //获取用户名及头像
            function getUserinfo() {
                var headpic = ykp.getLocalStorage("photo");
                var uName = ykp.getLocalStorage("name");
                var uPhone = ykp.getLocalStorage("telephone");
                if (headpic) {
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
                    type: 0
                }
                getOderList(postData)
            }

            //获取各个订单数量
            function getEach() {
                var data = {
                    uid: uid,
                    type: 0
                }
                getTotal(data);
            }

            //订单切换
            function switchOrder() {
                $('#list-type>a').click(function () {
                    $('#list-type>a').removeClass('active');
                    $(this).addClass('active');
                    var index = $(this).index() || 0;
                    var postData = {
                        uid: uid,
                        type: index
                    }
                    getOderList(postData);
                });
            }

            //查询各个订单数量ajax函数
            function getTotal(data) {
                ykp.doAjax({
                    url: 'order/getUserOrders',
                    method: 'get',
                    data: data,
                    success: function (res) {
                        var data = res.data;
                        var allOder = [];
                        var wPay = [];
                        var wReceive = [];
                        var wEvaluate = [];
                        var wComplete = [];
                        for (i = 0; i < data.length; i++) {
                            if (data[i].state !== 4 && data[i].state !== 5) {
                                allOder.push(data[i].state);
                            }
                            if (data[i].state == 0) {
                                wPay.push(data[i].state);
                            }
                            if (data[i].state == 1) {
                                wReceive.push(data[i].state);
                            }
                            if (data[i].state == 2) {
                                wEvaluate.push(data[i].state);
                            }
                            if (data[i].state == 3) {
                                wComplete.push(data[i].state);
                            }
                        }
                        $('#allOders span').html(allOder.length);
                        $('#wait-pay span').html(wPay.length);
                        $('#wait-Receive span').html(wReceive.length);
                        $('#wait-evaluate span').html(wEvaluate.length);
                        $('#wait-complete span').html(wComplete.length);
                    }
                });
            }

            //查询评价订单数量
            function getPingj() {
                ykp.doAjax({
                    url: 'order/getUserOrders',
                    method: 'get',
                    data: {uid: uid,type: 3},
                    success: function (res) {
                        var data = res.data;
                        var allOder = [];
                        var wPay = [];
                        var wReceive = [];
                        var wEvaluate = [];
                        var wComplete = [];
                        for (i = 0; i < data.length; i++) {

                            if (data[i].state == 2) {
                                wEvaluate.push(data[i].state);
                            }
                        }
                        $('#wait-evaluate span').html(wEvaluate.length);
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

            var toComment = "<?php echo U('User/comment');?>";
            //去支付，删除订单，前往评价点击事件绑定函数
            function click_Older() {
                $('.clickActions').click(function () {
                    var status = $(this).attr('bt_status');
                    var orderid = $(this).attr('orderid');
                    var gsId = $(this).attr('gsid')
                    if (status == 0) {
                        location.href = "<?php echo U('Order/wxPay');?>";
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
                        location.href = toComment + '?orderId=' + orderid + '&gsId=' + gsId;
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

            //获取订单列表ajax函数
            function getOderList(postData) {
                ykp.list({
                    url: 'order/getUserOrders',
                    method: 'get',
                    data: postData,
                    loadList: function (res) {
                        var data = res.data;
                       var shop_details = "<?php echo U('Goods/detail');?>";
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
                            if (item.state !== 4 && item.state !== 5) {
                                var buttoms = [];
                                switch (item.state) {
                                    case 0:
                                        pay_status = '去支付'
                                        status = '待付款';
                                        bt_status = item.state;
                                        var span = '<a href="javascript:void(0)" rel="' + item.id + '" class="cancel_order user-order-actions">取消订单</a>';
                                        gsId = item.items[0].goodid;
                                        break;
                                    case 1:
                                        pay_status = '确认收货'
                                        status = '待收货';
                                        bt_status = item.state;
                                        gsId = item.items[0].goodid;
                                        break;
                                    case 2:
                                        pay_status = '前往评价'
                                        status = '待评价';
                                        bt_status = item.state;
                                        gsId = item.items[0].goodid;
                                        break;
                                    case 3:
                                        pay_status = '删除订单'
                                        status = '已完成';
                                        bt_status = item.state;
                                        gsId = item.items[0].goodid;
                                        break;
                                }

                                buttoms = [
                                    '<a href="javascript:void(0)" gsId="' + gsId + '" orderId="' + item.id + '" bt_status="' + bt_status + '" class="user-order-actions red clickActions">' + pay_status + '</a>',
                                    '<a href="' + orderDetail + '?orderId=' + item.id + '" class="user-order-actions">查看详情</a>',
                                ];
                                item.state == 0 ? buttoms.push(span) : '';
                                var goods = [];
                                var _goods = [];

                                for (var g = 0; g < item.items.length; g++) {
                                    var items = item.items[g]
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


            //精品推荐
            function getRecommend() {
                var postData = {
                        pageNo: 1,
                        pageSize: 4,
                    }
                    ;
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
                                '<a class="goods-ad" href="' + goods_detail_page + '?gid=' + item[i]['id'] + '&boutique=1&detail=' + escape(item[i]['name']) + '" style="background-image: url('+item[i].picture+')">',
                                '<div class="price-con">',
                                '<p class="title">' + item[i]['name'] + '</p>',
                                '<p class="price"> ￥' + item[i]['prevailingPrice'] + '</p>',
                                '</div>',
                                '</a>'
                            );
                        }
                        $('#recommend').append(html.join(''));
                    }
                });
            }


        });

    </script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>