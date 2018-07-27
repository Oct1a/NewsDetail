![](http://pb4oumact.bkt.clouddn.com/20180727100526.png)

仿今日头条界面，数据是调用阿里云新闻头条API，使用MUI+Jquery+HTML5


# MUI简介

>- MUI-最接近原生App体验的前端框架，真正彻底的跨平台开发
> - 基于mui，一套HTML5工程，通过前端构建工具（如grunt）条件编译，可同时发行到iOS Appstore、安卓各大应用商店、普通手机浏览器、微信App和流应用。
> - 并且在每个平台上，都能调用该平台的专有API达到原生体验。



MUI文档：[https://dev.dcloud.net.cn/mui](https://dev.dcloud.net.cn/mui)

新闻头条API：[https://market.aliyun.com](https://market.aliyun.com/products/57126001/cmapi013650.html)

#开发流程

## 开发工具

**HBuilder**

## 请求方式

调用地址：[*http://toutiao-ali.juheapi.com/toutiao/index*](http://toutiao-ali.juheapi.com/toutiao/index)

编码方式：**UTF-8**

请求方式：**HTTP** **GET**

返回类型：**json**

更新周期：**5-30分钟**


**类型**

- top(头条，默认)
- shehui(社会)
- guonei(国内)
- guoji(国际)
- yule(娱乐)
- tiyu(体育)
- junshi(军事)
- keji(科技)
- caijing(财经)
- shishang(时尚)


## 返回示例

```json
{

    "reason": "成功的返回",

    "result": {

        "stat": "1",

        "data": [

            {

                "title": "巫山云雨枉断肠：女摄影师Erika Lust记录的性爱",/标题/

                "date": "2016-06-13 10:31",/时间/

                "author_name": "POCO摄影",/作者/

                "thumbnail_pic_s": "http://xxxxx.jpeg",/图片1/

                "thumbnail_pic_s02": "http://xxxxx.jpeg",/图片2/

                "thumbnail_pic_s03": "http://xxxxx.jpeg",/图片3/

                "url": "http://mini.eastday.com/xxxxxx",/新闻链接/

                "uniquekey": "160613103108379",/唯一标识/

                "type": "头条",/类型一/

                "realtype": "娱乐"/类型二/

            },

...]}}

```

# APP界面布局

##首页
```html
    <!-- 头部标题栏 -->
    <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">每日头条</h1>
        <span class="mui-icon mui-icon-search"></span>
    </header>
    <!-- 主体内容 -->
    <div class="mui-content">
        <div class="mui-slider">
            <!-- 分类栏 -->
            <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll" id="tbs">
                </div>
            </div>
            <!-- 新闻媒体流 -->
            <div class="mui-slider-group" id="container">
            </div>
        </div>
    </div>
```

## 新闻详情页


```html
    <!-- 头部标题栏 -->
    <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">新闻详情</h1>
    </header>
    <!-- 主体内容 -->
    <div class="mui-content">
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <div class="mui-card">
                    <!--页眉，放置标题-->
                    <div class="mui-card-header">
                        <h2>新闻标题</h2>
                        <p>作者:<span id="author">小木豆</span>&nbsp;&nbsp;/&nbsp;&nbsp;发布日期: <span id="date">8818:88:88</span> </p>
                    </div>
                    <!--内容区-->
                    <div class="mui-card-content"></div>
                </div>
            </div>
        </div>
    </div>
```

## 搜索界面

```html
    <!-- 头部标题 -->
    <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">搜索</h1>
    </header>
    <div class="mui-input-row">
        <input type="text" class="mui-input-speech mui-input-clear" placeholder="请输入搜索关键词">
    </div>
    <div class="search_active">
        <p>20年跳槽2次</p>
    </div>
```



#处理代码

## MUI初始化

```javascript
mui.init()
```

## 点击跳转页面并传值

```javascript
	//搜索跳转
	$('.mui-icon-search').on('click', function() {
	    mui.openWindow({
	        url: 'search.html',
	        styles: {
	            statusbar: {
	                background: 'rgb(212,61,61)' //可以传参数过去
	            }
	        }
	    })
	});
```


## 获取分类标签值

```javascript
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
```



## 获取新闻列表（Ajax请求）

```javascript
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
```

`typeValue`值是JSON格式，在`new.js`

## 填充新闻列表（标题、作者、时间）

```javascript
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
```



## 获取链接内新闻文本 

```javascript
function loadPage(url) {
            $.ajax({
                url: url,
                dataType: 'text',
                success: function(data) {
                    var startIndex = data.indexOf('<article'); //查找<article>标签
                    var endIndex = data.indexOf('</article>');
                    var text = data.substring(startIndex, endIndex + 10); //提取内容
                    var dom = $(text);
                    dom.find('#title').remove();
                    $('.mui-card-content').append(dom);
                }
            })
        }
```

> `indexOf`查找返回的内容，`substring(start,end)`提取开始到结尾的内容，最后会把`</article>包含进去，所以提取位置加`10



## 下拉阻尼效果

```javascript
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
```


# 文件目录

|-js
	|- mui.js
	|- news.js	
	|- index.js
	|- mui.min.js
	|- jquery.min.js
	|- mui.pullToRefresh.js	(下拉阻尼效果)
	|- mui.pullToRefresh.material.js
|- css
	|- mui.css
	|- style.css	(自定义样式)
	|- mui.min.css
|- font
	|mui.ttf
|- index.html		(主页面)
|- detail.html		(新闻详情页)
|- search.html	(搜索界面)
|- manifest.json   	(配置文件)
|- favicon.ico  	(网站图标)




## 现有功能

- 顶部下拉刷新
- 获取各种频道的新闻列表
- 查看新闻详情


## 演示效果

![](https://raw.githubusercontent.com/Small-Macro/NewsDetail/master/演示效果.gif)


## 下载体验

Android:[https://github.com/Small-Macro/NewsDetail/raw/master/app/android.apk](https://github.com/Small-Macro/NewsDetail/raw/master/app/android.apk)

iOS:[https://github.com/Small-Macro/NewsDetail/raw/master/app/iphone.ipa](https://github.com/Small-Macro/NewsDetail/raw/master/app/iphone.ipa)



### github地址

[https://github.com/Small-Macro/NewsDetail](https://github.com/Small-Macro/NewsDetail)
