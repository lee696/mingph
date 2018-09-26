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
    <link href="/static/css/user-order.css" rel="stylesheet" type="text/css"/>

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

        <div class="user-main user-comment clear">
            <div id="com_goods" class="comment-goods">

            </div>
            <div class="comment-forms">
                <ul class="level clear">
                    <li class="flex-start ">
                        <span class="red-font">*</span>商品评价
                        <span id="evaluate_goods" class="level-bar">
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                        </span>
                    </li>
                    <li class="flex-start">
                        <span class="red-font">*</span>物流评价
                        <span id="evaluate_logistics" class="level-bar">
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                        </span>
                    </li>
                    <li class="flex-start">
                        <span class="red-font">*</span>描述相符
                        <span id="evaluate_descriptions" class="level-bar">
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                            <i class="icon-level"></i>
                        </span>
                    </li>
                </ul>
                <div class="comment-text">
                    <label for="commentText">请输入商品评论</label>
                    <div class="text-wrapper">
                        <textarea id="commentText" onkeyup="changeStatu()" maxlength="350"
                                  placeholder="商品是否满意？快分享你的心得吧～"></textarea>
                        <p>还可输入<span class="counter" id="spanNum">350</span>字</p>
                    </div>
                </div>
                <div id="upimgBox" class="comment-images flex-start flex align-center">
                    <input type="file" id="fileUpload"/>
                    <label for="fileUpload" id="addpicBt" class="triggerFileInput"></label>
                    <div id="imgInputbox"></div>
                    <p id="addimgnoInf">共<span class="red-font" id="upingNo">0</span>张还能上传<span class="red-font"
                                                                                                id="leftNo">5</span>张图片
                    </p>

                </div>
                <button type="button" class="submit-comment">提交</button>
                <p class="hint">评论说明:<br/>
                    1、只能对在半年内购买的商品进行评价；<br/>
                    2、同一订单的相同商品，只有一次评价获得积分；<br/>
                    3、根据评论的质量和对广大网友的参考价值，赠送积分会有所不同；<br/>
                    4、欢迎您发表有价值的评论，拷贝他人内容、内容重复、过多标点符号等情况不赠送积分。</p>
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
        var sorderList="<?php echo U('User/orderList');?>";
    </script>
    <script src="/static/js/comment.js?v=0.01"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>