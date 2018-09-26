/**
 * 积分商品列表
 */
$(function () {
    //对应导航栏字体更改样式
    $('.integralMall').css('color','#c5ad82');

    var listData = {type: 0};//type用于决定采用哪种排序方式
    $('.goods-filter').on('click', 'a', function () {
        $(this).addClass('current').toggleClass('isDown').siblings().removeClass('current').removeClass('isDown');
        initFilter($(this));//给type赋值
        getPointList();//获取积分商城列表
    });

    function initFilter(filterss) {
        if (filterss.hasClass('newest')) {
            if (filterss.hasClass('isDown')) {
                listData.type = 0;
            } else {
                listData.type = 1;
            }
        }
        if (filterss.hasClass('price')) {
            if (filterss.hasClass('isDown')) {
                listData.type = 2;
            } else {
                listData.type = 3;
            }
        }
        if (filterss.hasClass('saleNum')) {
            if (filterss.hasClass('isDown')) {
                listData.type = 4;
            } else {
                listData.type = 5;
            }
        }
    }

    //获取积分商城列表
    getPointList();

    //获取积分商城列表
    function getPointList() {
        var postData = {
            type: listData.type,
            pageNo: 1,
            pageSize: 4,
        };
        ykp.list({
            url: 'integral/getIntegralGoods',
            method: 'get',
            data: postData,
            pageBar: {id: '#pageBar'},
            loadList: function (res) {
                var item = res.data;
                if(!item ||item.length <= 0){
                    $('#points_list').html('<p style="margin:0 auto">暂无数据</p>');
                    $('#points_list').css('text-align','center').css('color','#666');
                    return;
                }
                var html = [];
                var str = '';
                for (var i in item) {
                    html.push(
                        '<a href = "'+goods_Integraldetail_page+'?gid=' + item[i].id + '" class = "goods-list-item" >',
                        '<div class = "img-wrapper" >',
                        '<img src = "' + item[i]['picture'] + '"/>',
                        '</div>',
                        '<div class = "goods-info">',
                        '<p class = "goods-title"> ' + item[i]['name'] + '</p>',
                        '<p class = "goods-states gray-font" >已售：' + item[i]['saleNum'] + '</p>',
                        '<p class = "goods-price flex align-center space-between" >',
                        '<span class = "gray-font line-through" >市场价：' + item[i]['originalPrice'] + '</span>',
                        '<span >' + item[i]['prevailingPrice'] + '积分</span></p>',
                        '</div>',
                        '</a>'
                    );
                }
                $('#points_list').html(html.join(''));
            }
        });
    }
});