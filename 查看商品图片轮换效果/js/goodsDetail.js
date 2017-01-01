/**
 * Created by Administrator on 2016/8/8.
 */
    /*推荐组合效果*/
    var ulWrap = $(".suits .suits-wrap ul");
    var liLists = ulWrap.find("li");
    var marLeft = parseInt(ulWrap.css("margin-left"));
    ulWrap.width(liLists.length * 165);
    $(".prev-btn").addClass("disabled");
    if(liLists.length > 4) {
        $(".suits").on("click",".prev-btn",function () {
            $(this).siblings().removeClass("disabled");
            if(marLeft == 0) {
                $(this).parent(".btns").find("a").removeClass("disabled");
                $(this).addClass("disabled");
            } else {
                marLeft = marLeft + 165;
                ulWrap.animate({ "margin-left": marLeft + "px" }, 500,function () {
                    if(marLeft == 0) {
                        $(".prev-btn").addClass("disabled");
                    }
                });
            }
        });
        $(".suits").on("click",".next-btn",function () {
            $(this).siblings().removeClass("disabled");
            var ulWid = ulWrap.width();
            var dValue = ulWid - 660;
            if(dValue+marLeft < 1) {
                $(this).parent(".btns").find("a").removeClass("disabled");
                $(this).addClass("disabled");
            } else {
                marLeft = marLeft - 165;
                ulWrap.animate({ "margin-left": marLeft + "px" }, 500,function () {
                    if(dValue+marLeft < 1) {
                        $(".next-btn").addClass("disabled");
                    }
                });
            }
        });
    } else {
        $(".suits .prev-btn,.suits .next-btn").addClass("disabled");
    }
    /**
     * 产品图查看效果
     */
    (function () {
        var proImgObj = $("#lwx_img_slider_product");
        var proImgItems = proImgObj.find("li");
        var proImgNum = proImgItems.length;
        var prevBtn = $(".img_slider_product_box .prev_btn");
        var nextBtn = $(".img_slider_product_box .next_btn");
        var bigImg = $(".big_pro_pic").find(".goods-pic-box img");
        var left = 0;
        proImgObj.css("width",proImgNum * 68);
        proImgItems.eq(0).addClass("selected");
        //点击查看大图
        function clickChangePic(obj,direction) {
            if(obj.hasClass("enable")) {
                left -= 68 * direction;
                proImgObj.animate({
                    "left":left + "px"
                })
            }
            if(left == 0 && direction < 0) {
                prevBtn.removeClass("enable");
            } else {
                prevBtn.addClass("enable");
            }
             if(left == 340 - proImgObj.width() && direction > 0) {
                 nextBtn.removeClass("enable");
            } else {
                 nextBtn.addClass("enable");
             }
        }
        //悬停查看大图
        proImgObj.on("mouseover","li",function() {
            $(this).siblings().removeClass("selected");
            $(this).addClass("selected");
            var smallSrc = $(this).find("img").attr("src");
            bigImg.attr("src",smallSrc);
        });
        if(proImgNum > 5) {
            nextBtn.addClass("enable");
            prevBtn.click(function () {
                clickChangePic($(this),-1)
            });
            nextBtn.click(function () {
                clickChangePic($(this),1)
            });
        }
    })();
    //选择套餐
    $(".goods_taocan_choice").on("click","span",function () {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
    });