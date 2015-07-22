Zepto(function($) {
	loading();
	//移动端选中的特效
	var pies = [];
	var piedatas = set_pie_datas();
	var pieids = ['piechart1', 'piechart2'];
	var event = 'click';
	// device detection
	if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
		event = 'tap';
	}
	$('#nav').delegate('a', event, function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		var row = $(this).index();
		$('#menu').children().hide().eq(row).show().css('opacity', 0).animate({opacity:'1'}, 1000, 'ease-in-out', function() {
			if(row != 3) return;
			
			$.each(pieids, function(index, item) {
				if(pies.length <= index) {
					var pie = draw_pie(piedatas[index], item);
					pies.push(pie);
				}
			});
		});
		return false;
	});
});
//配置图表信息
function set_pie_datas() {
	var piedatas = [ 
		[
			{
				value: 300,
				color:"#F7464A",
				highlight: "#FF5A5E",
				label: "HTML/CSS"
			},
			{
				value: 50,
				color: "#46BFBD",
				highlight: "#5AD3D1",
				label: "HTML5/CSS3"
			},
			{
				value: 100,
				color: "#FDB45C",
				highlight: "#FFC870",
				label: "JavaScript"
			},
			{
				value: 40,
				color: "#949FB1",
				highlight: "#A8B3C5",
				label: "PHP"
			},
			{
				value: 120,
				color: "#4D5360",
				highlight: "#616774",
				label: "MySQL"
			}
		],
		[
			{
				value: 100,
				color:"#F7464A",
				highlight: "#FF5A5E",
				label: "HTML/CSS"
			},
			{
				value: 80,
				color: "#46BFBD",
				highlight: "#5AD3D1",
				label: "HTML5/CSS3"
			},
			{
				value: 30,
				color: "#FDB45C",
				highlight: "#FFC870",
				label: "JavaScript"
			}
		]
	];
	return piedatas;
}
//画图表
function draw_pie(pieData, id) {
	var piechart = document.getElementById(id).getContext("2d");
	return new Chart(piechart).Pie(pieData);
}
window.onload = function() {
	//隐藏loading页面
	$('#loading_container').animate({translateY:'-100%'}, 1000,'linear', function() {
		$(this).css('opacity', 0);
	});
	setTimeout(function() {
		$('#menu>section:first').show();
		$('#nav').show();
	}, 300);
};
/**
 * load效果实现
 */
function loading() {
	var square = new Sonic({
		width: 100,
		height: 100,
	
		stepsPerFrame: 4,
		trailLength: 0.8,
		pointDistance: 0.01,
		fps: 20,
	
		backgroundColor: '#fff',
	
		path: [
			['arc', 60, 60, 30, 0, 360]
		],
	
		step: function(point, index, frame) {
	
			var sizeMultiplier = 10;
	        var radius = sizeMultiplier * (index > 0.5 ? 1-index : index);
	        
	        drawFlame.call(this, '#FF6C08', point.x*index, point.y, radius);
	        drawFlame.call(this, '#FFD341', point.x, point.y*index, radius);
	        drawFlame.call(this, '#FF3000', point.x, point.y, radius);
	
		}
	});
	square.play();
	$('#loading').append(square.canvas);
}
function drawFlame(color, px, py, radius) {
    this._.fillStyle = color;
	this._.beginPath();
	this._.arc(
		px, py,
		radius, 0,
		Math.PI*2, false
	);
	this._.closePath();
	this._.fill();
}
