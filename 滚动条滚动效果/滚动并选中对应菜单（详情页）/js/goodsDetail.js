/*floatNav*/
(function($) {
    $.fn.floatNav = function(c) {
        if (!this.length) {
            return
        }
        var d = $.extend({
                start: null,
                end: null,
                fixedClass: "nav-fixed",
                anchor: null,
                targetEle: null,
                range: 0
            },
            c);
        var g = $(this),
            h = g.height(),
            f = g.width(),
            b = $('<div class="float-nav-wrap"/>');
        g.css({
            height: h,
            width: f
        });
        if (!g.parent().hasClass("float-nav-wrap")) {
            g.wrap(b.css("height", h))
        }
        $(window).bind("scroll",
            function() {
                var j = $(document).scrollTop(),
                    l = g.find("a").eq(0).attr("href"),
                    n = d.start || g.parent(".float-nav-wrap").offset().top,
                    m = d.targetEle ? $(d.targetEle).offset().top: 10000;
                if (j > n && j < (d.end || m) - d.range) {
                    g.addClass(d.fixedClass);
                    if (d.anchor && l !== d.anchor) {
                        g.find("a").attr("href", d.anchor)
                    }
                } else {
                    g.removeClass(d.fixedClass);
                    if (d.anchor) {
                        g.find("a").attr("href", "javascript:;")
                    }
                }
            });
        return this
    }
})(jQuery);
$(function () {
    /*详情tab切换*/
    var tabsLink = $(".goods-detail-nav li");
    var tabsCon = $(".lwx_goods_tab_ct");
    $(window).scroll(function () {
        var scrollHei = $(document).scrollTop();
        tabsCon.each(function (index) {
            var offsetHei = $(this).offset().top;
            if(offsetHei < (scrollHei + 150)) {
                tabsLink.find("a").removeClass("curr");
                tabsLink.eq(index).find("a").addClass("curr");
            }
        })
    });
    /*模拟锚点定位*/
    tabsLink.click(function(){
        var nav_height=$('.goods-detail-nav').height();
        var index=tabsLink.index(this);
        var obj_pos_top=tabsCon.eq(index).offset().top;
        $(document).scrollTop(obj_pos_top-nav_height);
    });
})
