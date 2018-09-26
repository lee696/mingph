/**
 *我的店铺.js
 */

$(function () {
    $('.user-sidebar a').eq(9).css('color','#c5ad82');

    var uid = $.getUrlParam('uid'); //获取用户id
    init(); //页面初始化
    function init() {
        console.log(uid);
        if (!uid || uid=='null') {
            ykp.showOk({
                text: '您还没有登录请先登录!',
                callback: function () {
                    location.href = _login_page;
                }
            });
            return;
        }
        getStoreinfor();//获取店铺信息
        getPointRd(); //获取分润记录
    }

    //店铺分享点击效果
    $(".share_bt").click(function () {
        $(".store-sharing").show();
    })

    $(".close—ico i").click(function () {
        $(".store-sharing").hide();
    })

    //获取店铺信息
    function getStoreinfor() {
        var uid = $.getUrlParam('uid');
        var postData = {
            userId: uid,
        };
        ykp.doAjax({
            breakDebug: true,
            url: 'shop/shopInfo',
            method: 'get',
            data: postData,
            success: function (res) {
                if (!res.data || res.data.length <= 0) {
                    $('.store_info').html('<h2>您还没有店铺~</h2>').show();
                    ;
                    return;
                }
                $('.store_info').show();
                $('.record').show();
                var data = res.data;
                var item = data[0];
                $('#store_type').html(item.leagueLevel == 1 ? '个人用户':'商家名称')
                $('#nameInfor').html(item.leagueLevel == 1 ? item.name:item.merchantName);
                $('.store_qr').qrcode({
                    render: 'table',
                    width: 170,
                    height: 170,
                    text: uid
                });
                var shar_sina = 'http://v.t.sina.com.cn/share/share.php?url=' + location.href + '&title=' + item.name + ' '
                var shar_qq = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + location.href + '&title=' + item.name + ''
                var shar_wechat = 'http://s.jiathis.com/qrcode.php?url=' + location.href + ''
                $('#wechat_sharing a').attr('href', shar_wechat)
                $('#qq_sharing a').attr('href', shar_qq)
                $('#sina_sharing a').attr('href', shar_sina)

                //判断个人用户或商家是否认证
                if(item.leagueLevel==1){
                    if(item.state == 1){
                        $('#confrm_user').html('已认证');
                        $('#confrm_ico').attr('src',hasRz);
                    }else{
                        $('#confrm_user').html('未认证');
                        $('#confrm_ico').attr('src',noRz);
                    }

                }else{
                    if(item.state == 1){
                        $('#confrm_user').html('商家已认证');
                        $('#confrm_ico').attr('src',shasRz);
                    }else{
                        $('#confrm_user').html('未认证');
                        $('#confrm_ico').attr('src',snoRz);
                    }
                }

                //判断个人用户还是商家
                var leve_ico ='';
                var leve_l ='';
                switch (item.leagueLevel?item.leagueLevel:1) {
                    case 1:
                        var leve_ico =grUser;
                        var leve_l ='个人用户';
                        break;
                    case 2:
                        var leve_ico =ptJoin;
                        var leve_l ='普通加盟';
                        break;
                    case 3:
                        var leve_ico =gjJoin;
                        var leve_l ='高级加盟';
                        break;
                }
                $('#jLevel').html(leve_l);
                $('#jLevel_ico').attr('src',leve_ico);
            }
        })
    }

    ///获取分润记录
    function getPointRd() {
        var uid = $.getUrlParam('uid');
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var nowDate = '' + year + '/' + month + '';
        var postData = {
            uid: uid,
            mark: nowDate
        };
        ykp.list({
            url: 'common/getTopupRecord',
            method: 'get',
            data: postData,
            loadList: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                if (res.data == '') {
                    $('#record-cobox').append('<p style="padding-top:20px">您还没有交易记录！<p>');
                    return;
                }
                var html = [];
                var _html = [];
                var data = res.data;
                for (var i in data) {
                    var inhtml = [];
                    for (var v = 0; v < data[i].list.length; v++) {
                        inhtml.push('<li><div class="order clear"><span>订单号：' + (data[i].list[v].tradeNo ? data[i].list[v].tradeNo : '') + '</span><span>￥' + data[i].list[v].orderMoney + '</span></div><div class="money clear"><span class="deal-date">' + ykp.formatDate(new Date(data[i].list[v].addtime), 'Y/M/d H:m') + '</span><span class="p-money">提成额：<span>￥' + data[i].list[v].money + '</span></span></div></li>');
                    }
                    html.push(
                        '<div class="record_list">',
                        '<div class="month-tit clear">',
                        '<span class="month">' + data[i].mark + '</span> <span class="price">总提成额：<span>￥' + data[i].total + '</span></span>',
                        '</div>',
                        '<ul>',
                        inhtml.join(''),
                        ' </ul>',
                        '</div>'
                    );
                    _html.push(html.join(''));
                    html = [];
                }
                $('#record-cobox').html(_html[0]);
                //索引
                var index = 1;

                //上一页
                $('.previous_page').click(function(){
                    if(index == 1){
                        return;
                    }
                    var _index = --index;
                    $('#record-cobox').html(_html[--_index]);
                });
                //下一页
                $('.next_page').click(function(){
                    if(index == _html.length){
                        return;
                    }
                    var _index = ++index;
                    $('#record-cobox').html(_html[--_index]);
                });

            }
        });
    }


})

