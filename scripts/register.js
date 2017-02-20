define(function(require,exports,module){
	var $ = require('jq');
	var obj = require('./common');
	new login();		
	new checking();	
	/*---------------------------加载头部，底部和侧边栏------------------------------------*/
	function login(){
		$('#header').load('registerLoginHeader.html');
		$('#footer').load('registerLoginFooter.html');
		$('#right_fixed').load('registerLoginRight.html',function(){
			obj.mouseoverblock('.online','.contact');
			obj.mouseoverblock('.collect a','.collect div');
			obj.mouseoverblock('.sale a','.sale div');
			obj.mouseoverblock('.qr_code a','.qr_code div');
			obj.goTop();
		});
	}
	function checking(){
		var index = 0;
		var num = 0;
		/*------------------------------手机号验证-------------------------------*/
		var $phone = $('#phone');
		$phone.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$phone.on('blur',function(){
			var reg = /^[1][358][0-9]{9}$/;
			var $val = $(this).val();
			var $p = $(this).parent().next();
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入手机号码</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else if(reg.test($val)){
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				index = index + 1;
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
				index = index + 1;
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
				index = index + 1;
			}else{
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">验证码错误，请重新输入</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}			
		})
		/*------------------------------点击下一步-------------------------------*/
		var $gotoway = $('.nextway').find('span');
		$gotoway.click(function(){
			if(index == 3){
				$('.reg_one').hide();
				$('.reg_two').show();
			}else{
				$phone.val('');
				$testcode.val('');
				$imessage.val('');
			}
			index = 0;
		})
		/*------------------------------昵称验证-------------------------------*/
		var $name = $('#name');
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
				num = num + 1;
			}			
		})
		/*------------------------------密码验证-------------------------------*/
		var $password = $('#password');
		$password.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$password.on('blur',function(){
			var reg = /^\w{6,20}$/;
			var $val = $(this).val();
			var $p = $('.tip_password');
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入密码</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else if(reg.test($val)){
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				num = num + 1;
			}else{
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">请输入6-20位字母、数字或字符</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}			
		})
		/*------------------------------确认密码验证-------------------------------*/
		var $surepass = $('#surepass');
		$surepass.on('focus',function(){
			$(this).parent().css('border','2px solid #999');
			$(this).parent().next().html('');
		})
		$surepass.on('blur',function(){			
			var $val = $(this).val();
			var $p = $('.tip_password');
			if($val == ''){
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">确认密码不能为空</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}else if($val == $password.val()){
				$p.html('');
				$(this).parent().css('border','1px solid #999');
				num = num + 1;
			}else{
				$p.html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">密码输入不一致</em>');
				$(this).parent().css('border','2px solid #e10482');				
			}		
		})
		/*------------------------------点击注册-------------------------------*/
		$('.register').find('span').click(function(){			
			if(num == 3){				
				$.ajax({
					type:"post",
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					async:true,
					data:{
						status:'register',
						userID:$name.val(),
						password:$password.val()
					},
					success:function(res){
						if(res == '0'){	
							$('.tip_password').html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">该昵称已被使用，更换一个吧</em>');
							$name.val('');
							$password.val('');
							$surepass.val('');							
						}else if(res == '1'){
							alert('注册成功')
							window.location.href = 'http://10.9.170.19/haitaoquanqiu/html/login.html';
						}else{
							$('.tip_password').html('<i class="img_tip"><img src="../imges/tanhao.jpg"/></i><em class="text_tip">数据库报错，请重新注册</em>');
						}
					}
				});
			}
			num = 0;
		})
		/*------------------------------点击跳转到登录页面-------------------------------*/		
		$('.reg_btn').click(function(){
			window.location.href = 'http://10.9.170.19/haitaoquanqiu/html/login.html'
		})
	}
})
	