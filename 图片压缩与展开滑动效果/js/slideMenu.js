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
    var o,m,n,a,mw,d,g,timer,htimer;
    return {
        build:function (sm,w,t,s,x) {
            o = document.getElementById(sm);
            m = w;
            d = t;
            g = s;
            a = $(o).find("li");
            var offsetWid = o.offsetWidth;
            n = offsetWid / a.length;
            mw = (offsetWid - m)/ (a.length - 1);
            for(var i = 0 ; i < a.length; i++) {
                this.timer(a[i]);
            }
            if(x) {
                setInterval(function () {
                    slide.destruct(a[x]);
                },d)
            }
        },
        timer:function (obj) {
            obj.onmouseover = function () {
                clearInterval(timer);
                clearInterval(htimer);
                timer = setInterval(function () {
                    slide.destruct(obj)
                },d)
            };
            obj.onmouseout = function () {
                clearInterval(timer);
                clearInterval(htimer);
                htimer = function () {
                    slide.destruct(obj,true)
                }
            }
        },
        slide:function (obj,state) {
            var currWid = $(obj).width();
            if(currWid < m && !state || currWid > n && state) {
                var widValue = 0;
                for(var i = 0; i < a.length; i++) {
                    if(a[i] != obj) {
                        //对目标对象外的其它对象进行操作
                        if(currWid < m && !state) {
                            //展开操作
                            widValue += currWid - g;
                            $(a[i]).css("width",currWid -g);
                        } else if(currWid > n && state) {
                            //收缩操作
                            widValue += currWid
                        }

                    }
                }
            } else {
                clearInterval(timer);
                clearInterval(htimer);
            }
        },
        destruct:function () {

        }
    }
}();
slide.build("sm",452,10,2,1);