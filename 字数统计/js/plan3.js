/**
 * 对plan2的改进
 * 引入私有的概念
 */
var TextCount = (function () {
    //私有方法
    var _bind = function (that) {
        that.input.on("keyup",function () {
            that.render();
        });
    };
    var _getNum = function (that) {
        return that.input.val().length;
    };
    var TextCountFun = function (config) {

    };
    TextCountFun.prototype.init = function(config) {
        this.input = $(config.id);
        _bind(this);
        return this;
    };
    TextCountFun.prototype.render = function() {
        var num = _getNum(this);
        if($("#J_input_count").length == 0) {
            this.input.after("<span id='J_input_count'></span>");
        }
        $("#J_input_count").html(num + "个字");
    };
    return TextCountFun;
})();
$(function () {
    new TextCount().init({id:"#J_input"}).render();
});
/**
 * 备忘：js里私有变量用 _var 的写法
 */