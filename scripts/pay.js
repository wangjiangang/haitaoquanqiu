define(function(require,exports,module){
	var $ = require('jq');	
	var obj = require('./common');
	var cookie = require('cookie');
	cookie($);
	new login();
	var pay = new loadGoogs();
	/*---------------------------加载头部，底部和侧边栏------------------------------------*/
	function login(){
		$('#header').load('http://10.9.170.19/haitaoquanqiu/html/header.html .top_nav,.header_show',function(){
			obj.clickBlock();
			obj.hoverChange();
			obj.searchBlock();
			obj.insert();
			obj.changeBackground();
		});
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
	/*-------------------------------加载购物袋商品------------------------------------*/
	function loadGoogs(){	
		var that = this;
		$.ajax({
			type:"get",
			url:"../json/activity.json",
			async:true,
			success:function(res){
				var cookieStr = $.cookie('bag');
				if(cookieStr){
					var arr = eval(cookieStr);
					var html ='';
					for(var j = 0;j < res.length;j ++){
						for(var i in arr){
							if(arr[i].id == res[j].id){
								html += '<li class="clear"><div class="show_sec"><input type="checkbox" checked="checked"/></div><div class="show_goods"><dl class="clear"><dt><img src="'+res[j].src+'"/></dt><dd>'+res[j].text+'</dd></dl></div><div class="show_price"><em>￥</em><span>'+res[j].nowprice+'</span></div><div class="show_change"><a href="javascript:;" class="dec">-</a><input class="inp_Num" type="text" name="" id="" value="'+arr[i].num+'" /><a href="javascript:;" class="inc">+</a></div><div class="show_sum"><em>￥</em><span issum="true">'+arr[i].num*res[j].nowprice+'</span></div><div class="show_del" id="'+arr[i].id+'"><a href="javascript:;"></a></div></li>'
							}
							
						}
					}					
					$('.show_box').html(html);
					that.isChecked();
					that.changeNumber();
					that.NumberOfgoods();
					that.goodsSumMoney();
					that.goodsdel();
					that.allChecked();					
				}
			}
		});
	}
	/*-------------------------------是否选择此商品,checked特效-----------------------------*/
	loadGoogs.prototype.isChecked = function(){
		var that = this;
		var $checked = $('.show_sec').find('input');
		$checked.click(function(){			
			if(!$(this).is(':checked')){
				$(this).parent().parent().css('background','#eee');
				$(this).parent().parent().children().eq(4).find('span').attr('issum',false);				
				that.goodsSumMoney();
			}else{
				$(this).parent().parent().css('background','#fff');
				$(this).parent().parent().children().eq(4).find('span').attr('issum',true);
				that.goodsSumMoney();
			}
		})				
	}
	/*-------------------------------点击加减商品数量------------------------------------*/
	loadGoogs.prototype.changeNumber = function(){
		var that = this;
		var $inc = $('.inc');
		var $dec = $('.dec');
		var $input  = $('.inp_Num');
		$inc.click(function(){
			//改变样式
			var nowNum = Number($(this).prev().val());
			$(this).prev().val(nowNum + 1);
			if(nowNum > 0){
				$(this).prev().prev().css({'background':'#fff','cursor':'pointer'});
			}else{
				$(this).prev().prev().css({'background':'#f2f2f2','cursor':'not-allowed'});
			}
			//计算价格
			var $one_price = Number($(this).parent().prev().find('span').html());
			var $now_price = Number($(this).parent().next().find('span').html());
			$(this).parent().next().find('span').html($one_price + $now_price);			
			that.goodsSumMoney();
			//存cookie,沟通每个购物车
			SaveCookie($(this));		
			obj.bagGoodsNum();
			obj.bagGoodsShow();
		})
		$dec.click(function(){
			//改变样式,计算价格
			var nowNum = Number($(this).next().val());			
			if(nowNum == 1){
				$(this).css({'background':'#f2f2f2','cursor':'not-allowed'});
			}else{
				$(this).next().val(nowNum - 1);
				$(this).css({'background':'#fff','cursor':'pointer'});
				var $one_price = Number($(this).parent().prev().find('span').html());
				var $now_price = Number($(this).parent().next().find('span').html());
				$(this).parent().next().find('span').html($now_price - $one_price);
			}
			that.goodsSumMoney();
			//存cookie,沟通每个购物车
			SaveCookie($(this));		
			obj.bagGoodsNum();
			obj.bagGoodsShow();
		})
		$input.blur(function(){
			//改变样式,计算价格
			var nowNum = Number($(this).val());
			var $one_price = Number($(this).parent().prev().find('span').html());
			if(nowNum > 1){
				$(this).prev().css({'background':'#fff','cursor':'pointer'});
				$(this).parent().next().find('span').html(nowNum*$one_price);
			}else if(nowNum <= 1){
				$(this).val('1');
				$(this).prev().css({'background':'#f2f2f2','cursor':'not-allowed'});
				$(this).parent().next().find('span').html($one_price);
			}
			that.goodsSumMoney();
			//存cookie,沟通每个购物车
			SaveCookie($(this));		
			obj.bagGoodsNum();
			obj.bagGoodsShow();
		})		
	}
	/*----------------------------改变数量时存cookie函数--------------------------------*/
	function SaveCookie(bond){
		//console.log(bond)
		var id = Number(bond.parent().next().next().attr('id'));											
		var arr = eval($.cookie('bag'));
		var $inputNum = Number(bond.parent().find('.inp_Num').val());			
		for(var i in arr){
			if(arr[i].id == id){
				arr[i].num = $inputNum;
				var cookieStr = JSON.stringify(arr);
				$.cookie('bag',cookieStr,{path:'/'});					
			}
		}										
	}
	/*------------------------------------商品个数------------------------------------*/
	loadGoogs.prototype.NumberOfgoods = function(){		
		var $num = $('.show_box').find('li').length	
		$('.pay_message').find('b').html($num);
	}
	/*------------------------------------商品总金额------------------------------------*/
	loadGoogs.prototype.goodsSumMoney = function(){		
		var sum = 0;		
		var $span = $('.show_sum').find('span');
		for(var i = 0; i < $span.length; i ++){
			if($span.eq(i).attr('issum') == 'true'){
				sum = sum + Number($span.eq(i).html());
			}						
		}
		$('.pay_message').find('em').html(sum.toFixed(2));
	}
	/*------------------------------------点击删除------------------------------------*/
	loadGoogs.prototype.goodsdel = function(){
		$('.show_del').find('a').click(function(){
			obj.bagGoodsdel($(this).parent());
			new loadGoogs();
		})
	}
	/*------------------------------------全选------------------------------------*/
	loadGoogs.prototype.allChecked = function(){
		var that = this;
		$('.pay_all').find('input').click(function(){
			if(!$(this).is(':checked')){				
				$('.pay_where').find('input').trigger('click');				
				for(var i = 0;i < $('.show_sum').find('span').length;i ++){
					if($('.show_sum').find('span').eq(i).attr('issum') == 'true'){						
						$('.show_sum').find('span').eq(i).parent().parent().children().eq(0).find('input').trigger('click');						
					}
				}				
			}else{
				$('.pay_where').find('input').trigger('click');
				for(var i = 0;i < $('.show_sum').find('span').length;i ++){
					if($('.show_sum').find('span').eq(i).attr('issum') == 'false'){						
						$('.show_sum').find('span').eq(i).parent().parent().children().eq(0).find('input').trigger('click');						
					}
				}
			}
		})			
	}
	module.exports = pay;
})