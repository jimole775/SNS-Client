 $(function () {
	 $("#choose").click(function(){
		 var message = {};
		 message['what'] = 0xC00A;
		 message['status'] = 0;
		 message['data'] = '功能选择';
		 var msg = JSON.stringify(message);
		 window.YHAndroidToJs.sendToJS(msg);
	 });
});


window.YHAndroidToJs = {
	sendToJS: function (message) {
		var json = JSON.parse(message);
		var what = json['what'];
		if(what == 0xC00A){
			console.log("接收到tab切换指令：" + message);
			var data = json['data'];
			$(".box-tab li").each(function(){
				var html = $(this).children('a').html();
				if(html == data){
					$(this).children('a').click();				
				}
			});
		}
	}
}