$(document).ready(function() {
	$("#note").click(function() {
		$("#box-all,#box-content").show()
	});
	$(".layui-layer-setwin,#sure-btn").click(function() {
		$("#box-all,#box-content").hide()
	});
	$(".tanc-set-read-l ul li").click(function() {
		$(this).siblings().find('a').removeClass('tanc-set-limark');
		$(this).find('a').addClass('tanc-set-limark');
	});
	$('.delete-btnnew').click(function() {
		$('#main-tool-delete').remove();
	});
	$(window).scroll(function() {
		var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
		document.getElementById('fixed').style.left = sl + 'px';
	});
	$(window).scroll(function() {
		var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
		document.getElementById('fixed-down').style.left = sl + 'px';
	});

	$("#check-box").click(function() {
		if($(this).is(":checked")) {
			$(".varmid-Line").show();
		} else {
			$(".varmid-Line").hide();
		}
	});

	$("#choice-cloud").click(function() {
		$("#cloud-box-all,#cloud-box-content").show()
	});
	$(".layui-layer-setwin,#upload-down-btn").click(function() {
		$("#cloud-box-all,#cloud-box-content").hide()
	});

	$("#morechoice-cloud").click(function() {
		$("#cloud-box-all01,#cloud-box-content01").show()
	});
	$(".layui-layer-setwin").click(function() {
		$("#cloud-box-all01,#cloud-box-content01").hide()
	});

	$("#upload-down-btn01").click(function() {
		$("#cloud-box-all01,#cloud-box-content01").hide()
		$("#cloud-box-all02,#cloud-box-content02").show()
	});

	$(".layui-layer-setwin,#upload-down-btn02").click(function() {
		$("#cloud-box-all02,#cloud-box-content02").hide()
	});

	$(".set-cloud-choicebtn").click(function() {
		$("#cloud-box-all02,#cloud-box-content02").hide()
		$("#cloud-box-all01,#cloud-box-content01").show()
	});


	$(".upload-list ul li").click(function() {
		$(this).siblings().find('div').removeClass('upload-list-boxa');
		$(this).find('div').addClass('upload-list-boxa');

	});

	$($(".set-cloud-tab li").click(function() {
		$(".set-cloud-tab li").removeClass("set-cloud-mark"); //先移除
		$(this).addClass("set-cloud-mark"); //再增加 
	}));

	//	$("#upload-li").click(function() {
	//		$("#down-up").show()
	//		
	//	});

	$("upload-li").click(function() { //点击upload-li
		if($("#down-up").is(":hidden")) { //如果当前隐藏
			$("#down-up").show(); //那么就显示div
		} else { //否则
			$("#down-up").hide(); //就隐藏div
		}
	})

	//	$(".upload-list ul li div").each(function() {   
	//		if($(this).hasClass("upload-list-boxa")) {         
	//			$(this).removeClass("upload-list-boxa");      
	//		}   
	//	});

});

function show() {
	var ss = document.getElementById("select-style").value;
	if(ss == "自定义分辨率") {
		document.getElementById('_select').style.visibility = 'visible';
	} else {
		document.getElementById('_select').style.visibility = 'hidden';
	}
};

$("#vertLine").width($(document).width());

$("#midLine").height($(document).height());