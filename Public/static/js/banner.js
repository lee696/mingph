/**
 * Created by ErgoSphere on 2017/7/9.
 */
function getBanners() {
    var i = 0;
    var length = 0;
                //轮播定时器
                var timer = setInterval(Run,5000);
                var outTimer;
                var color = ["#6ef4fd","#000","#fff","#906227","#fff4bc","#9c27d8"];
                var bgColor = ["-webkit-linear-gradient(bottom, #4f185d , #fe5d4b)","-webkit-linear-gradient(bottom, #4f185d , #fe5d4b)"]
            //图片及小圆点切换的方法

            ykp.list({
                url: 'message/advertisingList',
                method: 'get',
                loadList:  function(res){
                    var data = res.data;
                    this.length = res.data.length;
                    var img = '';
                    var li='';
                    for(var j in res.data) {
                        img += '<a href = "' + goods_detail_page + '?gid=' + res.data[j].url + '&boutique=1&detail='+escape(res.data[j].name)+'" target="_blank"><img src='+res.data[j].picture + ' /></a>'
                       li +='<li></li>'
                   }
                   $('#imgBox').append(img );
                   $('#bottomBox').html(li);

                         //当鼠标移入小圆点
                         $("#bottomBox li").mouseenter(function(){
                            //获取当前移入的原点
                            var LiThis = $(this);
                            //移入原点停止轮播
                            clearInterval(timer);
                            
                            //开启定时器，防止快速切换原点
                            outTimer = setTimeout(function(){
                                i = LiThis.index();
                                $("#imgBox a").eq(i).stop().show().siblings("a").hide();
                                $("#bottomBox li").eq(i).stop().css({'background':'#fff'}).siblings("li").css({'background':'#ccc','cursor':'pointer'});
                            },200)
                        })

                         $("#imgBox ul li").mouseleave(function(){
                            clearTimeout(outTimer);
                            timer = setInterval(Run,5000);
                        })

                        // $("#bottomBox li").click(function(){
                        //     clearTimeout(outTimer);
                        //     timer = setInterval(Run,2000);
                        // })
                    }


                });

            function Run(){
             i++;
             i = (i==this.length)?0:i;
                    //随着轮播图的变化变化字体颜色
                    //图片切换
                    $("#imgBox a").eq(i).show().siblings("a").hide();
                    //小圆点切换
                    $("#bottomBox li").eq(i).css({'background':'#fff'}).siblings("li").css({'background':'#ccc'})
                    
                }
                

                
                
                
            }
