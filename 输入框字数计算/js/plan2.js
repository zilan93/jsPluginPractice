/**
 *对plan1的改进
 * 使用单个变量模拟命名空间
 */
var textCount = {
    input:null,
    init:function (config) {
        this.input = $(config.id);
        this.bind();
        return this;
    },
    bind:function () {
        var self = this;
        this.input.on("keyup",function () {
            self.render();
        });
    },
    getNum:function () {
        return this.input.val().length;
    },
    render:function () {
        var num = this.getNum();
        if($("#J_input_count").length == 0) {
            this.input.after("<span id='J_input_count'></span>");
        }
        $("#J_input_count").html(num + "个字");
    }
};
$(function () {
    textCount.init({id:"#J_input"}).render();
});
