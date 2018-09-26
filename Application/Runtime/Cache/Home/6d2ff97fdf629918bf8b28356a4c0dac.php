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
        
    <link href="/static/css/success.css" rel="stylesheet" type="text/css"/>

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

    <div class="main-width">
        <h3 class="success-hint">感谢您在本店购物，您的订单已提交成功!</h3>
        <div class="success-order-info">
            <h3 class="gold-font">订单信息</h3>
            <div class="wrapper">
                <p><span class="bold-font">订单编号：</span><span id="orderNo">没有数据</span></p>
                <p><span class="bold-font">应付金额：</span><span id="payMy" class="red-font">没有数据</span></p>
                <p id="seeDorder"><span class="bold-font">付款期限：
            </span><span id="lastTime">没有数据</span>
                    <span class="red-font">（请在24小时内完成支付，否则订单会自动取消）</span>
                </p>
                <!--  <table class="order-success-table">
                      <tr>
                          <th>商品信息</th>
                          <th>商品原价</th>
                          <th>商品现价</th>
                          <th>数量</th>
                          <th>小计</th>
                      </tr>
                      <?php $__FOR_START_31711__=1;$__FOR_END_31711__=4;for($i=$__FOR_START_31711__;$i < $__FOR_END_31711__;$i+=1){ ?><tr>
                              <td>
                                  <p class="text-overflow">摩伊拉女夏季新款一字扣带性感粗跟凉鞋韩版时尚露趾百搭高跟鞋</p>
                                  <p>尺寸:  36 尺寸:  36</p>
                                  <span>个人定制</span>
                              </td>
                              <td class="line-through">
                                  $10000
                              </td>
                              <td class="bold-font">
                                  10000
                              </td>
                              <td class="bold-font">
                                  1
                              </td>
                              <td class="red-font">
                                  1
                              </td>
                          </tr><?php } ?>
                  </table>-->
                <div class="pay-box order-section">
                    <h4>付款方式</h4>
                    <div class="online-pay">
                        <h5>支持以下方式支付</h5>
                        <div id="payTypebox" class="online-list clear">

                            <label class="pay-option-box" pay-way="21">
                                <i><img src="/static/images/wechatpay.png" alt=""></i>
                                <span class="">微信支付</span>
                                <input type="radio" name="pay-option" class="pay-option"/>

                            </label>

                            <label class="pay-option-box" pay-way="11">
                                <i><img src="/static/images/zfpay.png" alt=""></i>
                                <span class="">支付宝支付</span>
                                <input type="radio" name="pay-option" class="pay-option"/>

                            </label>

                            <label class="pay-option-box" pay-way="0">
                                <i style="top:9px;"><img src="/static/images/yepay.png" alt=""></i>
                                <span class="">余额支付</span>
                                <input type="radio" name="pay-option" class="pay-option"/>

                            </label>

                            <label class="pay-option-box" pay-way="31">
                                <i style="top:9px;"><img src="/static/images/ylpay.png" alt=""></i>
                                <span class="">银联卡</span>
                                <input type="radio" name="pay-option" class="pay-option"/>

                            </label>
                        </div>
                    </div>
                    <!-- <button class="confirm-pay-type">确认支付方式</button>-->
                </div>

                <div class="operation  clear">
                    <!--<div class="block">
                        <span class="bold-font">支付方式：</span>
                        <span class="red-font">【网银-中国工商银行】</span>
                    </div>-->
                    <div style="float: right" class="block">
                        <a id="immediatelyTopay" class="pay-page-entrance">
                            下一步，立即去支付
                        </a>
                        <!-- <a class="red-font">
                             【更换支付方式】
                         </a>-->
                    </div>
                </div>
                <div style="display:none;" class="tips">
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
        //控制器跳转
        var orderDetail = "<?php echo U('User/orderDetail');?>";
        var typeOfwxPay = "<?php echo U('Order/wxPay');?>";
        var typeOfqrPay = "<?php echo U('Order/qrPay');?>";
        var typeOfwalletPay = "<?php echo U('Order/walletPay');?>";
        var setPaypwd = "<?php echo U('User/payPwd');?>";
    </script>
    <script src="/static/js/payss.js?v=0.01"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>