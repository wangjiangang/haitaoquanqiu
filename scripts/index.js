define(function(require,exports,module){	
	var $ = require('jq');	
	var obj = require('./indexHFR');
	var cookie = require('cookie');
	cookie($);
	
	$(function(){
		obj.clickBlock();
		obj.hoverChange();
		obj.searchBlock();
		obj.insert();
		obj.changeBackground();
		obj.mouseoverblock('.online','.contact');
		obj.mouseoverblock('.collect a','.collect div');
		obj.mouseoverblock('.sale a','.sale div');
		obj.mouseoverblock('.qr_code a','.qr_code div');
		obj.goTop();
		obj.bag();
		obj.bagGoodsNum();
		obj.bagGoodsShow();
		new banner();		
		new hot_show('.hot_show');
		new big_show('.big_show');
		new mouseoverBorder();
		new timeOut('.d_time span','2017/5/10');
		new imgChangeBig();
		new changeUser();
	})
	/*-----------------------------------banner-------------------------------------------*/
		function banner(){
			var that = this;
			//初始化
			this.$autoEle = $('.banner_box');
			this.$rightBtn = $('.banner_rightBtn');
			this.$leftBtn = $('.banner_leftBtn');
			this.$change = $('.banner_img').children();
			this.$point = $('.banner_point').children();			
			this.index = 0;
			this.timer;
			this.$change.eq(0).css('background-color','#fb901c');
			this.$change.eq(1).css('background-color','#f6f7f2');
			this.$change.eq(2).css('background-color','#ff3c64');
			this.$change.eq(3).css('background-color','#f06427');
			//获取屏幕宽度
			//this.fn_getCWidth();
			//鼠标移入事件
			this.$autoEle.on('mouseenter',function(){
				that.$rightBtn.show();
				that.$leftBtn.show();
				clearInterval(timer);
			});
			//鼠标移出事件
			this.$autoEle.on('mouseleave',function(){
				that.$rightBtn.hide();
				that.$leftBtn.hide();
				clearInterval(timer);
				timer = setInterval(function(){
				that.rightClick();
			},2000);
			});
			//点击按钮事件
			this.$rightBtn.on('click',function(){
				that.rightClick();
			})
			this.$leftBtn.on('click',function(){
				that.leftClick();
			});
			//定时播放
			timer = setInterval(function(){
				that.rightClick();
			},2000);
			//点击导播图跳转
			this.$point.on('click',function(){
				var index = $(this).index();
				that.$change.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
				that.$point.siblings().removeClass('banner_point_in').eq(index).addClass('banner_point_in');
			})
		}
		//获取屏幕宽度函数
		banner.prototype.fn_getCWidth = function(){
			this.$autoEle.css('width',$("body,html").width());	
		}		
		//点击右键函数
		banner.prototype.rightClick = function(){
			//console.log(this.$change.eq($(this).index())) 
			if(this.index == this.$change.length-1){
				this.index = 0;
			}else{
				this.index ++;
			}			
			this.$change.eq(this.index).stop().fadeIn(500).siblings().stop().fadeOut(500);
			this.$point.siblings().removeClass('banner_point_in').eq(this.index).addClass('banner_point_in');
		}
		//点击左键函数
		banner.prototype.leftClick = function(){ 
			if(this.index == 0){
				this.index = this.$change.length-1;
			}else{
				this.index --;
			}			
			this.$change.eq(this.index).stop().fadeIn(500).siblings().stop().fadeOut(500);
			this.$point.siblings().removeClass('banner_point_in').eq(this.index).addClass('banner_point_in');
		}
	/*-----------------------------------hot_show-------------------------------------------*/
	function hot_show(img_parent){
		var that = this;
		this.ele = $(img_parent).find('img');
		this.ele.on('mouseenter',function(){			
			//console.log($(this).parent().parent().index())
			that.ele.eq($(this).parent().parent().index()).css('transform','translateY(-15px)');						
		});
		this.ele.on('mouseleave',function(){
			that.ele.eq($(this).parent().parent().index()).css('transform','translateY(0px)');						
		})
	}
	/*-----------------------------------big_show-------------------------------------------*/
	function big_show(img_parent){
		var that = this;
		this.ele = $(img_parent).find('img');		
		this.ele.on('mouseenter',function(){						
			that.ele.eq($(this).parent().parent().index()).css('opacity','.5');			
		});
		this.ele.on('mouseleave',function(){
			that.ele.eq($(this).parent().parent().index()).css('opacity','1');		
		})
	}
	/*-----------------------------------hot_sale_simg-----------------------------------------*/
	function mouseoverBorder(){
		var that= this;
		this.ele = $('.tip_hide_parent');
		var $img_shadow = $('.selection').children();
		this.ele.hover(function(){
			that.ele.eq($(this).index()).css('box-shadow','0 0 2px #999').find('.tip_hide').show();
		},function(){
			that.ele.eq($(this).index()).css('box-shadow','none').find('.tip_hide').hide();						
		})
		$img_shadow.hover(function(){
			$(this).css('box-shadow','0 0 15px #999')
		},function(){
			$(this).css('box-shadow','none')
		})
	}
	/*-----------------------------------d_time 倒计时-----------------------------------------*/
	function timeOut(box,endTime){
		this.$ele = $(box);
		this.getTime(endTime);
	}
	timeOut.prototype.getTime = function(endTime){
		var that = this;
		var timer = setInterval(function(){
			var now = new Date();
			var end = new Date(endTime);
			var time = end.getTime() - now.getTime();		
			var day = Math.floor(time/1000/60/60/24);
			var hours = Math.floor(time/1000/60/60%24);
			var minutes = Math.floor(time/1000/60%60);
			var seconds = Math.floor(time/1000%60);
			var day = that.judgeNum(day);
			var hours = that.judgeNum(hours);
			var minutes = that.judgeNum(minutes);
			var seconds = that.judgeNum(seconds);
			that.$ele.html(day+'天'+hours+':'+minutes+':'+seconds);				
		},1000)	
	}
	timeOut.prototype.judgeNum = function(num){		
		if(num < 10){
			return '0'+num;
		}else{
			return num;
		}
	}
	/*------------------------------special_sale_img 图片变大效果------------------------------*/
	function imgChangeBig(){
		var that = this;		
		this.ele = $('.special_sale');
		this.ele.hover(function(){
			$(this).find('.special_sale_img a').css('transform','scale(1.1)')
		},function(){
			$(this).find('.special_sale_img a').css('transform','scale(1)')
		})		
	}
	/*--------------------------------------改变登录名--------------------------------------*/
	function changeUser(){
		var userName = $.cookie('user');
		if(userName){
			$.cookie('user',null,{expires:-1,path:'/'});
			$('.top_nav_left').children().eq(0).html('欢迎您，');
			$('.top_nav_left').children().eq(1).html(userName);
		}
	}
})