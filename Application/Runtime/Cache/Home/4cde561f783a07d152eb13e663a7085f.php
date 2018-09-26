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

    <div class="main-width join_submit">
        <h4>提交认证资料</h4>
        <form id="subForm" action="">
            <ul>
                <li><span class="merchant">商家名称</span><input type="text" required="true" name="merchantName" maxlength='40' validate="/[\u2E80-\u9FFF\w ]+$/i"
                                                             msg="请正确填写你的商店名称" placeholder="请填写你的商店名称">
                </li>
                <li>
                    <div class="l_side">
                        <span>业主名称</span><input type="text" name="name" required="true" maxlength='20'
                                                validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入真实姓名"
                                                placeholder="请填写你的真实姓名">
                    </div>
                    <div class="r_side">
                        <span>营业执照注册号</span><input type="text" name="businessLicenseNum" maxlength='18'
                                                    msg="请正确输入营业执照注册号" placeholder="请填写你的营业执照注册号">
                    </div>
                </li>

                <li>
                    <div class="l_side">
                        <span>从事行业</span><input type="text" name="cause" maxlength='10' required="true"
                                                validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入你的所在行业"
                                                placeholder="请填写你的所在行业">
                    </div>
                    <div class="r_side">
                        <span>年利润</span><input type="text" name="yearProfit" maxlength='10' required="true"
                                               validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入你公司的年利润额"
                                               placeholder="请填写你公司的年利润额">
                    </div>
                </li>

                <li>
                    <div class="l_side">
                        <span>证件号码</span><input type="text" name="idCard" maxlength='18' required="true"
                                                validate="idcard" msg="请正确输入18位第二代身份证号码" placeholder="请填写18位第二代身份证号码">
                    </div>
                    <div class="r_side">
                        <span>年收入</span><input type="text" name="yearIncome" maxlength='10' required="true"
                                               validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入你你公司的年收入"
                                               placeholder="请填写你公司的年收入">
                    </div>
                </li>

                <li>
                    <div class="l_side">
                        <span>手机号</span><input class="phone" type="text" name="telephone" required="true"
                                               required="true" maxlength='11' validate="phone" msg="请正确填写你的手机号"
                                               placeholder="请填写你的手机号">
                    </div>
                    <div class="r_side v_code">
                        <span>验证码</span>
                        <input type="text" class="msgVcode" name="vCode" required="true" maxlength='6'
                               required="true" validate="/^[\d]+$/" msg="请正确填写验证码" placeholder="请输入验证码">
                        <!--   <i><img src="/static/images/success.png"/></i> -->
                        <div>发送验证码</div>
                    </div>
                </li>

                <li>
                    <div class="l_side">
                        <span>银行名称</span><input type="text" name="bankName" maxlength='20' required="true"
                                                validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入你的银行名称"
                                                placeholder="请输入你的银行名称">
                    </div>
                    <div class="r_side">
                        <span>银行开户名</span><input type="text" name="bankAccountName" maxlength='10' required="true"
                                                 validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入你的银行开户名"
                                                 placeholder="请输入你的银行开户名">
                    </div>
                </li>

                <li>
                    <div class="l_side">
                        <span>银行卡号</span><input type="text" name="cardid" maxlength='19' required="true"
                                                validate="/^(\d{16}|\d{19})$/" msg="请正确输入你的银行卡号"
                                                placeholder="请填写你的银行卡号">
                    </div>
                    <div class="r_side">
                        <span>加盟档位</span>
                        <select required="true" name="leagueLevel">
                            <option value="1">3000</option>
                            <option value="2">12000</option>
                        </select>
                    </div>
                </li>
                <li class="region inline-form flex-start flex align-center">
                    <label>所在地区</label>
                    <div id="addressPicker" data-toggle="distpicker">
                        <select required="true" validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入省份信息" id="provincePicker"
                                data-province="省" class="address-form-item"></select>
                        <select required="true" validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入城市信息" id="cityPicker"
                                data-city="市" class="address-form-item"></select>
                        <select required="true" validate="/[\u2E80-\u9FFF\w ]+$/i" msg="请正确输入市区" id="regionPicker"
                                data-district="区" class="address-form-item"></select>
                    </div>
                </li>
            </ul>
        </form>

        <h4>详细地址</h4>
        <div class="more_info">
            <div class="detail_arr">
                <textarea id="addr_detail" name="detailedAddress"></textarea>
            </div>
            <div class="upload_info">
                <div class="uplod_items">
                    <p>上传商城LOGO</p>
                    <span>注：请上传商城的LOGO图标</span>
                    <div class="photo_box">
                        <div id="addlogo" class="addpic">
                            <img src="/static/images/add1.png"/>
                            <input id="upLogo" type="file">
                        </div>
                        <div id="dispic" class="addpic hidden">
                            <a title="点击更换logo">
                            <img style="width: 100%;height:100%;margin-top: 0" src=""/>
                            </a>
                        </div>

                    </div>
                </div>

                <div class="uplod_items">
                    <p>上传营业执照</p>
                    <span>注：请上传企业营业执照的正面照片</span>
                    <div class="photo_box">
                        <div id="addZpic" class="addpic">
                            <img src="/static/images/add1.png"/>
                            <input id="upLicense" type="file">
                        </div>
                        <div id="yypic" class="addpic hidden">
                            <a title="点击更换执照照片">
                            <img style="width: 100%;height:100%;margin-top: 0" src=""/>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="uplod_items">
                    <p>证件照片</p>
                    <span>注：请上传手持身份证的正面照、反面照</span>
                    <div class="photo_box clear">
                        <div id="identadd" style="float: left;margin-right: 10px" class="addpic">
                            <img src="/static/images/add1.png"/>
                            <input id="upIdcard" type="file">
                        </div>
                        <div style="float: left;" id="identadbox" class="addpbox">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit_bt">提交申请</div>
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

    </script>
    <script src="/static/js/join-submit.js"></script>

<script>
    $(function () {
        globalInit()
    })
</script>
</body>
</html>