var userInfo = {};
$(function() {
	bindEvent();
	getUserInfo();
});

var bindEvent = function() {

	$(document).on('click', '.friend_list .send_msg', function(event) {
		var $item = $(event.currentTarget).parents('.friend_item');
		var userName = $item.data('user-name');
		var content = $item.find('.text').val();
		sendPrivateMsg(userName, content);
	});
	$(document).on('click', '.article .comt_btn', function() {
		if ($(this).hasClass('active')) {
			$(this).parent().parent().find("dl").hide("slow");
			$(this).attr("class","comt_btn");
		} else {
			$(this).parent().parent().find("dl").show("slow");
			$(this).attr("class","comt_btn active");
		}
	});
	$(document).on('click', '.article .comment_box .done_btn', function(event) {
		$articleItem = $(this).parents('.article-item');
		addArticleComment($articleItem);
	});
	$(document).on('click', '.article .remove_btn', function(event) {
		$articleItem = $(this).parents('.article-item');
		removeArticle($articleItem);
	});
	$(document).on('click', '.article .reship_btn', function(event) {
		$articleItem = $(this).parents('.article-item');
		forwardArticle($articleItem);
	});
	$('.ico_exit').on('click', function() {
		location.href = '/logout';
	});
	$('#update_user_info').on('click', function() {
		updateUserInfo();
	});
	$('#upload_avatar').uploadFile({
	    url: '/updateUserAvatar',
	    fileName: 'file',
	    showPreivew: false,
	    showFileCounter: false,
	    showStatusAfterSuccess: false,
	    showDone: false,
	    statusBarWidth: 200,
	    dragdropWidth: 200,
	    dynamicFormData: function() {
	        return {};        
	    },
		onSuccess:function(files, data, xhr, pd) {
			var result = JSON.parse(data);
			if (result.success) {
				refreshUserInfo();
			} else {
				alert(result.data);
			}
		}

	});
};

var getUserInfo = function() {
	$.post('/getUserInfo', {
	}, function(result) {
		if (result.success) {
			userInfo = result.data;
			refreshFriendList();
			refreshPriMsgList();
			refreshUserInfo();
		} else {
			alert(result.data);
		}
	}, 'JSON');
};

var refreshFriendList = function() {
	var focusAry = userInfo.focus;
	var result = '';
	for (var i in focusAry) {
		var userName = focusAry[i];
		var item =
			'<dd class="friend_item" data-user-name="' + userName + '">' +
				'<div class="avatar">' +
					'<a><img src="data/' + userName + '.jpg" /></a>' +
				'</div>' +
				'<div class="comment">' +
					'<h3>' +
						'<em>取消关注</em>' +
						'<a>' + userName + '</a>' +
					'</h3>' +
					'<p>' +
						'<em class="send_msg">发私信</em>' +
						'<input class="text" type="text" />' +
					'</p>' +
				'</div>' +
				'<div class="clear"></div>' +
			'</dd>';
		result += item;
	}
	$('.friend_list').html(result);
};

var sendPrivateMsg = function(userName, content) {
	$.post('/sendPrivateMessage', {
		target_user_name: userName,
		message_content: content
	}, function(result) {
		if (result.success) {
			$('.friend_list .text').val('');
		}
		alert(result.data);
	}, 'JSON');
};

var refreshPriMsgList = function() {
	var msgAry = userInfo.msgs;
	var result = '';
	for (var i in msgAry) {
		var userName = msgAry[i].from_user_name;
		var content = msgAry[i].message_content;
		var date = msgAry[i].date;
		var item = '<dd>' +
			'<div class="avatar">' +
				'<a><img src="images/avatar.jpg" /></a>' +
			'</div>' +
			'<div class="comment">' +
				'<h3>' +
					'<em>╳</em>' +
					'<a>' + userName + '</a>' +
					'<span> ' + date.toString() + '</span>' +
				'</h3>' +
				'<p>' +
					'<em>回复</em>' +
					'<span>' + content + '</span>' +
				'</p>' +
				'<div class="reply">' +
					'<em>发表</em>' +
					'<textarea></textarea>' +
				'</div>' +
			'</div>' +
			'<div class="clear"></div>' +
		'</dd>';
		result += item;
	}
	$('.msg_box').html(result);
};

var refreshUserInfo = function() {
	var userNick = userInfo.user_nick || '';
	var userMotto = userInfo.user_motto || '';
	var userName = userInfo.user_name;
	$('#user_nick_input').val(userNick);
	$('#user_motto_input').val(userMotto);
	$('#user_avatar').attr('src', 'data/' + userName + '.jpg?' + (new Date()).getTime());
	$('#user_nav_avatar').attr('src', 'data/' + userInfo.user_name + '.jpg?' + (new Date()).getTime());
	$('#user_name').text(userName);
	listMyArticle();
};

var updateUserInfo = function() {
	var userNick = $('#user_nick_input').val();
	var userMotto = $('#user_motto_input').val();
	$.post('/updateUserInfo', {
		user_nick: userNick,
		user_motto: userMotto
	}, function(result) {
		if (result.success) {
			alert(result.data);
		} else {
			alert(result.data);
		}
	}, 'JSON');
};

var addArticleComment = function($articleItem) {
	var userName = userInfo.user_name;
	var commentConentInput = $articleItem.find('.comment_box .comment_content_input');
	var commentConent = commentConentInput.val();
	var articleId = $articleItem.data('id');
	$.post('/addArticleComment', {
		article_id: articleId,
		comment_content: commentConent
	}, function(result) {
		if (result.success) {
			$articleItem.find('.article_comment_list').append('<dt>' +
				'<a><img src="data/' + userName + '.jpg" /><em>' + userName + '</em></a>' +
				'<span>' + commentConent + '</span>' +
			'</dt>');
			commentConentInput.val('');
		} else {
			alert(result.data);
		}
	}, 'JSON');
};

var removeArticle = function($articleItem) {
	var articleId = $articleItem.data('id');
	$.post('/removeArticle', {
		article_id: articleId
	}, function(result) {
		if (result.success) {
			$articleItem.fadeOut(500, function() {
				$(this).remove();
			});
		} else {
			alert(result.data);
		}
	}, 'JSON');
};

var forwardArticle = function($articleItem) {
	var articleId = $articleItem.data('id');
	$.post('/forwardArticle', {
		article_id: articleId
	}, function(result) {
		if (result.success) {
			alert(result.data);
		} else {
			alert(result.data);
		}
	}, 'JSON');
};