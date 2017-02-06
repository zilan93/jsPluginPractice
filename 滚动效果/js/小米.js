!function(t) {
    function e(i) {
        if (o[i])
            return o[i].exports;
        var n = o[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(n.exports, n, n.exports, e),
            n.loaded = !0,
            n.exports
    }
    var o = {};
    return e.m = t,
        e.c = o,
        e.p = "",
        e(0)
}([function(t, e, o) {
    t.exports = o(1)
}
    , function(t, e, o) {
        MI.namespace("goodsDetail, goodsComment, itemUtil"),
            MI.goodsComment = o(3),
            MI.goodsQuestion = o(7),
            MI.itemUtil = o(5),
            MI.cart = o(2),
            o(9),
            o(13),
            MI.goodsDetailUtil = {
                dotmpl: function(t, e) {
                    var o = t.html()
                        , i = doT.template(o);
                    return i(e)
                },
                cutImg: function(t, e) {
                    var o = t.lastIndexOf(".");
                    if (-1 !== t.indexOf("!"))
                        return t;
                    var i = t.substring(0, o) + "!" + e + "x" + e + t.substring(o);
                    return i
                },
                loadjsSync: function(t, e, o) {
                    var i, n, a;
                    __indexOf = [].indexOf || function(t) {
                            for (var e = 0, o = this.length; o > e; e++)
                                if (e in this && this[e] === t)
                                    return e;
                            return -1
                        }
                        ,
                        i = arguments.callee,
                        __indexOf.call(i, "queue") >= 0 ? console.log("") : i.queue = {},
                        n = i.queue,
                    __indexOf.call(n, t) >= 0 && e && (n[t] ? n[t].push(e) : e(o)),
                        n[t] = e ? [e] : [],
                        a = document.createElement("script"),
                        a.type = "text/javascript",
                        a.onload = a.onreadystatechange = function() {
                            if (!a.readyState || "loaded" === a.readyState || "complete" === a.readyState) {
                                for (a.onreadystatechange = a.onload = null; n[t].length; )
                                    n[t].shift()(o);
                                return n[t] = null,
                                    n
                            }
                        }
                        ,
                        a.src = t,
                        document.getElementsByTagName("head")[0].appendChild(a)
                }
            },
            MI.goodsDetail = {
                config: function() {
                    var t = this;
                    t.slideIndex = 0,
                        t.pageConfig = goodsConfig;
                    var e = {
                        getCommenturlHead: MI.goodsDetailConfig.commentWwwUrl,
                        answerCommentUrlHead: MI.goodsDetailConfig.commentOrderUrl,
                        proId: goodsConfig.productId,
                        recommendBlock: $("#J_recommendComment"),
                        supCommentBlock: $("#J_supComment"),
                        timelineCommentBlock: $("#J_timelineComment")
                    }
                        , o = {
                        questionUrlHead: MI.goodsDetailConfig.commentHuodongUrl,
                        proId: goodsConfig.productId,
                        commodityId: goodsConfig.commodityId,
                        questionBlock: $("#J_goodsQuestionBlock")
                    };
                    t.commentApi = new MI.goodsComment(e),
                        t.questionApi = new MI.goodsQuestion(o)
                },
                init: function() {
                    var t = this;
                    t.config(),
                        t.runMethods()
                },
                runMethods: function() {
                    var t = this;
                    t.initLoadPage(),
                        t.showProSlide(),
                        t.showHeadView(),
                        t.showImgOnly(),
                        t.refreshPrice(),
                        t.judgeClothSize(),
                        t.addShopCart(),
                        t.showStoreBtnStatus(),
                        t.changeStoreBtnStatus(),
                        t.clickToSpot(),
                        t.scorllCommentPic(),
                        t.clickBatch(),
                        t.clickShowBigImg(),
                        t.clickItemImg(),
                        t.lazyloadDescImg(),
                        t.descriptionInteractSet(),
                        t.keyboardControl()
                },
                keyboardControl: function() {
                    document.onkeydown = function(t) {
                        var e = t || window.event
                            , o = $("#goodsPicZoomBlock").length;
                        e && 27 === e.keyCode && o && $(".J_exitItemBig").click(),
                        e && 39 === e.keyCode && o && $(".J_itemZoomRight").click(),
                        e && 37 === e.keyCode && o && $(".J_itemZoomLeft").click()
                    }
                },
                needLazyMethod: function() {
                    var t = this;
                    MI.goodsDetailUtil.loadjsSync("//s01.mifile.cn/c/js/shouhoufuwu.js", t.renderServicePage),
                        $("#J_alsoBuyWrap").miRecommend({
                            type: 1,
                            gid: goodsConfig.commodityId,
                            title: "买过该商品的人还买了",
                            page: "ItemTail"
                        }),
                        $("#J_recentGoods").miRecommend({
                            type: 0,
                            gid: goodsConfig.commodityId,
                            title: "最近浏览的商品和相关推荐",
                            page: "ItemTail"
                        }),
                        t.getCommentList(),
                        t.getQuestionList()
                },
                initLoadPage: function() {
                    var t = this
                        , e = t.pageConfig
                        , o = {};
                    o.canJoinActs = [];
                    var i = ["reduction", "gift"];
                    if (e.canJoinActs)
                        for (var n in e.canJoinActs)
                            if (e.canJoinActs.hasOwnProperty(n)) {
                                var a = e.canJoinActs[n]
                                    , r = {};
                                r.type = -1 === $.inArray(a.type, i) ? "others" : a.type,
                                    r.label = a.typeDesc ? a.typeDesc : a.type,
                                    r.title = a.title,
                                    o.canJoinActs.push(r)
                            }
                    if (o.adaptDesc = e.adaptDesc,
                            o.goodsColor = {},
                            o.goodsColor.colorName = e.commodityStyleName,
                            e.commodityStyleList) {
                        o.goodsColor.colorArr = [];
                        for (var s in e.commodityStyleList)
                            if (e.commodityStyleList.hasOwnProperty(s)) {
                                var d = e.commodityStyleList[s]
                                    , c = {};
                                c.goodsUrl = MI.GLOBAL_CONFIG.itemSite + "/" + d.commodity_id + ".html",
                                    c.imgTitle = "",
                                    c.imgTitle = d.icon_name ? d.icon_name : s,
                                    c.selectedClass = "",
                                e.commodityId === d.commodity_id && (c.selectedClass = "current",
                                    o.goodsColor.curName = c.imgTitle),
                                    c.goodsBack = "",
                                    d.icon ? c.goodsBack = MI.goodsDetailUtil.cutImg(d.icon, 38) : d.image && (c.goodsBack = MI.goodsDetailUtil.cutImg(d.image, 38)),
                                    c.is_sale = d.is_sale,
                                    o.goodsColor.colorArr.push(c)
                            }
                    }
                    if (o.goodsSize = {},
                            o.goodsSize.sizeName = e.goodsStyleName,
                        !e.isPackage && e.goodsStyleList) {
                        o.goodsSize.sizeArr = [];
                        var l = 0;
                        for (var m in e.goodsStyleList)
                            if (e.goodsStyleList.hasOwnProperty(m)) {
                                l++;
                                var u = e.goodsStyleList[m];
                                u.size = m,
                                    o.goodsSize.sizeArr.push(u),
                                1 === l && (o.goodsSize.curSize = m)
                            }
                    }
                    if (o.closeSubscribe = jiangpeiConfig.closeSubscribe,
                            o.closeFavoriteAddBtn = jiangpeiConfig.closeFavoriteAddBtn,
                            o.nextStep = "",
                            o.addCartGid = "",
                            e.isCos)
                        o.addCartGid = e.defaultGoodsId;
                    else {
                        var g = 1
                            , f = ""
                            , p = "";
                        e.isPackage ? e.scenarioId ? (f = e.commodityId + "-" + e.scenarioId + "-" + g,
                            p = MI.GLOBAL_CONFIG.cartSite + "/cart/add/" + f,
                            o.rediectCartSite = !0) : (f = e.commodityId + "/gid/0/c/" + g,
                            p = MI.GLOBAL_CONFIG.cartSite + "/item/batchView/bid/" + f,
                            o.redirectFlag = !0) : (f = e.defaultGoodsId,
                            p = MI.GLOBAL_CONFIG.cartSite + "/cart/add/" + f),
                            o.nextStep = p,
                            o.addCartGid = f,
                        e.isPackage && !e.needChioce && (o.addCartGid = e.commodityId)
                    }
                    o.is_cos = e.isCos,
                        o.isPackage = e.isPackage,
                        o.needChioce = e.needChioce,
                        o.defaultGoodsId = e.defaultGoodsId,
                        o.subUrl = MI.GLOBAL_CONFIG.orderSite + "/misc/subscribe/goods/" + e.defaultGoodsId,
                        o.recommend_package = e.recommend_package,
                        t.pageData = o;
                    var h = MI.goodsDetailUtil.dotmpl($("#goodsInfo-tmpl"), o);
                    $("#J_goodsInfoBlock").append(h);
                    var v = MI.goodsDetailUtil.dotmpl($("#goodsSubBar-tmpl"), o);
                    $("#goodsSubBar").append(v)
                },
                changeProSlidCallback: function(t) {
                    var e = function() {
                        var e = {
                            img: o
                        }
                            , i = MI.goodsDetailUtil.dotmpl($("#bigImg-tmpl"), e);
                        $(".J_bigPicBlock").html(i),
                            $("#goodsPicList").find("li").removeClass("current"),
                            $("#goodsPicList").find("li").eq(t).addClass("current")
                    }
                        , o = $("#goodsPicList").find("li").eq(t).find("img").attr("data-src")
                        , i = {
                        imgsrc: o
                    };
                    MI.itemUtil.imgLoad(i, e)
                },
                showProSlide: function() {
                    var t = this;
                    $(document).on("click", "#goodsPicList>li", function() {
                        var e = $(this).index();
                        $(".J_bigPicBlock").html(""),
                            $.proxy(t.changeProSlidCallback(e), t)
                    })
                },
                showHeadView: function() {
                    var t = parseInt($("#goodsDetail").offset().top);
                    $("#goodsSubBar").css("top", t),
                        $(window).scroll(function() {
                            var e = $(this).scrollTop()
                                , o = parseInt($("#goodsDetail").offset().top);
                            if (e >= o - 1) {
                                $("#goodsSubBar").css("top", "0px"),
                                    $("#goodsSubBar").addClass("goods-sub-bar-play");
                                var i = $("#goodsSubMenu > ul > li").length;
                                $("#goodsSubMenu > ul > li").each(function() {
                                    var t = $(this).find("a").attr("data-href");
                                    if (t) {
                                        var o = $(t).offset().top - 70
                                            , n = null;
                                        n = $(this).index() < i - 1 ? $(this).next().find("a").attr("data-href") : $("#goodsService");
                                        var a = $(n).offset().top;
                                        e > o && a > e && $(this).addClass("current").siblings().removeClass("current")
                                    }
                                })
                            } else {
                                $("#goodsSubBar").css("top", t),
                                    $("#goodsSubBar").removeClass("goods-sub-bar-play");
                                var n = $("#goodsDesc").css("display");
                                "none" === n ? $(".J_originNav > li:eq(1)").addClass("current").siblings().removeClass("current") : $(".J_originNav > li:eq(0)").addClass("current").siblings().removeClass("current")
                            }
                        })
                },
                getCommentList: function() {
                    var t = this;
                    jiangpeiConfig.closeGoodsCommentList ? ($("#J_commentTipInfo").html("<p style='text-align:center;'>抢购活动期间，服务器压力山大，评价暂时停止显示</p>"),
                        $("#goodsCommentContent").removeClass("hasContent"),
                        $("#goodsCommentContent").addClass("noContent")) : t.commentApi.initCommentList()
                },
                getQuestionList: function() {
                    var t = this;
                    jiangpeiConfig.closeGoodsFaq ? ($("#goodsFaq").hide(),
                        $("#goodsFaqContent").hide()) : t.questionApi.initQuestionList()
                },
                showImgOnly: function() {
                    var t = null
                        , e = this
                        , o = e.pageConfig
                        , i = function(t) {
                        if (0 === t.code) {
                            if (e.commentApi.comment = t.data,
                                    e.commentApi.oriComment = $.extend(!0, {}, t.data),
                                0 === t.data.total_count)
                                return MI.itemUtil.showErrorModal("暂时还没有带图评价哦~ "),
                                    $(".J_showImg").removeClass("current"),
                                    !1;
                            var o = 5;
                            $("#J_loadCommentMore").hasClass("hide") && (o = 10);
                            var i = {
                                amount: o,
                                startIndex: 0
                            };
                            e.commentApi.renderSupCommentList(i),
                                e.commentApi.renderTimelineCommentList(o),
                                e.commentApi.setCommemntLikeStatus()
                        }
                    };
                    $("body").on("click", ".J_showImg", function() {
                        t = $(this);
                        var e = 0;
                        t.hasClass("current") ? t.removeClass("current") : (t.addClass("current"),
                            e = 1);
                        var n = MI.goodsDetailConfig.commentWwwUrl + "comment/entry/getSummary?goods_id=" + o.productId + "&sstart=0&slen=10&astart=0&alen=10&showimg=" + e;
                        MI.itemUtil.jsonpCache(n, i)
                    })
                },
                refreshPrice: function() {
                    var t = {
                        url: MI.goodsDetailConfig.stockUrl + "/item/view?itemid=" + goodsConfig.commodityId
                    }
                        , e = this
                        , o = e.pageData
                        , i = function(t) {
                        if (1 === t.code) {
                            var e = t.data
                                , i = e.commodity.price_max
                                , n = e.commodity.price_min
                                , a = e.commodity.market_price_max
                                , r = n;
                            i > n ? r = n + "~" + i : $(".J_mi_marketPrice").html(parseFloat(a) > parseFloat(r) ? a + "元" : ""),
                                $(".J_mi_goodsPrice").html(r);
                            var s = e.commodity.is_cos;
                            if (s) {
                                var d = $(".goods-over-btn").length;
                                if (0 === d) {
                                    $(".goods-add-cart-btn").remove();
                                    var c = "";
                                    c = o.closeSubscribe ? MI.cart.stockTmpl() : !o.isPackage && o.defaultGoodsId ? MI.cart.registerTmpl(o.subUrl) : MI.cart.stockTmpl(),
                                        $("#goodsDetailCollectBtn").before(c),
                                        $("#goodsSubBarBtnBox").html(c)
                                }
                            } else {
                                var l = $(".goods-add-cart-btn").length;
                                if (0 === l) {
                                    var m = MI.cart.cartTmpl()
                                        , u = doT.template(m);
                                    if (!o.nextStep) {
                                        var g = 1
                                            , f = ""
                                            , p = "";
                                        goodsConfig.isPackage ? goodsConfig.scenarioId ? (f = goodsConfig.commodityId + "-" + goodsConfig.scenarioId + "-" + g,
                                            p = MI.GLOBAL_CONFIG.cartSite + "/cart/add/" + f) : (f = goodsConfig.commodityId + "/gid/0/c/" + g,
                                            p = MI.GLOBAL_CONFIG.cartSite + "/item/batchView/bid/" + f) : (f = goodsConfig.defaultGoodsId,
                                            p = MI.GLOBAL_CONFIG.cartSite + "/cart/add/" + f),
                                            o.nextStep = p,
                                            o.addCartGid = f
                                    }
                                    $("#goodsDetailBtnBox").find(".goods-over-btn").after(u(o)),
                                        $("#goodsDetailBtnBox").find(".goods-over-btn").remove();
                                    var h = MI.cart.barCartTmpl()
                                        , v = doT.template(h);
                                    $("#goodsSubBarBtnBox").html(v(o)),
                                    goodsConfig.isPackage && !goodsConfig.defaultGoodsId && ($("#goodsDetailAddCartBtn").removeAttr("id"),
                                        $("#goodsSubBarAddCartBtn").removeAttr("id"))
                                }
                            }
                            var C = e.goods.style.list
                                , I = [];
                            if (C) {
                                for (var _ in C)
                                    if (C.hasOwnProperty(_)) {
                                        var k = C[_];
                                        k.size = _,
                                            I.push(k)
                                    }
                                if (0 !== I.length) {
                                    var y = MI.cart.sizeTmpl()
                                        , b = doT.template(y);
                                    $("#J_goodsSize").html(b(I))
                                }
                            }
                        }
                    };
                    MI.itemUtil.jsonP(t, i)
                },
                judgeClothSize: function() {
                    $(document).on("mouseover", "#goodsDetailAddCartBtn", function() {
                        if (0 === parseInt(goodsConfig.defaultGoodsId) && 0 === parseInt(goodsConfig.isPackage)) {
                            var t = '<div class="goodsDetailInfo">请选择尺码</div>'
                                , e = $("#goodsDetailBtnBox").find(".goodsDetailInfo").length;
                            0 === e ? ($("#goodsDetailBtnBox").append(t),
                                $("#goodsDetailBtnBox").find(".goodsDetailInfo").show()) : $("#goodsDetailBtnBox").find(".goodsDetailInfo").show(),
                                $(".goods-add-cart-btn").addClass("stopCursor")
                        } else
                            $(".goods-add-cart-btn").removeClass("stopCursor");
                        return !1
                    }).on("mouseout", "#goodsDetailAddCartBtn", function() {
                        $("#goodsDetailBtnBox").find(".goodsDetailInfo").remove()
                    }),
                        $(document).on("click", ".goods-add-cart-btn", function() {
                            if (0 === parseInt(goodsConfig.defaultGoodsId) && 0 === parseInt(goodsConfig.isPackage)) {
                                var t = $(this).attr("id");
                                return "goodsSubBarAddCartBtn" === t && MI.itemUtil.showErrorModal("请选择您要购买的商品" + goodsConfig.goodsStyleName),
                                    !1
                            }
                        });
                    var t = $("#goodsDetailAddCartBtn").attr("data-gid");
                    0 === parseInt(t) && $(".goods-add-cart-btn").attr("data-disabled", "true"),
                        $(document).on("click", ".goodsStyle", function() {
                            var t = $(this).hasClass("disabled");
                            if (!t) {
                                $(".goods-add-cart-btn").attr("data-disabled", "false").removeClass("stopCursor"),
                                    $(this).parent().addClass("current").siblings("li").removeClass("current");
                                var e = $(this).attr("data-price")
                                    , o = $(this).attr("data-is-cos");
                                goodsConfig.defaultGoodsId = $(this).attr("data-id"),
                                    goodsConfig.isCos = o,
                                    $(".J_mi_goodsPrice").html(e);
                                var i = $("#goodsDetailAddCartBtn")
                                    , n = $("#goodsSubBarAddCartBtn")
                                    , a = goodsConfig.needChioce
                                    , r = goodsConfig.isPackage
                                    , s = 0 === parseInt(goodsConfig.defaultGoodsId) && 1 === parseInt(goodsConfig.isPackage) ? goodsConfig.commodityId + "-" + goodsConfig.scenarioId + "-1" : goodsConfig.defaultGoodsId
                                    , d = function() {
                                    return a ? MI.GLOBAL_CONFIG.orderSite + "/item/batchView/bid/" + goodsConfig.commodityId + "/gid/0/c/1" : r ? MI.GLOBAL_CONFIG.cartSite + "/cart/add/" + goodsConfig.commodityId + "-" + goodsConfig.scenarioId + "-1" : MI.GLOBAL_CONFIG.cartSite + "/cart/add/" + goodsConfig.defaultGoodsId + "-" + goodsConfig.scenarioId + "-1"
                                }
                                    , c = d();
                                if (goodsConfig.isCos)
                                    if ($(".goods-add-cart-btn").length > 0)
                                        i.attr("href", c).attr("data-gid", s).attr("data-package", a),
                                            n.attr("href", c).attr("data-gid", s).attr("data-package", a);
                                    else {
                                        var l = {
                                            nextStep: c,
                                            addCartGid: s,
                                            needChioce: a
                                        }
                                            , m = MI.cart.cartTmpl()
                                            , u = doT.template(m);
                                        $("#goodsDetailBtnBox").find(".goods-over-btn").after(u(l)),
                                            $("#goodsDetailBtnBox").find(".goods-over-btn").remove();
                                        var g = MI.cart.barCartTmpl()
                                            , f = doT.template(g);
                                        $("#goodsSubBarBtnBox").html(f(l))
                                    }
                                else
                                    $(".goods-add-cart-btn").length > 0 && $(".goods-add-cart-btn").remove(),
                                    $(".goods-over-btn").length > 0 && $(".goods-over-btn").remove(),
                                        $("#goodsDetailCollectBtn").before(MI.cart.stockTmpl()),
                                        $("#goodsSubBarBtnBox").html(MI.cart.stockTmpl())
                            }
                        })
                },
                addShopCart: function() {
                    var t = function(t) {
                        var o = $("#goodsDetailAddCartBtn").attr("data-gid");
                        o = o.split("-")[0];
                        var i = MI.GLOBAL_CONFIG.staticSite + "/buySuccess/?gid=" + o;
                        1 === t.code ? location.href = e.pageData.rediectCartSite ? MI.GLOBAL_CONFIG.staticSite + "/cart" : i : MI.itemUtil.showErrorModal(t.message)
                    }
                        , e = this;
                    e.pageData.redirectFlag || MI.bigtapAddCart({
                        obj: "#goodsSubBarAddCartBtn, #goodsDetailAddCartBtn",
                        callback: function(e) {
                            t(e)
                        }
                    });
                    var o = function() {
                        var t = $("#goodsDetailAddCartBtn").attr("data-gid")
                            , e = MI.GLOBAL_CONFIG.damiaoSite + "hdinfo/cn"
                            , o = $.inArray(t, MI.GLOBAL_CONFIG.damiaoGoodsId) >= 0 ? !0 : !1;
                        o && $.ajax({
                            type: "GET",
                            url: e,
                            dataType: "jsonp",
                            jsonp: "jsonpcallback",
                            jsonpCallback: "hdinfo",
                            timeour: 1e4,
                            error: function() {},
                            success: function(e) {
                                e.status[t] || (e.status[t] = {
                                    hdstart: !1,
                                    hdstop: !0
                                }),
                                e.status[t].hdstart === !1 && e.status[t].hdstop === !0 && $("#goodsDetailAddCartBtn, #goodsSubBarAddCartBtn").removeClass("btn-primary").addClass("btn-gray").html("暂时缺货").attr("data-disabled", "true")
                            }
                        })
                    };
                    o()
                },
                showStoreBtnStatus: function() {
                    var t = $.cookie("userId")
                        , e = this;
                    if (t && !jiangpeiConfig.closeFavoriteStatusShow) {
                        var o = {};
                        o.count = 0,
                            o.url = MI.GLOBAL_CONFIG.orderSite + "/favorite/check/id/" + goodsConfig.commodityId,
                            e.storeAjax(o)
                    }
                },
                storeAjax: function(t) {
                    var e = this
                        , o = function(t, o) {
                        if (1 === t.code)
                            $("#goodsDetailCollectBtn").attr("data-isfavorite", "true").addClass("current"),
                            "del" === o.btype && $("#goodsDetailCollectBtn").attr("data-isfavorite", "false").removeClass("current");
                        else if (-1 === t.code)
                            MI.itemUtil.showErrorModal(t.message);
                        else if (-2 === t.code && (o.count++,
                            1 === o.count))
                            if ($.cookie("userId")) {
                                var i = function() {
                                    $.proxy(e.storeAjax(o), e)
                                };
                                MI.itemUtil.syncLoginStatus(MI.GLOBAL_CONFIG.orderSite, i)
                            } else
                                MI.itemUtil.rediectLogin()
                    };
                    MI.itemUtil.jsonP(t, o)
                },
                changeStoreBtnStatus: function() {
                    var t = this
                        , e = {};
                    $(document).on("click", "#goodsDetailCollectBtn", function() {
                        var o = $(this).attr("data-isfavorite");
                        e.count = 0,
                            "true" === o ? (e.btype = "del",
                                e.url = MI.GLOBAL_CONFIG.orderSite + "/favorite/drop/id/" + goodsConfig.commodityId) : (e.url = MI.GLOBAL_CONFIG.orderSite + "/favorite/add/id/" + goodsConfig.commodityId,
                                e.btype = "add",
                                $(".J_redCopy").addClass("redsd")),
                            t.storeAjax(e)
                    })
                },
                clickToSpot: function() {
                    var t = this;
                    t.hasLoadLazyMethod = !1,
                        $("body").on("click", ".J_scrollHref", function() {
                            t.hasLoadLazyMethod || (t.needLazyMethod(),
                                t.hasLoadLazyMethod = !0);
                            var e = $(this).attr("data-href");
                            $(".J_itemBox").hide(),
                                "#goodsDesc" === e ? ($(".J_itemBox").show(),
                                    $("#goodsSubMenu > ul > li:eq(0)").addClass("current").siblings("li").removeClass("current")) : ($(".J_itemBox").show(),
                                    $("#goodsDesc").hide());
                            var o = function() {
                                var t = $("#J_recommendComment").height()
                                    , i = $("#J_commentDetailBlock").height();
                                if (t > 0 && i > 0) {
                                    var n = $(e).offset().top - 59;
                                    $("body,html").animate({
                                        scrollTop: n
                                    }, 500)
                                } else
                                    setTimeout(o, 100)
                            };
                            setTimeout(o, 100)
                        })
                },
                renderServicePage: function() {
                    var t = shouhouData[goodsConfig.catId];
                    if (t) {
                        var e = MI.goodsDetailUtil.dotmpl($("#service-tmpl"), t);
                        $("#J_serviceCon").html(e)
                    } else
                        $("#goodsService").hide(),
                            $(".goods-detail-service-block").hide()
                },
                scorllCommentPic: function() {
                    MI.itemUtil.scrollLeftRight()
                },
                clickBatch: function() {
                    var t = this;
                    $("body").on("click", ".J_batchBtn", function() {
                        if ($(this).hasClass("disabled"))
                            return !1;
                        var e = $(this).attr("data-id");
                        if ($(this).siblings("li").removeClass("current"),
                                $(this).addClass("current"),
                                $(".goodsBatchNextStep").remove(),
                            "none" === e)
                            return $(".J_goodsDetail").removeClass("showBatchLayer"),
                                !1;
                        var o = t.pageData.recommend_package
                            , i = {};
                        o && (i = o[e]);
                        var n = MI.goodsDetailUtil.dotmpl($("#batch-tmpl"), i);
                        $(".J_goodsBatchImg").html(n),
                            $(".J_goodsDetail").addClass("showBatchLayer");
                        var a = $("#goodsDetailBtnBox").find(".goods-add-cart-btn").length;
                        if (0 === a)
                            return !1;
                        var r = '<div class="goodsBatchNextStep" data-pkid = "' + e + '">下一步</div>';
                        $("#goodsDetailBtnBox").append(r),
                            $("#goodsSubBarBtnBox").append(r),
                            $("#goodsSubBarBtnBox").find(".goodsBatchNextStep").attr("id", "J_subGoodsBatchNextStep")
                    }),
                        $(document).on("mouseover", ".goodsBatchNextStep", function() {
                            if (0 === parseInt(goodsConfig.defaultGoodsId) && 0 === parseInt(goodsConfig.isPackage)) {
                                var t = '<div class="goodsDetailInfo">请选择尺码</div>'
                                    , e = $("#goodsDetailBtnBox").find(".goodsDetailInfo").length;
                                0 === e ? ($("#goodsDetailBtnBox").append(t),
                                    $("#goodsDetailBtnBox").find(".goodsDetailInfo").show()) : $("#goodsDetailBtnBox").find(".goodsDetailInfo").show(),
                                    $(".goodsBatchNextStep").addClass("stopCursor")
                            } else
                                $(".goodsBatchNextStep").removeClass("stopCursor");
                            return !1
                        }).on("mouseout", ".goodsBatchNextStep", function() {
                            $("#goodsDetailBtnBox").find(".goodsDetailInfo").remove()
                        }),
                        $(document).on("click", ".goodsBatchNextStep", function() {
                            if (0 === parseInt(goodsConfig.defaultGoodsId) && 0 === parseInt(goodsConfig.isPackage)) {
                                var t = $(this).attr("id");
                                return "J_subGoodsBatchNextStep" === t && MI.itemUtil.showErrorModal("请选择您要购买的商品" + goodsConfig.goodsStyleName),
                                    !1
                            }
                            var e = $(this).attr("data-pkid")
                                , o = goodsConfig.defaultGoodsId;
                            location.href = MI.GLOBAL_CONFIG.cartSite + "/item/suitRecommend/gid/" + o + "/sid/" + e
                        })
                },
                clickShowBigImg: function() {
                    var t = this;
                    t.commentApi.clickShowBigImg()
                },
                clickItemImg: function() {
                    var t = this
                        , e = {}
                        , o = 0;
                    t.canSet = !0,
                        $("body").on("click", ".J_bigPicBlock", function() {
                            var i = $(window).height();
                            if (600 > i)
                                return !1;
                            $("#goodsPicZoomBlock").remove();
                            var n = []
                                , a = 0;
                            $("#goodsPicList").find("li").each(function(t) {
                                var e = $(this).find("img");
                                $(this).hasClass("current") && (a = t);
                                var o = {
                                    sml: e.attr("src"),
                                    big: e.attr("data-src-b"),
                                    bigWid: 800
                                };
                                if (900 > i) {
                                    var r = 100
                                        , s = i - r;
                                    o.big = o.big.replace("800x800", s + "x" + s),
                                        o.bigWid = s
                                }
                                n.push(o)
                            }),
                                e.imgArr = n,
                                e.curIndex = a;
                            var r = $("#itemBigImg-tmpl").html()
                                , s = doT.template(r);
                            $("body").append(s(e)),
                                900 > i ? ($("#J_zoomBigBlock").addClass("suoHei"),
                                    $(".J_itemZoomSmlList").addClass("suoHei")) : ($("#J_zoomBigBlock").removeClass("suoHei"),
                                    $(".J_itemZoomSmlList").removeClass("suoHei")),
                                t.ciiInitEle(),
                                t.canSet = !1;
                            var d = function() {
                                $("#J_zoomBigBlock").addClass("changeDivZoom")
                            }
                                , c = function() {
                                $("#goodsPicZoomBlock").addClass("transAll"),
                                    $("#goodsPicZoomBlock").removeClass("zoomImgInit-b"),
                                    $("#J_zoomBigBlock").removeAttr("style"),
                                    $("#J_zoomBigBlock").find("img").removeAttr("style");
                                var t = e.imgArr[e.curIndex].bigWid;
                                $("#J_zoomBigBlock").find("img").css("margin-left", "-" + t / 2 + "px").css("width", t + "px").css("height", t + "px"),
                                    $("#J_zoomBigBlock").find(".img").css("margin-left", "-" + t / 2 + "px").css("width", t + "px").css("height", t + "px"),
                                    setTimeout(d, 400)
                            }
                                , l = function() {
                                $("#goodsPicZoomBlock").removeClass("zoomImgInit-a"),
                                    setTimeout(c, 100)
                            }
                                , m = {
                                imgsrc: e.imgArr[e.curIndex].big
                            };
                            MI.itemUtil.imgLoad(m, l),
                                o = e.curIndex;
                            var u = $("#goodsPicList").find("li").length
                                , g = 80 * u
                                , f = -(80 * u) / 2 + 5;
                            $(".J_itemZoomSmlList").css("width", g).css("margin-left", f + "px")
                        }),
                        $("body").on("click", ".J_exitItemBig", function() {
                            t.canSet = !0;
                            var e = function() {
                                $("#goodsPicZoomBlock").remove()
                            }
                                , o = function() {
                                $("#goodsPicZoomBlock").addClass("zoomImgInit-a"),
                                    setTimeout(e, 300)
                            }
                                , i = function() {
                                t.initSetEle(),
                                    $("#goodsPicZoomBlock").addClass("zoomImgInit-b"),
                                    setTimeout(o, 800)
                            };
                            setTimeout(i, 100),
                                $("#J_zoomBigBlock").removeClass("changeDivZoom")
                        });
                    var i = function(t) {
                        o = t;
                        var i = e.imgArr.length;
                        0 === t ? ($(".J_itemZoomLeft").addClass("dective"),
                            $(".J_itemZoomRight").removeClass("dective")) : t === i - 1 ? ($(".J_itemZoomLeft").removeClass("dective"),
                            $(".J_itemZoomRight").addClass("dective")) : ($(".J_itemZoomLeft").removeClass("dective"),
                            $(".J_itemZoomRight").removeClass("dective")),
                            $("#J_zoomBigBlock").addClass("loaded");
                        var n = function(e) {
                            $("#J_zoomBigBlock").find(".img").css("background-image", "url(" + e.img.src + ")"),
                                $("#J_zoomBigBlock").find("img").attr("src", e.img.src),
                                $("#J_zoomBigBlock").removeClass("loaded"),
                                $(".J_itemZoomSmlList").find("li").removeClass("current"),
                                $(".J_itemZoomSmlList").find("li").eq(t).addClass("current")
                        }
                            , a = {
                            imgsrc: e.imgArr[t].big
                        };
                        MI.itemUtil.imgLoad(a, n),
                            $("#goodsPicList").find("li").eq(t).click()
                    };
                    $("body").on("click", ".J_itemZoomLeft", function() {
                        return o--,
                            0 > o ? (o = 0,
                                !1) : void i(o)
                    }),
                        $("body").on("click", ".J_itemZoomRight", function() {
                            return o++,
                                o > e.imgArr.length - 1 ? (o = e.imgArr.length - 1,
                                    !1) : void i(o)
                        }),
                        $("body").on("click", ".J_itemZoomSmlList > li", function() {
                            var t = $(this).index();
                            i(t)
                        })
                },
                ciiInitEle: function() {
                    var t = this
                        , e = function() {
                        t.initSetEle()
                    };
                    e(),
                        $(window).resize(function() {
                            e()
                        }),
                    document.addEventListener && document.addEventListener("DOMMouseScroll", function() {
                        e()
                    }, !1),
                        window.onmousewheel = document.onmousewheel = function() {
                            e()
                        }
                },
                lazyloadDescImg: function() {
                    var t = goodsConfig.descDetail;
                    t = t.replace(/src/g, "data-src"),
                        $("#goodsDesc").find(".detailBlock").html(t);
                    var e = -1
                        , o = $("#goodsDesc").find(".detailBlock")
                        , i = o.find("img").length
                        , n = this
                        , a = function(t) {
                        if (t.isError)
                            return c(),
                                !1;
                        var i = t.img
                            , n = i.height
                            , a = o.find("img").eq(e).attr("data-src");
                        o.find("img").eq(e).attr("src", a),
                            s = n + s,
                            c()
                    }
                        , r = parseInt($(window).height())
                        , s = $("#goodsDesc").offset().top
                        , d = function() {
                        n.hasLoadLazyMethod || (n.needLazyMethod(),
                            n.hasLoadLazyMethod = !0)
                    }
                        , c = function() {
                        var t = document.documentElement.scrollTop || document.body.scrollTop
                            , n = parseInt(t) + 2 * r;
                        if (s > n)
                            return l = !0,
                                !1;
                        if (e += 1,
                            e > i - 1)
                            return d(),
                                !1;
                        var m = o.find("img").eq(e)
                            , u = m.attr("data-src");
                        if (!u)
                            return c(),
                                !1;
                        if (m.attr("data-ignoreHei")) {
                            var g = m.attr("data-src");
                            return m.attr("src", g),
                                c(),
                                !1
                        }
                        var f = {
                            imgsrc: o.find("img").eq(e).attr("data-src")
                        };
                        MI.itemUtil.imgLoad(f, a)
                    }
                        , l = !1;
                    c(),
                        $(window).on("scroll.imgload", function() {
                            l && (l = !1,
                                c())
                        })
                },
                initSetEle: function() {
                    var t = this;
                    if (t.canSet) {
                        var e = $(window).height()
                            , o = $(document).scrollTop()
                            , i = $(".J_bigPicBlock")
                            , n = i.offset().top - o
                            , a = i.offset().left
                            , r = i.find("img").width()
                            , s = i.find("img").height();
                        $("#goodsPicZoomBlock").css("height", e),
                            $("#J_zoomBigBlock").find("img").css("width", r).css("height", s),
                            $("#J_zoomBigBlock").find("img").css("top", n).css("left", a).css("margin-left", "0px").css("margin-top", "0px")
                    }
                },
                descriptionInteractSet: function() {
                    function t(t, e, o) {
                        return "<iframe height=" + o + " width=" + e + ' src="//hd.mi.com/f/zt/hd/misc/youku.html?vid=' + t + "&width=" + e + "&height=" + o + '" frameborder=0 allowfullscreen></iframe>'
                    }
                    $("#goodsDesc").find(".huandengpian").each(function() {
                        var t = !1;
                        $(this).attr("pager") && (t = !0);
                        var e = [];
                        $(this).find("img").each(function() {
                            e.push($(this).attr("src") ? $(this).attr("src") : $(this).attr("data-src"))
                        });
                        var o = MI.goodsDetailUtil.dotmpl($("#carousel-tmpl"), e);
                        $(this).replaceWith(o);
                        var i = $(".J_itemCarousel").find("img").eq(0).attr("src");
                        i || (i = $(".J_itemCarousel").find("img").eq(0).attr("data-src"));
                        var n = {
                            imgsrc: i
                        }
                            , a = function(e) {
                            var o = e.img.height;
                            $(".J_itemCarousel").find("li").css("height", o),
                                $(".J_itemCarousel").show(),
                                $(".J_itemCarousel").carousel({
                                    controlsClass: "xm-controls-block-middle",
                                    pager: t,
                                    onLoad: function(t) {
                                        t.closest(".xm-carousel-container").find(".pager").each(function(t) {
                                            $(this).addClass("pager-" + t)
                                        })
                                    },
                                    itemPerSlide: 1
                                })
                        };
                        MI.itemUtil.imgLoad(n, a)
                    });
                    var e = $("#goodsDesc").find(".video").length
                        , o = function() {
                        $("#goodsDesc").find(".video").each(function() {
                            var e = $(this).attr("code")
                                , o = t(e, 1226, 730);
                            $(this).html(o)
                        })
                    };
                    0 !== e && o(),
                        $("#goodsDesc").find("a").each(function() {
                            var t = $(this).attr("href");
                            return t ? void ("#" === t.substring(0, 1) && $(this).click(function() {
                                return $("#goodsDesc").find(".tag").each(function() {
                                    var e = $(this).attr("data-id");
                                    if (e === t) {
                                        var o = $(this).offset().top;
                                        $("body,html").animate({
                                            scrollTop: o
                                        }, 500)
                                    }
                                }),
                                    !1
                            })) : !1
                        }),
                        $("#goodsDesc").find(".J_itemVideo").each(function() {
                            $(this).click(function() {
                                var e = $("#J_modalVideo .modal-bd");
                                return e.html(""),
                                    e.append(t($(this).attr("href"), 880, 536)),
                                    $("#J_modalVideo").modal("show").on("hidden", function() {
                                        e.html("")
                                    }),
                                    !1
                            })
                        })
                }
            },
            $(function() {
                MI.goodsDetail.init()
            })
    }
    , function(t, e) {
        var o = {
            cartTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     <a href="{{=it.nextStep}}" id="goodsDetailAddCartBtn" class="btn  btn-primary goods-add-cart-btn"
                     data-disabled="false" data-gid="{{=it.addCartGid}}" data-package="{{=it.needChioce}}">
                     <i class="iconfont "></i>加入购物车
                     </a>
                     */
                    console.log()
                });
                return t
            },
            barCartTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     <a href="{{=it.nextStep}}" class="btn btn-primary goods-add-cart-btn"
                     id="goodsSubBarAddCartBtn" data-disabled="false" data-gid="{{=it.addCartGid}}"
                     data-package="{{=it.needChioce}}" >
                     <i class="iconfont">&#xe624;</i>加入购物车</a>
                     */
                    console.log()
                });
                return t
            },
            sizeTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     {{~it:sizeObj:index}}
                     {{? sizeObj.is_sale}}
                     <li class=' '>
                     <a href="javascript:void(0);" class="item goodsStyle {{? sizeObj.is_cos}}disabled{{?}}"
                     data-id="{{=sizeObj.goods_id}}" data-price="{{=sizeObj.price}}"  data-is-cos="{{=sizeObj.is_cos}}" >
                     {{=sizeObj.size}}
                     </a>
                     </li>
                     {{?}}
                     {{~}}
                     */
                    console.log()
                });
                return t
            },
            stockTmpl: function() {
                return "<a class='btn btn-disabled goods-over-btn'>暂时缺货</a>"
            },
            registerTmpl: function(t) {
                return '<a href="' + t + '"  class="btn btn-gray goods-over-btn"><i class="iconfont" ></i>到货通知</a>'
            },
            detailTmpl: function(t) {
                return '<a href="' + t + '" target="_blank" class="btn btn-primary goods-over-btn" ><span class="iconfont"></span>查看详情</a>'
            }
        };
        t.exports = o
    }
    , function(t, e, o) {
        MI.namespace("goodsCommentTmpl, itemUtil"),
            MI.goodsCommentTmpl = o(4),
            MI.itemUtil = o(5),
            MI.pagenav = o(6);
        var i = function(t) {
            var e = this;
            e.randomColorIndex = [];
            for (var o = 1; 11 > o; o++)
                e.randomColorIndex.push(o);
            e.option = t,
                MI.itemUtil.trimInit()
        };
        i.prototype = {
            constructor: i,
            initCommentList: function(t) {
                var e = this
                    , o = e.option.getCommenturlHead + "comment/entry/getSummary?goods_id=" + e.option.proId + "&sstart=0&slen=10&astart=0&alen=10"
                    , i = function(t) {
                    if (0 === t.code) {
                        e.comment = t.data,
                            e.oriComment = $.extend(!0, {}, t.data);
                        var o = t.data.total_count;
                        o > 0 ? ($("#goodsCommentContent").removeClass("noContent"),
                            $("#goodsCommentContent").addClass("hasContent")) : ($("#goodsCommentContent").removeClass("hasContent"),
                            $("#goodsCommentContent").addClass("noContent")),
                            $("#J_loadCommentMore").attr("data-amount", o),
                            $.proxy(e.renderCommentAftergetAll(), e),
                        t.data.support_comments.length && $.proxy(e.setCommemntLikeStatus(), e)
                    }
                };
                t ? o = e.option.getCommenturlHead + "comment/entry/getSummary?goods_id=" + e.option.proId + "&sstart=0&slen=0&astart=0&alen=0" : (e.moreCommentList(),
                    e.answerToComment(),
                    e.clickLikeBtn(),
                    e.clickLikeCustomService(),
                    e.keyboardControl()),
                    MI.itemUtil.jsonpCache(o, i)
            },
            keyboardControl: function() {
                document.onkeydown = function(t) {
                    var e = t || window.event
                        , o = $("body").hasClass("showZoomImg");
                    e && 27 === e.keyCode && o && $("#JimageModal").modal("hide"),
                    e && 39 === e.keyCode && o && $(".J_zoomright").click(),
                    e && 37 === e.keyCode && o && $(".J_zoomLeft").click()
                }
            },
            renderCommentAftergetAll: function() {
                var t = this;
                if (t.option.recommendBlock && t.renderRecommentList(),
                        t.option.supCommentBlock) {
                    var e = {
                        amount: 5,
                        startIndex: 0
                    };
                    t.renderSupCommentList(e)
                }
                t.option.timelineCommentBlock && t.renderTimelineCommentList()
            },
            getLikeStatusCallback: function(t) {
                var e = this
                    , o = function(t) {
                    e.likeStatus = t.data,
                        $.proxy(e.renderSupCommentLikeStatus(), e),
                        $.proxy(e.renderNewCommentLikeStatus(), e),
                        $.proxy(e.renderDetailCommentLikeStatus(), e)
                }
                    , i = function(t, i) {
                    if (0 === t.code)
                        o(t);
                    else if (-1001 === t.code && (i.count++,
                        1 === i.count && $.cookie("userId"))) {
                        var n = function() {
                            $.proxy(e.getLikeStatusCallback(i), e)
                        };
                        MI.itemUtil.syncLoginStatus(e.option.answerCommentUrlHead, n)
                    }
                };
                MI.itemUtil.jsonP(t, i)
            },
            renderDetailCommentLikeStatus: function() {
                var t = this
                    , e = t.likeStatus;
                if (t.option.detailCommentBlock) {
                    var o = t.option.detailCommentBlock
                        , i = o.attr("data-id");
                    e && e[i] && (e[i].customer && o.find(".J_csLike").addClass("current"),
                    e[i].up && o.find(".J_hasHelp").addClass("current"),
                    e[i].down && o.find(".J_noHelp").addClass("current"))
                }
            },
            renderSupCommentLikeStatus: function() {
                var t = this
                    , e = t.likeStatus;
                if (t.option.supCommentBlock && e) {
                    var o = function(t) {
                        var e = parseInt(t.find(".amount").html());
                        0 === e && t.find(".amount").html(1)
                    }
                        , i = function(t) {
                        var e = parseInt(t.find(".amount").html());
                        0 === e && t.find(".amount").html("&nbsp;")
                    };
                    t.option.supCommentBlock.find("li").each(function() {
                        var t = $(this)
                            , n = t.attr("data-id");
                        e[n] && (e[n].customer ? (t.find(".J_csLike").addClass("current"),
                            o(t.find(".J_csLike"))) : i(t.find(".J_csLike")),
                            e[n].up ? (t.find(".J_hasHelp").addClass("current"),
                                o(t.find(".J_hasHelp"))) : i(t.find(".J_hasHelp")),
                            e[n].down ? (t.find(".J_noHelp").addClass("current"),
                                o(t.find(".J_noHelp"))) : i(t.find(".J_noHelp")))
                    })
                }
            },
            renderNewCommentLikeStatus: function() {
                var t = this
                    , e = t.likeStatus;
                if (t.option.timelineCommentBlock && e) {
                    var o = function(t) {
                        var e = parseInt(t.find(".amount").html());
                        0 === e && t.find(".amount").html(1)
                    }
                        , i = function(t) {
                        var e = parseInt(t.find(".amount").html());
                        0 === e && t.find(".amount").html("")
                    };
                    t.option.timelineCommentBlock.find("li").each(function() {
                        var t = $(this)
                            , n = t.attr("data-id");
                        e[n] && (e[n].up ? (t.find(".J_hasHelp").addClass("current"),
                            o(t.find(".J_hasHelp"))) : i(t.find(".J_hasHelp")))
                    })
                }
            },
            setCommemntLikeStatus: function() {
                var t = this
                    , e = t.oriComment
                    , o = [];
                for (var i in e.support_comments)
                    if (e.support_comments.hasOwnProperty(i)) {
                        var n = e.support_comments[i].comment_id;
                        o.push(n)
                    }
                for (var a in e.addtime_comments)
                    if (e.addtime_comments.hasOwnProperty(a)) {
                        var r = e.addtime_comments[a].comment_id;
                        o.push(r)
                    }
                for (var s in e.comments)
                    if (e.comments.hasOwnProperty(s)) {
                        var d = e.comments[s].comment_id;
                        o.push(d)
                    }
                var c = o.join(",")
                    , l = {
                    count: 0,
                    url: t.option.answerCommentUrlHead + "/comment/entry/checkUp?comment_ids=" + c
                };
                t.getLikeStatusCallback(l)
            },
            renderRecommentList: function() {
                var t = this
                    , e = MI.goodsCommentTmpl.recommendTmpl()
                    , o = doT.template(e)
                    , i = t.comment.recommand_comments
                    , n = t.randomColorIndex.sort(function() {
                    return .5 - Math.random()
                });
                for (var a in i)
                    if (i.hasOwnProperty(a)) {
                        var r = i[a];
                        r.randomIndex = n[a],
                        r.user_avatar || (r.user_avatar = MI.itemUtil.randomHeadImg())
                    }
                t.option.recommendBlock.html(o(t.comment))
            },
            renderSupCommentList: function(t) {
                var e = this
                    , o = t.amount
                    , i = t.startIndex
                    , n = t.appendFlag
                    , a = e.comment.support_comments || e.comment.comments;
                if (a && a.length) {
                    var r = e.randomColorIndex.sort(function() {
                        return .5 - Math.random()
                    })
                        , s = ["失望", "一般", "满意", "喜欢", "超爱"]
                        , d = ["e613", "e61f", "e60e", "e619", "e604"]
                        , c = function(t) {
                        for (var e in t)
                            if (t.hasOwnProperty(e)) {
                                var o = t[e];
                                o.user_avatar || (o.user_avatar = MI.itemUtil.randomHeadImg(),
                                    o.reply_content = MI.itemUtil.dataToHtml(o.reply_content))
                            }
                    };
                    for (var l in a)
                        if (a.hasOwnProperty(l)) {
                            var m = a[l];
                            m.check_time = parseInt(m.check_time);
                            var u = MI.itemUtil.calShowTime(m.check_time || m.add_timestamp, e.comment.server_time);
                            m.showTime = u,
                                m.randomIndex = r[l],
                                m.loveText = s[parseInt(m.total_grade) - 1],
                                m.loveIcon = d[parseInt(m.total_grade) - 1],
                            m.user_avatar || (m.user_avatar = MI.itemUtil.randomHeadImg()),
                                m.comment_content = MI.itemUtil.dataToHtml(m.comment_content),
                                c(m.user_replys)
                        }
                    var g = [];
                    if (a.length > o) {
                        $("#J_loadCommentMore").removeClass("hide");
                        for (var f = 0; o > f; f++) {
                            var p = a.shift();
                            g.push(p)
                        }
                    } else
                        g = a.slice(),
                            e.comment.support_comments = [],
                            e.comment.comments = [];
                    var h = MI.goodsCommentTmpl.supCommentTmpl()
                        , v = doT.template(h);
                    n ? e.option.supCommentBlock.append(v(g)) : (i = 0,
                        e.option.supCommentBlock.html(v(g)));
                    var C = g.length;
                    e.reRenderImgSizeInComment(e.option.supCommentBlock, i, C)
                }
            },
            reRenderImgSizeInComment: function(t, e, o) {
                for (var i = function(e) {
                    var o = e.i
                        , i = e.b
                        , n = e.img
                        , a = t.find(".J_commentContent").eq(o)
                        , r = a.find(".commentImg").eq(i)
                        , s = r.attr("data-src")
                        , d = r.parent().width()
                        , c = parseInt(n.width)
                        , l = parseInt(n.height);
                    if (c > l) {
                        r.css({
                            height: d + "px"
                        });
                        var m = c * d / l;
                        r.css({
                            marginLeft: "-" + (m - d) / 2 + "px"
                        })
                    } else {
                        r.css({
                            width: d + "px"
                        });
                        var u = l * d / c;
                        r.css({
                            marginTop: "-" + (u - d) / 2 + "px"
                        })
                    }
                    r.attr("src", s),
                        r.attr("data-width", c),
                        r.attr("data-height", l),
                        r.parent().addClass("showimg")
                }, n = function(t, e) {
                    e.find(".commentImg").each(function(e) {
                        var o = $(this).attr("data-src")
                            , n = {
                            i: t,
                            b: e,
                            imgsrc: o
                        };
                        MI.itemUtil.imgLoad(n, i)
                    })
                }, a = e; e + o > a; a++) {
                    var r = t.find(".J_commentContent").eq(a);
                    n(a, r)
                }
            },
            renderTimelineCommentList: function(t) {
                var e = this;
                t || (t = 5);
                var o = e.comment.addtime_comments;
                if (o) {
                    var i = e.randomColorIndex.sort(function() {
                        return .5 - Math.random()
                    });
                    for (var n in o)
                        if (o.hasOwnProperty(n)) {
                            var a = o[n]
                                , r = MI.itemUtil.calShowTime(a.check_time, e.comment.server_time);
                            a.showTime = r,
                                a.randomIndex = i[n]
                        }
                    var s = [];
                    if (o.length > t) {
                        $("#J_loadCommentMore").removeClass("hide");
                        for (var d = 0; t > d; d++) {
                            var c = o.shift();
                            s.push(c)
                        }
                    } else
                        s = o.slice();
                    var l = MI.goodsCommentTmpl.timelineCommentTmpl()
                        , m = doT.template(l);
                    e.option.timelineCommentBlock.html(m(s));
                    var u = s.length;
                    e.reRenderImgSizeInComment(e.option.timelineCommentBlock, 0, u)
                }
            },
            moreCommentList: function() {
                var t = this
                    , e = function() {
                    var e = t.comment.addtime_comments;
                    if (e.length > 0) {
                        var o = MI.goodsCommentTmpl.timelineCommentTmpl()
                            , i = doT.template(o);
                        t.option.timelineCommentBlock.append(i(e)),
                            t.reRenderImgSizeInComment(t.option.timelineCommentBlock, 5, e.length)
                    }
                    var n = t.comment.support_comments;
                    if (n.length > 0) {
                        var a = MI.goodsCommentTmpl.supCommentTmpl()
                            , r = doT.template(a);
                        t.option.supCommentBlock.append(r(n)),
                            t.reRenderImgSizeInComment(t.option.supCommentBlock, 5, n.length)
                    }
                }
                    , o = function() {
                    $.proxy(t.renderSupCommentLikeStatus(), t),
                        $.proxy(t.renderNewCommentLikeStatus(), t)
                };
                $("body").on("click", "#J_loadCommentMore", function() {
                    e(),
                        o(),
                        $("#J_loadCommentMore").addClass("hide");
                    var t = $(this).attr("data-amount");
                    parseInt(t) > 10 && $("#J_loadMoreHref").removeClass("hide")
                })
            },
            answerToCommentCallback: function(t) {
                var e = this
                    , o = function(t, o) {
                    if (0 === t.code)
                        MI.itemUtil.showErrorModal("发表成功，请等待审核"),
                            o.recover();
                    else if (-1001 === t.code) {
                        if (o.count++,
                            1 === o.count)
                            if ($.cookie("userId")) {
                                var i = function() {
                                    $.proxy(e.answerToCommentCallback(o), e)
                                };
                                MI.itemUtil.syncLoginStatus(e.option.answerCommentUrlHead, i)
                            } else
                                MI.itemUtil.rediectLogin()
                    } else
                        MI.itemUtil.showErrorModal(t.description)
                };
                MI.itemUtil.jsonP(t, o)
            },
            answerToComment: function() {
                var t = this
                    , e = null;
                $("body").on("click", ".J_commentAnswerBtn", function() {
                    e = $(this).prev("input");
                    var o = e.val().trim();
                    if ("" === o)
                        return MI.itemUtil.showErrorModal("不能为空"),
                            !1;
                    if (o.length > 140)
                        return MI.itemUtil.showErrorModal("字数不能超过140"),
                            !1;
                    var i = MI.itemUtil.revertStr(o)
                        , n = $.cookie("userId");
                    if (!n)
                        return MI.itemUtil.rediectLogin(),
                            !1;
                    var a = $(this).attr("data-commentId")
                        , r = t.option.answerCommentUrlHead + "/comment/entry/reply?comment_id=" + a + "&parent_id=0&content=" + i + "&user_id=" + n
                        , s = {
                        url: r,
                        count: 0,
                        recover: function() {
                            e.val(""),
                                e.parent().parent().removeClass("showIn")
                        }
                    };
                    return t.answerToCommentCallback(s),
                        !1
                }),
                    $("body").on("focus", ".J_commentAnswerInput", function() {
                        var t = $(this);
                        t.parent().parent().addClass("showIn")
                    })
            },
            clickLikeBtn: function() {
                var t = this
                    , e = function(e, n) {
                    if (0 === e.code) {
                        var a = i.parent()
                            , r = 0;
                        r = parseInt(a.find(".J_hasHelp").children(".amount").html()),
                        r || (r = 0),
                            e.data.up ? a.find(".J_hasHelp").addClass("current") : a.find(".J_hasHelp").removeClass("current"),
                            r += e.data.up_num,
                        0 >= r && (r = "&nbsp;"),
                            a.find(".J_hasHelp").children(".amount").html(r);
                        var s = 0;
                        s = parseInt(a.find(".J_noHelp").children(".amount").html()),
                        s || (s = 0),
                            e.data.down ? a.find(".J_noHelp").addClass("current") : a.find(".J_noHelp").removeClass("current"),
                            s += e.data.down_num,
                        0 >= s && (s = "&nbsp;"),
                            a.find(".J_noHelp").children(".amount").html(s)
                    } else if (-1001 === e.code && (n.count++,
                        1 === n.count))
                        if ($.cookie("userId")) {
                            var d = function() {
                                $.proxy(o(n), t)
                            };
                            MI.itemUtil.syncLoginStatus(t.option.answerCommentUrlHead, d)
                        } else
                            MI.itemUtil.rediectLogin()
                }
                    , o = function(t) {
                    MI.itemUtil.jsonP(t, e)
                }
                    , i = null;
                $("body").on("click", ".J_hasHelp", function() {
                    i = $(this);
                    var e = $(this).attr("data-commentid")
                        , n = t.option.answerCommentUrlHead + "/comment/entry/up?comment_id=" + e
                        , a = {
                        count: 0,
                        url: n
                    };
                    o(a)
                }),
                    $("body").on("click", ".J_noHelp", function() {
                        i = $(this);
                        var e = $(this).attr("data-commentid")
                            , n = t.option.answerCommentUrlHead + "/comment/entry/down?comment_id=" + e
                            , a = {
                            count: 0,
                            url: n
                        };
                        o(a)
                    })
            },
            clickLikeCustomService: function() {
                var t = null
                    , e = this
                    , o = function(o, n) {
                    if (0 === o.code) {
                        var a = t.find(".amount").html();
                        a || (a = 0),
                            a = parseInt(a),
                            o.data.up ? (a++,
                                t.addClass("current")) : (a--,
                                t.removeClass("current")),
                        0 > a && (a = 0),
                            t.find(".amount").html(a)
                    } else if (-1001 === o.code && (n.count++,
                        1 === n.count))
                        if ($.cookie("userId")) {
                            var r = function() {
                                $.proxy(i(n), e)
                            };
                            MI.itemUtil.syncLoginStatus(e.option.answerCommentUrlHead, r)
                        } else
                            MI.itemUtil.rediectLogin()
                }
                    , i = function(t) {
                    MI.itemUtil.jsonP(t, o)
                };
                $("body").on("click", ".J_csLike", function() {
                    t = $(this);
                    var o = $(this).attr("data-commentid")
                        , n = e.option.answerCommentUrlHead + "/comment/entry/upCustomer?comment_id=" + o
                        , a = {
                        count: 0,
                        url: n
                    };
                    i(a)
                })
            },
            showImgOnly: function() {
                var t = this
                    , e = null
                    , o = function(t) {
                    var e = this;
                    if (0 === t.code) {
                        e.comment = t.data,
                            e.oriComment = $.extend(!0, {}, t.data);
                        var o = t.data.total_count;
                        if (0 === parseInt(o))
                            return MI.itemUtil.showErrorModal("暂时还没有带图评价哦~ "),
                                $(".J_showImg").removeClass("current"),
                                !1;
                        $("#J_loadCommentMore").attr("data-amount", o);
                        var i = 10 * (t.data.page_current - 1)
                            , n = {
                            amount: 10,
                            startIndex: i
                        };
                        e.renderSupCommentList(n),
                            e.setCommemntLikeStatus(),
                            t.data.page_total > 1 ? MI.pagenav($("#J_commentPagenav"), t.data.page_total, t.data.page_current) : $("#J_commentPagenav").html("")
                    }
                };
                $("body").on("click", ".J_showImg", function() {
                    e = $(this);
                    var i = 0;
                    e.hasClass("current") ? e.removeClass("current") : (e.addClass("current"),
                        i = 1);
                    var n = 10
                        , a = 1
                        , r = 1;
                    $(".J_commentOrder").find("a").each(function() {
                        $(this).hasClass("current") && (r = $(this).attr("data-order"))
                    });
                    var s = MI.goodsDetailConfig.commentOrderUrl + "/comment/entry/getList?goods_id=" + t.option.proId + "&pagesize=" + n + "&pageindex=" + a + "&orderby=" + r + "&showimg=" + i;
                    MI.itemUtil.jsonpCache(s, $.proxy(o, t))
                })
            },
            clickShowBigImg: function() {
                var t = MI.goodsCommentTmpl.zoomTmplDiv();
                $("body").append(t),
                    $("#JimageModal").on("hide.bs.modal", function() {
                        $("body").removeClass("showZoomImg")
                    });
                var e = function(t) {
                    var e = t.width
                        , o = t.height
                        , i = 800
                        , n = 450
                        , a = "";
                    if (i > e && n > o) {
                        var r = (n - o) / 2;
                        a = "margin-top:" + r + "px"
                    } else {
                        var s = parseInt(i * o / e);
                        if (n > s) {
                            var d = (n - s) / 2;
                            a = "width:" + i + "px;margin-top:" + d + "px"
                        } else
                            a = "height:" + n + "px"
                    }
                    return a
                }
                    , o = {};
                $("body").on("click", ".J_canZoomImg", function() {
                    if (!$(this).hasClass("showimg"))
                        return !1;
                    var t = $(this).find("img").attr("src")
                        , i = $(this).parent()
                        , a = i.find("img")
                        , r = []
                        , s = 0;
                    o.curSrc = t,
                        o.width = $(this).find("img").attr("data-width"),
                        o.height = $(this).find("img").attr("data-height"),
                        n = 0,
                        o.cssStr = e(o),
                        a.each(function(e) {
                            var o = $(this).attr("src");
                            o === t && (s = e);
                            var i = $(this).attr("data-width")
                                , n = $(this).attr("data-height")
                                , a = {
                                src: o,
                                width: i,
                                height: n
                            }
                                , d = ""
                                , c = 60;
                            d = parseInt(i) > parseInt(n) ? "height:" + c + "px" : "width:" + c + "px",
                                a.cssStr = d,
                                r.push(a)
                        }),
                        o.curIndex = s,
                        o.smlArr = r;
                    var d = r.length
                        , c = 74 * d + 2;
                    o.smlNavCss = "width:" + c + "px";
                    var l = MI.goodsCommentTmpl.zoomImgTmpl()
                        , m = doT.template(l);
                    $("#JimageModal").html(m(o)),
                        $("#JimageModal").modal("show"),
                        $("body").addClass("showZoomImg")
                });
                var i = function(t) {
                    var o = $(".J_zoomNav").attr("data-amount");
                    0 === t ? ($(".J_zoomLeft").addClass("dective"),
                        $(".J_zoomright").removeClass("dective")) : t === parseInt(o) - 1 ? ($(".J_zoomLeft").removeClass("dective"),
                        $(".J_zoomright").addClass("dective")) : ($(".J_zoomright").removeClass("dective"),
                        $(".J_zoomLeft").removeClass("dective")),
                        n = 0;
                    var i = $("#JimageModal").hasClass("cantrans");
                    i && $("#JimageModal").removeClass("cantrans");
                    var a = $(".J_zoomSmlImg").eq(t);
                    a.siblings("li").removeClass("current"),
                        a.addClass("current"),
                        $(".J_zoomNav").attr("data-index", t);
                    var r = a.find("img").attr("data-width")
                        , s = a.find("img").attr("data-height")
                        , d = a.find("img").attr("src")
                        , c = {
                        width: r,
                        height: s
                    }
                        , l = e(c)
                        , m = $(".J_zoomBigImg").width()
                        , u = $(".J_zoomBigImg").height();
                    $(".J_zoomImgContainer").find(".img").css("width", m).css("height", u).css("margin-left", "-" + m / 2 + "px").css("margin-top", "-" + u / 2 + "px"),
                        $(".J_zoomBigImg").fadeOut(200);
                    var g = function() {
                        $(".J_zoomBigImg").attr("src", d),
                            $(".J_zoomBigImg").attr("style", l);
                        var t = $(".J_zoomBigImg").width()
                            , e = $(".J_zoomBigImg").height();
                        $(".J_zoomImgContainer").find(".img").css("width", t).css("height", e).css("margin-left", "-" + t / 2 + "px").css("margin-top", "-" + e / 2 + "px");
                        var o = function() {
                            $(".J_zoomImgContainer").removeClass("loaded"),
                                $(".J_zoomBigImg").fadeIn(500)
                        };
                        setTimeout(o, 400)
                    };
                    $(".J_zoomImgContainer").addClass("loaded"),
                        setTimeout(g, 200);
                    var f = function() {
                        i && $("#JimageModal").addClass("cantrans")
                    };
                    setTimeout(f, 200)
                };
                $("body").on("click", ".J_zoomSmlImg", function() {
                    var t = $(this).index();
                    i(t)
                }),
                    $("body").on("click", ".J_zoomLeft", function() {
                        var t = $(".J_zoomNav").attr("data-index");
                        t--,
                        0 > t || i(t)
                    }),
                    $("body").on("click", ".J_zoomright", function() {
                        var t = $(".J_zoomNav").attr("data-index");
                        t++;
                        var e = $(".J_zoomNav").attr("data-amount");
                        t > e - 1 || i(t)
                    });
                var n = 0
                    , a = MI.itemUtil.supportCss3("transition");
                if (a) {
                    $("#JimageModal").addClass("canRotate"),
                        $("#JimageModal").addClass("cantrans");
                    var r = function(t, e) {
                        t.style.webkitTransform = e,
                            t.style.MozTransform = e,
                            t.style.msTransform = e,
                            t.style.OTransform = e,
                            t.style.transform = e
                    }
                        , s = function(t) {
                        var e = 90 * t
                            , o = $(".J_zoomBigImgBlock").find("img")[0];
                        r(o, "rotate(" + e + "deg)")
                    };
                    $("body").on("click", ".J_rotateLeft", function() {
                        n--,
                            s(n)
                    }),
                        $("body").on("click", ".J_rotateRight", function() {
                            n++,
                                s(n)
                        })
                }
            }
        },
            t.exports = i
    }
    , function(t, e) {
        var o = {
            recommendTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     <div class="container" >
                     <ul class='main-block'>
                     <li class='percent'>
                     <div class="per-num">
                     <i>{{=it.satisfy_rate}}</i>%
                     </div>
                     <div class="per-title">
                     购买后满意
                     </div>
                     <div class="per-amount">
                     <i>{{=it.total_count}}</i>名用户投票
                     </div>
                     </li>
                     {{~it.recommand_comments:com:index}}
                     <li class="item-rainbow-{{=com.randomIndex}} groom-content">
                     <dl>
                     <dt>
                     <div class="groom-content-userImage">
                     <img src="{{=com.user_avatar}}" alt="">
                     </div>
                     <div class="groom-content-userName">{{=com.user_name}}</div>
                     <div class="groom-content-commentNum">{{=com.similar_count}}人有相似评价</div>
                     </dt>
                     <dd>
                     <i class='iconfont'>&#xe625;</i> {{=com.content}}
                     </dd>
                     </dl>
                     </li>
                     {{~}}

                     </ul>
                     </div>
                     */
                    console.log()
                });
                return t
            },
            supCommentTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     {{~it: comt: index}}
                     <li class='item-rainbow-{{=comt.randomIndex}}' data-id='{{=comt.comment_id}}'>
                     <div class="user-image">
                     <img src="{{=comt.user_avatar}}" alt="">
                     </div>
                     <div class="user-emoj">
                     {{=comt.loveText}}<i class="iconfont">&#x{{=comt.loveIcon}};</i>
                     </div>
                     <div class="user-name-info">
                     <span class="user-name">
                     {{=comt.user_name}}
                     </span>
                     <span class="user-time">{{=comt.showTime}}</span>
                     <span class="pro-info">{{=comt.spec_value}}</span>
                     </div>
                     <div class="user-hand-block">
                     <a href="javascript:void(0);" data-commentid='{{=comt.comment_id}}'
                     class='J_hasHelp {{?comt.up_status}}current{{?}}'>
                     <i class='iconfont'>&#xe60f;</i>赞&nbsp;<span class='amount'>
                     {{=parseInt(comt.up_num)}}</span></a>
                     </div>
                     <dl class='user-comment'>
                     <dt class='user-comment-content J_commentContent' >
                     <p class="content-detail">
                     <a href='{{=MI.GLOBAL_CONFIG.orderSite+"/comment/commentDetail/comment_id/"
                     +comt.comment_id}}' target='_blank'>
                     {{=comt.comment_content}}
                     </a>
                     </p>
                     {{?comt.comment_images.length> 0}}
                     <div class="content-img format-{{=comt.comment_images.length}}">
                     {{~comt.comment_images:img:imindex}}
                     <div class="img-{{=imindex}} img-block J_canZoomImg">
                     <img class="commentImg" data-src="{{=img}}" alt="">
                     <div class="loader loader-gray"></div>
                     </div>
                     {{~}}
                     </div>
                     {{?}}
                     </dt>
                     <dd class='user-comment-self-input'>
                     <div class="input-block">
                     <input type="text" placeholder="回复楼主" class='J_commentAnswerInput'/>
                     <a href="javascript:void(0);" class='btn  answer-btn J_commentAnswerBtn'
                     data-commentId = '{{=comt.comment_id}}'>回复</a>
                     </div>
                     </dd>
                     {{?comt.reply_content}}
                     <dd class="user-comment-answer">
                     <img class='self-image'
                     src="{{=MI.GLOBAL_CONFIG.assetsSite + '/i/logo.png'}}" alt="">
                     <p>{{=comt.reply_content}}<span class='official-name'>官方回复</span>
                     <a href="javascript:void(0);" class="J_csLike {{?comt.customer_status}}current {{?}}"
                     data-commentid='{{=comt.comment_id}}'>
                     <i class='iconfont'>&#xe60f;</i>赞客服&nbsp;
                     {{?comt.reply_up_num!=0}}
                     <span class='amount'>
                     {{=parseInt(comt.reply_up_num)}}</span>
                     {{?}}
                     </a></p>
                     </dd>
                     {{?}}
                     {{~comt.user_replys:reply:replyindex}}
                     <dd class="user-comment-answer">
                     <img class='self-image'
                     src="{{=reply.user_avatar}}" alt="">
                     <p>{{=reply.reply_content}}- <span class='answer-user-name' >{{=reply.user_name}}</span> </p>
                     </dd>
                     {{~}}
                     {{?parseInt(comt.user_reply_num)>3}}
                     <dd class="user-comment-answer-more">

                     <a href='{{=MI.GLOBAL_CONFIG.orderSite+"/comment/commentDetail/comment_id/"
                     +comt.comment_id}}' target='_blank'>
                     查看全部{{=comt.user_reply_num}}条回复&gt;
                     </a>
                     </dd>
                     {{?}}
                     </dl>
                     </li>
                     {{~}}
                     */
                    console.log()
                });
                return t
            },
            timelineCommentTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     {{~it:com:index}}
                     <li class='purple timelineunit J_commentContent'  data-id='{{=com.comment_id}}'>
                     <h4 class="line-time">{{=com.showTime}}</h4>
                     <p class="line-content">
                     <a href='{{=MI.GLOBAL_CONFIG.orderSite+"/comment/commentDetail/comment_id/"
                     +com.comment_id}}' target='_blank'>
                     {{=com.comment_content}}
                     </a>
                     </p>
                     {{? com.comment_images.length!= 0}}
                     <div class="line-imglist">
                     <div class="line-time-img-block J_imgScrollListBlock" data-liwid='84'>
                     <ul class="line-time-img J_imgList" style='width:{{=com.comment_images.length * 84}}px'>
                     {{~com.comment_images: img: imgIndex}}
                     <li class='con-img J_canZoomImg'>
                     <img data-src="{{=img}}" class="commentImg" alt="">
                     </li>
                     {{~}}
                     </ul>
                     </div>
                     {{?com.comment_images.length > 3}}
                     <ul class="nav-block " data-page='1' data-pageSize='3'>
                     <div class="left-nav J_navleft dective">
                     <i class="iconfont">&#xe629;</i>
                     </div>
                     <div class="right-nav J_navright">
                     <i class="iconfont">&#xe624;</i>
                     </div>
                     </ul>
                     {{?}}
                     </div>
                     {{?}}
                     <div class="line-foot">
                     <div class="line-left">来自于 {{=com.user_name}}</div>
                     <div class="line-right J_hasHelp {{?com.up_status}}current{{?}}" data-commentid="{{=com.comment_id}}">
                     <i class="iconfont">&#xe60f;</i>有帮助&nbsp;&nbsp;<span class='amount'>{{?com.up_status}}
                     {{=parseInt(com.up_num)+1}}{{??}}{{=parseInt(com.up_num)}}{{?}}</span>
                     </div>
                     </div>
                     <div class="line-dot item-rainbow-{{=com.randomIndex}}"></div>
                     </li>
                     {{~}}
                     */
                    console.log()
                });
                return t
            },
            replyContentTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     {{~it:reply:replyindex}}
                     <dd class="user-comment-answer">
                     <img class='self-image'
                     src="{{=reply.user_avatar}}" alt="">
                     <p>{{=reply.reply_content}}- <span class='answer-user-name' >{{=reply.user_name}}</span> </p>
                     </dd>
                     {{~}}
                     */
                    console.log()
                });
                return t
            },
            zoomTmplDiv: function() {
                var t = multiline(function() {
                    /*!@tpl
                     <div class="modal fade zoom-modal modal-hide" id='JimageModal'>
                     </div>
                     */
                    console.log()
                });
                return t
            },
            zoomImgTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                     <div class="modal-body">
                     <div class="big-img-block J_zoomBigImgBlock">
                     <div class="big-img-container J_zoomImgContainer">
                     <img src="{{=it.curSrc}}" class='J_zoomBigImg' style='{{=it.cssStr}}' alt="">
                     <div class="loader"></div>
                     <div class="img"></div>
                     </div>
                     <ul class='rotate-forward J_zoomRotateBtn'>
                     <li class='left-for J_rotateLeft'>向左旋转</li>
                     <li class='right-for J_rotateRight'>向右旋转</li>
                     </ul>
                     </div>
                     {{?it.smlArr.length > 1}}
                     <ul class="big-img-nav J_zoomNav" data-index='{{=it.curIndex}}' data-amount ='{{=it.smlArr.length}}'>
                     <div class="left-nav nav-block J_zoomLeft {{?it.curIndex===0}}dective{{?}}">
                     <i class='iconfont'>&#xe627;</i></div>
                     <div class="right-nav nav-block J_zoomright {{?it.curIndex===(it.smlArr.length-1)}}dective{{?}}">
                     <i class='iconfont'>&#xe622;</i></div>
                     </ul>
                     {{?}}
                     <ul class="sml-img-nav" style='{{=it.smlNavCss}}'>
                     {{~it.smlArr: img: index}}
                     <li class='{{?index===it.curIndex}}current{{?}} J_zoomSmlImg'>
                     <img src="{{=img.src}}" data-width='{{=img.width}}'
                     data-height='{{=img.height}}' style='{{=img.cssStr}}' alt="">
                     </li>
                     {{~}}

                     </ul>
                     </div>
                     */
                    console.log()
                });
                return t
            }
        };
        t.exports = o
    }
    , function(t, e) {
        var o = {
            jsonpCache: function(t, e) {
                $.ajax({
                    type: "GET",
                    url: t,
                    dataType: "jsonp",
                    cache: !0,
                    success: function(t) {
                        e(t)
                    }
                })
            },
            jsonP: function(t, e) {
                $.ajax({
                    type: "GET",
                    url: t.url,
                    dataType: "jsonp",
                    jsonp: "jsonpcallback",
                    success: function(o) {
                        e(o, t)
                    }
                })
            },
            imgLoad: function(t, e) {
                var o = new Image;
                o.src = t.imgsrc,
                    t.img = o,
                    o.complete ? e(t) : (o.onload = function() {
                            if ("naturalHeight"in this) {
                                if (this.naturalHeight + this.naturalWidth === 0)
                                    return void this.onerror()
                            } else if (this.width + this.height === 0)
                                return void this.onerror();
                            e(t),
                                o.onload = null
                        }
                            ,
                            o.onerror = function() {
                                t.isError = !0,
                                    e(t)
                            }
                    )
            },
            revertStr: function(t) {
                var e = String(t).replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                return encodeURIComponent(e)
            },
            dataToHtml: function(t) {
                return t = String(t).replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            },
            calShowTime: function(t, e) {
                var o = t;
                t = 1e3 * t;
                var i = e - o
                    , n = 86400
                    , a = 3600
                    , r = 60
                    , s = ""
                    , d = function(t) {
                    return parseInt(t) < 10 ? "0" + t : t
                };
                if (i >= n) {
                    var c = i / n;
                    if (c > 7) {
                        var l = new Date(t).getFullYear()
                            , m = new Date(t).getMonth() + 1
                            , u = new Date(t).getDate();
                        s = l + "年" + m + "月" + u + "日"
                    } else if (7 > c && c >= 3) {
                        var g = ["日", "一", "二", "三", "四", "五", "六"]
                            , f = new Date(t).getDay();
                        s = "星期" + g[f]
                    } else if (3 > c && c >= 2) {
                        var p = new Date(t).getHours()
                            , h = new Date(t).getMinutes();
                        s = "前天 " + d(p) + ":" + d(h)
                    } else if (2 > c) {
                        var v = new Date(t).getHours()
                            , C = new Date(t).getMinutes();
                        s = "昨天 " + d(v) + ":" + d(C)
                    }
                } else if (n > i && i >= a) {
                    var $ = parseInt(i / a);
                    s = $ + "小时前"
                } else if (a > i && i >= r) {
                    var I = parseInt(i / r);
                    s = I + "分钟前"
                } else
                    r > i && (s = "刚刚");
                return s
            },
            syncLoginStatus: function(t, e) {
                var o = t + "/user/proxy/stop/1"
                    , i = "<iframe src='" + o + "' width='0' height='0' name='proxy' id='proxy' frameborder='0' scrolling='no'></iframe>";
                $(document.body).append(i),
                    $("iframe[name='proxy']").load(function() {
                        $("iframe[name='proxy']").remove(),
                            e()
                    })
            },
            multilineDot: function() {
                $(".figcaption").each(function() {
                    for (var t = $(this).height(), e = $("p", $(this)).eq(0); e.outerHeight() > t; )
                        e.text(e.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."))
                })
            },
            scrollLeftRight: function() {
                var t = function(t, e) {
                    var o = parseInt(t.attr("data-page"))
                        , i = parseInt(t.attr("data-pageSize"))
                        , n = t.siblings(".J_imgScrollListBlock")
                        , a = n.find("li").length
                        , r = 0;
                    r = a % i === 0 ? a / i : parseInt(a / i) + 1;
                    var s = 0;
                    if (s = e ? o - 1 : o + 1,
                        1 > s)
                        return !1;
                    if (s > r)
                        return !1;
                    1 === s ? ($(".J_navleft").addClass("dective"),
                        $(".J_navright").removeClass("dective")) : s === r ? ($(".J_navleft").removeClass("dective"),
                        $(".J_navright").addClass("dective")) : ($(".J_navleft").removeClass("dective"),
                        $(".J_navright").removeClass("dective")),
                        t.attr("data-page", s);
                    var d = n.attr("data-liwid")
                        , c = 0;
                    if (r > s)
                        c = (s - 1) * i * d;
                    else if (a % i === 0)
                        c = (s - 1) * i * d;
                    else {
                        var l = a % i;
                        c = (s - 2) * i * d + l * d
                    }
                    n.find("ul").animate({
                        marginLeft: "-" + c + "px"
                    }, 500)
                };
                $("body").on("click", ".J_navleft", function() {
                    var e = $(this).parent();
                    t(e, !0)
                }),
                    $("body").on("click", ".J_navright", function() {
                        var e = $(this).parent();
                        t(e, !1)
                    })
            },
            accAdd: function(t, e) {
                var o, i, n, a;
                try {
                    o = t.toString().split(".")[1].length
                } catch (r) {
                    o = 0
                }
                try {
                    i = e.toString().split(".")[1].length
                } catch (r) {
                    i = 0
                }
                if (a = Math.abs(o - i),
                        n = Math.pow(10, Math.max(o, i)),
                    a > 0) {
                    var s = Math.pow(10, a);
                    o > i ? (t = Number(t.toString().replace(".", "")),
                        e = Number(e.toString().replace(".", "")) * s) : (t = Number(t.toString().replace(".", "")) * s,
                        e = Number(e.toString().replace(".", "")))
                } else
                    t = Number(t.toString().replace(".", "")),
                        e = Number(e.toString().replace(".", ""));
                return (t + e) / n
            },
            accSub: function(t, e) {
                var o, i, n, a;
                try {
                    o = t.toString().split(".")[1].length
                } catch (r) {
                    o = 0
                }
                try {
                    i = e.toString().split(".")[1].length
                } catch (r) {
                    i = 0
                }
                return n = Math.pow(10, Math.max(o, i)),
                    a = o >= i ? o : i,
                    ((t * n - e * n) / n).toFixed(a)
            },
            supportCss3: function(t) {
                var e, o = ["webkit", "Moz", "ms", "o"], i = [], n = document.documentElement.style, a = function(t) {
                    return t.replace(/-(\w)/g, function(t, e) {
                        return e.toUpperCase()
                    })
                };
                for (e in o)
                    o.hasOwnProperty(e) && i.push(a(o[e] + "-" + t));
                i.push(a(t));
                for (e in i)
                    if (i[e]in n)
                        return !0;
                return !1
            },
            rediectLogin: function(t) {
                var e = "";
                e = t ? t.url : location.href,
                    location.href = MI.GLOBAL_CONFIG.orderSite + "/site/login?redirectUrl=" + e
            },
            trimInit: function() {
                "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                        return this.replace(/^\s+|\s+$/g, "")
                    }
                )
            },
            shareSina: function(t, e, o, i) {
                window.open("http://service.weibo.com/share/share.php?title=" + encodeURIComponent(t) + "&url=" + encodeURIComponent(e) + "&appkey=" + encodeURIComponent(o) + "&pic=" + encodeURIComponent(i), "_blank", "scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes")
            },
            randomHeadImg: function() {
                var t = MI.GLOBAL_CONFIG.assetsSite + "/i/item/"
                    , e = ["head_1.png", "head_2.png", "head_3.png", "head_4.png"]
                    , o = parseInt(Math.random() * e.length)
                    , i = t + e[o];
                return i
            },
            showErrorModal: function(t, e) {
                var o = multiline(function() {
                    /*!@tpl
                     <div id="J_commentTipModal" class="modal fade modal-alert modal-hide">
                     <div class="modal-bd">
                     <div class="text">
                     <h3 class="title">{{=it.title}}</h3>
                     </div>
                     <div class="actions">
                     <button class="btn btn-primary" data-dismiss="modal">确定</button>
                     </div>
                     <a class="close" data-dismiss="modal" href="javascript: void(0);"><i class="iconfont">&#xe602;</i></a>
                     </div>
                     </div>

                     */
                    console.log()
                })
                    , i = multiline(function() {
                    /*!@tpl
                     <div id="J_commentTipModal" class="modal modal-alert modal-hide">
                     <div class="modal-bd">
                     <div class="text">
                     <h3 class="title">{{=it.title}}</h3>
                     </div>
                     <div class="actions">
                     <button class="btn btn-gray" data-dismiss="modal">取消</button>
                     <button class="btn btn-primary J_TipEnsure" >确定</button>
                     </div>
                     <a class="close" data-dismiss="modal" href="javascript: void(0);"><i class="iconfont">&#xe602;</i></a>
                     </div>
                     </div>

                     */
                    console.log()
                })
                    , n = o;
                e && (n = i);
                var a = doT.template(n)
                    , r = {
                    title: t
                }
                    , s = a(r)
                    , d = $("#J_commentTipModal").length;
                d > 0 && $("#J_commentTipModal").remove(),
                    $("body").append(s),
                    $("#J_commentTipModal").modal("show")
            }
        };
        t.exports = o
    }
    , function(t, e) {
        function o() {
            return multiline(function() {
                /*!@tpl
                 <div class="xm-pagenavi">
                 {{?it.pre}}
                 <a href="{{=it.opt.linkprefix}}{{=it.pre}}" class="numbers first"
                 data-pager="{{=it.pre}}"><span class="iconfont">&#xe629;</span></a>
                 {{??}}
                 <span class="numbers first"><span class="iconfont">&#xe629;</span></span>
                 {{?}}

                 {{?it.isF&&it.index==1}}
                 <span class="numbers current">1</span>
                 {{??it.isF&&it.index!=1}}
                 <a href="{{=it.opt.linkprefix}}1" class="numbers" data-pager="1">1</a>
                 {{?}}

                 {{?it.startXu}}
                 <span class="numbers">..</span>
                 {{?}}

                 {{for(var i=it.start;i<=it.end;i++){ }}
                 {{?i==it.index}}<span class="numbers current">{{=i}}</span>{{??}}
                 <a href="{{=it.opt.linkprefix}}{{=i}}" class="numbers" data-pager="{{=i}}">{{=i}}</a>{{?}}
                 {{ } }}

                 {{?it.endXu}}<span class="numbers">…</span>{{?}}

                 {{?it.isF&&it.index==it.pageAmount}}
                 <span class="numbers current">{{=it.pageAmount}}</span>
                 {{??it.isF&&it.index!=it.pageAmount}}
                 <a href="{{=it.opt.linkprefix}}{{=it.pageAmount}}" class="numbers"
                 data-pager="{{=it.pageAmount}}">{{=it.pageAmount}}</a>
                 {{?}}

                 {{?it.next}}
                 <a href="{{=it.opt.linkprefix}}{{=it.next}}" class="numbers last"
                 data-pager="{{=it.next}}"><span class='iconfont'>&#xe624;</span></a>{{??}}
                 <span class="numbers last"><span class='iconfont'>&#xe624;</span></span>
                 {{?}}
                 </div>
                 */
                console.log()
            })
        }
        var i = function(t, e, i, n) {
            var a = {};
            i || (i = 1);
            var r = {
                linkprefix: "#"
            };
            a.opt = $.extend({}, r, n),
                a.index = i,
                a.start = 1,
                a.end = e,
                a.pageAmount = e,
                a.endXu = !1,
                a.pre = "",
                a.next = a.index + 1,
                a.startXu = !1,
                a.isF = !1,
                1 === i ? (a.pre = "",
                    a.next = 1 === e ? "" : i + 1) : i === e ? (a.next = "",
                    a.pre = 1 === e ? "" : i - 1) : (a.pre = i - 1,
                    a.next = i + 1),
                8 > e ? (a.start = 1,
                    a.end = e) : (a.isF = !0,
                    5 > i ? (a.start = 2,
                        a.end = 5,
                        a.startXu = !1,
                        a.endXu = !0) : i > e - 5 ? (a.start = e - 5,
                        a.end = e - 1,
                        a.startXu = !0,
                        a.endXu = !1) : (a.start = i - 2,
                        a.end = i + 2,
                    a.end > e - 1 && (a.end = e - 1),
                        a.startXu = !0,
                        a.endXu = !0));
            var s = o()
                , d = doT.template(s)
                , c = d(a);
            t.html(c)
        };
        t.exports = i
    }
    , function(t, e, o) {
        MI.namespace("goodsQuestionTmpl, pagenav, itemUtil"),
            MI.goodsQuestionTmpl = o(8),
            MI.itemUtil = o(5),
            MI.pagenav = o(6);
        var i = function(t) {
            var e = this;
            e.option = t,
                e.order = "support",
                e.dataHelp = null,
                e.dataNewest = null,
                MI.itemUtil.trimInit()
        };
        i.prototype = {
            constructor: i,
            getQuestionListData: function(t) {
                var e = this
                    , o = e.option.questionUrlHead + "/ask/askList?product_id=" + e.option.proId + "&ask_mode=ask&order=support&pageindex=" + t.pageIndex + "&pagesize=" + t.pageSize
                    , i = function(t) {
                    if (0 === t.code) {
                        e.dataHelp = t,
                            e.filterQuestionListData(t);
                        var o = t.comments
                            , i = o.length;
                        i > 0 ? ($("#goodsFaqContent").removeClass("noContent"),
                            $("#goodsFaqContent").addClass("hasContent")) : ($(".J_inputQuestion").attr("data-can-search", !1),
                            $("#goodsFaqContent").removeClass("hasContent"),
                            $("#goodsFaqContent").addClass("noContent"))
                    }
                }
                    , n = {
                    url: o
                };
                MI.itemUtil.jsonP(n, i)
            },
            getNewestQuestionListData: function(t) {
                var e = this
                    , o = e.option.questionUrlHead + "/ask/askList?product_id=" + e.option.proId + "&ask_mode=ask&order=addtime&pageindex=" + t.pageIndex + "&pagesize=" + t.pageSize
                    , i = function(t) {
                    0 === t.code && (e.dataNewest = t,
                        e.filterQuestionListData(t))
                }
                    , n = {
                    url: o
                };
                MI.itemUtil.jsonP(n, i)
            },
            filterQuestionListData: function(t) {
                var e = t.comments
                    , o = []
                    , i = this;
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        var a = e[n]
                            , r = MI.itemUtil.calShowTime(a.add_timestamp, t.server_time)
                            , s = MI.itemUtil.calShowTime(a.reply_time, t.server_time);
                        a.showQuestionTime = r,
                            a.showAnswerTime = s,
                            o.push(a.comment_id)
                    }
                i.renderQuestionTmpl(t);
                var d = {
                    count: 0,
                    url: i.option.questionUrlHead + "/ask/checkAskUp?ask_ids=" + o.join(",")
                };
                i.checkLikeStatus(d)
            },
            checkLikeStatus: function(t) {
                var e = this
                    , o = function(t) {
                    $("#J_goodsQuestionBlock").find("li").each(function() {
                        var e = $(this).attr("data-id")
                            , o = t[e];
                        o && $(this).find(".J_questionLike").addClass("current")
                    })
                }
                    , i = function(t, i) {
                    if (0 === t.code) {
                        var n = t.data;
                        o(n)
                    } else if (-1001 === t.code && (i.count++,
                        1 === i.count && $.cookie("userId"))) {
                        var a = function() {
                            $.proxy(e.checkLikeStatus(i), e)
                        };
                        MI.itemUtil.syncLoginStatus(e.option.questionUrlHead, a)
                    }
                };
                MI.itemUtil.jsonP(t, i)
            },
            renderQuestionTmpl: function(t) {
                var e = this;
                $("#J_goodsQuestionAmount") && (parseInt(t.count) > 6 ? $("#J_goodsQuestionAmount").html(t.count) : $("#J_goodsQuestionAmount").parent().hide());
                var o = MI.goodsQuestionTmpl.questionTmpl()
                    , i = doT.template(o);
                e.option.questionBlock.html(i(t.comments));
                var n = t.total_page
                    , a = t.curr_page;
                $("#J_issuePagenav") && (n > 1 ? MI.pagenav($("#J_issuePagenav"), n, a) : $("#J_issuePagenav").html(""))
            },
            likeQuestion: function(t) {
                var e = this
                    , o = function(t, o) {
                    if (0 === t.code) {
                        1 === t.data.up ? o._curObj.addClass("current") : o._curObj.removeClass("current");
                        var i = o._curObj.find(".hand-number").html();
                        i = parseInt(i) + t.data.up,
                        0 > i && (i = 0),
                            o._curObj.find(".hand-number").html(i)
                    } else if (-1001 === t.code && (o.count++,
                        1 === o.count))
                        if ($.cookie("userId")) {
                            var n = function() {
                                $.proxy(e.likeQuestion(o), e)
                            };
                            MI.itemUtil.syncLoginStatus(e.option.questionUrlHead, n)
                        } else
                            MI.itemUtil.rediectLogin()
                };
                MI.itemUtil.jsonP(t, o)
            },
            clickEvent: function() {
                var t = this;
                $("body").on("click", ".J_questionHelp", function() {
                    t.order = "support",
                        $(this).siblings("a").removeClass("current"),
                        $(this).addClass("current");
                    var e = {
                        pageIndex: 1,
                        pageSize: $(this).attr("data-pageSize")
                    }
                        , o = $(".J_inputQuestion").val().trim();
                    "" !== o ? t.searchConent(e) : t.getQuestionListData(e)
                }),
                    $("body").on("click", ".J_questionNew", function() {
                        t.order = "addtime",
                            $(this).siblings("a").removeClass("current"),
                            $(this).addClass("current");
                        var e = {
                            pageIndex: 1,
                            pageSize: $(this).attr("data-pageSize")
                        }
                            , o = $(".J_inputQuestion").val().trim();
                        "" !== o ? t.searchConent(e) : t.getNewestQuestionListData(e)
                    }),
                    $("body").on("click", ".J_questionLike", function() {
                        var e = $(this)
                            , o = $(this).attr("data-id")
                            , i = t.option.questionUrlHead + "/ask/upAsk?ask_id=" + o
                            , n = {
                            count: 0,
                            _curObj: e,
                            url: i
                        };
                        t.likeQuestion(n)
                    }),
                    $("body").on("focus", ".J_inputQuestion", function() {
                        $(this).addClass("current")
                    }),
                    $("body").on("click", ".J_btnQuestion", function() {
                        var t = $(".J_inputQuestion").val().trim();
                        return "" === t ? void MI.itemUtil.showErrorModal("提问内容不能为空") : void MI.itemUtil.showErrorModal("您确认提交此问题吗？", !0)
                    }),
                    $("body").on("click", ".J_TipEnsure", function() {
                        $("#J_commentTipModal").modal("hide"),
                            t.askQuestion()
                    });
                var e = !0
                    , o = function() {
                    e = !0;
                    var o = $(".J_inputQuestion").attr("data-pageSize")
                        , i = {
                        pageIndex: 1,
                        pageSize: o
                    };
                    t.searchConent(i)
                }
                    , i = function() {
                    var t = (new Date).getTime();
                    t - a > 1e3 && (o(),
                        clearInterval(n))
                }
                    , n = null
                    , a = null;
                $("body").on("keyup", ".J_inputQuestion", function() {
                    var t = $(this).attr("data-can-search");
                    return "false" === t ? !1 : void (e && (e = !1,
                        a = (new Date).getTime(),
                        n = setInterval(i, 200)))
                }),
                    $("#J_issuePagenav").on("click", ".numbers", function() {
                        var e = $(this).attr("data-pager");
                        if (!e)
                            return !1;
                        var o = $("#J_issuePagenav").attr("data-pageSize")
                            , i = {
                            pageIndex: e,
                            pageSize: o
                        }
                            , n = $(".J_inputQuestion").val().trim();
                        return "" !== n ? t.searchConent(i) : t.getNewestQuestionListData(i),
                            $("body,html").animate({
                                scrollTop: 0
                            }, 500),
                            !1
                    })
            },
            postQuestion: function(t) {
                var e = this
                    , o = function(t, o) {
                    if (0 === t.code)
                        MI.itemUtil.showErrorModal("发表问题成功");
                    else if (-1001 === t.code) {
                        if (o.count++,
                            1 === o.count)
                            if ($.cookie("userId")) {
                                var i = function() {
                                    $.proxy(e.postQuestion(o), e)
                                };
                                MI.itemUtil.syncLoginStatus(e.option.questionUrlHead, i)
                            } else
                                MI.itemUtil.rediectLogin()
                    } else
                        -2 === t.code && MI.itemUtil.showErrorModal("您刚刚提交过该问题啦！ 知道了")
                };
                MI.itemUtil.jsonP(t, o)
            },
            askQuestion: function() {
                var t = this
                    , e = $(".J_inputQuestion").val().trim()
                    , o = MI.itemUtil.revertStr(e)
                    , i = t.option.proId
                    , n = t.option.commodityId
                    , a = {
                    count: 0,
                    url: t.option.questionUrlHead + "/ask/addAsk?product_id=" + i + "&content=" + o + "&ask_mode=ask&cid=" + n
                };
                t.postQuestion(a)
            },
            searchConent: function(t) {
                var e = this
                    , o = $(".J_inputQuestion")
                    , i = $(".J_inputQuestion").val().trim();
                if ("" === i) {
                    var n = null;
                    if ($(".J_questionHelp").hasClass("current")) {
                        if (n = e.dataHelp,
                                !n) {
                            var a = {
                                pageIndex: 1,
                                pageSize: $(".J_questionHelp").attr("data-pageSize")
                            };
                            return e.getQuestionListData(a),
                                !1
                        }
                    } else if (n = e.dataNewest,
                            !n) {
                        var r = {
                            pageIndex: 1,
                            pageSize: $(".J_questionNew").attr("data-pageSize")
                        };
                        return e.getNewestQuestionListData(r),
                            !1
                    }
                    return $("#J_goodsQuestionBlock").show(),
                        $(".J_questionOrderBlock").show(),
                        $(".J_nullInfo").hide(),
                        e.filterQuestionListData(n),
                        !1
                }
                if (i.length > 140)
                    return MI.itemUtil.showErrorModal("字数不能超过140"),
                        !1;
                var s = MI.itemUtil.revertStr(i)
                    , d = e.option.questionUrlHead + "/ask/search?product_id=" + e.option.proId + "&words=" + s + "&pagesize=" + t.pageSize + "&pageindex=" + t.pageIndex + "&order=" + e.order
                    , c = {
                    url: d,
                    count: 0,
                    recover: function() {
                        o.val(""),
                            o.removeClass("showIn")
                    }
                };
                return e.searchContentAjax(c),
                    !1
            },
            searchContentAjax: function(t) {
                var e = this
                    , o = function(t, o) {
                    if (0 === t.code)
                        t.comments && 0 !== t.comments.length ? ($("#J_goodsQuestionBlock").show(),
                            $(".J_questionOrderBlock").show(),
                            $(".J_nullInfo").hide()) : ($("#J_goodsQuestionBlock").hide(),
                            $(".J_questionOrderBlock").hide(),
                            $(".J_nullInfo").show()),
                            e.filterQuestionListData(t);
                    else if (-1001 === t.code && (o.count++,
                        1 === o.count))
                        if ($.cookie("userId")) {
                            var i = function() {
                                $.proxy(e.searchContentAjax(o), e)
                            };
                            MI.itemUtil.syncLoginStatus(e.option.questionUrlHead, i)
                        } else
                            MI.itemUtil.rediectLogin()
                };
                MI.itemUtil.jsonP(t, o)
            },
            initQuestionList: function() {
                var t = this
                    , e = {
                    pageIndex: 1,
                    pageSize: 6
                };
                t.getQuestionListData(e),
                    t.clickEvent()
            }
        },
            t.exports = i
    }
    , function(t, e) {
        var o = {
            questionTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     {{~it:faq:index}}
                     <li  data-id='{{=faq.comment_id}}'>
                     <div class="left-hand float ">
                     <div class="hand-block J_questionLike {{? faq.likeStatus}}current{{?}}" data-id={{=faq.comment_id}}>
                     <i class="iconfont">&#xe60f;</i><br>
                     <span class="hand-number">
                     {{=faq.up_num}}</span>
                     </div>
                     </div>
                     <div class="mid-detail float ">
                     <h3 class="question-title"><a target='_blank' href='{{=MI.GLOBAL_CONFIG.itemSite+
                     "/comment/askDetail/gid/"+goodsConfig.commodityId+"/askid/"+faq.comment_id+"/pid/"+
                     goodsConfig.productId}}'>{{=faq.content}}</a></h3>
                     <div class="answer-content figcaption">
                     <p>
                     {{=faq.reply_content}}
                     </p>
                     </div>
                     </div>
                     <div class="right-date float">
                     <div class="question-title-date">{{=faq.showQuestionTime }}</div>
                     <div class="answer-content-date">{{=faq.showAnswerTime   }}</div>
                     </div>
                     </li>
                     {{~}}
                     */
                    console.log()
                });
                return t
            },
            questionAnswerTmpl: function() {
                var t = multiline(function() {
                    /*!@tpl
                     {{~it:reply:replyindex}}
                     <div class="user-comment-answer">
                     <img class="self-image" src="{{=reply.user_avatar}}" alt="">
                     <p>
                     {{=reply.content}}
                     <span class="author-name">{{=reply.user_name}}</span>
                     <span class='create-date'>{{=reply.showtime}}</span>
                     </p>
                     </div>
                     {{~}}
                     */
                    console.log()
                });
                return t
            }
        };
        t.exports = o
    }
    , function(t, e, o) {
        o(10),
            o(11),
            function(t) {
                "use strict";
                function e(e) {
                    var n, r = d[a.type], s = t.cookie("userId") || "", c = t.cookie("mstuid");
                    switch (a.type) {
                        case 2:
                            var l = "?u=" + c + "&i=" + s + "&a=" + a.cid;
                            n = a.apiHost[2] + l,
                            "Home" === a.page && (n += "&c=AA");
                            break;
                        case 4:
                            n = a.apiHost[a.type] + "?mstuid=" + c + "&mid=" + s;
                            break;
                        default:
                            n = a.apiHost[a.type] + "?a=" + a.cid + "&cid=" + a.gid
                    }
                    t.ajax({
                        dataType: "JSONP",
                        url: n,
                        jsonpCallback: r,
                        cache: !0,
                        params: a,
                        success: function(n) {
                            if (n.type = this.params.type,
                                    n.title = this.params.title,
                                    n.global = MI.GLOBAL_CONFIG,
                                    n.iHost = this.params.iHost,
                                    n.isBuy = this.params.isBuy,
                                    n.useCarousel = this.params.useCarousel,
                                n.r.length < this.params.showMin)
                                return !1;
                            var a = t(e)
                                , r = o(12);
                            a.addClass("container").html(r(n));
                            var s = a.find("ul[data-carousel-list=true]").eq(0);
                            i(a, s, this.params),
                            null !== this.params.callback && "function" == typeof this.params.callback && this.params.callback()
                        }
                    })
                }
                function i(e, o, i) {
                    3 !== i.type && i.useCarousel && o.carousel({
                        containerSelector: e,
                        controls: i.carouselControl,
                        pager: i.carouselPage,
                        itemHeight: 320
                    }),
                    i.isBuy && (t(".J_xm-recommend-list").hover(function() {
                        t(this).find(".J_xm-recommend-btn").show()
                    }, function() {
                        t(this).find(".J_xm-recommend-btn").hide()
                    }),
                        t(".J_xm-recommend-btn").off(".addcart").on("click.addcart", function() {
                            function e() {
                                n.removeClass("xm-recommend-notice-active"),
                                    setTimeout(function() {
                                        o.removeClass("disabled"),
                                            n.empty()
                                    }, 500)
                            }
                            var o = t(this)
                                , n = o.parent().siblings(".xm-recommend-notice");
                            return o.hasClass("disabled") ? !1 : (MI.addShopCart(o.attr("data-stat-gid"), function(t) {
                                1 === t.code ? "Cart" !== i.page ? (n.addClass("xm-recommend-notice-active").empty().append('<a class="btn btn-block btn-green btn-notice" href="javascript: void(0);">成功加入购物车</a>'),
                                    n.find(".btn-notice").one("click", e),
                                    setTimeout(function() {
                                        e()
                                    }, 1e3)) : location.href = MI.GLOBAL_CONFIG.staticSite + "/cart/" : alert(t.msg)
                            }),
                                !1)
                        }));
                    var a = s.page[i.page]
                        , r = s.api[i.type];
                    n(e, a, r),
                    t.isFunction(t("body").linkSign) && e.linkSign({
                        live: !0
                    });
                    var d = e.attr("id")
                        , c = "re-" + a + "." + r;
                    t.force_appear(),
                        e.appear(),
                        e.one("appear", function() {
                            "undefined" != typeof _msq && _msq.push(["trackPanelShow", d, c])
                        })
                }
                function n(e, o, i) {
                    var n = e.find("a");
                    t.each(n, function(e, n) {
                        var a, r = t(n).attr("data-stat-index"), s = c(t(n).attr("data-stat-text")), d = t(n).attr("data-stat-method"), l = t(n).attr("data-stat-addcart");
                        a = l ? "stat_" + o + l + "." + i + "_" + r + "_" + d : "stat_" + o + "." + i + "_" + r + "_" + d,
                            t(n).attr({
                                "data-stat-pid": a,
                                "data-stat-aid": s
                            })
                    })
                }
                var a, r = {
                    cid: 2,
                    type: 1,
                    gid: "1152300005",
                    title: "",
                    showMin: 5,
                    apiHost: ["//rec.www.mi.com/alsoview/get", "//rec.www.mi.com/alsobuy/get", "//rec.www.mi.com/guesslike/get", "//rec.www.mi.com/cartbuy/get", "//rec.www.mi.com/viewlist/get"],
                    page: "Cart",
                    iHost: "//i1.mifile.cn/a1/",
                    isBuy: !1,
                    useCarousel: !0,
                    carouselControl: !1,
                    carouselPage: !0,
                    callback: null
                }, s = {
                    page: {
                        Home: "首页",
                        ItemTail: "单品页底部",
                        ComAll: "全部评论页",
                        ComSuc: "评论成功页",
                        AskAll: "全部提问页",
                        AskDetail: "提问详情页",
                        List: "列表页",
                        Cart: "购物车",
                        CartSuc: "加购成功",
                        Saleoff: "下架页",
                        Search: "搜索页",
                        ErrorTip: "报错页"
                    },
                    api: ["看了还看", "买了还买", "猜你喜欢", "购物车推荐", "您还看了"]
                }, d = ["recommend_alsoview", "recommend_alsobuy", "recommend_guesslike", "recommend_cart", "recommend_history"], c = function(t) {
                    try {
                        return t.replace(/\s/g, "")
                    } catch (e) {
                        return t
                    }
                };
                t.fn.miRecommend = function(o) {
                    a = t.extend(r, o),
                        e(this)
                }
            }(jQuery)
    }
    , function(t, e) {
        !function(t) {
            function e(e) {
                function o() {
                    return 0 >= C ? !1 : (I && clearInterval(I),
                        void (I = setTimeout(function() {
                            var t = _ === C - 1 ? 0 : _ + 1;
                            i(t),
                                o()
                        }, f.pause)))
                }
                function i(t) {
                    return _ === t ? !1 : ($.css({
                        marginLeft: -h * p * t,
                        transition: "margin-left " + f.speed / 1e3 + "s " + f.easing
                    }),
                    f.controls && (0 === t ? l.addClass("control-disabled") : l.removeClass("control-disabled"),
                        t === C - 1 ? m.addClass("control-disabled") : m.removeClass("control-disabled")),
                    f.pager && u.find("li").eq(t).addClass("pager-active").siblings().removeClass("pager-active"),
                        void (_ = t))
                }
                function n() {
                    for (var e = '<ul class="xm-pagers">', o = 0, n = C; n > o; o += 1)
                        e += '<li class="pager' + (0 === o ? " pager-active" : "") + '"><span class="dot">' + (o + 1) + "</span></li>";
                    e += "</ul>",
                        u.html(e),
                        u.find("li").off(".carousel").on("click.carousel", function() {
                            t(this).addClass("pager-active").siblings().removeClass("pager-active"),
                                i(u.find("li").index(t(this)))
                        })
                }
                function a() {
                    p = f.itemPerSlide || Math.ceil(s.width() / h),
                        C = Math.ceil(d.length / p),
                    1 >= C || (i(0),
                    f.pager && n(),
                    f.auto && (o(),
                    f.controls && c.find(".control").off(".carousel").on({
                        "mouseenter.carousel": function() {
                            I && clearTimeout(I)
                        },
                        "mouseleave.carousel": function() {
                            o()
                        }
                    }),
                    f.pager && u.find(".pager").off(".carousel").on({
                        "mouseenter.carousel": function() {
                            I && clearTimeout(I)
                        },
                        "mouseleave.carousel": function() {
                            o()
                        }
                    })))
                }
                var r, s, d, c, l, m, u, g, f, p, h, v, C, $ = t(this), I = 0, _ = -1;
                return g = {
                    itemSelector: "> li",
                    itemWidth: null,
                    itemHeight: null,
                    itemPerSlide: null,
                    containerSelector: null,
                    controlsSelector: null,
                    pagersSelector: null,
                    speed: 500,
                    easing: "ease",
                    auto: !1,
                    pause: 5e3,
                    controls: !0,
                    controlsClass: "xm-controls-line-small",
                    pager: !1,
                    onLoad: t.noop
                },
                    f = t.extend({}, g, e),
                    d = $.find(f.itemSelector),
                    f.itemPerSlide && d.length <= f.itemPerSlide ? this : (h = f.itemWidth || d.outerWidth(!0),
                        v = f.itemHeight || d.outerHeight(),
                        r = f.containerSelector ? $.closest(f.containerSelector) : $.parent(),
                        r.addClass("xm-carousel-container"),
                        s = $.wrap('<div class="xm-carousel-wrapper"></div>').closest(".xm-carousel-wrapper").css({
                            height: v,
                            overflow: "hidden"
                        }),
                        $.css("width", h * d.length),
                    f.controls && (c = t('<div class="xm-controls ' + f.controlsClass + ' xm-carousel-controls"><a class="control control-prev iconfont" href="javascript: void(0);">&#xe628;</a><a class="control control-next iconfont" href="javascript: void(0);">&#xe623;</a></div>'),
                        f.controlsSelector ? r.find(f.controlsSelector).append(c) : c.insertAfter(s),
                        l = c.find(".control-prev"),
                        m = c.find(".control-next"),
                        l.on("click", function(e) {
                            e.preventDefault(),
                            t(this).hasClass("control-disabled") || i(_ - 1)
                        }),
                        m.on("click", function(e) {
                            e.preventDefault(),
                            t(this).hasClass("control-disabled") || i(_ + 1)
                        })),
                    f.pager && (u = t('<div class="xm-pagers-wrapper"></div>'),
                        f.pagersSelector ? r.find(f.pagersSelector).append(u) : u.insertAfter(s)),
                        a(),
                        f.onLoad($),
                        void t(window).on("resize", a))
            }
            t.fn.carousel = function(t) {
                return this.each(function() {
                    e.call(this, t)
                }),
                    this
            }
        }(jQuery)
    }
    , function(t, e) {
        !function(t) {
            function e() {
                a = !1;
                for (var e = 0, n = i.length; n > e; e++) {
                    var r = t(i[e]).filter(function() {
                        return t(this).is(":appeared")
                    });
                    if (r.trigger("appear", [r]),
                            o) {
                        var s = o.not(r);
                        s.trigger("disappear", [s])
                    }
                    o = r
                }
            }
            var o, i = [], n = !1, a = !1, r = {
                interval: 250,
                force_process: !1
            }, s = t(window);
            t.expr[":"].appeared = function(e) {
                var o = t(e);
                if (!o.is(":visible"))
                    return !1;
                var i = s.scrollLeft()
                    , n = s.scrollTop()
                    , a = o.offset()
                    , r = a.left
                    , d = a.top;
                return d + o.height() >= n && d - (o.data("appear-top-offset") || 0) <= n + s.height() && r + o.width() >= i && r - (o.data("appear-left-offset") || 0) <= i + s.width() ? !0 : !1
            }
                ,
                t.fn.extend({
                    appear: function(o) {
                        var s = t.extend({}, r, o || {})
                            , d = this.selector || this;
                        if (!n) {
                            var c = function() {
                                a || (a = !0,
                                    setTimeout(e, s.interval))
                            };
                            t(window).scroll(c).resize(c),
                                n = !0
                        }
                        return s.force_process && setTimeout(e, s.interval),
                            i.push(d),
                            t(d)
                    }
                }),
                t.extend({
                    force_appear: function() {
                        return n ? (e(),
                            !0) : !1
                    }
                })
        }(jQuery)
    }
    , function(t, e) {
        t.exports = function(t) {
            var e = "";
            t.title && (e += '<h2 class="xm-recommend-title"><span>' + t.title + "</span></h2>"),
                e += '<div class="xm-recommend"><ul class="',
                e += 3 !== t.type && t.useCarousel ? "xm-carousel-col-5-list xm-carousel-list clearfix" : "row",
                e += '" data-carousel-list="true">';
            var o = t.r;
            if (o)
                for (var i, n = -1, a = o.length - 1; a > n; )
                    i = o[n += 1],
                        e += ' <li class="J_xm-recommend-list',
                    3 !== t.type && t.useCarousel || (e += " span4"),
                        e += '"> ',
                        i.ext && i.ext.img && i.ext.url ? e += ' <a target="_blank" href="' + i.ext.url + '" data-stat-gid="' + i.g + '" data-stat-method="' + t.v + "_" + i.a + '" data-stat-index=' + n + ' data-stat-text="' + i.n + '"> <img src="' + i.ext.img + '" width="100%" height="300px" alt="' + i.n + '"> </a> ' : (e += ' <dl> <dt> <a href="' + t.global.itemSite + "/" + i.c + '.html" data-stat-method="' + t.v + "_" + i.a + '" data-stat-index=' + n + ' data-stat-text="' + i.n + '" target="_blank"> <img src="' + t.iHost + i.i + '?width=140&height=140" srcset="' + t.iHost + i.i + '?width=280&height=280 2x" alt="' + i.n + '" /> </a> </dt> <dd class="xm-recommend-name"> <a href="' + t.global.itemSite + "/" + i.c + '.html" data-stat-method="' + t.v + "_" + i.a + '" data-stat-index=' + n + ' data-stat-text="' + i.n + '" target="_blank"> ' + i.n + ' </a> </dd> <dd class="xm-recommend-price">' + i.p + '元</dd> <dd class="xm-recommend-tips"> ',
                        i.l && 4 !== t.type && (e += " ",
                        parseInt(i.l) > 0 && (e += " " + i.l + "人好评 "),
                            e += " "),
                            e += " ",
                        t.isBuy === !0 && (e += ' <a href="' + t.global.cartSite + "/cart/add/" + i.g + '-0-1" data-stat-gid="' + i.g + '" data-stat-method="' + t.v + "_" + i.a + '" data-stat-index=' + n + ' data-stat-text="' + i.n + '" data-stat-addcart="加购" class="btn btn-small btn-line-primary J_xm-recommend-btn">加入购物车</a> '),
                            e += ' </dd> <dd class="xm-recommend-notice"></dd> </dl> '),
                        e += " </li>";
            return e += "</ul></div>"
        }
    }
    , function(t, e) {
        !function(t) {
            function e(e) {
                function o() {
                    for (var e = -1, o = t(document).scrollTop(), i = 0, n = c.length; n > i && o + r.viewport.height() > c[i]; i += 1)
                        e += 1;
                    return e
                }
                function i() {
                    var e = o();
                    d !== e && (d = e,
                        s.filter(function(e) {
                            return d >= e && !t(this).hasClass(r.visibleClass)
                        }).addClass(r.visibleClass).trigger("visible.visibleWatcher"),
                        r.onVisible(s.eq(d), d))
                }
                function n() {
                    s.each(function() {
                        var e = t(this).attr("data-offset") ? Number(t(this).attr("data-offset")) : r.offset
                            , o = e % 1 === 0 ? e : e * r.viewport.height();
                        c.push(t(this).offset().top + o)
                    }),
                        i(),
                        r.onLoad()
                }
                var a, r, s = t(this), d = -1, c = [];
                a = {
                    viewport: t(window),
                    visibleClass: "is-visible",
                    offset: 300,
                    onLoad: t.noop,
                    onVisible: t.noop
                },
                    r = t.extend({}, a, e),
                    n(),
                    r.viewport.on({
                        "scroll.visibleWatcher": i,
                        "resize.visibleWatcher": n
                    })
            }
            t.fn.visibleWatcher = function(t) {
                return e.call(this, t),
                    this
            }
        }(jQuery)
    }
]);
