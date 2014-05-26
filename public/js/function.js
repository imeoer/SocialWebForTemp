$(function() {
	

	//展示所有用户文章
	$.post('/listAllArticle', {
	}, function(result) {
		if (result.success) {
			var htmlTxt = '';
			for (var i in result.data) {
				var article = result.data[i];
				var item = '<li><a>' +
								'<em>' + article.article_tags + '</em>' +
								'<h3>' + article.article_title + '<span>' + article.article_content + '</span></h3>' +
								// '<img src="images/img3.png" />' +
							'</a></li>';
				htmlTxt += item;
			}
			$('#all_article').html(htmlTxt);
		} else {
			alert(result.data);
		}
	}, 'JSON');

	//展示当前用户（包括所关注的人）的文章
	$.post('/listMyArticle', {
	}, function(result) {
		if (result.success) {
			var htmlTxt = '';
			for (var i in result.data) {
				var article = result.data[i];
				var item = '<li><a>' +
								'<em>' + article.article_tags + '</em>' +
								'<h3>' + article.article_title + '<span>' + article.article_content + '</span></h3>' +
								// '<img src="images/img3.png" />' +
							'</a></li>';
				htmlTxt += item;
			}
			$('#my_article').html(htmlTxt);
		} else {
			alert(result.data);
		}
	}, 'JSON');

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

	//上传文本
	$('#uptext').on('click', function() {
		var title = $('#text_title').val();
		var cont = $('#text_cont').val();
		var tags = $('#text_tags').val();
		$.post('/publish', {
			article_type:'text',
			article_title: title,
			article_content: cont,
			article_url: '文章木有连接的',
			article_tags: tags
		}, function(result) {
			if (result.success) {
				window.location = '/';
			} else {
				alert(result.data);
			}
		}, 'JSON');
	});


	// 上传图像
	$('#upimg').uploadFile({//这个地方我是要点击上传图片按钮触发事件？还是其他的一样的提交按钮？
	    url: '/publish',
	    fileName: 'file',
	    showPreivew: false,
	    showFileCounter: false,
	    showStatusAfterSuccess: false,
	    showDone: false,
	    dynamicFormData: function() {
	        return {
	            article_type: 'image',
	            article_title: $('#img_title').val(),
	            article_content: $('#img_cont').val(),
	            article_tags: $('#img_tags').val()
	        };        
	    },
		onSuccess:function(files, data, xhr, pd) {
			alert(JSON.stringify(data));
		}
	});

	//上传音频
	$('#upaudio').on('click', function() {
		var title = $('#audio_title').val();
		var cont = $('#audio_cont').val();
		var url = $('#audio_url').val();
		var tags = $('#audio_tags').val();
		$.post('/publish', {
			article_type:'audio',
			article_title: title,
			article_content: cont,
			article_url: url,
			article_tags: tags
		}, function(result) {
			if (result.success) {
				window.location = '/';
			} else {
				alert(result.data);
			}
		}, 'JSON');
	});

	//上传视频
	$('#upvideo').on('click', function() {
		var title = $('#video_title').val();
		var cont = $('#video_cont').val();
		var url = $('#video_url').val();
		var tags = $('#video_tags').val();
		$.post('/publish', {
			article_type:'video',
			article_title: title,
			article_content: cont,
			article_url: url,
			article_tags: tags
		}, function(result) {
			if (result.success) {
				window.location = '/';
			} else {
				alert(result.data);
			}
		}, 'JSON');
	});


	//上传连接
	$('#uplink').on('click', function() {
		var title = $('#link_title').val();
		var cont = $('#link_cont').val();
		var url = $('#link_url').val();
		var tags = $('#link_tags').val();
		$.post('/publish', {
			article_type:'link',
			article_title: title,
			article_content: cont,
			article_url: url,
			article_tags: tags
		}, function(result) {
			if (result.success) {
				window.location = '/';
			} else {
				alert(result.data);
			}
		}, 'JSON');
	});

});