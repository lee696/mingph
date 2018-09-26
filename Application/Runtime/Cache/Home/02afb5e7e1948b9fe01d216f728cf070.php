<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="keywords" content="keywords">
        <meta name="description" content="description">
        <title>名品汇</title>
    <script type="text/javascript" src="/static/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="/static/js/jquery.qrcode.min.js"></script>
    <script type="text/javascript" src="/static/js/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="/static/js/tips.js"></script>
    <script type="text/javascript" src="/static/js/public.js"></script>
    <script type="text/javascript" src="/static/js/base.js"></script>
    <script type="text/javascript" src="/static/js/ykp.js"></script>
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
        <div class="flex center-nav space-between align-center">
            <a href="<?php echo U('Index/index');?>" class="logo"><img src="/static/images/logo.png" alt="名品汇" /></a>
            <form class="search-form flex flex-start align-center">
                <input type="text" id="searchKeywords" placeholder="输入商品名" />
                <button type="button" id="searchBtn"></button>
            </form>
            <a href="<?php echo U('Order/cart');?>" class="flex cart-entrance justify-center align-center">
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

        <div class="user-main user-bank-editor">
            <h3 class="title dark-font">个人中心 > <a href="<?php echo U('User/wallet');?>">我的钱包</a> > <a href="<?php echo U('User/bank');?>">我的银行卡</a>
                > 添加银行卡</h3>
            <h3 class="title dark-font">请填写以下信息以添加银行卡</h3>
            <form class="bank-editor-form">
                <div class="inline-form flex flex-start align-center">
                    <label>真实姓名</label>
                    <input type="text" class="band-editor-form-item" id="userName" maxlength='20' required="true"
                           validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确填写持卡人真实姓名" placeholder="请输入持卡人真实姓名"/>
                    <i class="check userName-warn hidden"></i>
                </div>
                <div class="inline-form flex flex-start align-center">
                    <label>身份证号</label>
                    <input type="text" class="band-editor-form-item" id="addidcard" maxlength='18' required="true"
                           validate="idcard" msg="请正确填写身份证号" placeholder="请输入开卡人身份证号"/>
                    <i class="check addidcard-warn hidden"></i>
                </div>
                <div class="inline-form cardNo_box flex flex-start align-center">
                    <label>银行卡卡号</label>
                    <input type="tel" class="band-editor-form-item card-num" id="addCardNo" maxlength='19'
                           required="true" validate="/^(\d{16}|\d{19})$/" msg="请正确填银行卡号码"
                           placeholder="输入卡号后会智能识别银行和卡种"/>
                    <i class="check addCardNo-warn hidden"></i>
                    <p class="card_name hidden"></p>
                </div>
                <div class="inline-form flex flex-start align-center">
                    <label>手机号码</label>
                    <input type="tel" class="band-editor-form-item" id="addPhone" maxlength='11' required="true"
                           validate="phone" msg="请正确填写手机号码" placeholder="请填写您在银行预留的手机号码"/>
                    <i class="check addPhone-warn hidden"></i>
                </div>
            </form>
            <button type="button" class="submit-bank-card">提交</button>
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
<script>
    var goods_list_page = "<?php echo U('Goods/list');?>"
    var goods_detail_page = "<?php echo U('Goods/detail');?>"

    var _index_page = "<?php echo U('Index/index');?>"
    var _login_page = "<?php echo U('Member/login');?>"
    var _register_page = "<?php echo U('Member/register');?>"
</script>
<script src="/static/js/search.js?v=0.01"></script>

    <script>
        $(function () {
            $('#addCardNo').blur(function () {
                console.log(111);
                var addCardNo = $('#addCardNo').val();
                if (!addCardNo || addCardNo.match(/^(\d{16}|\d{19})$/) == null) {
                    $(this).addClass('border_red')
                    $('.addCardNo-warn').show().fadeOut('fast').fadeIn();

                    return;
                }
                $(this).removeClass('border_red')
                GetCardinf(addCardNo)
            })

            //提交新增银行卡
            $('.submit-bank-card').click(function () {
                var data = ykp.getFormData('.bank-editor-form', false);
                var userName = $('#userName').val();
                var addidcard = $('#addidcard').val();
                var addCardNo = $('#addCardNo').val();
                var addPhone = $('#addPhone').val();
                if (!userName || userName.match(/[\u2E80-\u9FFF\w ]+$/i) == null) {
                    $('.userName-warn').show().fadeOut('fast').fadeIn();
                    return;
                }
                if (!addidcard || addidcard.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/) == null) {
                    $('.userName-warn').hide();
                    $('.addidcard-warn').show().fadeOut('fast').fadeIn();
                    return;
                }
                if (!addCardNo || addCardNo.match(/^(\d{16}|\d{19})$/) == null) {
                    $('.userName-warn').hide();
                    $('.addidcard-warn').hide();
                    $('.addCardNo-warn').show().fadeOut('fast').fadeIn();
                    return;
                }
                if (!addPhone || addPhone.match(/(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) == null) {
                    $('.userName-warn').hide();
                    $('.addidcard-warn').hide();
                    $('.addCardNo-warn').hide();
                    $('.addPhone-warn').show().fadeOut('fast').fadeIn();
                    return;
                }
                $('.check').hide();
                var uid = ykp.getLocalStorage("id");
                var postData = {
                    userId: uid,
                    cardid: data.addCardNo,
                    idCard: data.addidcard,
                    cardholder: data.userName,
                    telephone: data.addPhone
                }
                addCard(postData);
            })

            //获取银卡所属银行ajax函数
            function GetCardinf(cardNo) {
                ykp.doAjax({
                    url: 'card/getCardName',
                    method: 'get',
                    data: {cardid: cardNo},
                    success: function (res) {
                        $('.bank-editor-form .cardNo_box .card_name').show().html(res.data);
                    }
                });
            }

            //添加银行卡ajax函数
            function addCard(postData) {
                ykp.doAjax({
                    url: 'card/openCardBack',
                    method: 'post',
                    data: postData,
                    success: function (res) {
                        ykp.showOk({text: res.msg});
                        location.href = document.referrer;
                    }
                });
            }
        })

    </script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>