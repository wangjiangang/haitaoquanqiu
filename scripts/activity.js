define(function(require,exports,module){
	var $ = require('jq');	
	var obj = require('./common');
	var cookie = require('cookie');
	cookie($);
	//console.log($.cookie)
	new loading();
	new pro_loading();
	new tabChange();
	new saveCookie();
	
	/*---------------------------加载头部，底部和侧边栏------------------------------------*/
	function loading(){
		$('#header').load('http://10.9.170.19/haitaoquanqiu/html/header.html',function(){
			obj.clickBlock();
			obj.hoverChange();
			obj.searchBlock();
			obj.insert();
			obj.changeBackground()
		})
		$('#footer').load('http://10.9.170.19/haitaoquanqiu/html/footer.html')
		$('#right_fixed').load('http://10.9.170.19/haitaoquanqiu/html/right.html',function(){
			obj.mouseoverblock('.online','.contact');
			obj.mouseoverblock('.collect a','.collect div');
			obj.mouseoverblock('.sale a','.sale div');
			obj.mouseoverblock('.qr_code a','.qr_code div');
			obj.goTop();
			obj.bag();
			obj.bagGoodsNum();
			obj.bagGoodsShow();
		})
	}
	/*--------------------------------------加载商品-------------------------------------------*/
	function pro_loading(){
		$.ajax({
			type:"get",
			url:"../json/activity.json",
			async:true,
			success:function(res){
				var html = joint(res);
				$('.act_load').html(html);
				secondLoading();
				
			}
		});
	}
	/*--------------------------------------字符串拼接-----------------------------------------*/
	function joint(res){
		var html = '';
		for(var i = 0; i < res.length; i ++){
			if(res[i].saleout == 'true'){
				html += '<li><a href="http://10.9.170.19/haitaoquanqiu/html/detail.html"><div class="act_img"><img src="'+res[i].src+'"/></div><div class="act_wrap"><div class="act_form"><img src="../imges/han.png"/><em>宁波保税仓发货 不支持七天无理由退换货</em></div><div class="act_text" id="'+res[i].id+'">'+res[i].text+'</div><div class="act_price">￥<span>'+res[i].nowprice+'</span><p>￥<del>'+res[i].del+'</del></p></div></div><div class="saleout"><span>抢光了</span></div></a></li>'
			}else{
				html += '<li><a href="http://10.9.170.19/haitaoquanqiu/html/detail.html"><div class="act_img"><img src="'+res[i].src+'"/></div><div class="act_wrap"><div class="act_form"><img src="../imges/han.png"/><em>宁波保税仓发货 不支持七天无理由退换货</em></div><div class="act_text" id="'+res[i].id+'">'+res[i].text+'</div><div class="act_price">￥<span>'+res[i].nowprice+'</span><p>￥<del>'+res[i].del+'</del></p></div></div><div class="act_buy"><span></span></div></a></li>'
			}
		}
		return html;
	}
	/*--------------------------------------tab切换-------------------------------------------*/
	function tabChange(){
		var that = this;
		this.$tab1 = $('.nav_tab').children().eq(0);
		this.$tab2 = $('.nav_tab').children().eq(1);
		this.$con1 = $('.act_list');
		this.$con2 = $('.act_will');
		this.$tab1.click(function(){
			that.$con1.show();
			that.$con2.hide();
			$(this).css({'background':'#E40788','color':'#fff'}).siblings().css({'background':'#fff','color':'#000'});
		})
		this.$tab2.click(function(){
			that.$con2.show();
			that.$con1.hide();
			$(this).css({'background':'#E40788','color':'#fff'}).siblings().css({'background':'#fff','color':'#000'});
		})
	}
	/*--------------------------------------第二波加载------------------------------------------*/
	var isLoading = true;
	function secondLoading(){
		var $goods = $('.act_load').find('li');
		var $lastTop = $goods.eq($goods.length-1).offset().top;				
		window.onscroll = function(){				//需要scrollTop值时，要先触发onscroll事件。
			if($('body').scrollTop() >= $lastTop){    //不能写 == 太精确计算机计算不到。	
				if(isLoading){							//想要不持续加载要建立逻辑点。
					goLoading();
				}				
			}
		}
	}
	function goLoading(){
		$.ajax({
			type:"get",
			url:"../json/activity.json",
			async:true,
			success:function(res){				
				var html = joint(res);
				var $a = $('.act_load').html();
				$('.act_load').html($a + html);				
				isLoading = false;
			}
		});
	}
	/*----------------------------------存商品cookie-------------------------------------*/
	function saveCookie(){
		$('.act_load').on('click','a',function(){
			var id = Number($(this).find('.act_text').attr('id'));
			var first = $.cookie('goods') == null ? true : false;			
			if(first){
				$.cookie('goods','[{id:'+id+',num:1}]',{path:'/'});
				//console.log($.cookie('goods'));
			}else{
				var arr = eval($.cookie('goods'));
				//console.log(arr);				
				var obj = {id:id,num:1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods',cookieStr,{path:'/'});
				//console.log($.cookie('goods'))					
			}						
		})
	}
	
	
})