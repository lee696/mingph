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

    <div class="main-width forget-box">
        <div class="header">
            <h4>忘记密码</h4>
            <div class="back-bt"><a href="<?php echo U('Member/login');?>">返回登录</a></div>
        </div>
        <form class="forget-form">
            <div class="row lex telephone">
                <span class="item_tit">手机号码：</span>
                <input type="number" class="f-phone f-ele" placeholder="请输入手机号" msg="请输入正确的手机号码"/>
                <span class="warning red-font hidden"><i></i>账号未注册</span>
            </div>
            <div class="row picVcode">
                <span class="item_tit">图片验证码：</span>
                <input type="text" class="f-g-code f-ele" placeholder="请输入图片验证码" msg="请输入正确图片验证码"/>
                <div id="gCode"></div>
                <span class="warning red-font hidden"><i></i>请输入验证码</span>
            </div>
            <div class="row messageVcode">
                <span class="item_tit">短信验证码：</span>
                    <input type="text" class="f-code f-ele" maxLength="6" id="phoneVcode" msg="请正确填写验证码" placeholder="请输入手机验证码" />
                    <a href="javascript:void(0)" class="l-get-code" style="text-decoration:underline">获取验证码</a>
                <span class="warning red-font hidden"><i></i>请输入验证码</span>
            </div>
            <div class="row password">
                <span class="item_tit">新密码：</span>
                <input type="password" class="f-pw f-ele" maxLength="18" msg="密码长度最少为8位,最多18位" placeholder="请输入密码" />
                <span class="warning red-font hidden"><i></i>请输入密码</span>
            </div>
            <div class="row surePassword">
                <span class="item_tit">确认密码：</span>
                <input type="password" class="f-pwr f-ele" maxLength="18" msg="输入密码不一致" placeholder="请确认密码"/>
                <span class="warning red-font hidden"><i></i>请确认密码</span>
            </div>
            <button type="button" class="pwd-reset-btn">确认修改</button>
        </form>
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
        var goods_detail_page = "<?php echo U('Goods/detail');?>"
    </script>
    <script src="/static/js/banner.js?v=0.01"></script>
    <script src="/static/js/gVerify.js"></script>
    <script src="/static/js/findPwd.js"></script>


<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>