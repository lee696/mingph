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

    <div class="login-main relative-box">
        <div class="login-main-box clear">
            <div class="login-form">
                <div class="form-box">
                    <form class="loginForm accForm hidden">
                        <h3>用户登录</h3>
                        <p class="warning hidden"></p>
                        <input type="text" name="phone" class="l-acc l-ele" id="accLoginPhone" maxlength='11' required="true" validate="phone" msg="请正确填写手机号码" placeholder="请输入手机号"/>
                        <input type="password" name="password" class="l-pwd l-ele" maxlength='18' id="accLoginPwd"  required="true" validate="password" msg="请正确输入密码" placeholder="请输入密码"/>
                        <div style="text-align: left; margin: 6px auto 0; width: 312px;">
                            <label class="checkbox r-set">
                                <input type="checkbox" class="l-remember" id="autoLogin" />
                                <span class="nisen-box"></span>
                                <span>保存登录信息</span>
                            </label>
                        </div>
                    </form>
                    <form class="loginForm msgForm">
                        <h3>手机短信登录</h3>
                        <p class="warning red-font hidden">请输入正确的手机号码</p>
                        <input type="number" name="phone" class="l-phone l-ele" id="msgLoginPhone" maxlength='11' required="true" validate="phone" msg="请正确填写手机号码" placeholder="请输入手机号" />
                        <div class="code-ico clear">
                            <input type="text" name="icode" class="l-g-code l-ele" maxlength='6'  id="msgLoginCaptcha" required="true" validate="/^\w{4}$/i" msg="请正确填写图片验证码" placeholder="请输入图片验证码" />
                            <div id="gCode"></div>
                        </div>
                        <div class="v-code clear">
                            <input type="text" name="vcode" maxlength='6' class="l-code l-ele" id="msgLoginPhoneCaptcha" required="true" validate="/^[\d]+$/" msg="请正确填写验证码" placeholder="请输入验证码" />
                            <button type="button" href="javascript:void(0);" class="l-get-code">获取验证码</button>
                        </div>
                    </form>
                </div>
                <button id="login_bt" type="button" class="login-btn">登录</button>
                <nav>
                    <div class="msg-log hidden"><a href="javascript:void(0)" id="msgForm" class="l-type ">使用手机短信登录</a></div>
                    <div class="acc-log "><a href="javascript:void(0)" id="accForm" class="l-type">使用账号密码登录</a></div>
                </nav>
                <div class="row clear">
                    <p>还不是会员？<a href="<?php echo U('Member/register');?>">免费注册</a></p>
                    <a href="<?php echo U('Member/findPwd');?>" class="forget-entrance">忘记密码？</a>
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
        var gCodeCheck = false
    </script>
    <script src="/static/js/gVerify.js"></script>
    <script src="/static/js/reg.js"></script>
    <script src="/static/js/user.js"></script>
    <script src="/static/js/login.js"></script>


<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>