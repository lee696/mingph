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
        
    <link href="/static/css/calendar.css" rel="stylesheet" type="text/css"/>
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

        <div class="user-main user-info">
            <div class="user-info-section user-data">
                <h3 class="title">个人资料</h3>
                <p class="desc">在这里填写您的个人资料，请详细填写下面每一个栏目<span class="red-font">(带*的为必填项)</span></p>
                <div class="main flex flex-start align-start">
                    <form class="user-data-form">
                        <div class="inline-form flex-start flex align-center">
                            <label>姓名：</label>
                            <input type="text" class="user-data-form-item profile-name" maxlength="20"/>
                        </div>
                        <div class="inline-form flex-start flex align-center">
                            <label>性别：</label>
                            <label class="radio">
                                <input type="radio" name="sexual" id="man" class="profile-sex" value="0" checked/>
                                <span class="nisen-radio"></span>
                                <span>男</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="sexual" id="woman" class="profile-sex" value="1"/>
                                <span class="nisen-radio"></span>
                                <span>女</span>
                            </label>
                        </div>
                        <div class="inline-form flex-start flex align-center">
                            <label>*手机号码：</label>
                            <div class="flex flex-start align-center">
                                <span class="user-data-phone"></span>
                                <span class="red-font">已验证</span>
                                <span class="line"></span>
                                <a href="javascript:void(0)" class="gold-font show-edit-phone-modal">修改</a>
                            </div>
                        </div>
                        <div class="inline-form flex-start flex align-center">
                            <label>生日：</label>
                            <div class="relative-box">
                                <input type="text" class="user-data-form-item profile-birthday" id="singleDateRange">
                            </div>
                        </div>
                        <button type="button" class="save-user-data">保存</button>
                    </form>
                    <div class="avatar-box">
                        <div class="avatar-wrapper">
                            <img src="/static/images/avatar.png"/>
                        </div>
                        <div class="avatar-operations clear">
                            <input type="file" id="avatarUploader"/>
                            <label for="avatarUploader" class="avatar-action">本地上传</label>
                            <a class="avatar-action">拍照上传</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-info-section user-size">
                <h4 class="title">个人尺码</h4>
                <p class="desc">在这里填写您的个人尺码信息，完善个人尺码信息可用于服装订制</p>
                <form class="user-size-form clear">
                    <div class="inline-form flex-start flex align-center">
                        <label>身高</label>
                        <input type="number" class="user-size-form-item height"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>臀围</label>
                        <input type="number" class="user-size-form-item hipline"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>肩宽</label>
                        <input type="number" class="user-size-form-item shoulder"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>横档</label>
                        <input type="number" class="user-size-form-item rung"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>衣长</label>
                        <input type="number" class="user-size-form-item clothesLength"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>立档</label>
                        <input type="number" class="user-size-form-item filing"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>袖长</label>
                        <input type="number" class="user-size-form-item sleeveLength"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>裤长</label>
                        <input type="number" class="user-size-form-item pantsLength"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>胸围</label>
                        <input type="number" class="user-size-form-item chest"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>脚宽</label>
                        <input type="number" class="user-size-form-item footBreadth"/>
                    </div>
                    <div class="inline-form flex-start flex align-center">
                        <label>腰围</label>
                        <input type="number" class="user-size-form-item waistline"/>
                    </div>
                </form>
                <button type="button" class="save-user-size">保存</button>
            </div>
        </div>
    </div>
    <div class="modal edit-phone-modal" id="editPhoneModal">
  <div class="main">
    <div class="header">
      <a href="javascript:void(0)" class="close-modal"></a>
    </div>
    <div class="content">
      <div class="inline-form flex flex-start align-center">
        <label>手机号：</label>
        <input type="tel"  id="editPhone" maxlength='11' required="true" validate="phone" msg="请正确填写手机号码" placeholder="请输入手机号"/>
      </div>
      <div class="inline-form flex flex-start align-center">
        <label>验证码：</label>
        <input type="text" maxlength='6' id="editPhoneCode" required="true" validate="/^[\d]+$/" msg="请正确填写验证码" placeholder="验证码" />
        <button type="button" id="sendCpCode" class="send-edit-phone-code">发送验证码</button>
      </div>
      <div class="operations clear">
        <button type="button" class="close-modal">取消</button>
        <button type="button" id="submit-bin-phone" class="submit-edit-phone">确定</button>
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

    <script src="/static/js/moment.min.js"></script>
    <script src="/static/js/jq-datepicker.js"></script>
    <script src="/static/js/userInfo.js"></script>
    <script>
        var orderDetail = "<?php echo U('User/orderDetail');?>";
    </script>
    <script src="/static/js/info.js"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>