	//获取点击选项卡标签的索引值
	$('.mui-slider').on('slide', function(e) {
	    var index = e.detail.slideNumber;
	    load(index);
	});
	for (var i in types) {
	    var tbs = $('<a class="mui-control-item" href="#item' + i + '">' + types[i].name + '</a>');
	    var container = $('<div id="item' + i + '" class="mui-slider-item mui-control-content">' +
	        '<div class="mui-scroll-wrapper">' +
	        '<div class="mui-scroll">' +
	        ' <ul class="mui-table-view">' +
	        '</ul>' +
	        '</div>' +
	        '</div>' +
	        '</div>');
	    if (i == 0) {
	        tbs.addClass('mui-active'); //首屏默认添加active
	    }
	    tbs.appendTo('#tbs'); //添加选项标签文字
	    container.appendTo('#container'); //添加主要列表
	}

	//添加文章列表（标题、作者、时间）
	function load(index) {
	    getList(types[index].value, function(data) {
	        for (var i in data) {
	            var news = $('<li class="mui-table-view-cell mui-media">' +
	                '<a href="javascript:;">' +
	                '<img class="mui-media-object mui-pull-right" src="' + data[i].thumbnail_pic_s + '">' +
	                '<div class="mui-media-body">' +
	                data[i].title +
	                '<p class="mui-ellipsis">' + data[i].author_name + '/' + data[i].date + '</p>' +
	                '</div>' +
	                '</a>' +
	                '</li>');
	            news.data('info', data[i]); //将数据存储到Dom对象上
	            news.on('tap', function() {
	                var info = $(this).data('info');
	                mui.openWindow({
	                    url: 'detail.html',
	                    extras: { news: info },
	                    styles: {
	                        statusbar: {
	                            background: 'rgb(212,61,61)'
	                        }
	                    }
	                })
	            })
	            news.appendTo('#item' + index + ' .mui-table-view');
	        }
	    });
	    mui('.mui-slider-group .mui-scroll-wrapper').scroll()[index].scrollTo(0, 0, 100); //滚动条
	}
	load(0);
	//搜索跳转
	$('.mui-icon-search').on('click', function() {
	    mui.openWindow({
	        url: 'search.html',
	        styles: {
	            statusbar: {
	                background: 'rgb(212,61,61)'
	            }
	        }
	    })
	});

	(function($) {
	    //阻尼系数
	    var deceleration = mui.os.ios ? 0.003 : 0.0009;
	    $('.mui-scroll-wrapper').scroll({
	        bounce: false,
	        indicators: true, //是否显示滚动条
	        deceleration: deceleration
	    });
	    $.ready(function() {
	        //循环初始化所有下拉刷新，上拉加载。
	        $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
	            $(pullRefreshEl).pullToRefresh({
	                down: {
	                    style: 'circle',
	                    callback: function() {
	                        //刷新
	                        var self = this;
	                        load(index);
	                        mui.toast('已刷新', {
	                            duration: 1000,
	                            type: 'div'
	                        })
	                        self.endPullDownToRefresh();
	                    }
	                }
	            });
	        });
	    });
	})(mui);