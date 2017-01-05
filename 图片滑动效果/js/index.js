/**
 * Created by Administrator on 2016/11/30.
 */
var slideMenu = function () {
    var menuObj,ow,st,ip,m;
    return {
        cTimer:function (m) {
            if(m) {
                clearInterval(m);
            }
        },
        build:function (obj,st,ip,ow) {
            st = st;
            menuObj = document.getElementById(obj);
            var liItems = menuObj.getElementsByTagName("li");
            var liItemsLen = liItems.length;
            var menuWid = menuObj.offsetWidth;
            var aveWid = menuWid / liItemsLen;
            var targetWid = (menuWid - ow) / (liItemsLen - 1);
            var i;
            for(i = 0; i < liItemsLen; i++) {
                var liItem = liItems[i];
                liItem.style.width = aveWid + "px";
                this.timer(liItem);
            }
        },
        timer:function (s) {
            s.addEventListener("mouseover",function () {
                slideMenu.cTimer(m);
                m = setInterval(function () {
                    slideMenu.slideEvent();
                },st)
            },false);
            s.addEventListener("mouseout",function () {
                slideMenu.cTimer(m);
            },false);
        },
        slideEvent:function () {

        }
    }
}();
slideMenu.build("menu_wrap");