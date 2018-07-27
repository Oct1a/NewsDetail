var types = [{
	name: "推荐",
	value: "top",
	loaded: false
}, {
	name: "社会",
	value: "shehui",
	loaded: false
}, {
	name: "国内",
	value: "guonei",
	loaded: false
}, {
	name: "国际",
	value: "guoji",
	loaded: false
}, {
	name: "娱乐",
	value: "yule",
	loaded: false
}, {
	name: "体育",
	value: "tiyu",
	loaded: false
}, {
	name: "军事",
	value: "junshi",
	loaded: false
}, {
	name: "科技",
	value: "keji",
	loaded: false
}, {
	name: "财经",
	value: "caijing",
	loaded: false
}, {
	name: "时尚",
	value: "shishang",
	loaded: false
}]

/**
 * 获取新闻列表
 * @param {String} 新闻类型
 * @param {Function} 请求数据完毕后的回调函数
 */
function getList(typeValue, fn) {
	$.ajax({
		url: 'http://toutiao-ali.juheapi.com/toutiao/index',
		data: {
			type: typeValue
		},
		headers: {
			Authorization: "APPCODE 1c46e6b3d0c347baabac4e54fbab7b2d"
		},
		success: function(data) {
			fn(data.result.data);
		}
	})
}