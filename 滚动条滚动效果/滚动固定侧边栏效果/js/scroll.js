function scrollAside() {
     //获取相应变量
    var winHei = $(window).height();
    var a = $(".aside").height();
    var c = $(".content").height();
    if(a < c) {
        //判断滚动方向，绑定处理事件
        var beforeScrollTop = document.body.scrollTop;
        $(window).scroll(function () {
            var afterScrollTop = document.body.scrollTop,
                delta = afterScrollTop - beforeScrollTop,
                state = true;
            if(delta == 0) return false;
            if(delta > 0) {
                //向下滚动
                state = true;
                operation(state);
            } else if(delta < 0) {
                //向上滚动
                state = false;
                operation(state);
            }
            beforeScrollTop = afterScrollTop;
        })
    }
    //滚动处理事件
    function operation(state) {
        if(state) {
            //向下滚动
            var e = document.body.scrollTop;
            var d = a - e;
            if(d <= winHei) {
                $(".aside").css({
                    "position":"fixed",
                    "top":"auto",
                    "bottom":"0"
                });
                if(e + winHei >= c) {
                    var offsetTop = $(".aside").offset().top;
                    console.log(offsetTop);
                    //说明底部出现在了屏幕里
                    $(".aside").css({
                        "position":"absolute",
                        "top":offsetTop
                    })
                }
            } else {
                $(".aside").css({
                    "position":"absolute"
                })
            }
        } else {
            //向上滚动
            e = document.body.scrollTop;
            if(e <= 0) {
                $(".aside").css({
                    "position":"fixed",
                    "top":"0",
                    "bottom":"auto"
                })
            } else {
                offsetTop = $(".aside").offset().top;
                $(".aside").css({
                    "position":"absolute",
                    "top":offsetTop
                })
            }
        }
    }
}
scrollAside();
