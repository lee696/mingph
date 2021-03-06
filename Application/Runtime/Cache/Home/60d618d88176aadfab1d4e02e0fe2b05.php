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
    
    <link href="/static/css/pay.css" rel="stylesheet" type="text/css"/>

</head>
<body>
<nav class="navigator">
    <div class="sub-nav">
        <div id="logCheck-tit" class="main-width text-right">
        </div>
    </div>
    <div class="main-nav main-width margin-top">
        <div class="clear center-nav">
            <a style="float:left;display: inline-block" href="<?php echo U('Index/index');?>" class="logo"><img src="/static/images/logo.png" alt="名品汇" /></a>
            <form class="search-form flex flex-start align-center">
                <input type="text" id="searchKeywords" placeholder="输入商品名" />
                <button type="button" id="searchBtn"></button>
            </form>
            <a style="display: inline-block" href="<?php echo U('Order/cart');?>" class="cart-entrance ">
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

    <div class="wx-pay-title">
        <div class="main-width">
            <h3>支付确认</h3>
            <p>请在24小时内使用以下方式完成付款，如有疑问，欢迎您随时<a class="blue-font">联系我们</a></p>
        </div>
    </div>
    <div class="main-width">
        <div class="wx-qr-box clear">
            <h4>支付宝支付</h4>
            <div class="flex main justify-center align-center">
                <div class="flex order-info direction-col space-between align-start">
                    <p>
                        <span class="itemTit">收款方：</span>
                        <span class="itemCont">名品汇商城</span>
                    </p>
                    <p>
                        <span class="itemTit">订单编号：</span>
                        <span class="itemCont">1234567890</span>
                    </p>
                    <p>
                        <span class="itemTit">应付金额：</span>
                        <span class="red-font itemCont">￥600</span>
                    </p>
                </div>
                <div class="code-box flex direction-col justify-center align-center">
                    <div class="qr-code flex justify-center align-center" id="pay">
                        <!--<img src="/static/images/test/code.png" />-->
                    </div>
                    <p>使用支付宝【扫一扫】上方二维码进行支付</p>
                </div>
            </div>
            <a class="finish-wx-pay bold-font gold-font" href="<?php echo U('Order/paySuccess');?>">完成支付</a>
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
            ykp.doAjax({
                url:'order/aliPagePay',
                method:'get',
                data:{
                    "userId": 69,
                    "id": 554,
                    "type": 11
                },
                success:function(res){
                    console.log(res);
//                 $('#pay').append(res.data);
                }
            });

        })
    </script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>