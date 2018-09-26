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
            <a style="float:left;display: inline-block" href="<?php echo U('Index/index');?>" class="logo"><img style="width: 238px" src="/static/images/newlogo.png" alt="名品汇" /></a>
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
   isShop = ykp.getLocalStorage("isShop");

   isShop == 1 ? $('#my_store_share').show() : $('#my_store_share').hide();
   var stor="<?php echo U('User/store');?>";
   var hrefm= ''+ stor +'?uid='+ userid +'';
   $('#my_store_share').attr('href',hrefm);
  </script>

        <div class="user-main user-pwd">
            <h3 id="pwdtit" class="title dark-font"></h3>
            <form class="user-pwd-form">
                <div id="phone-box" class="inline-form flex flex-start align-center">
                    <label>手机号</label>
                    <input type="number" name="phone" class="user-pwd-form-item" readonly="readonly" id="userPhone" maxlength='11' required="true" validate="phone" msg="请正确填写手机号码" placeholder="请输入手机号" />
                    <span class="phone-warn warning"><div class="form-check hidden"></div></span>
                </div>
                <div id="vCode-box" class="inline-form flex flex-start align-center getVcode_box ">
                    <label>验证码</label>
                    <input type="text" class="l-code l-ele" maxlength='6' id="phoneVcode"  name="vCode" required="true" validate="/^[\d]+$/" msg="请正确填写验证码" placeholder="请输入验证码"  />
                    <button type="button" class="getVcode">获取验证码</button>
                    <span class="vcode-warn warning"><div class="form-check hidden"></div></span>
                </div>
                <div id="oldPwd-box" class="inline-form flex flex-start align-center">
                    <label>原密码</label>
                    <input type="password" class="user-pwd-form-item" maxlength='6' id="old-pwd" name="oldpassword"  required="true" validate="password" msg="请正确入位密码" placeholder="请输入密码" />
                    <span class="old-pwd-warn warning"><div class="form-check hidden"></div></span>
                </div>
                <div class="inline-form flex flex-start align-center">
                    <label>新密码</label>
                    <input type="password" class="user-pwd-form-item" maxlength='6' id="pwd-inp1" name="password"  required="true" validate="password" msg="请正确入位密码" placeholder="请输入密码" />
                    <span class="password-warn warning"><div class="form-check hidden"></div></span>
                </div>
                <div class="inline-form flex flex-start align-center">
                    <label>确认密码</label>
                    <input type="password" class="user-pwd-form-item" maxlength='6' id="pwd-inp2" name="password2"  required="true" validate="password" msg="请正确入位密码" placeholder="确认密码" />
                    <span class="password-warn2 warning"><div class="form-check ok hidden"></div></span>
                </div>
            </form>
            <button id="subMod" type="button" style="cursor: pointer" class="submit-pwd" >确定</button>
        </div>
    </div>
    <div class="modal pwd-check-modal" id="pwdCheckModal">
  <div class="main">
    <div class="header">
      <a href="javascript:void(0)" class="close-modal"></a>
    </div>
    <div class="content">
      <i class="false"></i>
      <h2>新密码和确认新密码不一致</h2>
      <div class="operations clear">
        <button type="button" class="close-modal">重试</button>
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
    <p class="margin-top-10">备案号：<a href="http://www.miitbeian.gov.cn" class="gray-font">粤ICP备17108187号-2</a></p>
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
        var uPaypwd="<?php echo U('User/payPwd');?>";
    </script>
    <script src="/static/js/payPwd.js?v=0.01"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>