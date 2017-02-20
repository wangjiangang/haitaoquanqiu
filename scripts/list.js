define(function(require,exports,module){
	var $ = require('jq');
	var page = require('pagination');
	var obj = require('./common');
	var cookie = require('cookie');
	cookie($);
	page($);
	//console.log($('.page').pagination);   //csww
	//console.log(page)	   //csww
		new login();
		new ajaxload();
		new listAnimation();
		new classify();
		new priceRank();
	/*---------------------------加载头部，底部和侧边栏------------------------------------*/
	function login(){
		$('#header').load('http://10.9.170.19/haitaoquanqiu/html/header.html',function(){
			obj.clickBlock();
			obj.hoverChange();
			obj.searchBlock();
			obj.insert();
			obj.changeBackground();
		})
		$('#footer').load('http://10.9.170.19/haitaoquanqiu/html/footer.html');
		$('#right_fixed').load('http://10.9.170.19/haitaoquanqiu/html/right.html',function(){
			obj.mouseoverblock('.online','.contact');
			obj.mouseoverblock('.collect a','.collect div');
			obj.mouseoverblock('.sale a','.sale div');
			obj.mouseoverblock('.qr_code a','.qr_code div');
			obj.goTop();
			obj.bag();
			obj.bagGoodsNum();
			obj.bagGoodsShow();
		});
	}
	/*------------------------ajax加载列表-----------------------*/
	function ajaxload(){
		$.ajax({
			type:"get",
			url:"../json/list.json",
			async:true,
			success:function(oRes){
				var show_num = 8;				
				var page_num = Math.ceil(oRes.length/show_num);				
				$('.page').pagination(page_num,{
					num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数    	
                    items_per_page: 1, //每页显示1项
                    prev_text: "上一页",
                    next_text: "下一页",
                    callback:function(index){
                    	var html = '';
						for(var i = show_num*index; i < show_num*(index+1); i++){
							if(i < oRes.length){
								html += '<li><a class="img_wrap" href="http://10.9.170.19/haitaoquanqiu/html/detail.html"><img src="' + oRes[i].src + '"/></a><div class="text_box"><span><img src="' + oRes[i].where + '"/>' + oRes[i].tip + '</span><p>' + oRes[i].text + '</p><div class="while_price">' + oRes[i].nowprice + '</div><del>' + oRes[i].del + '</del><a href="http://10.9.170.19/haitaoquanqiu/html/detail.html"><span class="while_buy"></span></a></div></li>'
							}							
						}						
						$('.list_box').html(html);																		
                    }
				})								
			}
		});
	}
	/*-----------------------------------列表特效-------------------------------------*/
	function listAnimation(){
		var that = this;
		this.$list = $('.list_box');				
		this.$list.on('mouseenter','li',function(){
			that.fn_enter($(this));   //事件委托里的$(this)指向li.传到函数中			
		})
		this.$list.on('mouseleave','li',function(){
			that.fn_leave($(this));   			
		})
	}
	listAnimation.prototype.fn_enter = function(a){
		var $box = this.$list.find('li');		
		//console.log($box.eq(a.index()))   //csww
		$box.eq(a.index()).find('.while_buy').css('background-position','-133px -112px');
		$box.eq(a.index()).find('a img').css('transform','scale(1.1)');
		$box.eq(a.index()).css('box-shadow','0 0 20px #000');
	}
	listAnimation.prototype.fn_leave = function(a){
		var $box = this.$list.find('li');		
		$box.eq(a.index()).find('.while_buy').css('background-position','-72px -112px');
		$box.eq(a.index()).find('a img').css('transform','scale(1)');
		$box.eq(a.index()).css('box-shadow','');
	}
	/*-----------------------------------分类特效-------------------------------------*/
	function classify(){
		var $classify = $('.cla');
		var $shaib = $('.shaib');
		var $brand = $('.brand');
		var $pricerage = $('.pricerage');
		var $clear_all = $('.clear_all');
		var $rank = $('.rank');
		//console.log($classify.find('a'))   //csww
		$classify.find('a').click(function(){
			$shaib.show();			
			var $html = $(this).html();
			var $span = $('<span>分类：'+$html+'<em class="close">╳</em></span>');
			$shaib.append($span);
			$(this).parent().hide();
			var $close = $('.close');
			$close.click(function(){
				$(this).parent().remove();
				$classify.show();				
				if($shaib.find('span').length == 0){
					$shaib.hide()
				}
			})
		})
		$brand.find('a').click(function(){
			$shaib.show();			
			var $html = $(this).html();
			var $span = $('<span>品牌：'+$html+'<em class="close">╳</em></span>');
			$shaib.find('i').after($span);
			$(this).parent().hide();
			var $close = $('.close');
			$close.click(function(){
				$(this).parent().remove();
				$brand.show();
				if($shaib.find('span').length == 0){
					$shaib.hide()
				}
			})
		})
		$pricerage.find('a').click(function(){			
			$shaib.show();			
			var $html = $(this).html();
			var $span = $('<span>价格：'+$html+'<em class="close">╳</em></span>');
			$shaib.find('i').after($span);
			$(this).parent().hide();
			var $close = $('.close');
			$close.click(function(){
				$(this).parent().remove();
				$pricerage.show();
				if($shaib.find('span').length == 0){
					$shaib.hide()
				}
			})
		})
		$clear_all.click(function(){
			$shaib.hide().find('span').remove();
			$classify.show();
			$brand.show();
			$pricerage.show();
		})
		$rank.find('a').click(function(){
			$(this).addClass('toggle').siblings().removeClass('toggle');
		})
	}
	/*-----------------------------------按价格排序-------------------------------------*/
	function priceRank(){
		$('.price_rank').click(function(){					
			$.ajax({
				type:'GET',
				url:'../json/list.json',
				success:function(res){
					var priceStr = '';
					for(var i = 0;i < res.length; i ++){
						priceStr += res[i].nowprice;
					}					
					var priceArr = priceStr.split('￥');						
					priceArr.shift();
					var newArr = rank(priceArr);					
					var newRes = [];
					for(var j = 0; j < newArr.length ;j ++){
						for(var i = 0;i < res.length; i++){
							console.log('￥'+newArr[j])
							console.log(res[i].nowprice)
							if('￥'+newArr[j] == res[i].nowprice){
								newRes.push(res[i])
							}
						}
					}					
					var show_num = 8;				
					var page_num = Math.ceil(newRes.length/show_num);
					$('.page').pagination(page_num,{
						num_edge_entries: 1, //边缘页数
	                    num_display_entries: 4, //主体页数    	
	                    items_per_page: 1, //每页显示1项
	                    prev_text: "上一页",
	                    next_text: "下一页",
	                    callback:function(index){
	                    	var html = '';
							for(var i = show_num*index; i < show_num*(index+1); i++){
								if(i < newRes.length){									
									html += '<li><a class="img_wrap" href="http://10.9.170.19/haitaoquanqiu/html/detail.html"><img src="' + newRes[i].src + '"/></a><div class="text_box"><span><img src="' + newRes[i].where + '"/>' + newRes[i].tip + '</span><p>' + newRes[i].text + '</p><div class="while_price">' + newRes[i].nowprice + '</div><del>' + newRes[i].del + '</del><a href="http://10.9.170.19/haitaoquanqiu/html/detail.html"><span class="while_buy"></span></a></div></li>'										
								}						
							}					
							$('.list_box').html(html);
	                    }
					})					                   	
				}
			})
		})
	}
	/*-----------------------------------冒泡排序并去重-------------------------------------*/
	function rank(arr){		
		for(var i = 0;i < arr.length;i ++){
			arr[i] = Number(arr[i])
			for(var j = 0; j < arr.length - i; j ++){
				if(arr[j] < arr[j+1]){
					var kong = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = kong;
				}
			}			
		}
		for(var k = 0;k < arr.length; k++){
			arr[k] = Number(arr[k])
		}		
		arr.sort();
		var newarr = [];
		for(var i = 0;i < arr.length;i ++){	
			arr[i] = Number(arr[i])
			if(newarr[newarr.length-1] != arr[i]){
				newarr.push(arr[i]);				
			}
		}
		for(var i = 0;i < newarr.length;i ++){			
			for(var j = 0; j < newarr.length - i; j ++){
				if(newarr[j] < newarr[j+1]){
					var kong = newarr[j];
					newarr[j] = newarr[j+1];
					newarr[j+1] = kong;
				}
			}			
		}
		for(var k = 0;k < newarr.length; k++){
			newarr[k] = (newarr[k]).toFixed(2)
		}		
		return newarr;		
	}
})