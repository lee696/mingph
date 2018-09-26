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
        
    <link href="/static/css/address.css" rel="stylesheet" type="text/css"/>
    <link href="/static/css/order.css" rel="stylesheet" type="text/css"/>
    <style>
        .foot{margin-top: 0;}
    </style>

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

    <div class="order-page">
        <div class="main-width ">
            <div class="address-box order-section">
                <h4>收货人信息</h4>
                <div id="addressList" class="clear"></div>
                <a href="javascript:void(0)" class="show-address-editor gold-font">使用新的收货地址</a>
                <form class="address-form" style="display: none">
    <div class="inline-form flex flex-start align-center">
      <!-- <i class="form-check"></i> -->
      <label>省：</label>
      <span class="red-font">*</span>
      <div id="addressPicker" data-toggle="distpicker">
        <select id="provincePicker" data-province="请选择省" class="address-form-item" required="true" validate="/[\u2E80-\u9FFF\w ]+$/i"
                msg="请正确输入省份信息" ></select>
        <span>市：</span>
        <select id="cityPicker" data-city="请选择省" class="address-form-item" required="true" validate="/[\u2E80-\u9FFF\w ]+$/i"
                msg="请正确输入城市信息"></select>
        <span>县：</span>
        <select id="regionPicker" data-district="请选择区" class="address-form-item" required="true" validate="/[\u2E80-\u9FFF\w ]+$/i"
                msg="请正确输入区信息"></select>
      </div>
    </div>
    <div class="inline-form flex flex-start align-center">
        <!-- <i class="form-check failed"></i> -->
        <label>邮政编码：</label>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="tel" id="areaCode"  maxlength='6'>
        <span>（选填）</span>
    </div>
  <div class="inline-form flex flex-start align-center">
    <!-- <i class="form-check"></i> -->
    <label>街道地址：</label>
    <span class="red-font">*</span>
    <textarea id="fullAddress" style="text-align: left" required="true" validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入详细地址信息"></textarea>
  </div>
  <div class="inline-form flex flex-start align-center">
    <!-- <i class="form-check"></i> -->
    <label>收货人姓名：</label>
    <span class="red-font">*</span>
    <input type="text" id="receiver" maxlength='20'
           validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入收货人姓名" placeholder="请输入收货人姓名">
  </div>
  <div class="inline-form flex flex-start align-center">
    <!-- <i class="form-check"></i> -->
    <label>手机号码：</label>
    <span class="red-font">*</span>
    <input type="tel" id="phone" maxlength='11' required="true" validate="phone"
           msg="请正确填写手机号码" placeholder="请输入手机号">
  </div>
  <!--<div class="inline-form flex flex-start align-center">-->
    <!--<i class="form-check"></i>-->
    <!--<label>电话号码：</label>-->
    <!--<span class="red-font">*</span>-->
    <!--<input type="tel" id="telAreaCode">-->
    <!--<span>-</span>-->
    <!--<input type="tel" id="tel">-->
    <!--<span>-</span>-->
    <!--<input type="tel" id="telSubNo">-->
  <!--</div>-->
  <button type="button" style="cursor: pointer" id="saveAddress">确认地址</button>
