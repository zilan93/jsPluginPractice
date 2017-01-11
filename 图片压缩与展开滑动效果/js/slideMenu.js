var slide = function () {
    /**
     * o----表示对象；
     * m----表示图片原宽
     * n----表示图片均宽
     * a----li对象集合
     * mw----最小宽度
     * d----持续时间
     * g----像素间隔
     */
    var o,m,n,a,mw,d,g,offsetWid;
    return {
        destruct: function () {
            if (o) {
                clearInterval(o.timer);
                clearInterval(o.htimer);
            }
        },
        build: function (sm, w, t, s, x) {
            o = document.getElementById(sm);
            m = w;
            d = t;
            g = s;
            a = $(o).find("li");
            offsetWid = o.offsetWidth;
            n = offsetWid / a.length;
            mw = Math.floor((offsetWid - m) / (a.length - 1));
            for (var i = 0; i < a.length; i++) {
                a[i].style.width = n + "px";
                this.timer(a[i]);
            }
            if (x != null) {
                o.timer = setInterval(function () {
                    slide.slide(a[x]);
                }, d);
                $(a[x]).find(".cover").hide();
            }
        },
        timer: function (obj) {
            obj.onmouseover = function () {
                clearInterval(o.timer);
                clearInterval(o.htimer);
                o.timer = setInterval(function () {
                    slide.slide(obj);
                }, d);
                $(obj).find(".cover").hide();
            };
            obj.onmouseout = function () {
                clearInterval(o.timer);
                clearInterval(o.htimer);
                o.htimer = setInterval(function () {
                    slide.slide(obj, true);
                }, d);
                $(".cover").show();
                $(obj).find(".cover").hide();
            }
        },
        slide:function (obj,state) {
            var currWid = parseInt(obj.style.width);
            if(currWid < m && !state || currWid > n && state) {
                var widValue = 0;
                var otherWid;
                for(var i = 0; i < a.length; i++) {
                    if(a[i] != obj) {
                        var oi = 0;
                        //注意：oi变量必须要放在for循环里；每一次检查obj是否符合条件时，都将该值进行清零；
                        // 在开始的时候，放在外面，然后出现不符合下面if条件的情况时，oi仍然有值，进行了多余的加或减操作。
                        otherWid = parseInt(a[i].style.width);
                        //对目标对象外的其它对象进行操作
                        //这里的if判断是针对目标对象以外的其他对象，决定的一个宽度条件
                        if(otherWid > mw && !state) {
                            //目标对象展开操作，其他对象收缩操作
                            oi = Math.floor((otherWid - mw) / g);
                            oi = oi > 0 ? oi : 1;
                            a[i].style.width = otherWid - oi + "px";
                        } else if(otherWid < n && state) {
                            //目标对象收缩操作，即其他对象扩宽操作，当前宽度小于平均宽度，就进行操作
                            oi = Math.floor((n - otherWid) / g);
                            oi = oi > 0 ? oi : 1;
                            a[i].style.width = otherWid + oi + "px";
                        }
                        if(state) {
                            widValue += (otherWid + oi);
                        } else {
                            widValue += (otherWid - oi);
                        }
                    }
                }
                obj.style.width = offsetWid - widValue + "px";
            } else {
                if(o.timer) {
                    clearInterval(o.timer);
                }
                if(o.htimer) {
                    clearInterval(o.htimer);
                }

            }
        }
    }
}();
slide.build("sm",450,10,10,1);