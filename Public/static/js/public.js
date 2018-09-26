/*公用js文件*/
$(function () {
//封装获取get参数的函数
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        }
    })(jQuery);

    //检测登录状态是否超过一天,如果超过1天就清除登录状态
    checkLoginStatus()

    //获取GET参数判断进入那个列表
    pagetit()

    //nav导航菜单百宝箱列表获取显示
    gettreasureType()

    //检测是否登录
    checkLogin()

    //退出登录
    logOutuser()

    //首页搜索功能和男人帮女人帮搜索功能
    searchFn()

    //导航栏中的购物车中的数据添加
    cartNum();

    //检测登录状态是否超过一天,如果超过1天就清除登录状态
    function checkLoginStatus() {
        var savedloginTime = parseInt(ykp.getLocalStorage("isoverLoginTime"));
        var overLoginTime = savedloginTime+86400000;
        var nowLoginTime = $.now();
        if (nowLoginTime > overLoginTime) {
            ykp.clearLocalStorage();
        }

    }

    //nav导航菜单百宝箱列表获取显示
    function gettreasureType() {
        ykp.list({
            url: 'home/treasureTypeList',
            method: 'get',
            loadList: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var item = res.data;
                var html = [];
                for (var i in item) {
                    var tname = escape(item[i]['name']);
                    html.push('<a href="/Goods/list.html?position=3&type=' + item[i]['id'] + '&tname=' + tname + '">' + item[i]['name'] + '</a>');
                }
                $('#treasureBoxList div').append(html.join(''));
            }
        });
    }

