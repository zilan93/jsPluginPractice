/**
 * 倒计时组件原始写法
 */
var countDown = function (obj, endTime) {
    //用来放时，分，秒数组
    var times = [];
    //获取时间差
    function timeDvalue(endTime) {
        var startTimes = new Date().getTime();
        var endTimes = new Date(endTime).getTime();
        return (endTimes - startTimes)/1000;
    }
    //得到时，分，秒
    function timeNumber() {
        var dValue = timeDvalue(endTime);
        //如果时差等于0，即清除计时效果
        if (dValue <=0) {
            clearInterval(cycleCount);
        }
        var minutesCount = dValue % 3600;
        var secondsCount = minutesCount % 60;
        times[0] = Math.floor(dValue / 3600);
        times[1] = Math.floor(minutesCount / 60);
        times[2] = Math.floor(secondsCount);
    }
    //将数值显示到页面上
    function showResult() {
        timeNumber();
        $(obj).find("li").empty();
        $.each(times,function(index,item) {
            var timeArray = item.toString().split("");
            for(var i = 0; i < timeArray.length; i++) {
                var spanObj = $("<span></span>");
                spanObj.text(timeArray[i]);
                $(obj).find("li:eq(" + index + ")").append(spanObj);
            }
        });
    }
    //实现计时效果
    var cycleCount = setInterval(function () {
        showResult();
    },1000)
};
