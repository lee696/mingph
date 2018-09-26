<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="keywords" content="keywords">
        <meta name="description" content="description">
        <title>名品汇</title>
        <script type="text/javascript" src="/static/js/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="/static/js/ykp.js"></script>
        <script type="text/javascript" src="/static/js/jquery.qrcode.min.js"></script>
        <script type="text/javascript" src="/static/js/jquery.tmpl.min.js"></script>
        <script type="text/javascript" src="/static/js/tips.js"></script>
        <script type="text/javascript" src="/static/js/base.js"></script>
        <script type="text/javascript" src="/static/js/public.js"></script>
        <script type="text/javascript" src="/static/js/JQuery.md5.js"></script>
        <link rel="stylesheet" type="text/css" href="/static/css/global.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/global-fix.css" />
        
  <link href="/static/css/user.css" rel="stylesheet" type="text/css"/>

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

  <div class="main-width user-center clear">
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

    <div class="user-main user-recharge">
      <h3 class="title dark-font">个人中心 > <a href="<?php echo U('User/wallet');?>">我的钱包</a> > 帐户充值</h3>
      <h3 class="title dark-font">帐户充值</h3>
      <form class="user-recharge-form">
        <div class="inline-form clear">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;帐户余额：</span>
          <span id="yue" class="red-font user-wallet-fund">0</span>
          <span>元</span>
        </div>
        <div class="inline-form">
          <label>
            <span class="red-font">*</span>
            转入金额：
          </label>
          <input id="mmoney" type="text" maxlength='15' placeholder="输入金额只允许保留两位小数！"/>
          <!--<span style="font-size: 14px;color: red;float: left;margin-left: 156px;margin-top: 5px;">保留两位小数！</span>-->
        </div>
      </form>
      <a id="confirmCharge" class="to-recharge-pay">确认转入</a>
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
<div id="iewarningBox"></div>
<div id="iewarningCont">
    <div class="iewCont">
        <a href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx" class="upieb">
            <img  src="/static/images/upie.png"  alt="">
        </a>
        <a href="http://www.google.cn/intl/zh-CN/chrome/business/browser/" class="upchromeb">
            <img src="/static/images/upchrome.png" alt="">
        </a>
    </div>
</div>
<script>
    var goods_list_page = "<?php echo U('Goods/list');?>";
    var goods_detail_page = "<?php echo U('Goods/detail');?>";
    var goods_Integraldetail_page = "<?php echo U('Goods/integralGoodsDetail');?>";
    var _index_page = "<?php echo U('Index/index');?>";
    var _login_page = "<?php echo U('Member/login');?>";
    var _register_page = "<?php echo U('Member/register');?>";
    var _doOder ="<?php echo U('Order/doOrder');?>";
    var _join ="<?php echo U('User/join');?>";
</script>
<script src="/static/js/search.js?v=0.01"></script>
<script src="/static/js/iecheck.js?v=0.01"></script>

  <script>
      var srechargePay = "<?php echo U('User/rechargePay');?>";
  </script>
  <script src="/static/js/recharge.js?v=0.01"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>