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
        
  <link href="/static/css/modal.css" rel="stylesheet" type="text/css"/>
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

    <div class="user-main user-rechargePay">
      <h3 class="title dark-font">个人中心 > 我的钱包 > 帐户充值 > 支付充值额</h3>
     <!-- <div class="recharge-create-success">
        <h3 class="red-font">订单提交成功！</h3>
        <p>请在<span class="countdown">00:29:59</span>小时内支付完成，否则订单会被自动取消。</p>
      </div>-->
     <!-- <h3 class="title dark-font">银行卡支付</h3>
      <div class="bank-select-sets flex flex-start align-center">
        <i class="check"></i>
        <label for="bankList">银行卡</label>
        <select id="bankList">
          <option>中国工商银行  储蓄卡 | 尾号****1758</option>
        </select>
        <a href="<?php echo U('User/bank');?>" class="bank-entrance">添加银行卡</a>
      </div>-->
      <h2 class="pay-info">支付<span id="dismoney" class="red-font"></span></h2>
      <div class="pay-box order-section">
        <h4>付款方式</h4>
        <div class="online-pay">
          <h5>支持以下方式支付</h5>
          <div id="payTypebox" class="online-list clear">

            <label class="pay-option-box" pay-way="21">
              <i><img src="/static/images/wechatpay.png" alt=""></i>
              <span class="">微信支付</span>
              <input type="radio" name="pay-option" class="pay-option">

            </label>

            <label class="pay-option-box" pay-way="11">
              <i><img src="/static/images/zfpay.png" alt=""></i>
              <span class="">支付宝支付</span>
              <input type="radio" name="pay-option" class="pay-option">

            </label>
            <label class="pay-option-box" pay-way="31">
              <i style="top:9px;"><img src="/static/images/ylpay.png" alt=""></i>
              <span class="">银联卡</span>
              <input type="radio" name="pay-option" class="pay-option">

            </label>
          </div>
        </div>
        <!-- <button class="confirm-pay-type">确认支付方式</button>-->
      </div>
     <!-- <p>请输入6位支付密码</p>
      <div class="inline-form password-set flex flex-start align-center">
        <input type="password" maxlength="1" />
        <input type="password" maxlength="1" />
        <input type="password" maxlength="1" />
        <input type="password" maxlength="1" />
        <input type="password" maxlength="1" />
        <input type="password" maxlength="1" />
        <span class="red-font">支付密码错误</span>
      </div>
      <a href="<?php echo U('User/payPwd');?>" class="gold-font pay-pwd-entrance">忘记支付密码？</a>-->
      <div class="operations">
        <button type="button" id="pay-sub" style="cursor:pointer;" class="pay-recharge">立即支付</button>
       <!-- <span class="red-font">银行卡余额不足，请更换其他银行卡</span>-->
      </div>
    </div>
  </div>
  <div class="modal pay-success-modal" id="paySuccessModal">
  <div class="main">
    <div class="header">
      <a href="javascript:void(0)" class="close-modal"></a>
    </div>
    <div class="content">
      <i class="false"></i>
      <h4 class="gold-font">支付完成</h4>
    </div>
  </div>
</div>
  <div style="display:none;" class="tips">
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
      var typeOfwxPay = "<?php echo U('Order/wxChargePay');?>";
  </script>
  <script src="/static/js/rechargePay.js?v=0.01"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>