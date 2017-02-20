define(function(require,exports,module){
	var $ = require('jq');
	var obj = require('./common');
	var cookie = require('cookie');
	cookie($);	
	new login();
	new replace();
	/*---------------------------加载头部，底部和侧边栏------------------------------------*/
	function login(){
		$('#header').load('http://10.9.170.19/haitaoquanqiu/html/registerLoginHeader.html');
		$('#footer').load('http://10.9.170.19/haitaoquanqiu/html/registerLoginFooter.html');
		$('#right_fixed').load('http://10.9.170.19/haitaoquanqiu/html/registerLoginRight.html',function(){
			obj.mouseoverblock('.online','.contact');
			obj.mouseoverblock('.collect a','.collect div');
			obj.mouseoverblock('.sale a','.sale div');
			obj.mouseoverblock('.qr_code a','.qr_code div');
			obj.goTop();
		});
	}
	/*---------------------------------------登录导航------------------------------------*/	
	function replace(){
		var $one = $('.login_nav').find('li').eq(0);
		var $two = $('.login_nav').find('li').eq(1);
		var $login_one = $('.reg_one');
		var $login_two = $('.reg_two');
		//console.log($one.attr('class'))
		$two.click(function(){
			if($(this).attr('class','')){
				$(this).addClass('change');
				$one.removeClass('change');
				$login_one.hide();
				$login_two.show();
			}
		})
		$one.click(function(){
			if($(this).attr('class','')){
				$(this).addClass('change');
				$two.removeClass('change');
				$login_one.show();
				$login_two.hide();
			}
		})
	}
	/*----------------------------------账号验证------------------------------------*/
	var index = 0;
	var $name = $('#phone');
		$name.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$name.on('blur',function(){			
			var $val = $(this).val();
			var $p = $(this).parent().next();
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入昵称</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else{
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				index = index + 1;
			}			
		})
		/*----------------------------------密码验证------------------------------------*/
		var $password = $('#password');
		$password.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$password.on('blur',function(){
			var reg = /^\w{6,20}$/;
			var $val = $(this).val();
			var $p = $(this).parent().next();
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入密码</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else if(reg.test($val)){
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				index = index + 1;
			}else{
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入6-20位字母、数字或字符</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}			
		})
		/*------------------------------点击登录-------------------------------*/
		$('.login').find('span').click(function(){				
			if(index == 2){			
				$.ajax({
					type:"post",
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					async:true,
					data:{
						status:'login',
						userID:$name.val(),
						password:$password.val()
					},
					success:function(res){
						if(res == '0' || res == '2'){
							//console.log(2)
							$password.parent().next().html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">账号或密码错误，请重试</em>');
							$name.val('');
							$password.val('');	
						}else{							
							saveUserMsg($name.val());
							alert('登陆成功');
							window.location.href = 'http://10.9.170.19/haitaoquanqiu/index.html';
						}
					}
				});
			}
			index = 0;
		})
	/*------------------------------保存用户信息函数cookie-------------------------------*/
	function saveUserMsg(name){
		$.cookie('user',name,{path:'/'})
		console.log($.cookie('user'))
	}		
	/*------------------------------手机号验证-------------------------------*/
		var $phonenum = $('#phonenum');
		$phonenum.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$phonenum.on('blur',function(){
			var reg = /^[1][358][0-9]{9}$/;
			var $val = $(this).val();
			var $p = $(this).parent().next();
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入手机号码</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else if(reg.test($val)){
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				
			}else{
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">手机格式有误，请重新输入</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}			
		})
		//console.log(index)
		/*------------------------------图形验证码-------------------------------*/
		var $testcode = $('#testcode');
		$testcode.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$testcode.on('blur',function(){
			var $val = $(this).val();
			var $p = $(this).parent().next();
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入图形验证码</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else{
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				
			}			
		})
		/*------------------------------短信验证-------------------------------*/
		var $imessage = $('#imessage');
		$imessage.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$imessage.on('blur',function(){
			var reg = /^\d{4}$/;
			var $val = $(this).val();
			var $p = $(this).parent().next();
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入验证码</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else if(reg.test($val)){
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				
			}else{
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">验证码错误，请重新输入</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}			
		})
		/*------------------------------点击跳转到注册页面-------------------------------*/		
		$('.log_btn').click(function(){
			window.location.href = 'http://10.9.170.19/haitaoquanqiu/html/register.html'
		})
})