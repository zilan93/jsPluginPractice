/*
个人写法

$(function () {
    var jInput = $("#J_input");
    jInput.after("<span class='text_count'></span>");
    /**
     * 为什么要创建一个render(); 页面初始化后需要调用一次，每次触发事件也需要调用，
     * 最简单的方式就是将回调函数写成一个函数。

    function render() {
        var textLength = jInput.val().length;
        $(".text_count").text(textLength + "个字");
    }
    jInput.on("keyup",render);
    render();
})
*/

$(function () {
    var input = $("#J_input");

    //获取input字数
    function getNum() {
        return input.val().length;
    }

    //渲染元素
    function render() {
        var num = getNum();

        //判断有没有显示字数的容器
        if($("#J_input_count").length == 0) {
            input.after("<span id='J_input_count'></span>");
        }
        $("#J_input_count").html(num + '个字');
    }
    input.on("keyup",function () {
        render();
    });
    render();
});

/**
 * 问题：判断显示字数的容器存在与否的代码有存在的必要吗？
 * 弊端：各种变量混乱，没有很好的隔离作用域，当页面变得复杂的时候，很难维护。
 */