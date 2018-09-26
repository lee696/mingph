/**
 *收货地址.
 */
$(function () {
    var uid = ykp.getLocalStorage("uid"); //获取用户id
    //页面初始化
    init();
    $('.user-sidebar a').eq(2).css('color','#c5ad82');

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

        getAddress();//获取地址列表
    }

    //获取地址列表
    function getAddress() {
        var uid = ykp.getLocalStorage("id");
        var postData = {
            userId: uid,
        };
        ykp.list({
            url: 'address/addressList',
            method: 'get',
            data: postData,
            loadList: function (res) {
                var data = res.data;
                var item = data.list;
                if(!item || item.length<=0){
                    $('#address-list-render').html('<tr><td colspan="6" style="text-align:center">暂无收获地址</td></tr>');
                    $('#leftAddressNo').html(data.total?20-data.total:20);
                    return;
                }
                var html = [];
                for (var i = 0; i < item.length; i++) {
                    html.push(
                        '<tr>',
                        '<td>',
                        '<div class="relative-box"><p>',
                        '' + item[i].name + '',
                        '</p><label class="radio default-address">',
                        '<input type="radio" ' + (item[i].isdefault ? 'checked' : '') + ' name="defaultAddr" />',
                        '<span class="nisen-radio"></span>',
                        '<span>设为默认地址</span>',
                        '</label>',
                        '</div>',
                        '</td>',
                        '<td class="areaInf">' + item[i].area.replace(/\s/ig,'') + '</td>',
                        '<td class="detailedInf">' + item[i].detailedAddress + '</td>',
                        '<td>' + (item[i].postalAddress ? item[i].postalAddress : "-") + '</td>',
                        '<td>',
                        '<p>' + item[i].telephone + '</p>',
                        '</td>',
                        '<td>',
                        '<a onclick="editAddress(' + item[i].id + ')" class="red-font">修改</a>',
                        '<span class="line">|</span>',
                        '<a onclick="deleteAddress(' + item[i].id + ')" class="gold-font">删除</a>',
                        '</td>',
                        '</tr>'
                    );
                }
                $('#saveAddressNo').html(data.total);
                $('#leftAddressNo').html(20-data.total);
                $('#address-list-render').append(html.join(''));

            }
        });
    }




    //点击提交新增或修改地址
    $('#saveAddress').click(function () {
        //console.log($('#provincePicker').val('111'));
        var data = ykp.getFormData('.user-address-form', true);
        if (!data.status) {
            return;
        }
        var addrId = $('#addr-title').attr('data-id');
        var uid = ykp.getLocalStorage("id");
        if(addrId){
            var postData = {
                id:addrId,
                userId: uid,
                sex:0,
                name: data.receiver,
                telephone: data.receiverPhone,
                area: data.provincePicker + ' ' + data.cityPicker + ' ' + data.regionPicker,
                postalAddress: data.areaCode,
                detailedAddress: data.fullAddress,
                isdefault: $('#isdefault')[0].checked ? 1 : 0,
            }
            addAddress(postData);
        }else{
            var postData = {
                userId: uid,
                sex:0,
                name: data.receiver,
                telephone: data.receiverPhone,
                area: data.provincePicker + ' ' + data.cityPicker + ' ' + data.regionPicker,
                postalAddress: data.areaCode,
                detailedAddress: data.fullAddress,
                isdefault: $('#isdefault')[0].checked ? 1 : 0,
            }
            addAddress(postData);
        }
    })

    //新增和编辑地址ajax函数
    function addAddress(postData) {
        ykp.doAjax({
            url: 'address/editAddress',
            method: 'post',
            data: postData,
            success: function (res) {
                ykp.showOk({
                    text: res.msg,
                    callback: function () {
                        location.reload();
                    }
                });

            }
        });
    }


})
//删除地址函数
function deleteAddress(addressId) {
    var postData = {
        addressId: addressId
    };
    ykp.list({
        url: 'address/deleteAddress',
        method: 'get',
        data: postData,
        loadList: function (res) {
            if (res.code !== 200) {
                ykp.alert(res.msg);
                return;
            }
            ykp.showOk({
                text: res.msg,
                callback: function () {
                    $('#address-list-render').html('');
                    location.reload();
                }
            });
        }
    });
}


//点击展示修改地址信息
function editAddress(addressId) {
    $('#addr-title').html('编辑收货地址');
    $('#addr-title').attr('data-id', addressId);
    ykp.list({
        url: 'address/addressDetail',
        method: 'get',
        data: {addressId: addressId},
        loadList: function (res) {
            if (res.code !== 200) {
                ykp.alert(res.msg);
                return;
            }
            var data = res.data;
            var area = data.area.split(" ");
            $('#receiver').val(data.name);
            $('#receiverPhone').val(data.telephone);
            $('#provincePicker > option[data-text=' + area[0] + ']').attr('selected', true).change();
            $('#cityPicker > option[data-text=' + area[1] + ']').attr('selected', true).change();
            $('#regionPicker').find('option[data-text=' + area[2] + ']').attr("selected", true);
            $('#areaCode').val(data.postalAddress);
            $('#fullAddress').val(data.detailedAddress);
            $('#isdefault').prop('checked', data.isdefault ? true : false);
        }
    });
}
