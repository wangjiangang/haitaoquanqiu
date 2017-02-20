define(function(require,exports,module){
	var $ = require('jq');	
	var obj = new headerFooterRight();
	function headerFooterRight(){
				
	}  	
	/*------------查看分类点击显示函数----------------*/
	headerFooterRight.prototype.clickBlock = function(){				
		var $ele = $('#look');
		var $blo = $('#classify');
		//console.log(1)
		$ele.on('click',function(){			
			$blo.toggle();
			if($ele.find('span').text() == '查看分类'){			
				$ele.html('<i><img src="../imges/cha.gif"/></i><span>收起分类</span>');
			}else{
				$ele.html('<i><img src="../imges/dao.png"/></i><span>查看分类</span>');
			}			
		})		
	}
	/*------------鼠标移入函数----------------*/
	 headerFooterRight.prototype.hoverChange = function(touchEle,blockEle){
		var $touch = $('.second_menu');
		var $hover = $('.sift_right');
		/*-----------------初始化设置-------------*/
		$touch.eq(0).css('background','url(../imges/sanjiao.png)')
		$touch.eq(0).children().css('color','#FFF');
		/*-----------------鼠标划入，指定元素改变-------------*/
		$touch.on('mouseenter',function(){			
			$hover.eq($(this).index('.second_menu')).show().siblings('.sift_right').hide();
			$touch.eq($(this).index('.second_menu')).css('background','url(../imges/sanjiao.png)').siblings().css('background','')
			$touch.children().css('color','#000')
			$touch.eq($(this).index('.second_menu')).children().css('color','#fff')
		})	
	}
	/*-----------------------搜索框点击显示函数----------------*/
	headerFooterRight.prototype.searchBlock = function(){		
		var $ele = $('#sea_txt');
		var $blo = $('#sea_hidden');
		$ele.on('click',function(event){
			$blo.show()
			event.stopPropagation();			
		})
		$blo.on('click',function(event){
			$blo.show();
			event.stopPropagation();
		})
		$('body,html').click(function(){
			$blo.hide();
		})		
	}
	/*------------------------点击插入函数-----------------------*/
	headerFooterRight.prototype.insert = function(){		
		var $ele = $('.sea_bottom').find('a');
		var $subject = $('.saveObj');
		var $rubbish = $('#rubbish');
		//点击生成DIV插入进去
		$ele.click(function(){
			//console.log($(this).index('.sea_bottom a'))			
			var $div = $('<div class="del_parent">'+$ele.eq($(this).index('.sea_bottom a')).html()+'<a class="del">删除</a></div>')			
			$subject.append($div);
			//点击删除DIV
			$del = $('.del');			
			$del.on('click',function(){
				$(this).parent().remove();
			})
			//鼠标滑过变背景颜色
			$del_parent = $('.del_parent');
			$del_parent.on('mouseover',function(){
				//console.log($(this).index())
				$del_parent.eq($(this).index()).css('background','#eee')
			})
			$del_parent.on('mouseout',function(){				
				$del_parent.eq($(this).index()).css('background','#fff')
			})
		})
		//点击清空
		$rubbish.click(function(){
			$subject.html('');
		})		
	}
	/*----------------------------------------侧边栏-----------------------------------------*/
	headerFooterRight.prototype.mouseoverblock = function(openPoint,playEle){
		var $ele = $(openPoint);
		var $blo = $(playEle);
		var $fixed = $('.online');		
		$ele.on('mouseover',function(){
			$blo.show().stop().animate({
				opacity:1,
				right:30
			},300);
			$ele.css('background-position-x','-35px');			
		})
		$ele.on('mouseout',function(){
			$blo.stop().animate({
				opacity:0,
				right:55
			},300,function(){
				$(this).hide();
			})
			$ele.css('background-position-x','0');
			$fixed.css('background-position-x','-35px');
		})
		$blo.on('mouseover',function(){			
			$blo.show().stop().animate({
				opacity:1,
				right:30
			},300);
			$ele.css('background-position-x','-35px');		
		})
		$blo.on('mouseout',function(){
			$blo.stop().animate({
				opacity:0,
				right:55
			},300,function(){
				$(this).hide();
			})
			$ele.css('background-position-x','0');
			$fixed.css('background-position-x','-35px');
		})
	}	
	/*----------------------------------------回到顶部-------------------------------------*/
	headerFooterRight.prototype.goTop = function(){
		var $ele = $('.gotop').find('a');
		$ele.on('click',function(){
			$('html,body').stop().animate({
				scrollTop:0
			},800)
		})
	}
	/*----------------------------------------导航背景色-------------------------------------*/
	headerFooterRight.prototype.changeBackground = function(){
		var that = this;
		var $home = $('.home_btn');		
		var $activity = $('.activity_btn');
		$home.click(function(){
			$(this).find('a').addClass('show_page');
			$activity.find('a').removeClass('show_page');
		});
		$activity.click(function(){			
			$(this).find('a').addClass('show_page');
			$home.find('a').removeClass('show_page');
		})
	}
	/*----------------------------------------购物袋显示效果-------------------------------*/
	headerFooterRight.prototype.bag = function(){
		var that = this;
		$buy = $('.buy');
		$bag = $('.goods_bag')
		$buy.on('mouseenter',function(){			
			$bag.show().stop().animate({
				right:35
			},300)
			that.bagGoodsNum();
			that.bagGoodsShow();
		})
		$buy.on('mouseleave',function(){
			$bag.stop().animate({
				right:60
			},300,function(){
				$(this).hide()
			})
		})
	}
	/*------------------------------------购物袋数量---------------------------------*/
	headerFooterRight.prototype.bagGoodsNum = function(){
		var cookieStr = $.cookie('bag');
		if(cookieStr){
			var arr = eval(cookieStr);
			var num = 0;			
			for(var i in arr){
				num += arr[i].num;
			}						
			$('.goods_num').html(num);
		}
	}
	/*--------------------------------购物袋商品添加-------------------------------------*/	
	headerFooterRight.prototype.bagGoodsShow = function(){
		var that = this;
		$.ajax({
			type:'GET',
			url:'../json/activity.json',
			success:function(res){
				var cookieStr = $.cookie('bag');
				if(cookieStr){
					arr = eval(cookieStr);
					var html = '';
					for(var i in arr){
						html += '<li><dl class="clear"><dt><a href="javascript:;"><img src="'+res[arr[i].id].src+'"/></a></dt><dd><div class="bag_title"><a href="javascript:;">'+res[arr[i].id].text+'</a></div><span class="bag_price">￥<em>'+res[arr[i].id].nowprice+'</em><i>&times;</i><i>'+arr[i].num+'</i></span><span class="bag_del" id="'+arr[i].id+'">删除商品</span></dd></dl></li>'
					}
					$('.goods_list').html(html);
					that.bagGoodsdel('.bag_del');
					that.bagGoodsPriceSum();
				}				
			}			
		})
	}
	/*--------------------------------购物袋商品删除-------------------------------------*/	
	headerFooterRight.prototype.bagGoodsdel = function(dom){			
		//$(dom).click();
		var that = this;
		$(dom).click(function(){			
			var id = Number(this.id);			
			var cookieStr = $.cookie('bag');
			if(cookieStr){				
				var arr = eval(cookieStr);				
				for(var i in arr){
					if(arr[i].id == id){						
						arr.splice(i,1)
					}				
				}
				var cookieStr = JSON.stringify(arr);
				$.cookie('bag',cookieStr,{path:'/'});
				that.bagGoodsNum();
				that.bagGoodsShow();
				
			}
			
		})
	}
	/*------------------购物袋商品价格总计和点击跳转结算页面-----------------------------*/
	headerFooterRight.prototype.bagGoodsPriceSum = function(){				
		var $goods = $('.goods_list').find('.bag_price')				
		var sum = 0;
		for(var i = 0;i < $goods.length ;i ++){
			var $price = $goods.eq(i).find('em').html();
			var $num = $goods.eq(i).find('i').eq(1).html();
			sum += $price*$num;
		}										
		$('.bag_pay').find('em').html(sum.toFixed(2));
		var $payBtn = $('.bag_pay').find('span');
		$payBtn.click(function(){			
			window.location.href = 'http://10.9.170.19/haitaoquanqiu/html/pay.html'
		})
	}
	
	module.exports = obj;
})