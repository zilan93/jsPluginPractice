/**
 * Created by Administrator on 2017/1/6.
 */
var _jsc = {};
_jsc.ajax = (function () {
    t = {};
    t.getAjax = function () {
        try{
            return new XMLHttpRequest();
        }catch(e) {
            try{
                return new ActiveXObject('Msxml2.XMLHTTP');
            }catch(e){
                return new ActiveXObject('Microsoft.XMLHTTP')
            }
        }
        return null;
    };
    return t;
})();
function tijiao() {
    var o = document.getElementById("ipt_chk");
    var _reg = /^[a-zA-Z0-9][4]]$/;
    if(o.val() != "") {
        var url = "/user/valServlet?checkcode=" + o.val();
        var result2 = getJsonData(url);
        if(result2 == "true") {
            document.theForm.submit();
        } else {
            alert("请输入正确的验证码");
            return;
        }
    } else {
        alert("请输入验证码");
    }
}
//发送一个get请求，将输入的验证码传到后台验证，如果验证通过，则返回true;
function getJsonData(para) {
    var ajax = _jsc.ajax.getAjax();
    ajax.open("GET",para,false);
    ajax.send(null);
    try{
        return ajax.responseText;
    }catch (e){
        return null;
    }
}
//刷新验证码，更改验证码的图片
function refreshCc() {
    var url = "/user/refreshCc";
    url=convertURL(url);
    document.getElementById("checkCodeImg").src = url;
}
//给图片的url添加一个时间戳
function convertURL(url) {
    var timetamp = (new Date()).valueOf();
    url = url + "?t=" + timetamp;
    return url;
}