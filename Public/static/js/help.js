/**
 * Created by Alruna on 2017/07/24 ććఁċćఁĊć.
 */
$(function () {
    $('.help-sidebar').delegate('.help-content-entrance', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.ttt').html($(this).text());
        getInfo($(this).attr('data-id'));
    });

    var uid = ykp.getLocalStorage("uid"); //获取用户id
    init(); //页面初始化

    function init() {
        if (!uid) {
            ykp.showOk({
                text: '您还没有登录请先登录!',
                callback: function () {
                    location.href = _login_page;
                }
            });
            return;
        }
        getList();//获取帮助列表
    }

    //获取帮助列表
    function getList() {
        var postData = {
            pageNo: 1,
            pageSize: 999,
        };
        ykp.doAjax({
            url: 'helper/questionList',
            method: 'get',
            data: postData,
            success: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var data = res.data;
                var item = data.list;
                console.log(item);
                for (var i in item) {
                    var html = [
                        '<a href="javascript:void(0)" class="help-content-entrance" data-id="' + item[i].id + '">' + item[i].title + '</a>'
                    ];
                    $('.help-list').append(html.join(''));
                }
            }
        });
    }

    function getInfo(id) {
        ykp.doAjax({
            url: 'helper/questionDetail',
            method: 'get',
            data: {questionId: id},
            success: function (res) {
                if (res.code !== 200) {
                    ykp.alert(res.msg);
                    return;
                }
                var data = res.data;
                $('.title').html(data.title);
                $('.desc').html(data.content);
            }
        });
    }

})
