/**
 * Created by ErgoSphere on 2017/7/9.
 */
function getRecommendIndex(pageNo, pageSize, dom){
    var rg = '<a href="'+ goods_detail_page +'?id=${id}" class="recommend-goods-item">' +
        '<img src="${picture}" alt="${name}" />' +
        '<div class="goods-info">' +
        '<p>${name}</p>' +
        '<p class="red-font">￥${prevailingPrice}</p></div></a>';
    var rg = '<a class="goods-ad" href="'+ goods_detail_page +'?id=${id}" style="background-image: url(${picture})"><div class="price-con"><p class="title">${name}</p> <p class="price">￥${prevailingPrice}</p></div></a>';

    $.template('rg_mod', rg)

    // var res = {
    //     "data": {
    //         "pageNum": 1,
    //         "pageSize": 10,
    //         "size": 2,
    //         "startRow": 1,
    //         "endRow": 2,
    //         "total": 2,
    //         "pages": 1,
    //         "list": [
    //             {
    //                 "id": 2,
    //                 "picture": test_goods_pic,
    //                 "detailPicture": "sdfvds",
    //                 "name": "测试2",
    //                 "prevailingPrice": 340,
    //                 "originalPrice": 450,
    //                 "saleNum": 0,
    //                 "monthlySales": 0,
    //                 "qualit": 1,
    //                 "type": 2,
    //                 "qualityType": 0,
    //                 "addTime": 1499322411000,
    //                 "isCollection": null,
    //                 "size": null,
    //                 "commentList": null,
    //                 "commentNum": 0
    //             },
    //             {
    //                 "id": 1,
    //                 "picture": test_goods_pic,
    //                 "detailPicture": "sdfs",
    //                 "name": "测试商品",
    //                 "prevailingPrice": 100,
    //                 "originalPrice": 120,
    //                 "saleNum": 10,
    //                 "monthlySales": 10,
    //                 "qualit": 1,
    //                 "type": 1,
    //                 "qualityType": 0,
    //                 "addTime": 1499322408000,
    //                 "isCollection": null,
    //                 "size": {
    //                     "id": 1,
    //                     "goodsId": 1,
    //                     "color": "红色",
    //                     "style": "17年新款",
    //                     "size": "S码",
    //                     "picture": "adad",
    //                     "addTime": 1499333665000
    //                 },
    //                 "commentList": null,
    //                 "commentNum": 1
    //             }
    //         ],
    //         "prePage": 0,
    //         "nextPage": 0,
    //         "isFirstPage": true,
    //         "isLastPage": true,
    //         "hasPreviousPage": false,
    //         "hasNextPage": false,
    //         "navigatePages": 8,
    //         "navigatepageNums": [1],
    //         "navigateFirstPage": 1,
    //         "navigateLastPage": 1,
    //         "firstPage": 1,
    //         "lastPage": 1
    //     },
    //     "code": 200,
    //     "msg": "获取推荐列表成功",
    //     "totalPage": null,
    //     "totalRecord": null,
    //     "pageNo": null
    // }
    // $.tmpl('rg_mod', res.list).appendTo(dom)

    xhr({
        type: 'GET',
        url: 'home/fineRecommend',
        data: {
            pageNo: pageNo,
            pageSize: pageSize
        }
    }, function (res) {
        if(parseInt(res.code) === 200){
            $.tmpl('rg_mod', res.data.list).appendTo(dom)
        }
    })
}
function getRecommendGoods(pageNo, pageSize, dom){
    var rg = '<a href="'+ goods_detail_page +'?id=${id}" class="recommend-goods-item">' +
        '<img src="${picture}" alt="${name}" />' +
        '<div class="goods-info">' +
        '<p>${name}</p>' +
        '<p class="red-font">￥${prevailingPrice}</p></div></a>'

    $.template('rg_mod', rg)

    // var res = {
    //     "data": {
    //         "pageNum": 1,
    //         "pageSize": 10,
    //         "size": 2,
    //         "startRow": 1,
    //         "endRow": 2,
    //         "total": 2,
    //         "pages": 1,
    //         "list": [
    //             {
    //                 "id": 2,
    //                 "picture": test_goods_pic,
    //                 "detailPicture": "sdfvds",
    //                 "name": "测试2",
    //                 "prevailingPrice": 340,
    //                 "originalPrice": 450,
    //                 "saleNum": 0,
    //                 "monthlySales": 0,
    //                 "qualit": 1,
    //                 "type": 2,
    //                 "qualityType": 0,
    //                 "addTime": 1499322411000,
    //                 "isCollection": null,
    //                 "size": null,
    //                 "commentList": null,
    //                 "commentNum": 0
    //             },
    //             {
    //                 "id": 1,
    //                 "picture": test_goods_pic,
    //                 "detailPicture": "sdfs",
    //                 "name": "测试商品",
    //                 "prevailingPrice": 100,
    //                 "originalPrice": 120,
    //                 "saleNum": 10,
    //                 "monthlySales": 10,
    //                 "qualit": 1,
    //                 "type": 1,
    //                 "qualityType": 0,
    //                 "addTime": 1499322408000,
    //                 "isCollection": null,
    //                 "size": {
    //                     "id": 1,
    //                     "goodsId": 1,
    //                     "color": "红色",
    //                     "style": "17年新款",
    //                     "size": "S码",
    //                     "picture": "adad",
    //                     "addTime": 1499333665000
    //                 },
    //                 "commentList": null,
    //                 "commentNum": 1
    //             }
    //         ],
    //         "prePage": 0,
    //         "nextPage": 0,
    //         "isFirstPage": true,
    //         "isLastPage": true,
    //         "hasPreviousPage": false,
    //         "hasNextPage": false,
    //         "navigatePages": 8,
    //         "navigatepageNums": [1],
    //         "navigateFirstPage": 1,
    //         "navigateLastPage": 1,
    //         "firstPage": 1,
    //         "lastPage": 1
    //     },
    //     "code": 200,
    //     "msg": "获取推荐列表成功",
    //     "totalPage": null,
    //     "totalRecord": null,
    //     "pageNo": null
    // }
    // $.tmpl('rg_mod', res.list).appendTo(dom)

    xhr({
	    type: 'GET',
	    url: 'home/fineRecommend',
	    data: {
		    pageNo: pageNo,
		    pageSize: pageSize
	    }
    }, function (res) {
        if(parseInt(res.code) === 200){
            $.tmpl('rg_mod', res.data.list).appendTo(dom)
        }
    })
}

