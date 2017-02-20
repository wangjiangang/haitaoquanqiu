define(function(require,exports,module){
	var $ = require('jq');	
	var obj = require('./common');
	var cookie = require('cookie');
	cookie($);
	new login();
	new showPhoto();
	new proctorNum();
	new parameteryDescription();
	new contentLoading();
	/*---------------------------加载头部，底部和侧边栏------------------------------------*/
	function login(){
		$('#header').load('http://10.9.170.19/haitaoquanqiu/html/header.html',function(){
			obj.clickBlock();
			obj.hoverChange();
			obj.searchBlock();
			obj.insert();			
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
	/*---------------------------------------图片切换------------------------------------*/
	function showPhoto(){
		var that = this;
		this.$s_img = $('.small_img').find('li');
		this.$b_img = $('.big_img').find('img');
		this.$mark_box = $('.mark_box');
		this.$move_box = $('.move_box');
		this.$big_box = $('.big_box');
		var $weixin = $('.small_img').find('p').children().eq(0);
		var $erweima = $('.weixin');
		this.$s_img.on('mouseover',function(){
			that.photoChange($(this));
		})
		$weixin.hover(function(){
			$erweima.show();
		},function(){
			$erweima.hide();
		})
		this.$mark_box.on('mouseenter',function(){
			that.$big_box.show();
			that.$move_box.show();			
		})
		this.$mark_box.on('mouseleave',function(){
			that.$big_box.hide();
			that.$move_box.hide();
		})
		this.$mark_box.on('mousemove',function(event){
			that.magnifying(event);
		})
	}
	showPhoto.prototype.photoChange = function(si){
		si.css('border','1px solid #000').siblings().css('border','1px solid #eee');
		this.$b_img.eq(si.index()).show().siblings().hide();
		this.$big_box.find('img').eq(si.index()).show().siblings().hide();
	}
	/*---------------------------------------放大镜------------------------------------*/
	showPhoto.prototype.magnifying = function(event){
		var left = event.offsetX - this.$move_box.width()/2;
		var top = event.offsetY - this.$move_box.height()/2;
		if(left <= 0){
			left = 0;
		}else if(left >= this.$b_img.width() - this.$move_box.width()){
			left = this.$b_img.width() - this.$move_box.width()
		}
		if(top <= 0){
			top = 0;
		}else if(top >= this.$b_img.height() - this.$move_box.height()){
			top = this.$b_img.height() - this.$move_box.height()
		}
		this.$move_box.css({'left':left,'top':top});
		var percentageLeft = left/(this.$mark_box.width() - this.$move_box.width());
		var percentageTop = top/(this.$mark_box.height() - this.$move_box.height());
		var bigimg = this.$big_box.children();
		bigimg.css({'left':-(bigimg.width() - this.$big_box.width())*percentageLeft,'top':-(bigimg.height() - this.$big_box.height())*percentageTop})
	}
	/*---------------------------------------数量特效+收藏人数---------------------------------*/
	function proctorNum(){
		var that = this;
		this.$decrease = $('.decrease');
		this.$increase = $('.increase');
		this.$Num = $('.pro_num').find('input');
		var $peopleNum = $('.people_num');
		$peopleNum.click(function(){
			$(this).find('span').html('595');
		})
		this.$Num.on('blur',function(){
			that.blur();
		})
		this.$increase.on('click',function(){
			that.increase()
		})
		this.$decrease.on('click',function(){
			that.decrease()
		})
	}
	proctorNum.prototype.increase = function(){
		var nowNum = Number(this.$Num.val());		
		this.$Num.val(nowNum + 1);
		if(nowNum > 0){
			this.$decrease.css({'background':'#fff','cursor':'pointer'});
		}else{
			this.$decrease.css({'background':'#f2f2f2','cursor':'not-allowed'});
		}
	}
	proctorNum.prototype.decrease = function(){
		var nowNum = Number(this.$Num.val());		
		if(nowNum == 1){
			this.$decrease.css({'background':'#f2f2f2','cursor':'not-allowed'});
		}else{
			this.$Num.val(nowNum - 1);
			this.$decrease.css({'background':'#fff','cursor':'pointer'});
		}
	}
	proctorNum.prototype.blur = function(){
		var nowNum = Number(this.$Num.val());		
		if(nowNum > 1){
			this.$decrease.css({'background':'#fff','cursor':'pointer'});
		}else if(nowNum <= 1){
			this.$Num.val('1');
			this.$decrease.css({'background':'#f2f2f2','cursor':'not-allowed'});
		}
	}
	/*------------------------------------商品介绍和评论---------------------------------*/
	function parameteryDescription(){
		var that= this;
		this.$parametery = $('.rec_nav').children('li').eq(0);
		this.$description = $('.rec_nav').children('li').eq(1);
		this.$one = $('.rec_one');
		this.$tow = $('.rec_tow');
		this.$parametery.click(function(){
			that.$parametery.addClass('active');
			that.$description.removeClass('active');
			that.$one.show();
			that.$tow.hide();
		})
		this.$description.click(function(){
			that.$description.addClass('active');
			that.$parametery.removeClass('active');
			that.$tow.show();
			that.$one.hide();
		})
	}
	/*------------------------------------内容数据加载---------------------------------*/
	function contentLoading(){
		//console.log($.cookie('goods'))		
		$.ajax({
			type:"get",
			url:"../json/activity.json",
			async:true,
			success:function(res){
				var cookieStr = $.cookie('goods');
				if(cookieStr){
					var cookieArr = eval(cookieStr);
					//console.log(cookieArr)
					var last = cookieArr[cookieArr.length-1].id;
					//console.log(last)
					for(var i = 0 ;i < res.length;i ++){
						if(res[i].id == last){
							if(res[i].saleout == 'true'){
								$('.nowBuy').remove();
							}
							var place = res[i].text;
							var img = res[i].src;
							var nowPrice = res[i].nowprice;
							var del = res[i].del;						
							$('.detail_nav').find('span').html(place);	
							$('.big_img').children().eq(0).attr('src',img);
							$('.big_box').children().eq(0).attr('src',img);
							$('.small_img').find('li img').eq(0).attr('src',img);
							$('.pro_title').html(place);
							$('.pro_price').find('span').html(nowPrice);
							$('.official_price').find('del').html('￥'+del);
							$('.pro_fly').find('img').attr('src',img);							
						}
					}
					addGoodsBag(last);
				}				
			}
		});
	}
	/*------------------------------------添加到购物袋---------------------------------*/
	function addGoodsBag(last){
		$('.add_bag').click(function(){
			var id = last;			
			var first = $.cookie('bag') == null ? true:false;
			var same = false;
			if(first){
				$.cookie('bag','[{id:'+id+',num:1}]',{path:'/'});				
			}else{
				var arr = eval($.cookie('bag'));
				var $inputNum = Number($('.inputNum').val());				
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num = arr[i].num + $inputNum;
						var cookieStr = JSON.stringify(arr);
						$.cookie('bag',cookieStr,{path:'/'});
						same = true;
					}
				}
				//为了不把下面的代码放到for循环里，所以建立逻辑点，不写else
				if(!same){
					var obj = {id:id,num:$inputNum};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie('bag',cookieStr,{path:'/'});
				}
			}
			//console.log($.cookie('bag'))
			bagGoodsNum();
		})
	}
	/*------------------------------------购物袋数量---------------------------------*/
	function bagGoodsNum(){
		var cookieStr = $.cookie('bag');
		if(cookieStr){
			var arr = eval(cookieStr);
			var num = 0;			
			for(var i in arr){
				num += arr[i].num;
			}
			fly(num);						
		}
	}
	/*----------------------------------------fly商品飞行------------------------------------*/
	function fly(num){
		var $flyPro = $('.pro_fly');
		var $startLeft = $('.add_bag').offset().left;
		var $startTop = $('.add_bag').offset().top;
		var endLeft = $('.goods_num').offset().left;
		var endTop = $('.goods_num').offset().top;
		//console.log(endTop);
		$flyPro.css({'left':$startLeft+20,'top':$startTop-20});
		$flyPro.show().stop().animate({
			left:endLeft-10,
			top:endTop
		},1000,function(){
			$(this).hide;
			$('.goods_num').html(num);
		})
	}
	/*--------------------------------购物袋商品处理-------------------------------------*/
	
	/*function bagGoodsShow(){
		$.ajax({
			type:'GET',
			url:'../json/activity.json',
			success:function(res){
				var cookieStr = $.cookie('bag');
				if(cookieStr){
					arr = eval(cookieStr);
					var html = '';
					for(var i in arr){
						html += '<li><dl class="clear"><dt><a href="javascript:;"><img src="'+res[arr[i].id].src+'"/></a></dt><dd><div class="bag_title"><a href="javascript:;">'+res[arr[i].id].text+'</a></div><span class="bag_price">￥<em>'+res[arr[i].id].nowprice+'</em><i>&times;'+arr[i].num+'</i></span><span class="bag_del" id="'+arr[i].id+'">删除商品</span></dd></dl></li>'
					}
					$('.goods_list').html(html);
				}				
			}			
		})
	}*/
})