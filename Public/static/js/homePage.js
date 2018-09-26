/**
 * 首页
 */
$(function () {
    //对应导航栏字体更改样式
    $('.index').css('color','#c5ad82');
    getBanners('bannerCon', 'banners')

    //获取女人帮商品列表
    getWomanList()

    //获取男人帮商品列表
    getManList()

    //获取女人帮商品列表
    function getWomanList() {
        var postData = {
            position: 2,
            pageNo: 1,
            pageSize: 8,
            isSaleNum: 0, //是否按销售数量排序 1是 0否
            isGood: 0, //是否按好评排序 1是 0否
            isPrice: 0, //是否按价格排序 1是 0否
            qualityType: 0, //百宝箱类别
            isOrder: 0, //默认传0 1标识升序
        };
        ykp.doAjax({
            url: 'home/goodsList',
            method: 'get',
            async: false,
            data: postData,
            success: function (res) {
                var data = res.data;
                var item = data.list;
                if(!item || item.length <=0){
                    $('.women-goods-list').html('暂无数据').css('color','#666');
                    return;
                }
                var html = ['<div class = "row-1 clear">'];
                if (item[0]) {
                    html.push('<div class = "small-ico">');
                    html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[0].id + '&position=2&detail='+escape(item[0].name)+'"><img src = "' + item[0].picture + '" alt = ""><div class="price-con"><p class="title">' + item[0].name + '</p><p class="price">￥' + item[0].prevailingPrice + '</p></div></a>');
                    if (item[1]) {
                        html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[1].id + '&position=2&detail='+escape(item[1].name)+'"><img src = "' + item[1].picture + '" alt = ""><div class="price-con"><p class="title">' + item[1].name + '</p><p class="price">￥' + item[1].prevailingPrice + '</p></div></a>');
                    }
                    html.push('</div>');
                }
                if (item[2]) {
                    var b = [
                        '<div class="rimg">',
                        '<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[2].id + '&position=2&detail='+escape(item[2].name)+'"> <img src = "' + item[2].picture + '" /><div class="price-con"><p class="title">' + item[2].name + '</p><p class="price">￥' + item[2].prevailingPrice + '</p></div> </a>',
                        '</div>'
                    ];
                    Array.prototype.push.apply(html, b);
                }
                html.push('</div>');

                if (item[3]) {
                    html.push('<div class = "row-2">');
                    html.push('<div class = "ico-lbox">');
                    html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[3].id + '&position=2&detail='+escape(item[3].name)+'"><img src = "' + item[3].picture + '" alt = ""><div class="price-con"><p class="title">' + item[3].name + '</p><p class="price">￥' + item[3].prevailingPrice + '</p></div></a>');
                    if (item[4]) {
                        html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[4].id + '&position=2&detail='+escape(item[4].name)+'"><img src = "' + item[4].picture + '" alt = ""><div class="price-con"><p class="title">' + item[4].name + '</p><p class="price">￥' + item[4].prevailingPrice + '</p></div></a>');
                    }
                    html.push('</div>');
                }
                if (item[5]) {
                    var b = [
                        '<div class="ico-mbox">',
                        '<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[5].id + '&position=2&detail='+escape(item[5].name)+'"> <img src = "' + item[5].picture + '" /><div class="price-con"><p class="title">' + item[5].name + '</p><p class="price">￥' + item[5].prevailingPrice + '</p></div> </a>',
                        '</div>'
                    ];
                    Array.prototype.push.apply(html, b);
                }
                if (item[6]) {
                    html.push('<div class = "ico-rbox">');
                    html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[6].id + '&position=2&detail='+escape(item[6].name)+'"><img src = "' + item[6].picture + '" alt = ""><div class="price-con"><p class="title">' + item[6].name + '</p><p class="price">￥' + item[6].prevailingPrice + '</p></div></a>');
                    if (item[7]) {
                        html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[7].id + '&position=2&detail='+escape(item[7].name)+'"><img src = "' + item[7].picture + '" alt = ""><div class="price-con"><p class="title">' + item[7].name + '</p><p class="price">￥' + item[7].prevailingPrice + '</p></div></a>');
                    }
                    html.push('</div>');
                }
                html.push('</div>');

                $('.women-goods-list').append(html.join(''));
            }
        });
    }


    //获取男人帮商品列表
    function getManList() {
        var postData = {
            position: 1,
            pageNo: 1,
            pageSize: 8,
            isSaleNum: 0, //是否按销售数量排序 1是 0否
            isGood: 0, //是否按好评排序 1是 0否
            isPrice: 0, //是否按价格排序 1是 0否
            qualityType: 0, //百宝箱类别
            isOrder: 0, //默认传0 1标识升序
        };
        ykp.doAjax({
            url: 'home/goodsList',
            method: 'get',
            async: false,
            data: postData,
            success: function (res) {
                var data = res.data;
                var item = data.list;
                if(!item ||item.length<=0){
                    $('.man-goods-list').html('暂无数据').css('color','#666');
                    return;
                }
                var html = ['<div class = "row-1 clear">'];
                if (item[0]) {
                    html.push('<div class = "small-ico">');
                    html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[0].id + '&position=1&detail='+escape(item[0].name)+'"><img src = "' + item[0].picture + '" alt = ""><div class="price-con"><p class="title">' + item[0].name + '</p><p class="price">￥' + item[0].prevailingPrice + '</p></div></a>');
                    if (item[1]) {
                        html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[1].id + '&position=1&detail='+escape(item[0].name)+'"><img src = "' + item[1].picture + '" alt = ""><div class="price-con"><p class="title">' + item[1].name + '</p><p class="price">￥' + item[1].prevailingPrice + '</p></div></a>');
                    }
                    html.push('</div>');
                }
                if (item[2]) {
                    var b = [
                        '<div class="mRimg">',
                        '<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[2].id + '&position=1&detail='+escape(item[2].name)+'"><img src = "' + item[2].picture + '" /> <div class="price-con"><p class="title">' + item[2].name + '</p><p class="price">￥' + item[2].prevailingPrice + '</p></div></a>',
                        '</div>'
                    ];
                    Array.prototype.push.apply(html, b);
                }
                html.push('</div>');

                if (item[3]) {
                    html.push('<div class = "row-2">');
                    html.push('<div class = "ico-lbox">');
                    html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[3].id + '&position=1&detail='+escape(item[3].name)+'"><img src = "' + item[3].picture + '" alt = ""><div class="price-con"><p class="title">' + item[3].name + '</p><p class="price">￥' + item[3].prevailingPrice + '</p></div></a>');
                    html.push('</div>');
                }
                if (item[4]) {
                    html.push('<div class = "ico-mbox">');
                    html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[4].id + '&position=1&detail='+escape(item[4].name)+'"><img src = "' + item[4].picture + '" alt = ""><div class="price-con"><p class="title">' + item[4].name + '</p><p class="price">￥' + item[4].prevailingPrice + '</p></div></a>');
                    if (item[5]) {
                        html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[5].id + '&position=1&detail='+escape(item[5].name)+'"><img src = "' + item[5].picture + '" alt = ""><div class="price-con"><p class="title">' + item[5].name + '</p><p class="price">￥' + item[5].prevailingPrice + '</p></div></a>');

                    }
                    html.push('</div>');
                }

                if (item[6]) {
                    html.push('<div class = "ico-rbox">');
                    html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[6].id + '&position=1&detail='+escape(item[6].name)+'"><img src = "' + item[6].picture + '" alt = ""><div class="price-con"><p class="title">' + item[6].name + '</p><p class="price">￥' + item[6].prevailingPrice + '</p></div></a>');
                    if (item[7]) {
                        html.push('<a class="moveAct" href = "' + goods_detail_page + '?gid=' + item[7].id + '&position=1&detail='+escape(item[7].name)+'"><img src = "' + item[7].picture + '" alt = ""><div class="price-con"><p class="title">' + item[7].name + '</p><p class="price">￥' + item[7].prevailingPrice + '</p></div></a>');
                    }
                    html.push('</div>');
                }

                html.push('</div>');
                $('.man-goods-list').append(html.join(''));
            }
        });
    }

    $('.cart-entrance').click(function () {
        if (ykp.getLocalStorage('id')) {
            return true;
        }
        location.href = _login_page;
        return false;
    });

    //鼠标移动展示商品价格效果
    $('.recommend-goods .moveAct').hover(function () {
        $(this).children('.price-con').animate({bottom: 0}, 50);
    },function () {
        $(this).children('.price-con').animate({bottom: -65}, 50);
    })

})