function getPointGoodsList() {

}

function getGoodsList(queryJson, dom) {
    var mod = '<a href="'+ goods_detail_page +'?id=${size.goodsId}" class="goods-list-item">' +
        '<div class="img-wrapper flex align-center justify-center">' +
        '<img src="${picture}" alt="${name}" /></div>' +
        '<div class="goods-info">' +
        '<p>${name}</p>' +
        '<p class="flex align-center space-between"><span>${likes}人喜欢</span>' +
        '<span>${saleNum}人购买</span></p>' +
        '<p class="flex align-center space-between"><span class="red-font">￥${prevailingPrice}</span>' +
        '<span class="to-buy">购买</span></p></div></a>'

    $.template('goods_mod', mod)

    var res = {
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 1,
            "startRow": 1,
            "endRow": 1,
            "total": 1,
            "pages": 1,
            "list": [
                {
                    "id": 1,
                    "picture": "100",
                    "detailPicture": "sdfs",
                    "name": "测试商品",
                    "prevailingPrice": 100,
                    "originalPrice": 120,
                    "saleNum": 10,
                    "monthlySales": 10,
                    "qualit": 1,
                    "type": 1,
                    "qualityType": 0,
                    "addTime": 1499322408000,
                    "isCollection": null,
                    "size": {
                        "id": 1,
                        "goodsId": 1,
                        "color": "红色",
                        "style": "17年新款",
                        "size": "S码",
                        "picture": "adad",
                        "addTime": 1499333665000
                    },
                    "commentList": null,
                    "commentNum": 1
                }
            ],
            "prePage": 0,
            "nextPage": 0,
            "isFirstPage": true,
            "isLastPage": true,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 8,
            "navigatepageNums": [
                1
            ],
            "navigateFirstPage": 1,
            "navigateLastPage": 1,
            "firstPage": 1,
            "lastPage": 1
        },
        "code": 200,
        "msg": "商品列表获取成功",
        "totalPage": null,
        "totalRecord": null,
        "pageNo": null
    }

    xhr('GET', 'home/goodsList', queryJson, function (res) {
        if(parseInt(res.code) === 200){
           $.tmpl('goods_mod', res.data.list).appendTo(dom)
        }
        // paginationInit([1,2,3,4, ..., res.data.totalPage] )
    })
}

function getGoodsDetail(gid, uid) {
	xhr({
		type: 'GET',
		url: 'home/goodDetail',
		data: {
			goodId: gid,
			userId: uid
		}
	}, function (res) {
		if(parseInt(res.code) === 200){

		}
	})
}

function getPointList(dom) {
    var pm = '<a href="'+ goods_detail_page +'?id=${size.goodsId}" class="goods-list-item">' +
        '<div class="img-wrapper flex align-center justify-center">' +
        '<img src="${picture}" alt="${name}" /></div>' +
        '<div class="goods-info">' +
        '<p>${name}</p>' +
        '<p class="flex align-center space-between"><span>${likes}人喜欢</span>' +
        '<span>${saleNum}人购买</span></p>' +
        '<p class="flex align-center space-between"><span class="red-font">￥${prevailingPrice}</span>' +
        '<span class="to-buy">购买</span></p></div></a>'

    $.template('points_mod', pm)

    var res = {
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 1,
            "startRow": 1,
            "endRow": 1,
            "total": 1,
            "pages": 1,
            "list": [
                {
                    "id": 1,
                    "picture": "100",
                    "detailPicture": "sdfs",
                    "name": "测试商品",
                    "prevailingPrice": 100,
                    "originalPrice": 120,
                    "saleNum": 10,
                    "monthlySales": 10,
                    "qualit": 1,
                    "type": 1,
                    "qualityType": 0,
                    "addTime": 1499322408000,
                    "isCollection": null,
                    "size": {
                        "id": 1,
                        "goodsId": 1,
                        "color": "红色",
                        "style": "17年新款",
                        "size": "S码",
                        "picture": "adad",
                        "addTime": 1499333665000
                    },
                    "commentList": null,
                    "commentNum": 1
                }
            ],
            "prePage": 0,
            "nextPage": 0,
            "isFirstPage": true,
            "isLastPage": true,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 8,
            "navigatepageNums": [
                1
            ],
            "navigateFirstPage": 1,
            "navigateLastPage": 1,
            "firstPage": 1,
            "lastPage": 1
        },
        "code": 200,
        "msg": "商品列表获取成功",
        "totalPage": null,
        "totalRecord": null,
        "pageNo": null
    }

    $.tmpl('points_mod', res.data.list).appendTo(dom)
}