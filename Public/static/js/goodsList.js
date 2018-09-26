/**
 * 普通商品列表js
 */
$(function () {
    //对应导航栏字体更改样式
    if($.getUrlParam('position') == 3){
        $('.jewelBox').css('color','#c5ad82');
    }else{
        $('.dress').css('color','#c5ad82');
    }
    //getGoodsList(queryJson, '.goods-list-box')
    //getRecommendGoods(1, 3, '.recommend-goods')

    //删除最近浏览商品
    $('.clear-explore').click(function(){
        ykp.doAjax({
            url:'pc/clearRecentBrowse',
            method:'get',
            data:{uid:ykp.getLocalStorage('id')},
            success:function(res){
                ykp.showOk({
                    text: "清除成功",
                    callback:function(){
                        $('.explore-list').html('没有浏览记录');
                        $('.clear-explore').hide();
                    }
                });
            }
        });
    });

    //最近浏览商品
    if(!ykp.getLocalStorage('id')){
        $('.explore-list').html('没有浏览记录');
        $('.clear-explore').hide();
    }else{
        ykp.doAjax({
            url:'pc/recentBrowse',
            method:'get',
            data:{uid:ykp.getLocalStorage('id'),
                pageNo:1,
                pageSize:3},
            success:function(res){
                var data = res.data;
                if(!data || data.length<=0){
                    $('.explore-list').html('没有浏览记录');
                    $('.clear-explore').hide();
                    return;
                }
                var recentBrowse = [];
                for(var i in data){
                    recentBrowse.push(
                        '<a href=goods_detail_page+"?gid='+data[i].id+'">',
                        '<div class="img" style="background-image: url('+data[i].picture+');background-size:100% 100%"></div>',
                        '<div class="msg">',
                        '<p class="title">'+data[i].name+'</p>',
                        '<p class="item">'+(data[i].size || '')+'</p>',
                        '</div>',
                        '</a>'
                    );
                }
                $('.explore-list').html(recentBrowse.join(''));
            }
        });
    }

    //重置筛选条件
    $('#resetQuery').click(function(){
        $('.newest').click();
    });

    //精品推荐获取
    getRecommend();

    //初始化数据
    var postData = {};
    var url = '';
    if($.getUrlParam('searchKwords')){
        if($.getUrlParam('position')){
            url = 'home/searchGoods';
            postData = {
                type: $.getUrlParam('position'),
                searchWord: $.getUrlParam('searchKwords'),
                isSaleNum: 0, //是否按销售数量排序 1是 0否
                isGood: 0, //是否按好评排序 1是 0否
                isPrice: 0, //是否按价格排序 1是 0否
                pageSize: 8,
                isOrder: 0, //默认传0 1标识升序
                pageNo: 1
            };

            getList(url, postData);
        }else {
            url = 'shop/searchGoodsOrShop';
            postData = {
                searchWord: $.getUrlParam('searchKwords'),
                isSaleNum: 0, //是否按销售数量排序 1是 0否
                isGood: 0, //是否按好评排序 1是 0否
                isPrice: 0, //是否按价格排序 1是 0否
                pageSize: 8,
                isOrder: 0, //默认传0 1标识升序
                pageNo: 1
            };

            getList(url, postData);
        }
    }else{
        url = 'home/goodsList';
        postData = {
            position: $.getUrlParam('position'),
            pageNo: 1,
            pageSize: 8,
            isSaleNum: 0, //是否按销售数量排序 1是 0否
            isGood: 0, //是否按好评排序 1是 0否
            isPrice: 0, //是否按价格排序 1是 0否
            qualityType: $.getUrlParam('type'), //百宝箱类别
            isOrder: 0 //默认传0 1标识升序
        };

        getList(url, postData);
    }

    //服饰商城排序
    $('.goods-filter a').click(function(){
        // if($(this).hasClass('current')){
        //     $(this).toggleClass('isDown');
        // }
        $(this).addClass('current').toggleClass('isDown').siblings().removeClass('current').removeClass('isDown');
        initOrder($(this));
    });

    function initOrder(goodsFilter){
        if($.getUrlParam('searchKwords')){
            if($.getUrlParam('position')){
                url = 'home/searchGoods';
                if(goodsFilter.hasClass('newest')){
                    postData = {
                        type: $.getUrlParam('position'),
                        searchWord: $.getUrlParam('searchKwords'),
                        isSaleNum: 0, //是否按销售数量排序 1是 0否
                        isGood: 0, //是否按好评排序 1是 0否
                        isPrice: 0, //是否按价格排序 1是 0否
                        pageSize: 8,
                        isOrder: 0, //默认传0 1标识升序
                        pageNo: 1
                    }

                    getList(url, postData);
                }
                if (goodsFilter.hasClass('price')) {
                    if (goodsFilter.hasClass('isDown')) {
                        postData = {
                            type: $.getUrlParam('position'),
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 0, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 1, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 0, //默认传0 1标识升序
                            pageNo: 1
                        }

                        getList(url, postData);
                    } else {
                        postData = {
                            type: $.getUrlParam('position'),
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 0, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 1, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 1, //默认传0 1标识升序
                            pageNo: 1
                        }

                        getList(url, postData);
                    }
                }
                if (goodsFilter.hasClass('saleNum')) {
                    if (goodsFilter.hasClass('isDown')) {
                        postData = {
                            type: $.getUrlParam('position'),
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 1, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 0, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 0, //默认传0 1标识升序
                            pageNo: 1
                        }

                        getList(url, postData);
                    } else {
                        postData = {
                            type: $.getUrlParam('position'),
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 1, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 0, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 1, //默认传0 1标识升序
                            pageNo: 1
                        }

                        getList(url, postData);
                    }
                }
            }else{
                url = 'shop/searchGoodsOrShop';
                if(goodsFilter.hasClass('newest')){
                    postData = {
                        searchWord: $.getUrlParam('searchKwords'),
                        isSaleNum: 0, //是否按销售数量排序 1是 0否
                        isGood: 0, //是否按好评排序 1是 0否
                        isPrice: 0, //是否按价格排序 1是 0否
                        pageSize: 8,
                        isOrder: 0, //默认传0 1标识升序
                        pageNo: 1
                    };

                    getList(url, postData);
                }
                if (goodsFilter.hasClass('price')) {
                    if (goodsFilter.hasClass('isDown')) {
                        postData = {
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 0, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 1, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 0, //默认传0 1标识升序
                            pageNo: 1
                        };

                        getList(url, postData);
                    } else {
                        postData = {
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 0, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 1, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 1, //默认传0 1标识升序
                            pageNo: 1
                        };

                        getList(url, postData);
                    }
                }
                if (goodsFilter.hasClass('saleNum')) {
                    if (goodsFilter.hasClass('isDown')) {
                        postData = {
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 1, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 0, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 0, //默认传0 1标识升序
                            pageNo: 1
                        };

                        getList(url, postData);
                    } else {
                        postData = {
                            searchWord: $.getUrlParam('searchKwords'),
                            isSaleNum: 1, //是否按销售数量排序 1是 0否
                            isGood: 0, //是否按好评排序 1是 0否
                            isPrice: 0, //是否按价格排序 1是 0否
                            pageSize: 8,
                            isOrder: 1, //默认传0 1标识升序
                            pageNo: 1
                        };

                        getList(url, postData);
                    }
                }
            }
        }else{
            url = 'home/goodsList';
            if(goodsFilter.hasClass('newest')){
                console.log(1);
                postData = {
                    position: $.getUrlParam('position'),
                    pageNo: 1,
                    pageSize: 8,
                    isSaleNum: 0, //是否按销售数量排序 1是 0否
                    isGood: 0, //是否按好评排序 1是 0否
                    isPrice: 0, //是否按价格排序 1是 0否
                    qualityType: $.getUrlParam('type'), //百宝箱类别
                    isOrder: 0 //默认传0 1标识升序
                };

                getList(url, postData);
            }
            if (goodsFilter.hasClass('price')) {
                if (goodsFilter.hasClass('isDown')) {
                    postData = {
                        position: $.getUrlParam('position'),
                        pageNo: 1,
                        pageSize: 8,
                        isSaleNum: 0, //是否按销售数量排序 1是 0否
                        isGood: 0, //是否按好评排序 1是 0否
                        isPrice: 1, //是否按价格排序 1是 0否
                        qualityType: $.getUrlParam('type'), //百宝箱类别
                        isOrder: 0 //默认传0 1标识升序
                    };

                    getList(url, postData);
                } else {
                    postData = {
                        position: $.getUrlParam('position'),
                        pageNo: 1,
                        pageSize: 8,
                        isSaleNum: 0, //是否按销售数量排序 1是 0否
                        isGood: 0, //是否按好评排序 1是 0否
                        isPrice: 1, //是否按价格排序 1是 0否
                        qualityType: $.getUrlParam('type'), //百宝箱类别
                        isOrder: 1 //默认传0 1标识升序
                    };

                    getList(url, postData);
                }
            }
            if (goodsFilter.hasClass('saleNum')) {
                if (goodsFilter.hasClass('isDown')) {
                    postData = {
                        position: $.getUrlParam('position'),
                        pageNo: 1,
                        pageSize: 8,
                        isSaleNum: 1, //是否按销售数量排序 1是 0否
                        isGood: 0, //是否按好评排序 1是 0否
                        isPrice: 0, //是否按价格排序 1是 0否
                        qualityType: $.getUrlParam('type'), //百宝箱类别
                        isOrder: 0 //默认传0 1标识升序
                    };

                    getList(url, postData);
                } else {
                    postData = {
                        position: $.getUrlParam('position'),
                        pageNo: 1,
                        pageSize: 8,
                        isSaleNum: 1, //是否按销售数量排序 1是 0否
                        isGood: 0, //是否按好评排序 1是 0否
                        isPrice: 0, //是否按价格排序 1是 0否
                        qualityType: $.getUrlParam('type'), //百宝箱类别
                        isOrder: 1 //默认传0 1标识升序
                    };

                    getList(url, postData);
                }
            }
        }
    }
    //获取列表函数封装
    function getList(url, data) {
        ykp.list({
            url: url,
            method: 'get',
            data: data,
            pageBar: {id: '#pageBar'},
            loadList: function (res) {

                var data = res.data;
                var item = data.list;
                if(!item || item.length<=0){
                    $('#goods_list').html('<p style="margin:0 auto">暂无数据</p>');
                    $('#goods_list').css('text-align','center').css('color','#666');
                    return;
                }
                var html = [];
                var tname ='';
                var posn = $.getUrlParam('position');
                if(posn == 3){
                    tname= '&tname='+ escape($.getUrlParam('tname'));
                }
                for (var i in item) {
                    html.push(
                        '<a href="' + goods_detail_page + '?gid=' + item[i]['id'] + '&position=' + posn +''+ tname +'&detail='+ escape(item[i]['name']) +'" class="goods-list-item">',
                        '<div class="img-wrapper">',
                        '<img src="' + item[i]['picture'] + '" />',
                        '</div>',
                        '<div class="goods-info">',
                        '<p class="goods-title">' + item[i]['name'] + '</p>',
                        '<p class="goods-states flex align-center space-between">',
                        '<span>' + item[i]['saleNum'] + '人喜欢</span>',
                        '<span>' + item[i]['monthlySales'] + '人购买</span>',
                        '</p>',
                        '<p class="goods-price flex align-center space-between">',
                        '<span class="black-font">￥' + item[i]['prevailingPrice'] + '</span>',
                        '<span class="to-buy">购买</span>',
                        '</p>',
                        '</div>',
                        '</a>'
                    );
                }
                $('#goods_list').html(html.join(''));
            }
        });
    }

    //精品推荐
    function getRecommend() {
        var postData = {
                pageNo: 1,
                pageSize: 3,
            }
            ;
        ykp.list({
            url: 'home/fineRecommend',
            method: 'get',
            data: postData,
            loadList: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var data = res.data;
                var item = data.list;
                var html = [];
                for (var i in item) {
                    html.push(
                        '<a class = "goods-ad" href = "' + goods_detail_page + '?gid=' + item[i]['id'] + '&boutique=1&detail='+ escape(item[i]['name']) +'" style = "background-image: url(' + (item[i]['picture']?item[i]['picture']:defaultImg) + ')">',
                        '<div class = "price-con">',
                        '<p class = "title">' + item[i]['name'] + '</p>',
                        '<p class = "price"> ￥' + item[i]['prevailingPrice'] + '</p>',
                        '</div>',
                        '</a>'
                    );
                }
                $('#recommend').append(html.join(''));
            }
        });
    }
})