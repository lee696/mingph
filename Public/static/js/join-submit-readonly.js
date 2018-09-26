/**
 *提交加盟申请页.js
 */
$(function () {
    getJoininfo()
    function getJoininfo(){
        ykp.doAjax({
            url:'common/checkJoinCondition',
            method:'get',
            data:{'uid':ykp.getLocalStorage('id')},
            success:function(res){
                var data = res.data;
                var jstates = ["待审核","审核通过", "审核不通过"];
                $('.submit_bt').html(jstates[data.state])
                if(data.state == 2){
                    $('.submit_bt').css('cursor','pointer');
                    $('.submit_bt').click(function () {
                        location.href = subinf;
                    })
                }
                $('.submit_bt').html(jstates[data.state])

                //渲染认证资料信息
                var area = data.area.split(',');
                var idcardpic = data.bankCardPicture.split(',');
                $('input[name=merchantName]').val(data.merchantName)
                $('input[name=name]').val(data.name)
                $('input[name=businessLicenseNum]').val(data.businessLicenseNum)
                $('input[name=cause]').val(data.cause)
                $('input[name=yearProfit]').val(data.yearProfit)
                $('input[name=idCard]').val(data.idCard)
                $('input[name=yearIncome]').val(data.yearIncome)
                $('input[name=telephone]').val(data.telephone)
                $('input[name=bankName]').val(data.bankName)
                $('input[name=bankAccountName]').val(data.bankAccountName)
                $('input[name=cardid]').val(data.cardid)
                $('select[name=leagueLevel] > option[value =' + data.leagueLevel + ']').attr('selected', true);
                $('#provincePicker > option[data-text=' + area[0] + ']').attr('selected', true).change();
                $('#cityPicker > option[data-text=' + area[1] + ']').attr('selected', true).change();
                $('#regionPicker').find('option[data-text=' + area[2] + ']').attr("selected", true);
                $('#addr_detail').val(data.detailedAddress);
                $('#addlogo img').attr('src',data.logo);
                data.businessLicensePicture ? $('#addZpic img').attr('src',data.businessLicensePicture):"";
                $('#identadd img').attr('src',idcardpic[0]);
                $('#identadd1 img').attr('src',idcardpic[1]);

                $('input').attr("disabled","disabled");
                $('#addr_detail').attr("disabled","disabled");
                $('select').attr("disabled","disabled").css('background','#ebebe4');
            }
        });
    }
});