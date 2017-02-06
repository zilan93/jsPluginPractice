function scrollAside() {
     //获取相应变量
    var winHei = $(window).height();
    var a = $(".aside").height();
    var c = $(".content").height();
    var offsetTop = $(".content").offset().top;
    var $header = $(".header");
    //滚动处理事件
    var operation = function(state) {
        if(state) {
            //向下滚动
            var e = document.body.scrollTop;
            var d = a - (e - 80);
            //判断侧边是否滚到底部
            if(d <= winHei) {
                $(".aside").css({
                    "position":"fixed",
                    "top":"auto",
                    "bottom":"0"
                });
                //主体内容是否滚到底部
                if(e + winHei >= c + 80) {
                    //说明底部出现在了屏幕里
                    $(".aside").css({
                        "position":"absolute",
                        "top":offsetTop + (c - a),
                        "bottom":"auto"
                    })
                }
            }
        } else {
            //向上滚动
            e = document.body.scrollTop - 80;
            d = e - (c - a);
            //侧边滚动的高度小于等于0
            if(d <= 0) {
                $(".aside").css({
                    "position":"fixed",
                    "top":"0",
                    "right":"0",
                    "bottom":"auto"
                });
                //主体内容是否滚出头部
                if(e <= 0) {
                    $(".aside").css({
                        "position":"absolute",
                        "top":offsetTop
                    })
                }
            };

        }
    };
    //即当右侧高度小于左侧时，才会有滚动处理
    if(a < c) {
        //判断滚动方向，绑定滚动处理事件
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
}
scrollAside();