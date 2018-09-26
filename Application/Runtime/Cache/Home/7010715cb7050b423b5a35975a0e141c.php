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

    <div class="r-sidebar">
    <div class="r-sidebarBox">
        <div class="inBox">
            <a href="/Index/index.html">
                <div class="home_page">首页</div>
            </a>
            <a href="/User/orderList.html">
                <div class="j-order"></div>
            </a>
            <a href="/Order/cart.html">
                <div class="j-cart"></div>
            </a>
            <a href="/User/message.html">
                <div class="msg"></div>
            </a>
            <a id="sCustmerclick">
                <div class="serve"></div>
            </a>
            <a>
                <div id="mTop_bt" class="move_top"></div>
            </a>
        </div>
    </div>
</div>

    <script>
        //咨询客服
        getcustomerService()
        function getcustomerService() {
            $('#sCustmerclick').click(function () {
                var newTab=window.open('about:blank');
                //获取客服QQ号
                ykp.doAjax({
                    url: 'default/getCustomerService',
                    method: 'get',
                    data: {},
                    success: function (res) {
                        var qqnum = res.data;
                        newTab.location.href='http://wpa.qq.com/msgrd?V=1&uin='+ qqnum +'&Site=pageadmin&Menu=yes';
                    }
                });
            })

        }
    </script>

    <div class="main-width my_store clear">
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

        <div class="store_cont">


            <div class="store_info hidden">

                <p id="store_type"></p>
                <p id="nameInfor"></p>
                <div class="shangj clear">
                    <i><img id="confrm_ico" src=""/></i>
                    <sapn id="confrm_user"></sapn>
                    <i><img id="jLevel_ico" src=""/></i>
                    <sapn id="jLevel"></sapn>
                </div>
                <div class="store_qr">
                </div>
                <div class="share_bt">分享我的店铺</div>
            </div>

            <div class="record clear hidden">
                <div id="record-cobox">

                </div>

                <div class="page_change">
                    <div class="previous_page">上一页</div>
                    <div class="next_page">下一页</div>
                </div>

            </div>
        </div>

        <div class="store-sharing hidden">
            <div class="sharing-box">
                <div class="close—ico clear">
                    <i></i>
                </div>
                <p>分享到</p>
                <div class="sharing-bt clear">
                    <div id="wechat_sharing"><a href="" target="_blank"><img src="/static/images/share-wx.png"/></a></div>
                    <div id="qq_sharing"><a href="" target="_blank"><img src="/static/images/share-qq.png"/></a></div>
                    <div id="sina_sharing"><a href="" target="_blank"><img src="/static/images/share-wb.png"/></a></div>
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

    <script src="/static/js/distpicker.min.js"></script>
    <script>
        var hasRz='/static/images/pay-success.png';
        var noRz='/static/images/state-3.png';
        var shasRz='/static/images/state-1.png';
        var snoRz='/static/images/state-3.png';
        var grUser ='/static/images/state-4.png';
        var ptJoin ='/static/images/state-4.png';
        var gjJoin ='/static/images/state-2.png';
    </script>
    <script src="/static/js/store.js"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>