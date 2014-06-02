$(document).ready(function(){

	
	var loginroll = $('.login_cont ul');
	$('.handover').click(function(){
		loginroll.animate({marginLeft:'-=935px'},800,function(){
			loginroll.find('li').eq(0).appendTo(loginroll);
			loginroll.attr('style','margin-left:0px;');
		});
	});

	$('.nav ul li').click(function(){
		$(this).parent().find('a').attr('class',' ');
		$(this).find('a').attr('class','active');
	});

	$('.nav .ico_article,.nav .ico_article,.nav .ico_image,.nav .ico_audio,.nav .ico_video,.nav .ico_link').click(function(){
		if(($('.nav').css("left").substring(1,2)*1) == 5){
			$('.nav').animate({left:(window.innerWidth-255) + 'px'},500);
			$('.index_cont').animate({left:window.innerWidth + 'px'},500);
			$('.article').animate({left:(window.innerWidth-940) + 'px'},500);
			
			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish .user_msg,.publish .msg_box,.publish .friend_list').attr("style","display:none;");
			$('.publish ul').slideUp("slow");
			$('.publish ul').slideDown("slow");
			$('.publish ul li').find('form').fadeOut(250);
			$('.publish ul li').eq(($('.nav ul li').index($(this))*1-1)).find('form').delay(500).fadeIn(250);
		}else{
			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish .user_msg,.publish .msg_box').attr("style","display:none;");
			$('.publish ul').slideUp("slow");
			$('.publish ul').slideDown("slow");
			$('.publish ul li').find('form').fadeOut(250);
			$('.publish ul li').eq(($('.nav ul li').index($(this))*1-1)).find('form').delay(500).fadeIn(250);
		}

	});

	$('.nav ul li.ico_home').click(function(){
		$('.publish').animate({width:'0px'},500);
		$('.nav').animate({left:(0-5) + 'px'},500);
		$('.index_cont').animate({left:(255) + 'px'},500);
		$('.article').animate({left:(0-685) + 'px'},500);
	});

	$('.publish .cancel').click(function(){
		$('.publish').animate({width:'0px'},500);
		$('.article').delay(500).animate({left:(window.innerWidth-940) + 'px'},500);
	});

	$('.nav .ico_msg').click(function(){
		if(($('.nav').css("left").substring(1,2)*1) == 5){
			$('.nav').animate({left:(window.innerWidth-255) + 'px'},500);
			$('.index_cont').animate({left:window.innerWidth + 'px'},500);
			$('.article').animate({left:(window.innerWidth-940) + 'px'},500);

			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish ul').attr("style","display:none;");
			$('.publish .user_msg,.publish .friend_list').attr("style","display:none;");
			$('.publish .msg_box').show("slow");
		}else{
			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish ul').attr("style","display:none;");
			$('.publish .user_msg,.publish .friend_list').attr("style","display:none;");
			$('.publish .msg_box').show("slow");
		}
	});

	$('.nav .ico_set').click(function(){
		if(($('.nav').css("left").substring(1,2)*1) == 5){
			$('.nav').animate({left:(window.innerWidth-255) + 'px'},500);
			$('.index_cont').animate({left:window.innerWidth + 'px'},500);
			$('.article').animate({left:(window.innerWidth-940) + 'px'},500);

			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish ul').attr("style","display:none;");
			$('.publish .msg_box,.publish .friend_list').attr("style","display:none;");
			$('.publish .user_msg').show("slow");
		}else{
			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish ul').attr("style","display:none;");
			$('.publish .msg_box,.publish .friend_list').attr("style","display:none;");
			$('.publish .user_msg').show("slow");
		}
	});

	$('.nav .ico_friend').click(function(){
		if(($('.nav').css("left").substring(1,2)*1) == 5){
			$('.nav').animate({left:(window.innerWidth-255) + 'px'},500);
			$('.index_cont').animate({left:window.innerWidth + 'px'},500);
			$('.article').animate({left:(window.innerWidth-940) + 'px'},500);

			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish ul').attr("style","display:none;");
			$('.publish .msg_box,.publish .user_msg').attr("style","display:none;");
			$('.publish .friend_list').show("slow");
		}else{
			$('.article').animate({left:'0px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish ul').attr("style","display:none;");
			$('.publish .msg_box,.publish .user_msg').attr("style","display:none;");
			$('.publish .friend_list').show("slow");
		}
	});

	$('.publish .user_msg .close').click(function(){
		$('.publish').animate({width:'0px'},500);
		$('.article').delay(500).animate({left:(window.innerWidth-940) + 'px'},500);
	});

	$('.article .love_btn').toggle(function(){
		$(this).attr("class","love_btn active");
	},function(){
		$(this).attr("class","love_btn");
	});
	$(document).on('click', '.article .comment_box dd a', function(event) {
		$(this).parent().parent().hide("slow");
		$(this).parent().parent().parent().find('.comt_btn').attr("class","comt_btn");
	});
	$(document).on('click', '.msg_box .comment p em', function(event) {
		$(this).parent().parent().find('.reply').slideToggle(200);
	});

});