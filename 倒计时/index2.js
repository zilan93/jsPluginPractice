/**
 * 倒计时组件第二种写法
 * //将数值显示到页面上，且默认全部显示两位数值；
 * 实现思路：将时，分，秒的数值除10，求得除值和余值；除值即为高位的值，余值即为低位的值；
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
            var valueFirstLetter = Math.floor(item / 10);
            var valueLastLetter = Math.floor(item % 10);
            var spanObj = "<span>" + valueFirstLetter +"</span><span>" + valueLastLetter + "</span>";
            $(obj).find("li:eq(" + index + ")").append(spanObj);
        });
    }
    //实现计时效果
    var cycleCount = setInterval(function () {
        showResult();
    },1000)
};
