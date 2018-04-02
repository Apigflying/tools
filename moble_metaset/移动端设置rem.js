(function(doc, win) {
	var num = 1 / win.devicePixelRatio;
	doc.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + num + ',minimum-scale=' + num + ',maximum-scale=' + num + '" />')
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			/*
				320对应的是iphone5的分辨率
				在原型图上量取200px的宽度，200/20 -> 10rem就是写入样式的尺寸
				通常和sass预处理一起使用，用sass提取20px作为变量
			*/
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