</form>
            </div>
            <!-- <div class="pay-box order-section">
                <h4>付款方式</h4>
                <div class="online-pay">
                    <h5>支持以下方式支付</h5>
                    <div class="online-list clear">
                   
                        <label class="pay-option-box" pay-way="2">
                            <i><img src="/static/images/wechatpay.png" alt=""></i>
                            <span class="">微信支付</span>
                            <input type="radio" name="pay-option" class="pay-option"/>

                        </label>

                        <label class="pay-option-box" pay-way="1">
                            <i><img src="/static/images/zfpay.png" alt=""></i>
                            <span class="">支付宝支付</span>
                            <input type="radio" name="pay-option" class="pay-option"/>

                        </label>

                        <label class="pay-option-box" pay-way="0">
                            <i style="top:9px;"><img src="/static/images/yepay.png" alt=""></i>
                            <span class="">余额支付</span>
                            <input type="radio" name="pay-option" class="pay-option"/>

                        </label>

                        <label class="pay-option-box" pay-way="3">
                            <i style="top:9px;"><img src="/static/images/ylpay.png" alt=""></i>
                            <span class="">银联卡</span>
                            <input type="radio" name="pay-option" class="pay-option"/>

                        </label>
                    </div>
                </div>
               
                <button class="confirm-pay-type">确认支付方式</button>
            </div> -->
            <div class="buy-box order-section">
                <h4>商品清单 <a href="<?php echo U('Order/cart');?>" class="gold-font" id="backToShoppingCart">返回购物车修改</a></h4>
                <table class="buy-box-table">
                    <thead>
                    <tr>
                        <td>商品信息</td>
                        <td>商品原价</td>
                        <td>商品现价</td>
                        <td>数量</td>
                        <td>小计</td>
                    </tr>
                    </thead>
                  
                    <tbody id="buyList">
                    <!-- <?php $__FOR_START_26534__=1;$__FOR_END_26534__=5;for($i=$__FOR_START_26534__;$i < $__FOR_END_26534__;$i+=1){ ?><tr class="buylist-items">
                            <td>
                                <a href="#" class="img-wrapper">
                                    <img src="/static/images/test/1_22.png" />
                                </a>
                                <div class="buy-list-info">
                                    <h5 class="buy-goods-name text-overflow">摩伊拉女夏季新款一字扣带性感粗跟凉鞋韩版时尚露趾百搭高跟鞋</h5>
                                    <p class="buy-goods-params">颜色:  粉红色; 颜色:  粉红色</p>
                                    <span class="red-font">个人定制</span>
                                </div>
                            </td>
                            <td class="line-through">
                                ￥184.00
                            </td>
                            <td class="bold-font">
                                ￥184.00
                            </td>
                            <td>
                                1
                            </td>
                            <td class="red-font bold-font"> ￥184.00</td>
                        </tr><?php } ?>-->
                    </tbody>
                </table>
            </div>
            <div class="order-section order-discount">
                <h4>折扣信息</h4>
                <label class="checkbox">
                    <input type="checkbox" class="useCoupon"/>
                    <span class="nisen-box"></span>
                    <span>使用优惠券</span>
                </label>
                <div id="useCoupon">
                    <label class="gray-font">账号优惠券：
                        <select id="coupons">
                            <option value="">请选择优惠券</option>
                        </select>
                    </label>
                    <button id="doUseCoupon">使用</button>
                    <table class="coupons-table">
                        <tr>
                            <th>优惠券号码</th>
                            <th>优惠券名称</th>
                            <th>是否适用本订单</th>
                            <th>删除</th>
                        </tr>
                    </table>
                </div>
                <label>
                    <input type="checkbox" class="usePoint"/>
                    <span class="nisen-box"></span>
                    <span>使用积分抵扣</span>
                </label>
                <label class="user-message clear">
                    <span>卖家留言：</span>
                    <textarea id="userMessage" style="text-align:left"></textarea>
                </label>
            </div>
            <div class="order-section submit-box clear">
                <div class="discounted-box">
                    <h2 class="bold-font gold-font sales-promotion">已享受的促销优惠：</h2>
                    <p class="discount-write-in gold-font"></p>
                </div>
                <div class="count-info">
                    <p>商品总金额：￥<span class="pri"></span></p>
                    <p style="padding-left:16px;">商品运费：￥<span class="fre">0</span></p>
                    <p>优惠券减免：-￥<span class="cdis">0</span></p>
                    <p>积分抵扣额：-￥<span class="itg">0</span></p>
                    <p class="red-font">应付金额：￥<span id="oderAmount" class="pay"></span></p>
                </div>
            </div>
            <div class="order-section clear">
                <button class="button" style="cursor: pointer;" id="submitOrder">立即提交</button>
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
        var success_page = "<?php echo U('Order/success');?>"
    </script>
    <script src="/static/js/distpicker.min.js"></script>
    <script src="/static/js/address.js"></script>
    <script src="/static/js/order.js"></script>
    <script src="/static/js/doOrder.js"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>