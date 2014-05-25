$(function() {
	
	// 绑定登录单击事件
	$('.submit_l').on('click', function() {
		var userName = $('#username').val();
		var passWord = $('#password').val();
		// 登录请求
		$.post('/login', {
			user_name: userName,
			pass_word: passWord
		}, function(result) {
			if (result.success) {
				window.location = '/';
			} else {
				alert(result.data);
			}
		}, 'JSON');
	});

	// 绑定注册单击事件
	$('.submit_r').on('click', function() {
		var userName = $('#reg_username').val();
		var passWord = $('#reg_password').val();
		// 注册请求
		$.post('/register', {
			user_name: userName,
			pass_word: passWord
		}, function(result) {
			alert(result.data);
		}, 'JSON');
	});

});