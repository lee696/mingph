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
        
    <link href="/static/css/goods.css" rel="stylesheet" type="text/css"/>

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

    <!--<?php $type = I('type');$gid = I('gid'); ?>-->
<nav class="breadCrumb">
    <div id="page-nav-tit" class="main-width">
        <a href="<?php echo U('Index/index');?>">首页</a>
        <span>></span>
        <!--<?php if($type == '1'): ?>-->
        <!--<span>服饰商城</span>-->
        <!--<span>></span>-->
        <!--<span>男人帮</span>-->
        <!--<?php elseif($type == '2'): ?>-->
        <!--<span>服饰商城</span>-->
        <!--<span>></span>-->
        <!--<span>女人帮</span>-->
        <!--<?php else: ?>-->
        <!--<span>百宝箱</span>-->
        <!--<?php endif; ?>
        <span>女人帮</span>-->
        <!-- <?php if($gid != ''): ?><span>></span>
                <span class="goods-name"></span><?php endif; ?>-->
    </div>
</nav>
    <div class="main-width">
        <div class="clear goods-detail">
            <div class="goods-images">
                <div id="fullImage">
                    <span class="jqzoom">
                    </span>
                </div>
                <div class="display-box clear">
                    <a id="prev_bt" class="display-op prev disabled" href="javascript:void(0)"></a>
                    <div id="lunbo-box" class="flow-box relative-box">
                        <div id="goodsThumbImages" class="flex">
                        </div>
                    </div>
                    <a id="nex_bt" class="display-op next" href="javascript:void(0)"></a>
                </div>
            </div>
            <div class="goods-param">
                <div class="goods-specs">
                    <div class="title clear">
                        <h1 class="dark-font goods-name"></h1>
                        <p class="gray-font goods-code clear"><span id="custmerclick"><a><i></i>咨询客服</a></span></p>
                    </div>
                    <div class="goods-price"></div>
                    <div  style="margin-top: 30px;" class="goods-params"></div>
                    <div class="goods-self-set">
                        <label class="checkbox-2">
                            <input type="checkbox" class="private"/>
                            <span class="nisen-box-2"></span>
                            <span>使用的我的个人尺码订制</span>
                        </label>
                        <a class="gold-font" href="<?php echo U('User/info');?>">修改个人尺码定制</a>
                    </div>
                </div>
                <div class="amount flex">
                    <span class="gray-font">数量：</span>
                    <div class="amount-group flex">
                        <a class="amount-op minus" href="javascript:void(0)">-</a>
                        <input type="number" class="amount-num" value="1"/>
                        <a class="amount-op plus" href="javascript:void(0)">+</a>
                    </div>
                </div>
                <div class="goods-op flex">
                    <button type="button" class="add-to-cart goods-action">加入购物车</button>
                    <button type="button" class="to-purchase goods-action dark-font">立即购买</button>
                    <button type="button" id="scollection" class="add-collection goods-action dark-font"><i></i>收藏备选</button>
                </div>
            </div>
        </div>
        <div class="goods-detail-extra clear">
            <div class="recommend-goods goods-ad-list"></div>
            <div class="goods-doc">
                <ul id="goods_doc_Box" class="goods-doc-filter clear">
                    <li class="act">商品详情</li>
                    <li>规格参数</li>
                    <li>用户评价<span class="commentNum"></span></li>
                </ul>
                <div id="goods_doc_cont">
                    <div id="goods_detail_inf" class="goods-doc-content"></div>
                    <div id="goods_inf" class="goods-doc-content hidden"></div>
                    <div id="goods_comment_inf" class="goods-doc-content hidden">
                        <div class="commentBox"></div>
                        <div class="paging clear">
                            <div id="pageBar" class="pagination">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="big_pic" class="hidden" style="position:fixed;top: 0;left: 0;width:100%;height:100%;z-index:999;background:rgba(0, 0, 0, .5) " >
            <div style="margin: 10% auto;width: 60%;"><img style="width: inherit" src="" alt=""></div>
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
        var defaultImg='/static/images/no_picture.jpg';
    </script>
    <script src="/static/js/goods.js?v=0.01"></script>
    <script src="/static/js/goods_detail.js?v=0.01"></script>
   <script src="/static/js/slide/jquery.jqzoom.js"></script>
   <script src="/static/js/slide/lanrenzhijia.js"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>