/**
 *充值页面.js
 */
$(function () {
    //只允许密码框输入数字
    $('input[type="text"]').on('keyup', function payPwdcheck() {
        this.value = this.value.replace(/[^\d.]/g , '');
        this.value = this.value.replace(/([0-9]+\.[0-9]{3})[0-9]*/ , '');
    });
    //获取余额
    var uid = ykp.getLocalStorage("id");
    ykp.list({
        url: 'common/getWalletInfo',
        method: 'get',
        data: {uid: uid},
        loadList: function (res) {
            if (res.code !== 200) {
                alert(res.msg);
                ykp.alert(res.msg);
                return;
            }
            var data = res.data;
            var item = data.wallet;
            var cards = data.carts.length;
            $('#yue').html(item.money ? item.money : 0);

        }
    });
    $('#confirmCharge').click(function () {
        var cMoney = $('#mmoney').val()
        if(!cMoney){
            ykp.alert('转入金额不能为空！');
            return;
        }
        if(cMoney==0){
            ykp.alert('转入金额不能为"0"！');
            return;
        }
        location.href = srechargePay+'?money=' + cMoney;
    });
})