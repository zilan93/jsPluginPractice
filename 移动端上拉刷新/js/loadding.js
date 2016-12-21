/**
 * Created by Administrator on 2016/12/21.
 */
function dragDown(obj) {
    /**
     * 定义变量
     */
    var wrapObj = document.querySelector(".wrap");
    var targetObj = document.getElementById(obj);
    var el = document.documentElement;
    var startPos = {};
    /**
     * 给文档绑定触摸事件
     */
    function bindEvent() {
        el.addEventListener("touchstart",touchStartFun,false);
        el.addEventListener("touchmove",touchMoveFun,false);
        el.addEventListener("touchend",touchEndFun,false);
    }
    /**
     * 开始触摸处理函数
     */
    function touchStartFun(evt) {
        var touchObj = evt.touches[0];
        startPos.startX = touchObj.clientX;
        startPos.startY = touchObj.clientY;
    }
    /**
     * 创建html节点
     */
    function loaddingHtml() {
        var divNode = document.createElement("div");
        var textNode = document.createTextNode("加载中……");
        divNode.appendChild(textNode);
        divNode.setAttribute("id","loadding");
        wrapObj.appendChild(divNode);
    }
    /**
     * 触摸过程中处理函数
     */
    function touchMoveFun(evt) {
        var touchObj = evt.changedTouches[0];
        var endX = touchObj.clientX;
        var endY = touchObj.clientY;
        var dValue = endY - startPos.startY;
        wrapObj.style.transform = "translateY("+ dValue +"px)";
    }
    /**
     *结束触摸处理函数
     */
    function touchEndFun(evt) {
        wrapObj.style.transform = "translateY(0)";
        var touchObj = evt.changedTouches[0];
        var endX = touchObj.clientX;
        var endY = touchObj.clientY;
        if(startPos.startY > endY) {
            loaddingHtml();
        }
    }

    /**
     * 判断是否支持触摸事件
     */
    function isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            bindEvent();
        }
        catch (e) {
            alert("您的浏览器不支持TouchEvent事件！");
        }
    }
    isTouchDevice();
}
dragDown("listBox");