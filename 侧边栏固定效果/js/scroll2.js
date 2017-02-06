function scrollAside() {
    var winHei = $(window).height();
    var a = $(".aside").height();
    var c = $(".content").height();
    var offsetTop = $(".content").offset().top;
    var m = $(window).scrollTop();
    var n = a + offsetTop - winHei;
    if(m > n) {
        //滚出的高度大于侧边多出的高度
        var s = $(".main").height() + offsetTop;
        if(m + winHei > s) {
            //如果底部将要出现，则将侧边栏设置成absolute
            window.sideTop = offsetTop + (c - a);
            $(".aside").css({
                "position":"absolute",
                "top":window.sideTop
            })
        } else {
            //存在两种情况，侧边栏滚到底部并固定，侧边栏滚到顶部并固定
            m - window.lastScrollHei >= 0 ? m - offsetTop > a - winHei ? (
                //向下滚动且侧边栏滚到底部
                window.sideTop = a - winHei,
                $(".aside").css({
                    "position":"fixed",
                    "top":-window.sideTop
                })
            ) : (
                window.sideTop = offsetTop + (c - a),
                $(".aside").css({
                "position":"absolute",
                "top":window.sideTop
            })) : 0 > m - window.lastScrollHei && m - offsetTop - (c - a) < 0 ? (
                //向上滚动且侧边栏滚到顶部
                $(".aside").css({
                    "position":"fixed",
                    "top":'0'
                })
            ) : (
                window.sideTop = offsetTop + (c - a),
                $(".aside").css({
                "position":"absolute",
                "top":window.sideTop
            }));
        }
    } else {
        //滚出的高度小于侧边多出的高度
        m - window.lastScrollHei >= 0 ? (
            window.sideTop = offsetTop,
            $(".aside").css({
                "position":"absolute",
                "top":offsetTop
            })
        ) : m - offsetTop > 0 ? (
            $(".aside").css({
                "position":"fixed",
                "top":0
            })
        ) : (
            window.sideTop = offsetTop,
                $(".aside").css({
                    "position":"absolute",
                    "top":offsetTop
                })
        )
    }
    window.lastScrollHei = m;
}
$(window).scroll(function () {
    scrollAside();
});
$(function() {
    scrollAside();
})