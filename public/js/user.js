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
};

var getUserInfo = function() {
	$.post('/getUserInfo', {
	}, function(result) {
		if (result.success) {
			userInfo = result.data;
			$('#user_name').text(userInfo.user_name);
			refreshFriendList();
			refreshPriMsgList();
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
					'<a><img src="images/avatar.jpg" /></a>' +
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