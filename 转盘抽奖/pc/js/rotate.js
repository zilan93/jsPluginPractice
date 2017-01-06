/**
分析：
	（1）实现效果：点击中间抽奖按钮，转盘转动【按钮绑定click事件，转盘触发click事件；】，弹出表单
	（2）实现原理：点击抽奖后，提交一个AJAX请求，然后由后端实现概率计算，并返回抽中的奖品ID，奖品名称等数据。在前端，根据这些数据来实现转到相应奖品所在位置并填充数据。
*/
(function () {
	//网络超时
	var rotateTimeOut = function() {
		$("#rotate").rotate({
			angle:0,
			animateTo:2160,
			duration:8000,
			callback:function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	}
//转盘转动函数
	var bRotate = false;
	var rotateFn = function(awards,angles,txt) {
		bRotate = !bRotate;
		$("#rotate").stopRotate();
		$("#rotate").rotate({
			angle:0,
			animateTo:angles + 1800,
			duration:8000,
			callback:function() {
				newf(txt);
				bRotate = !bRotate;
			}
		})
	};
//填充文本
	function newf(txt) {
		var alertBox = $(".outofstock_alert_box");
		var cover = $(".page_event_overlay");
		alertBox.find(".alert_title span").text(txt);
		alertBox.show();
		cover.show();
	}
//点击处理
	var isuser = true;
	if(('' != "") && 0==0) {
		isuser == false;
	}
	if(isuser) {
		$(".btn").click(function() {
			var index = 0;
			var interval = null;
			var url = "gift.json";
			var pars = "";
			//bRotate作用是：当多次点击按钮时，此时转盘正在转动，bRotate值为true,所以返回；不接着重复执行下面的操作；
			if(bRotate) return;
			jQuery.ajax({
				type:"POST",
				url:url,
				data:pars,
				datatype:"json",
				success:function(result) {
					var id = result.id;
					$(".choujiangId").val(id);
					switch (id) {
						case 1:
							rotateFn(1,180,"家用空气净化器");
							break;
						case 2:
							rotateFn(2,90,"直饮水处理机");
							break;
						case 3:
							rotateFn(3, 225, '800元现金抵用卷');
							break;
						case 4:
							rotateFn(4, 270, '车载空气净化器');
							break;
						case 5:
							rotateFn(5, 315, '300元现金抵用卷');
							break;
						case 6:
							rotateFn(6, 45, '150元现金抵用卷');
							break;
						case 7:
							rotateFn(7, 135, '100元现金抵用卷');
							break;
						case 8:
							rotateFn(8, 0, '20元油费现金');
							break;
					}
				}
			})
		})
	}
})()
/**
 * 表单验证
 */
//关闭表单
$(".page_event_overlay").click(function () {
	$(this).hide();
	$(".outofstock_alert_box").hide();
})
function lingqu() {
	var name = $("#userName");
	var phone = $("#phone");
	//验证姓名
	nameValue = $.trim(name.val());
	if(!nameValue) {
		alert("请输入姓名！");
		name.val("");
        return false;
	}
	//验证手机
	phoneValue = phone.val();
	if(phoneValue == "") {
	    alert("电话不能为空！");
		return false;
    } else {
        var myReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!myReg.test(phoneValue)) {
            alert("电话格式不对！");
            phone.val("");
			return false;
        }
    }
}