//获取GET参数判断进入那个列表
    function pagetit() {
        var position = $.getUrlParam('position');
        var searWords = $.getUrlParam('searchKwords');
        var cartInf = $.getUrlParam('cartInf');
        var detl = $.getUrlParam('detail');
        var boutique = $.getUrlParam('boutique');
        var orDerin = $.getUrlParam('orDerin');
        var collect = $.getUrlParam('collect');
        var adddetl = '<span>&nbsp;></span><span>&nbsp;' + unescape(detl) + '</span>';
        if (collect) {
            $('#page-nav-tit').append('<span><a href="/User/collect.html">我的收藏</a></span>' + (detl ? adddetl : " ") + '');
            return;
        }
        if (orDerin) {
            $('#page-nav-tit').append('<span><a href="/User/orderlist.html">我的订单</a></span>' + (detl ? adddetl : " ") + '');
            return;
        }
        if (boutique) {
            $('#page-nav-tit').append('<span>精品推荐</span>' + (detl ? adddetl : " ") + '');
            return;
        }
        if (cartInf) {
            $('#page-nav-tit').append('<span><a href="/Order/cart.html">购物车</a></span>' + (detl ? adddetl : " ") + '');
            return;
        }
        if (searWords) {
            $('#page-nav-tit').append('<span>搜索结果</span>');
            $('#po-tit').append("搜索结果");
            return;
        }
        if (position == 1) {
            $('#page-nav-tit').append('<span>服饰商城</span><span>&nbsp;></span><span>&nbsp;<a href="' + goods_list_page + '?position=1">男人帮</a></span>' + (detl ? adddetl : " ") + '');
            $('#po-tit').append("男人帮")
        }
        if (position == 2) {
            $('#page-nav-tit').append('<span>服饰商城</span><span>&nbsp;></span><span>&nbsp;<a href="' + goods_list_page + '?position=2">女人帮</a></span>' + (detl ? adddetl : " ") + '');
            $('#po-tit').append("女人帮")
        }
        if (position == 3) {
            var titname = $.getUrlParam('tname')
            var tname = unescape(titname)
            $('#page-nav-tit').append('<span><a href="' + goods_list_page + '?position=3">百宝箱</a></span><span>&nbsp;></span><span>&nbsp;' + tname + '</span>' + (detl ? adddetl : " ") + '');
            $('#po-tit').append(tname)
        }
    }

    //检测用户是否登录
    function checkLogin() {
        var name = ykp.getLocalStorage("name");
        var mobile = ykp.getLocalStorage("telephone");
        if (!name && !mobile) {
            var html = [
                '<a class="gold-font freeRegister" href="../Member/register.html">【免费注册】</a>',
                '<a class="gold-font logon" href="../Member/login.html">【会员登录】</a>'
            ];
            $("#logCheck-tit").append(html.join(''));
        } else {
            var html = [
                '<span class = "gold-font"> 您好 ! ',
                '<a class = "gold-font" href = "../User/info.html" >' + (!mobile ? mobile : name) + '</a></span>',
                '<a class = "gold-font" href = "javascript:void(0)" id = "logOut"> 【退出】 </a>'
            ];
            $("#logCheck-tit").append(html.join(''));
        }

    }

    //退出登录
    function logOutuser() {
        $('#logOut').click(function () {
            ykp.clearLocalStorage()
            location.href = "../Index/index.html";
        })

    }


    //首页搜索功能和男人帮女人帮搜索功能
    function searchFn() {
        //按键触发搜索
        $("#searchKeywords").keydown(function(event) {
            var searchKeywords = $.trim($("#searchKeywords").val());
            if (event.keyCode == 13) {
                if (!searchKeywords) {
                    ykp.alert('搜索字段不能为空!');
                    return false;
                } else {
                    var keyWords = escape(searchKeywords);
                    var position = $.getUrlParam('position');
                    if (!position) {
                        location.href = '' + goods_list_page + '?searchKwords=' + keyWords + '';
                        return false;
                    } else {
                        location.href = '' + goods_list_page + '?searchKwords=' + keyWords + '&position=' + position + '';
                        return false;
                    }
                }
            }
        });
        //点击搜索按钮触发搜索

        $("#searchBtn").click(function () {
            console.log(1);
            var searchKeywords = $.trim($("#searchKeywords").val());
            if (!searchKeywords) {
                ykp.alert('搜索字段不能为空!');
                return;
            } else {
                var keyWords = escape(searchKeywords)
                var position = $.getUrlParam('position')
                if (!position) {
                    location.href = '' + goods_list_page + '?searchKwords=' + keyWords + '';
                    return;
                } else {
                    location.href = '' + goods_list_page + '?searchKwords=' + keyWords + '&position=' + position + '';
                }
            }
        })
    }


    //导航栏中的购物车中的数据添加
    function cartNum() {
        if (!ykp.getLocalStorage('id')) {
            return;
        }
        ykp.doAjax({
            url: 'cart/getCartGoods',
            method: 'get',
            data: {uid: ykp.getLocalStorage('id')},
            success: function (res) {
                if (!res.data || res.data.length <= 0) {
                    return;
                }
                $('.cart-num').html(res.data[0].list.length);
            }
        });
    }

    $("#mTop_bt").click(function () {
        $('html,body').animate({scrollTop: 0}, 500);
    });

    function fengye() {
        // var total = res.totalPage; //总页数
        //var page_no = res.pageNo;//当前页
        option.loadList.call(this, res, postData);
        if (page_no && total && option.pageBar && option.pageBar.id) { //分页组件
            it.loadJs('/static/js/ctrls/jqPaginator/jqPaginator.min.js');
            it.loadCss('/static/js/ctrls/jqPaginator/jqPaginator.min.css');
            $(option.pageBar.id).jqPaginator({
                totalPages: total, //总页数
                //totalCounts: res.totalRecord , //设置分页的总条目数
                visiblePages: option.pageBar.showNum || 5, //显示条目数
                currentPage: page_no, //当前页
                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i><\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);"><i class="arrow arrow3"><\/i><\/a><\/li>',
                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                onPageChange: function (n) {
                    if (n != postData.pageNo) {
                        option.data.pageNo = n;
                        it.list(option);
                    }
                }
            });
        }

    }

})

