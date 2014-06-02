
$(function() {

	//展示所有用户文章
	$.post('/listAllArticle', {
	}, function(result) {
		if (result.success) {
			var htmlTxt = '';
			for (var i in result.data) {
				var article = result.data[i];
				if(article.article_image){
					var item = '<li><a>' +
								'<em>' + article.article_tags + '</em>' +
								'<h3><i>' + article.article_title + '</i><span>' + article.article_content + '</span></h3>' +
								'<img src="data/' + article.article_image + '" />' +
							'</a></li>';
				}else{
					var item = '<li><a>' +
								'<em>' + article.article_tags + '</em>' +
								'<h3><i>' + article.article_title + '</i><span>' + article.article_content + '</span></h3>' +
								// '<img src="images/img3.png" />' +
							'</a></li>';
				}
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
				var articleimage = '';
				var articleCommentAry = article.article_comments;
				var allArtcileCommentHTML = '';
				for (var i in articleCommentAry) {
					var articleComment = articleCommentAry[i];
					var commentConent = articleComment.comment_content;
					var commentUserName = articleComment.user_name;
					var artcileCommentHTML = '<dt>' +
						'<a><img src="data/' + commentUserName + '.jpg" /><em>' + commentUserName + '</em></a>' +
						'<span>' + commentConent + '</span>' +
					'</dt>';
					allArtcileCommentHTML += artcileCommentHTML;
				}
				if(article.article_image){
					var item = '<li class="article-item" data-id="' + article._id + '">' +
								'<div class="avatar">' +
									'<img src="data/' + article.user_name + '.jpg">' +
									// '<span>加关注</span>' +
								'</div>' +
								'<div class="cont_box">' +
									'<div class="title">' +
										'<div class="more"><a>╳</a></div>' +
										'<h3><a>' + article.article_title + '</a></h3>' +
										'<div class="clear"></div>' +
									'</div>' +
									'<div class="cont">' +
										'<img src="data/' + article.article_image + '" />' +
										'<p>' + article.article_content + '</p>' +
									'</div>' +
									'<div class="comment_box">' +
										'<div class="tags">' +
											'<a>' + article.article_tags + '</a>' +
										'</div>' +
										'<div class="share">' +
											'<a class="love_btn"></a>' +
											'<a class="reship_btn"></a>' +
											'<a class="comt_btn"></a>' +
										'</div>' +
										'<div class="clear space_10"></div>' +
										'<dl>' +
											'<div class="article_comment_list">' +
												allArtcileCommentHTML +
											'</div>' +
											'<dd>' +
												'<textarea class="comment_content_input"></textarea>' +
												'<a class="cancel_btn">取消</a>' +
												'<a class="done_btn">评论</a>' +
												'<div class="clear"></div>' +
											'</dd>' +
										'</dl>' +
									'</div>' +
								'</div>' +
								'<div class="clear"></div>' +
							'</li>';
				}else{
					var item = '<li class="article-item" data-id="' + article._id + '">' +
								'<div class="avatar">' +
									'<img src="data/' + article.user_name + '.jpg">' +
									// '<span>加关注</span>' +
								'</div>' +
								'<div class="cont_box">' +
									'<div class="title">' +
										'<div class="more"><a>╳</a></div>' +
										'<h3><a>' + article.article_title + '</a></h3>' +
										'<div class="clear"></div>' +
									'</div>' +
									'<div class="cont">' +
										'<a href="' + article.article_url + '">'+ article.article_url + '</a>' +
										'<p>' + article.article_content + '</p>' +
									'</div>' +
									'<div class="comment_box">' +
										'<div class="tags">' +
											'<a>' + article.article_tags + '</a>' +
										'</div>' +
										'<div class="share">' +
											'<a class="love_btn"></a>' +
											'<a class="reship_btn"></a>' +
											'<a class="comt_btn"></a>' +
										'</div>' +
										'<div class="clear space_10"></div>' +
										'<dl>' +
											'<div class="article_comment_list">' +
												allArtcileCommentHTML +
											'</div>' +
											'<dd>' +
												'<textarea class="comment_content_input"></textarea>' +
												'<a class="cancel_btn">取消</a>' +
												'<a class="done_btn">评论</a>' +
												'<div class="clear"></div>' +
											'</dd>' +
										'</dl>' +
									'</div>' +
								'</div>' +
								'<div class="clear"></div>' +
							'</li>';
				}
				
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
			article_url: '',
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
	$('#upimg').uploadFile({
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
				article_url: '',
	            article_tags: $('#img_tags').val()
	        };        
	    },
		onSuccess:function(files, data, xhr, pd) {
			var result = JSON.parse(data);
			if (result.success) {
				window.location = '/';
			} else {
				alert(result.data);
			}
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