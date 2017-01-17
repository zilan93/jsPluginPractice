    var winHei = $(window).height();
    var a = $(".aside").height();
    var c = $(".content").height();
    var offsetTop = $(".content").offset().top;
function scrollAside() {
    //即当右侧高度小于左侧时，才会有滚动处理
    if(a < c) {
        //滚动处理事件
        ////向下滚动
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
            } else {
                //向上滚动
            m = document.body.scrollTop - 80;
            n = m - (c - a);
            //侧边滚动的高度小于等于0
            if(n <= 0) {
                $(".aside").css({
                    "position":"fixed",
                    "top":"0",
                    "right":"0",
                    "bottom":"auto"
                });
                //主体内容是否滚出头部
                if(m <= 0) {
                    $(".aside").css({
                        "position":"absolute",
                        "top":offsetTop
                    })
                }
            };
        }     
    }
}
$(window).scroll(function () {
    scrollAside();
});
$(function() {
    scrollAside();
})